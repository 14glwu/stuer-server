'use strict';

const crypto = require('crypto');
const md5 = crypto.createHash('md5');

module.exports = {
  $success(data = {}) {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data,
      msg: 'ok',
    };
    ctx.status = 200;
  },
  $fail(errCode = 400, msg = 'Bad Request') {
    const { ctx } = this;
    ctx.body = {
      code: errCode,
      data: {},
      msg,
    };
    ctx.status = 400;
  },
  $error(errCode = 500, msg = 'Internal Server Error') {
    const { ctx } = this;
    ctx.body = {
      code: errCode,
      data: {},
      msg,
    };
    ctx.status = 500;
  },
  cryptPwd(password) {
    return md5.update(password).digest('hex');
  },
};
