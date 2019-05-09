'use strict';

const dayjs = require('dayjs');
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const Post = app.model.define(
    'post',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: INTEGER, comment: '用户id' },
      title: { type: STRING, comment: '帖子标题' },
      content: { type: TEXT, comment: '帖子内容' },
      top: { type: INTEGER, defaultValue: 0, comment: '是否置顶，1是，0否' },
      highlight: { type: INTEGER, defaultValue: 0, comment: '是否精华帖，1是，0否' },
      tags: {
        type: STRING,
        comment: '帖子标签',
        get() {
          return JSON.parse(this.getDataValue('tags'));
        },
        set(val) {
          this.setDataValue('tags', JSON.stringify(val));
        },
      },
      type: {
        type: INTEGER,
        defaultValue: 1,
        comment: '帖子类型，1讨论区，2树洞，3找对象，4求职区',
      },
      checked: { type: INTEGER, defaultValue: 0, comment: '帖子是否经过审核，1审核过，0未审核' },
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
  Post.sync();
  return Post;
};
