'use strict';

const Service = require('egg').Service;

class Companies extends Service {
  // 获取某个学院下的所有专业
  async findAll() {
    const { ctx } = this;
    const companies = await ctx.model.Company.findAll();
    return companies;
  }
  async create(company) {
    const { ctx } = this;
    const companyInstance = await ctx.model.Company.create(company);
    return companyInstance;
  }
}
module.exports = Companies;
