'use strict';

const Service = require('egg').Service;

class Majors extends Service {
  // 获取某个学院下的所有专业
  async getMajorsInAcademy(academyId) {
    const { ctx } = this;
    const majors = await ctx.model.Major.findAll({
      where: {
        academyId,
      },
    });
    return majors;
  }
}
module.exports = Majors;
