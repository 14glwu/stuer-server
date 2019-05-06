'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Academy = app.model.define(
    'academy',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), comment: '学院名' },
      info: { type: STRING, comment: '学院介绍' },
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
  Academy.sync();
  return Academy;
};
