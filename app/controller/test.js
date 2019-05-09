'use strict';

const Controller = require('egg').Controller;

class Test extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.request);
    ctx.helper.$success();
  }
}

module.exports = Test;
