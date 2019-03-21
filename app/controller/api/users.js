'use strict';

const Controller = require('egg').Controller;

const createRule = {
  email: {
    type: 'email',
    required: true,
  },
  password: {
    type: 'password',
    required: true,
    min: 6,
    max: 20,
  },
};
class Users extends Controller {
  async register() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    const { email, password } = ctx.request.body;
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const userRecord = await ctx.service.users.create({ email, pwdHash });
    const userInfo = {
      id: userRecord.id,
      email: userRecord.email,
      role: 1,
      roleName: '在校生',
    };
    const userInfoRecord = await ctx.service.userInfos.createOrUpdate(userInfo);
    ctx.helper.$success(userInfoRecord);
  }
  async login() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    const { email, password } = ctx.request.body;
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    const user = await ctx.service.users.find(email);
    if (user.password === pwdHash) {
      ctx.helper.$success(user);
    } else {
      const { PASSWORD_ERROR } = app.config.errors;
      const err = new Error();
      Object.assign(err, PASSWORD_ERROR);
      throw err;
    }
  }
}

module.exports = Users;
