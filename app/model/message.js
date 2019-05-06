'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Message = app.model.define(
    'message',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '发送者用户ID' },
      friendId: { type: INTEGER, comment: '接收者用户ID' },
      senderId: { type: INTEGER, comment: '发送者用户ID' },
      receiveId: { type: INTEGER, comment: '接受者用户ID' },
      msgType: { type: STRING, comment: '消息类型，1普通消息，2系统消息' },
      content: { type: TEXT, comment: '消息内容' },
      sendTime: { type: DATE, comment: '消息发送时间' },
      status: { type: INTEGER, comment: '消息状态，1未读，2已读，3删除' },
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
  Message.sync();
  return Message;
};
