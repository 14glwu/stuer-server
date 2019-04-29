'use strict';

const Controller = require('egg').Controller;

class Posts extends Controller {
  // 获取总的帖子
  async index() {
    const { ctx } = this;
    // 请求参数校验
    let { pageIndex, pageSize, type } = ctx.query;
    [ pageIndex, pageSize, type ] = [ pageIndex, pageSize, type ].map(item => parseInt(item, 10));
    // 先查询置顶帖子
    const { count: topCount, rows: topPosts } = await ctx.service.posts.getTopPost({ type });
    let result = {
      count: 0,
      rows: [],
    };
    // 如果置顶的帖子数少于页数据量，则还需要查询未置顶的帖子
    if (topPosts.length < pageSize) {
      const needCount = pageSize - topPosts.length;
      // 查询未置顶帖子
      result = await ctx.service.posts.getNotTopPost({ pageIndex, pageSize: needCount, type });
    }
    const { count: notTopCount, rows: notTopPosts } = result;

    // 汇总数据
    const count = topCount + notTopCount;
    const posts = [].concat(topPosts, notTopPosts);
    await Promise.all(
      posts.map(async post => {
        const userInfo = await ctx.service.userInfos.findByIdInRaw(post.userId);
        post.setDataValue('userInfo', userInfo);
      })
    );
    ctx.helper.$success({ count, posts });
  }

  // 查找帖子
  async show() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.params.id);
    const post = await ctx.service.posts.findById(id);
    ctx.helper.$success(post);
  }

  // 创建帖子
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        title: {
          type: 'string',
          required: true,
          max: 40,
        },
        content: {
          type: 'string',
          required: true,
        },
        type: {
          type: 'enum',
          values: [ 1, 2, 3, 4 ],
        },
        tag: {
          type: 'string',
          required: false,
        },
      },
      ctx.request.body
    );
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    const { title, content } = ctx.request.body;
    const post = await ctx.service.posts.create({
      userId: user.id,
      title,
      content,
    });
    ctx.helper.$success(post);
  }

  // 更新帖子
  async update() {
    const { ctx } = this;
    ctx.validate(
      {
        title: {
          type: 'string',
          required: false,
          max: 40,
        },
        content: {
          type: 'string',
          required: false,
        },
        type: {
          type: 'enum',
          values: [ 1, 2, 3, 4 ],
        },
      },
      ctx.request.body
    );
    const id = ctx.helper.toInt(ctx.params.id);
    const post = await ctx.service.posts.findById(id);
    if (!post) {
      const { POST_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(POST_NOT_FOUND.code, POST_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    if (user.id !== post.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await post.update(ctx.request.body);
    ctx.helper.$success(post);
  }

  // 删除帖子
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.params.id);
    const post = await ctx.service.posts.findById(id);
    if (!post) {
      const { POST_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(POST_NOT_FOUND.code, POST_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    if (user.id !== post.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await post.destroy();
    ctx.helper.$success();
  }
}
module.exports = Posts;
