'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Major = app.model.define(
    'major',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), comment: '专业名' },
      info: { type: STRING, comment: '专业介绍' },
      academyId: { type: INTEGER, comment: '学院ID' },
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
  Major.associate = function() {
    app.model.Major.belongsTo(app.model.Academy);
  };

  Major.sync();
  return Major;
};
