'use strict';

const Service = require('egg').Service;

class UserInfos extends Service {
  // 创建或更新用户信息
  async createOrUpdate(userInfo) {
    const { ctx } = this;
    const [ userInfoInstance, isNew ] = await ctx.model.UserInfo.findOrCreate({
      where: {
        id: userInfo.id,
      },
      defaults: userInfo,
    });
    if (!isNew) {
      await ctx.model.UserInfo.update(userInfo);
    }
    return userInfoInstance;
  }
  async findOne(email) {
    const { ctx } = this;
    const userInstance = await ctx.model.User.findOne({
      where: {
        email,
      },
    });
    return userInstance;
  }
  async findById(id) {
    const { ctx } = this;
    const userInstance = await ctx.model.UserInfo.findById(id);
    return userInstance;
  }
}

module.exports = UserInfos;
