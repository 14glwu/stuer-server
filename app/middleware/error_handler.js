// app/middleware/error_handler.js
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      const code = err.code || 500;
      const msg = err.msg || err.namer || 'Internal Server Error';
      ctx.body = {
        code,
        data: {},
        msg
      };
      ctx.status = status;
    }
  };
};
