'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.helper.$success('hi, egg');
  }
}

module.exports = HomeController;
