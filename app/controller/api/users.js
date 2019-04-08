'use strict';

const Controller = require('egg').Controller;

const rule = {
  email: {
    type: 'email',
    required: true,
  },
  code: {
    type: 'string',
    required: true,
    min: 6,
    max: 6,
  },
  password: {
    type: 'password',
    required: true,
    min: 6,
    max: 20,
  },
  ticket: {
    type: 'string',
    required: true,
  },
};
class Users extends Controller {
  async login() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
        password: rule.password,
      },
      ctx.request.body
    );
    const { email, password } = ctx.request.body;
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.findOne(email);
    if (!userInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    if (userInstance.password === pwdHash) {
      // 生成授权token
      const auth_token = ctx.helper.generateToken({ email: userInstance.email }, this.config.loginTokenTime);
      ctx.cookies.set('auth_token', auth_token, {
        maxAge: this.config.loginTokenTime * 1000,
        path: '/',
        domain: 'localhost',
        httpOnly: false,
        signed: false,
      });
      await app.redis.setex(userInstance.email, this.config.loginTokenTime, auth_token);
      ctx.helper.$success({
        auth_token,
        expires: this.config.loginTokenTime,
      });
    } else {
      const { PASSWORD_ERROR } = this.config.errors;
      ctx.helper.$fail(PASSWORD_ERROR.code, PASSWORD_ERROR.code.msg);
      return;
    }
  }
  // 获取用户登录状态，经过中间件auth_token_check判断
  async loginStatus() {
    const { ctx } = this;
    ctx.helper.$success({
      email: ctx.user_email,
      isLogin: true,
    });
  }

  // 注册
  async signup() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
        code: rule.code,
        password: rule.password,
      },
      ctx.request.body
    );
    const { email, code, password } = ctx.request.body;
    // 从redis获取验证码
    const codeInRedis = await app.redis.get(`code:${email}`);

    if (code !== codeInRedis) {
      const { CODE_VALIDATE_FAILED } = this.config.errors;
      ctx.helper.$fail(CODE_VALIDATE_FAILED.code, CODE_VALIDATE_FAILED.code.msg);
      return;
    }
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.create({ email, password: pwdHash });
    const userInfo = {
      id: userInstance.id,
      email: userInstance.email,
      role: 1,
      roleName: '毕业生',
      graduated: 1,
    };
    const userInfoInstance = await ctx.service.userInfos.createOrUpdate(userInfo);
    ctx.helper.$success(userInfoInstance);
  }

  // 发送验证码
  async sendCode() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
      },
      ctx.request.body
    );
    const { email } = ctx.request.body;
    const code = ctx.helper.generateCode();
    // 设置验证码，过期时间为3分钟
    await app.redis.setex(`code:${email}`, 5 * 60, code);
    await ctx.service.email.sendCodeEmail(email, code);
    ctx.helper.$success();
  }

  // 验证验证码，用于更新密码时验证
  async validateCodeInPwd() {
    const { ctx, app } = this;
    ctx.validate(
      {
        email: rule.email,
        code: rule.code,
      },
      ctx.request.body
    );
    const { email, code } = ctx.request.body;
    // 从redis获取验证码
    const codeInRedis = await app.redis.get(`code:${email}`);
    if (code === codeInRedis) {
      const codeTicket = ctx.helper.uuid();
      // 设置凭证与email的关联,过期时间为10分钟
      await app.redis.setex(`ticket-email:${codeTicket}`, 10 * 60, email);
      ctx.helper.$success(
        {
          ticket: codeTicket,
        },
        '验证码验证成功'
      );
    } else {
      const { CODE_VALIDATE_FAILED } = this.config.errors;
      ctx.helper.$fail(CODE_VALIDATE_FAILED.code, CODE_VALIDATE_FAILED.code.msg);
    }
  }

  // 更新密码
  async updatePwd() {
    const { ctx, app } = this;
    ctx.validate(
      {
        password: rule.password,
        ticket: rule.ticket,
      },
      ctx.request.body
    );
    const { password, ticket } = ctx.request.body;
    const email = await app.redis.get(`ticket-email:${ticket}`);
    if (!email) {
      const { TICKET_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(TICKET_NOT_FOUND.code, TICKET_NOT_FOUND.msg);
      return;
    } else if (email === 'isUsed') {
      const { TICKET_IS_USED } = this.config.errors;
      ctx.helper.$fail(TICKET_IS_USED.code, TICKET_IS_USED.msg);
      return;
    }
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.findOne(email);
    if (!userInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    await userInstance.update({ password: pwdHash });
    // 设置凭证已使用
    await app.redis.set(`ticket-email:${ticket}`, 'isUsed');
    ctx.helper.$success(userInstance);
  }
}

module.exports = Users;
