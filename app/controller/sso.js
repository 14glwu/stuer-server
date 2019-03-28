'use strict';

const Controller = require('egg').Controller;

class SsoController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.isSso = true; // 支持前端history模式时，用于判断该渲染index.html还是sso.html
    const html = await ctx.helper.readHtml('sso.html');
    ctx.set('Content-Type', 'text/html');
    ctx.body = html;
  }
}

module.exports = SsoController;
