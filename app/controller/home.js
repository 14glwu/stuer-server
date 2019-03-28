'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const html = await ctx.helper.readHtml('index.html');
    ctx.set('Content-Type', 'text/html');
    ctx.body = html;
  }
}

module.exports = HomeController;
