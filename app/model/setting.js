'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Setting = app.model.define(
    'setting',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, comment: '配置名' },
      desc: { type: STRING, comment: '配置描述' },
      defaultValue: { type: STRING, comment: '配置初始值' },
      status: { type: INTEGER, comment: '配置状态：0关闭，1启用，2废弃' },
      type: {
        type: STRING,
        comment:
          '配置值类型，对象型object、数组型array、字符串型string、数字型number、布尔型boolean',
      },
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
  Setting.sync();
  return Setting;
};
