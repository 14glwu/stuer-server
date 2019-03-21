'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Post = app.model.define(
    'post',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '用户id' },
      title: { type: INTEGER, comment: '帖子标题' },
      content: { type: TEXT, comment: '帖子内容' },
      top: { type: INTEGER, comment: '是否置顶，1是，0否' },
      highlight: { type: INTEGER, comment: '是否精华帖，1是，0否' },
      tag: { type: STRING, comment: '帖子标签' },
      type: { type: INTEGER, comment: '帖子类型，1讨论区，2求职区，3找对象，4匿名区' },
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
  Post.sync();
  return Post;
};
