'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544267549240_1168';

  // add your config here
  config.middleware = [ 'errorHandler', 'historyFallback' ];
  config.errorHandler = {
    match: '/api',
  };

  // 登录token的有效期,设置为三天
  config.loginTokenTime = 3 * 24 * 60 * 60;

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'stuer',
    username: 'root',
    password: '1234',
  };

  config.security = {
    csrf: false,
  };

  // 用来摘要密码的秘钥
  config.pwdSecrect = 'thisisapwdsecrect';

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'admin',
      db: 0,
    },
  };

  config.sso = {
    domain: 'localhost',
  };

  config.email = {
    options: {
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: '769835910@qq.com',
        pass: 'relmlrhbizznbcif', // generated ethereal password
      },
    },
    from: '"Stuer官方" <769835910@qq.com>',
  };

  config.errors = {
    INVALID_PARAM: {
      // 非法参数
      code: 1000,
      name: 'INVALID_PARAM',
      msg: '请求参数校验失败',
    },
    INVALID_AUTH_TOKEN: {
      // 非法auth_token
      code: 1001,
      name: 'INVALID_PARAM',
      msg: 'auth_token校验失败',
    },
    NO_RIGHTS_OPERATION: {
      // 您无权进行此操作
      code: 1001,
      name: 'NO_RIGHTS_OPERATION',
      msg: '您无权进行此操作',
    },
    HAS_LOGIN: {
      // 用户账号已登录
      code: 2000,
      name: 'HAS_LOGIN',
      msg: '用户账号已登录',
    },
    NOT_LOGIN: {
      // 非法auth_token
      code: 2001,
      name: 'NOT_LOGIN',
      msg: '用户账号未登录',
    },
    USER_EXIST: {
      // 用户已存在
      code: 2002,
      name: 'USER_EXIST',
      msg: '用户已存在',
    },
    USER_NOT_FOUND: {
      // 用户不存在
      code: 2003,
      name: 'USER_NOT_FOUND',
      msg: '用户不存在',
    },
    PASSWORD_ERROR: {
      // 账号密码错误
      code: 2004,
      name: 'PASSWORD_ERROR',
      msg: '账号密码错误',
    },
    CODE_VALIDATE_FAILED: {
      // 验证码验证失败
      code: 2005,
      name: 'CODE_VALIDATE_FAILED',
      msg: '验证码验证失败',
    },
    TICKET_NOT_FOUND: {
      // 凭证不存在或过期
      code: 2006,
      name: 'TICKET_NOT_FOUND',
      msg: '凭证不存在或过期',
    },
    TICKET_IS_USED: {
      // 凭证已使用
      code: 2007,
      name: 'TICKET_IS_USED',
      msg: '凭证已使用',
    },
    POST_NOT_FOUND: {
      // 帖子存在
      code: 2008,
      name: 'POST_NOT_FOUND',
      msg: '帖子不存在',
    },
  };

  return config;
};
