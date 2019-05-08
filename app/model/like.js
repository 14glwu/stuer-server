'use strict';
const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const Like = app.model.define(
    'like',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '点赞者' },
      postId: { type: INTEGER, comment: '帖子ID' },
      commentId: { type: INTEGER, comment: '评论ID' },
      replyId: { type: INTEGER, comment: '回复ID' },
      type: { type: INTEGER, comment: '点赞类型，1点赞帖子、2点赞评论、3点赞回复' },
      status: { type: INTEGER, comment: '是否点赞，1点赞，0未点赞' },
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
  Like.sync();
  return Like;
};
