'use strict';

const Service = require('egg').Service;

class Users extends Service {
  async create(User) {
    const { ctx, app } = this;
    const [ user, isNew ] = await ctx.model.User.findOrCreate({
      where: {
        email: User.email,
      },
      defaults: User,
    });
    if (!isNew) {
      const { USER_EXIST_ERROR } = app.config.errors;
      const err = new Error();
      Object.assign(err, USER_EXIST_ERROR);
      throw err;
    }
    return user;
  }
  async find(email) {
    const { ctx } = this;
    const user = await ctx.model.User.find({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = Users;
