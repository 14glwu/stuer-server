'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544267549240_1168';

  // add your config here
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = {
    match: '/api',
  };

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

  config.errors = {
    USER_EXIST_ERROR: {
      // 用户已存在
      code: 1000,
      name: 'USER_EXIST_ERROR',
    },
    USER_NOT_FOUND_ERROR: {
      // 用户已存在
      code: 1001,
      name: 'USER_NOT_FOUND_ERROR',
    },
    PASSWORD_ERROR: {
      // 用户密码错误
      code: 1002,
      name: 'PASSWORD_ERROR',
    },
  };
  return config;
};
