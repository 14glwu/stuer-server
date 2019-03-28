'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  const auth_token_check = app.middleware.authTokenCheck({}, app);
  router.get('/', 'home.index');
  router.get('/sso', 'sso.index');
  // 单点登录相关
  router.post('/api/login', 'api.users.login'); // 登录
  router.post('/api/signup', 'api.users.signup'); // 注册
  router.post('/api/updatePwd', 'api.users.updatePwd'); // 更新密码
  router.post('/api/validateCode', 'api.users.validateCodeInPwd'); // 更新密码前验证验证码
  router.post('/api/sendCode', 'api.users.sendCode'); // 发送验证码
  router.get('/api/loginStatus', auth_token_check, 'api.users.loginStatus'); // 获取登录状态

  router.resources('/api/userInfos', auth_token_check, 'api.userInfos');
  router.resources('/api/posts', auth_token_check, 'api.posts');
};
