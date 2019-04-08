'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const UserInfo = app.model.define(
    'user-info',
    {
      id: { type: INTEGER, primaryKey: true, comment: '用户ID' },
      email: { type: STRING, comment: '邮箱账号' },
      role: {
        type: INTEGER,
        comment: '用户角色ID，1毕业生，2在校生，3教师，4运营管理员，5学校管理员，6企业管理员，7超级管理员',
      },
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
      graduated: { type: INTEGER, comment: '是否毕业生，1毕业生，0在校生' },
      enterTime: { type: DATE, comment: '入学时间' },
      graduateTime: { type: DATE, comment: '毕业时间' },
      nowStatus: { type: INTEGER, comment: '目前状态,1未就业，2就业，3升学，4留学，5创业' },
      liveAddress: { type: STRING, comment: '现居地，中文地址' },
      liveLocation: { type: STRING, comment: '现居地坐标，经纬度坐标' },
      majorId: { type: INTEGER, comment: '专业ID' },
      academyId: { type: INTEGER, comment: '学院ID' },
      companyId: { type: INTEGER, comment: '公司ID' },
      mSalary: { type: INTEGER, comment: '月薪' },
      ySalary: { type: INTEGER, comment: '年薪' },
      resume: { type: TEXT, comment: '个人简历' },
      certifyType: {
        type: INTEGER,
        comment: '认证类型，1未认证用户，2运营认证的用户（某公司员工、某教师），3学校管理员认证的企业官方用户',
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
  UserInfo.associate = function() {
    app.model.UserInfo.belongsTo(app.model.User, { as: 'info', foreignKey: 'id' });
  };
  UserInfo.sync({ alter: true });
  return UserInfo;
};
