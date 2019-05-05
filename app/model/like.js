'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Like = app.model.define(
    'like',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '点赞者' },
      postId: { type: INTEGER, comment: '帖子ID' },
      commentId: { type: INTEGER, comment: '评论ID' },
      replyId: { type: INTEGER, comment: '回复ID' },
      type: { type: INTEGER, comment: '点赞类型，1点赞帖子、2点赞评论、3点赞回复' },
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
  Like.sync({ alter: true });
  return Like;
};
