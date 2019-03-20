'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  // 办公自动化通告
  const Oa = app.model.define(
    'oa',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '用户id' },
      title: { type: STRING, comment: '公告标题' },
      content: { type: TEXT, comment: '公告内容' },
      type: { type: INTEGER, comment: '公告类型' },
      academyId: { type: INTEGER, comment: '文章发布的来源，如工学院' },
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
  Oa.associate = function() {
    app.model.Oa.belongsTo(app.model.User, { foreignKey: 'userId' });
    app.model.Oa.belongsTo(app.model.Academy, { foreignKey: 'academyId' });
  };
  Oa.sync();
  return Oa;
};
