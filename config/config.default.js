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

  return config;
};
