'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      const { errors } = app.config;
      console.log('!!!!!!!!!!!!!!!!!!!');
      console.log(JSON.stringify(err));
      const status = err.status || err.code || 500;
      const code = err.code || errors[err.name] || 500;
      const msg = err.name || 'Internal Server Error';
      ctx.body = {
        code,
        data: {},
        msg,
      };
      ctx.status = status;
    }
  };
};
