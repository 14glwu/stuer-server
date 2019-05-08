'use strict';
const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Reply = app.model.define(
    'reply',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      commentId: { type: INTEGER, comment: '评论ID' },
      replyId: { type: INTEGER, comment: '回复ID' },
      type: { type: INTEGER, comment: '回复类型，1回复评论、2回复回复' },
      content: { type: STRING, comment: '内容' },
      fromUserId: { type: INTEGER, comment: '回复者ID' },
      toUserId: { type: INTEGER, comment: '被回复者ID' },
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
  Reply.sync();
  return Reply;
};
