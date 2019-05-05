'use strict';

const crypto = require('crypto');
const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const cache = {};

module.exports = {
  uuid,
  cryptPwd(password) {
    const { ctx } = this;
    const { pwdSecrect } = ctx.app.config;
    const md5 = crypto.createHmac('md5', pwdSecrect);
    return md5.update(password).digest('hex');
  },

  generateToken(data, expires = 7200) {
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(path.join(__dirname, '../../keys/rsa_private_key.pem')); // 私钥
    const token = jwt.sign(
      {
        data,
        exp: created + expires,
      },
      cert,
      { algorithm: 'RS256' }
    );
    return token;
  },
  generateCode() {
    return Math.random()
      .toString()
      .slice(-6);
  },
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) {
      return str;
    }
    return parseInt(str, 10) || 0;
  },
  // 读取html文件内容
  async readHtml(filename) {
    const file = path.resolve(__dirname, '../public/', filename);
    if (!cache[file]) {
      cache[file] = await new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', function(err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
    }
    return cache[file];
  },
  // 成功响应
  $success(data = {}, msg = 'ok') {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data,
      msg,
    };
  },
  // 成功响应
  $successForEditor(data = {}) {
    const { ctx } = this;
    ctx.body = {
      errno: 0,
      data,
    };
  },
  // 失败响应
  $fail(errCode = 400, msg = 'BAD REQUEST') {
    const { ctx } = this;
    ctx.body = {
      code: errCode,
      data: {},
      msg,
    };
  },
  // 错误响应
  $error(errCode = 500, msg = 'INTERNAL SERVER ERROR') {
    const { ctx } = this;
    ctx.body = {
      code: errCode,
      data: {},
      msg,
    };
  },
};
