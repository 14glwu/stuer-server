'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: STRING, comment: '用户邮箱，也是账号' },
      password: { type: STRING, comment: '用户密码' },
      role: { type: INTEGER, comment: '用户角色' },
      roleName: { type: STRING, comment: '用户角色名' },
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
  User.sync({ alter: true });
  return User;
};
