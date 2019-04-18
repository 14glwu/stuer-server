'use strict';

const Service = require('egg').Service;

class Academies extends Service {
  // 获取所有学院
  async getAcademies() {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const academies = await ctx.model.Academy.findAll({
      where: {
        id: {
          [Op.lte]: 8,
        },
      },
    });
    return academies;
  }
}
module.exports = Academies;
