'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      console.log(err);
      const { errors } = ctx.app.config;
      const status = err.status || 500;
      if (err.code === 'invalid_param') {
        err.name = errors.INVALID_PARAM.name;
        err.code = errors.INVALID_PARAM.code;
      }
      const code = err.code || 500;
      const msg = (err.msg || err.name || err.message || 'Internal Server Error').toUpperCase();
      ctx.body = {
        code,
        data: {},
        msg,
      };
      ctx.status = status;
    }
  };
};
