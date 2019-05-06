'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  // 办公自动化通告
  const Oa = app.model.define(
    'oa',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '用户id，发OA人，只有学校管理员可以发OA' },
      title: { type: STRING, comment: 'OA标题' },
      content: { type: TEXT, comment: 'OA内容' },
      type: { type: INTEGER, comment: 'OA类型' },
      academyId: { type: INTEGER, comment: 'OA发布的来源，如工学院' },
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
  Oa.sync();
  return Oa;
};
