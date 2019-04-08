'use strict';

const Controller = require('egg').Controller;

class UserInfos extends Controller {
  // 获取用户信息
  async getUserInfo() {
    const { ctx } = this;
    const userInfoInstance = await ctx.service.userInfos.findOne(ctx.user_email);
    if (!userInfoInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    ctx.helper.$success(userInfoInstance);
  }
  // 获取所有学生信息
  async getAllStudents() {
    const { ctx } = this;
    const students = await ctx.service.userInfos.getAllStudents();
    ctx.helper.$success(students);
  }
  // 获取所有在校生信息
  async getAllStudentsAtSchool() {
    const { ctx } = this;
    const studentsAtSchool = await ctx.service.userInfos.getAllStudentsAtSchool();
    ctx.helper.$success(studentsAtSchool);
  }
  // 获取所有毕业生信息
  async getAllGraduates() {
    const { ctx } = this;
    const graduates = await ctx.service.userInfos.getAllGraduates();
    ctx.helper.$success(graduates);
  }
  // 更新用户信息，给普通用户调用的
  async updateUserInfo() {
    const { ctx } = this;
    const userInfoInstance = await ctx.service.userInfos.findOne(ctx.user_email);
    if (!userInfoInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    const { id, email, role, certifyType } = ctx.request.body; // 这几项是不允许随意修改的
    if (id || email || role > 4 || certifyType) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    const { graduated } = ctx.request.body;
    if (graduated === 0) {
      Object.assign(ctx.request.body, {
        role: 2, // 在校生
      });
    }
    await userInfoInstance.update(ctx.request.body);
    ctx.helper.$success(userInfoInstance);
  }
  async certifyUser() {
    const { ctx } = this;
    const userInfoInstance = await ctx.service.userInfos.findOne(ctx.user_email);
    const { id, certifyType } = ctx.request.body;
    const needCertifyUser = await ctx.service.userInfos.findById(id);
    if (!userInfoInstance || !needCertifyUser) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    if (certifyType === 2 && (userInfoInstance.role === 4 || userInfoInstance.role === 7)) {
      // 只有运营管理员或者超级管理员才可以认证用户为普通认证用户
      await needCertifyUser.update({ id, certifyType });
      ctx.helper.$success(needCertifyUser);
      return;
    }
    if (certifyType === 3 && (userInfoInstance.role === 5 || userInfoInstance.role === 7)) {
      // 只有学校管理员或者超级管理员才可以认证用户为企业官方用户
      await needCertifyUser.update({ id, certifyType });
      ctx.helper.$success(needCertifyUser);
      return;
    }
    // 其他情况下都返回无权操作
    const { NO_RIGHTS_OPERATION } = this.config.errors;
    ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
  }
}

module.exports = UserInfos;
