'use strict';

const Service = require('egg').Service;

class UserInfos extends Service {
  // 创建或更新用户信息
  async createOrUpdate(userInfo) {
    const { ctx } = this;
    const [ userInfoRecord, isNew ] = await ctx.model.UserInfo.findOrCreate({
      where: {
        id: userInfo.id,
        email: userInfo.email,
      },
      defaults: userInfo,
    });
    if (!isNew) {
      await ctx.model.UserInfo.update(userInfo);
    }
    return userInfoRecord;
  }
}

module.exports = UserInfos;
