'use strict';

const Service = require('egg').Service;

class Posts extends Service {
  async getNotTopPost({ pageIndex = 1, pageSize = 10, type = 1 }) {
    const { ctx } = this;
    const query = {
      where: {
        type,
        top: 0,
      },
      order: [[ 'createdAt', 'DESC' ]],
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize + 1,
    };
    const result = await ctx.model.Post.findAndCountAll(query);
    return result;
  }
  async getTopPost({ type = 1 }) {
    const { ctx } = this;
    const query = {
      where: {
        type,
        top: 1,
      },
      order: [[ 'createdAt', 'DESC' ]],
    };
    const result = await ctx.model.Post.findAndCountAll(query);
    return result;
  }
  async create({ userId, title, content, top = 0, highlight = 0, type = 1 }) {
    const { ctx } = this;
    const postRecord = await ctx.model.Post.create({ userId, title, content, top, highlight, type });
    return postRecord;
  }
  async findById(id) {
    const { ctx } = this;
    const post = await ctx.model.Post.findById(id);
    return post;
  }
}
module.exports = Posts;
