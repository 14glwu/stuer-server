'use strict';

module.exports = () => {
  return async function historyFallback(ctx, next) {
    await next();
    const url = ctx.request.url;
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          code: 404,
          data: {},
          msg: 'NOT FOUND',
        };
      } else if (/^\/sso.*/.test(url)) {
        // 返回单点登录平台页面
        const html = await ctx.helper.readHtml('sso.html');
        ctx.set('Content-Type', 'text/html');
        ctx.body = html;
      } else {
        // 返回stuer平台页面
        const html = await ctx.helper.readHtml('index.html');
        ctx.set('Content-Type', 'text/html');
        ctx.body = html;
      }
    }
  };
};
