'use strict';

const Controller = require('egg').Controller;

class Majors extends Controller {
  async getAllMajors() {
    const { ctx } = this;
    const result = [];
    const academies = await ctx.service.academies.getAcademies();
    await Promise.all(
      // promise.all的参数必须是promise,使用map可以返回promise
      academies.map(async academy => {
        const majors = await ctx.service.majors.getMajorsInAcademy(academy.id);
        const children = [];
        majors.forEach(major => {
          children.push({
            value: major.id,
            label: major.name,
          });
        });
        // 填充进结果中
        result.push({
          value: academy.id,
          label: academy.name,
          children,
        });
      })
    );
    ctx.helper.$success(result);
  }
}
module.exports = Majors;
