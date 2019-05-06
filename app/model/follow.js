'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Follow = app.model.define(
    'follow',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '用户id' },
      followUserId: { type: INTEGER, comment: '被关注者用户id' },
      status: { type: INTEGER, comment: '关注状态，1关注，0取关' },
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
  Follow.sync();
  return Follow;
};
