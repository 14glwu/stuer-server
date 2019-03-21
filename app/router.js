'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  router.get('/', 'home.index');
  router.post('/api/users/register', 'api.users.register');
  router.post('/api/users/login', 'api.users.login');
  router.resources('/api/posts', 'api.posts');
};
