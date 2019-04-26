'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.sso = {
    domain: 'ericwu.cn',
  };

  config.urls = {
    stuer_url: 'http://stuer.ericwu.cn',
  };

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
