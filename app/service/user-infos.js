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
  // 查找用户信息
  async findOne(email) {
    const { ctx } = this;
    const userInfoInstance = await ctx.model.UserInfo.findOne({
      where: {
        email,
      },
    });
    return userInfoInstance;
  }
  // 查找用户信息通过id
  async findById(id) {
    const { ctx } = this;
    const userInfoInstance = await ctx.model.UserInfo.findById(id);
    return userInfoInstance;
  }
  // 获取所有学生信息
  async getAllStudents() {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const query = {
      where: {
        role: {
          [Op.or]: [ 1, 2 ],
        },
      },
    };
    const result = await ctx.model.UserInfo.findAll(query);
    return result;
  }
  // 获取所有在校生信息
  async getAllStudentsAtSchool() {
    const { ctx } = this;
    const query = {
      where: {
        role: 2,
      },
    };
    const result = await ctx.model.UserInfo.findAll(query);
    return result;
  }
  // 获取所有毕业生信息
  async getAllGraduates() {
    const { ctx } = this;
    const query = {
      where: {
        role: 1,
      },
    };
    const result = await ctx.model.UserInfo.findAll(query);
    return result;
  }
}

module.exports = UserInfos;
