'use strict';

const Service = require('egg').Service;

class Posts extends Service {
  async getLatestPost(pageIndex = 1, pageSize = 10, type = 1) {
    const { ctx } = this;
    // 先查询置顶帖子，置顶帖子的数量不允许超过一页
    let { count: topCount, rows: topPosts } = await this.getTopPostAndCount({
      type,
    });
    if (pageSize < topCount) {
      const err = new Error();
      err.msg = '一页数据量需大于置顶帖子数';
      throw err;
    }
    let limit = pageSize; // 非置顶帖子数量
    let offset = (pageIndex - 1) * pageSize; // 非置顶帖子起始查询点
    // 如果置顶的帖子数少于页数据量，则还需要查询未置顶的帖子
    if (pageIndex == 1) {
      // 第一页
      limit = limit - topCount > 0 ? limit - topCount : 0; // 数量需减去非置顶帖子数量
    } else {
      // 第一页以后
      offset -= topCount;
      topPosts = []; // 第一页以后不需要展示置顶帖子
    }
    const notTopPosts = await this.getNotTopPost({ limit, offset, type }); // 查询未置顶帖子
    const count = await this.getPostCount(type); // 获取帖子总数
    const posts = [].concat(topPosts, notTopPosts); // 将帖子数据汇总
    await Promise.all(
      posts.map(async post => {
        const userInfo = await ctx.service.userInfos.findById(post.userId);
        post.setDataValue('userInfo', userInfo.get({ plain: true })); // 给每条帖子数据添加作者信息
      })
    );
    return { count, posts };
  }
  async getHighlightPost(pageIndex = 1, pageSize = 10, type = 1) {
    const { ctx } = this;
    const query = {
      where: {
        type,
        highlight: 1,
      },
      order: [[ 'createdAt', 'DESC' ]],
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
    };
    const result = await ctx.model.Post.findAndCountAll(query);
    const { count: count, rows: posts } = result;
    await Promise.all(
      posts.map(async post => {
        const userInfo = await ctx.service.userInfos.findById(post.userId);
        post.setDataValue('userInfo', userInfo.get({ plain: true })); // 给每条帖子数据添加作者信息
      })
    );
    return { count, posts };
  }

  // 获取帖子数量
  async getPostCount(type) {
    const { ctx } = this;
    const count = await ctx.model.Post.count({
      where: {
        type,
      },
    });
    return count;
  }
  // 获取非置顶帖子
  async getNotTopPost({ limit = 10, offset = 0, type = 1 }) {
    const { ctx } = this;
    const query = {
      where: {
        type,
        top: 0,
      },
      order: [[ 'createdAt', 'DESC' ]],
      limit,
      offset,
    };
    const notTopPost = await ctx.model.Post.findAll(query);
    return notTopPost;
  }
  // 获取置顶帖子和数量
  async getTopPostAndCount({ type = 1 }) {
    const { ctx } = this;
    const query = {
      where: {
        type,
        top: 1,
      },
      order: [[ 'createdAt', 'DESC' ]],
    };
    const topPost = await ctx.model.Post.findAndCountAll(query);
    return topPost;
  }
  async create({ userId, title, content, top = 0, highlight = 0, type = 1, tags }) {
    const { ctx } = this;
    const postRecord = await ctx.model.Post.create({
      userId,
      title,
      content,
      top,
      highlight,
      type,
      tags,
    });
    return postRecord;
  }
  async findById(id) {
    const { ctx } = this;
    const post = await ctx.model.Post.findById(id);
    return post;
  }
}
module.exports = Posts;
