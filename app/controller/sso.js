'use strict';

const Controller = require('egg').Controller;

class SsoController extends Controller {
  async index() {
    const { ctx } = this;
    const html = await ctx.helper.readHtml('sso.html');
    ctx.set('Content-Type', 'text/html');
    ctx.body = html;
  }
}

module.exports = SsoController;
