'use strict';

const Controller = require('egg').Controller;

class UserInfos extends Controller {
  async update() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.params.id);
    const userInfoInstance = await ctx.service.userInfos.findById(id);
    if (!userInfoInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    await userInfoInstance.update(ctx.request.body);
    return userInfoInstance;
  }
  async index() {
    const { ctx } = this;
    ctx.helper.$success({
      email: ctx.user_email,
    });
  }
}

module.exports = UserInfos;
