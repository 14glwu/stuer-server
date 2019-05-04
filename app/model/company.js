'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Company = app.model.define(
    'company',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), comment: '公司名' },
      info: { type: STRING, comment: '公司介绍' },
      regNum: { type: STRING, comment: '公司经营注册号' },
      address: { type: STRING, comment: '公司地址' },
      property: { type: STRING, comment: '企业性质' },
      reverse1: STRING,
      reverse2: STRING(1000),
      reverse3: STRING(30),
      reverse4: INTEGER,
      reverse5: TEXT,
      reverse6: TEXT('tiny'),
    },
    {
      paranoid: true,
      underscored: false,
    }
  );
  Company.sync({ alter: true });
  return Company;
};
