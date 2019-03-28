const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function authTokenCheck(ctx, next) {
    // 因为涉及到跨平台，故不对auth_token进行签名校验
    const auth_token = ctx.cookies.get('auth_token', { signed: false });
    if (auth_token) {
      // 是否有auth_token
      const res = checkToken(auth_token);
      const { email } = res;
      if (email) {
        // auth_token是否能解析出email，验证auth_token是否合法
        const redis_auth_token = await app.redis.get(email);
        if (auth_token === redis_auth_token) {
          // 验证auth_token是否是最新的
          ctx.user_email = email; // 在上下文中保存此次请求的user信息，用于后续使用
          await next();
        } else {
          const { HAS_LOGIN } = ctx.app.config.errors;
          ctx.helper.$fail(HAS_LOGIN.code, '您的账号已在其他地方登录，请重新登录');
        }
      } else {
        // auth_token不合法
        const { INVALID_AUTH_TOKEN } = ctx.app.config.errors;
        ctx.helper.$fail(INVALID_AUTH_TOKEN.code, '您的登录状态已过期，请重新登录');
      }
    } else {
      const { NOT_LOGIN } = ctx.app.config.errors;
      ctx.helper.$fail(NOT_LOGIN.code, '您还未登录，请登录后再操作');
    }
  };
};

function checkToken(token) {
  const cert = fs.readFileSync(path.join(__dirname, '../../keys/rsa_public_key.pem')); // 公钥
  let res = '';
  try {
    const result = jwt.verify(token, cert, { algorithms: [ 'RS256' ] }) || {};
    const { exp } = result;
    const current = Math.floor(Date.now() / 1000);
    if (current <= exp) {
      res = result.data || {};
    }
  } catch (err) {
    throw err;
  }
  return res;
}
