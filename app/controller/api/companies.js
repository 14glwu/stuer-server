'use strict';

const Controller = require('egg').Controller;

class Companies extends Controller {
  async index() {
    const { ctx } = this;
    const companies = await ctx.service.companies.findAll();
    ctx.helper.$success(companies);
  }
  async create() {
    const { ctx } = this;
    const company = ctx.request.body;
    const companyInstance = await ctx.service.companies.create(company);
    ctx.helper.$success(companyInstance);
  }
}
module.exports = Companies;
