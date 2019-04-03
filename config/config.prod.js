'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'stuer',
    username: 'root',
    password: '14glwu',
  };

  return config;
};
