'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const UserInfo = app.model.define(
    'user-info',
    {
      id: { type: INTEGER, primaryKey: true, comment: '用户ID' },
      name: { type: STRING, comment: '用户真实姓名' },
      nickName: { type: STRING, comment: '用户昵称' },
      personSign: { type: STRING, comment: '个性签名' },
      avatar: { type: STRING, comment: '用户头像url' },
      age: { type: INTEGER, comment: '年龄' },
      gender: { type: STRING(10), comment: '性别' },
      phone: { type: STRING(20), comment: '手机号码' },
      birthTime: { type: DATE, comment: '出生时间' },
      birthPlace: { type: STRING, comment: '出生地点' },
      eduLevel: { type: STRING(10), comment: '学历' },
      party: { type: STRING(10), comment: '政治面貌' },
      idCard: { type: STRING(30), comment: '证件号码' },
      idCardType: { type: INTEGER, comment: '证件类型，1身份证，2护照，3港澳通行证，4台胞证，5军官证，6其他' },
      stuNum: { type: STRING(30), comment: '学号' },
      teaNum: { type: STRING(30), comment: '教师编号' },
      graduated: { type: INTEGER, comment: '是否毕业生' },
      graduateTime: { type: DATE, comment: '毕业时间' },
      liveAddress: { type: STRING, comment: '现居地' },
      liveLocation: { type: STRING, comment: '现居地坐标' },
      majorId: { type: INTEGER, comment: '专业ID' },
      academyId: { type: INTEGER, comment: '学院ID' },
      companyId: { type: INTEGER, comment: '公司ID' },
      salary: { type: INTEGER, comment: '月薪' },
      resume: { type: TEXT, comment: '个人简历' },
      isCertify: { type: INTEGER, comment: '是否认证用户' },
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
  UserInfo.associate = function() {
    app.model.UserInfo.belongsTo(app.model.User, { as: 'info', foreignKey: 'id' });
  };
  UserInfo.sync();
  return UserInfo;
};
