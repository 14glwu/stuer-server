'use strict';
const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const Notify = app.model.define(
    'notify',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: STRING, comment: '消息内容，用于系统通知' },
      type: { type: STRING, comment: '消息类型，1提醒，2系统通知，3私信' },
      targetId: { type: INTEGER, comment: '目标的ID，比如帖子ID或者OA ID或者用户ID' },
      targetType: { type: STRING, comment: '目标的类型，帖子post、OA oa、用户user' },
      action: { type: STRING, comment: '动作类型，点赞like、评论comment、' },
      senderId: { type: INTEGER, comment: '发送者ID' },
      senderType: { type: STRING, comment: '发送者类型，普通用户user，管理员admin' },
      isRead: { type: INTEGER, comment: '阅读状态，1已读，0未读' },
      userId: { type: INTEGER, comment: '消息接受者ID' },
      reverse1: STRING,
      reverse2: STRING(1000),
      reverse3: STRING(30),
      reverse4: INTEGER,
      reverse5: TEXT,
      reverse6: TEXT('tiny'),

      createdAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('createdAt')).valueOf();
        },
      },
      updatedAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('updatedAt')).valueOf();
        },
      },
      deletedAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('deletedAt')).valueOf();
        },
      },
    },
    {
      paranoid: true,
      underscored: false,
    }
  );
  Notify.sync();
  return Notify;
};
