'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  const auth_token_check = app.middleware.authTokenCheck({}, app);
  router.get('/', 'home.index'); // 返回stuer平台
  router.get('/sso', 'sso.index'); // 返回单点登录平台
  // 单点登录相关
  router.post('/api/login', 'api.users.login'); // 登录
  router.post('/api/signup', 'api.users.signup'); // 注册
  router.post('/api/updatePwd', 'api.users.updatePwd'); // 更新密码
  router.post('/api/validateCode', 'api.users.validateCodeInPwd'); // 更新密码前验证验证码
  router.post('/api/sendCode', 'api.users.sendCode'); // 发送验证码

  router.get('/api/loginStatus', auth_token_check, 'api.users.loginStatus'); // 获取登录状态

  // 用户信息相关
  router.get('/api/user/:id', 'api.userInfos.getUserInfoById'); // 获取用户信息通过ID
  router.get('/api/getUserInfo', auth_token_check, 'api.userInfos.getUserInfo'); // 获取用户信息通过auth_token
  router.get('/api/getAllStudents', auth_token_check, 'api.userInfos.getAllStudents'); // 获取所有学生信息
  router.get('/api/getAllStudentsAtSchool', auth_token_check, 'api.userInfos.getAllStudentsAtSchool'); // 获取所有在校学生信息
  router.get('/api/getAllGraduates', auth_token_check, 'api.userInfos.getAllGraduates'); // 获取所有毕业学生信息
  router.post('/api/updateUserInfo', auth_token_check, 'api.userInfos.updateUserInfo'); // 更新用户信息
  router.post('/api/certifyUser', auth_token_check, 'api.userInfos.certifyUser'); // 认证用户

  router.get('/api/getAllMajors', 'api.majors.getAllMajors'); // 获取所有学院专业
  router.resources('/api/companies', 'api.companies'); // RESTFUL api风格  公司相关接口
  router.resources('/api/posts', auth_token_check, 'api.posts'); // RESTFUL api风格 帖子相关接口
  router.post('/api/uploadImg', 'api.uploader.uploadImg'); // 上传单张图片
  router.post('/api/uploadImgs', 'api.uploader.uploadImgs'); // 上传多张图片
};
