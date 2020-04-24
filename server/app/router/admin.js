'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin', adminauth, controller.admin.admin.index);
  router.post('/admin/login', controller.admin.admin.login);
  router.get('/admin/islogin', adminauth, controller.admin.admin.isLogin); // 是否登录
  router.get('/admin/gettypeinfo', controller.admin.admin.getTypeInfo); // 获取类别
  router.post('/admin/addarticle', adminauth, controller.admin.admin.addArticle); // 添加文章内容
  router.post('/admin/updatearticle', adminauth, controller.admin.admin.updateArticle); // 修改文章信息
  router.get('/admin/getarticlelist', adminauth, controller.admin.admin.getArticleList); // 获取文章列表
  router.get('/admin/delarticlebyid/:id', adminauth, controller.admin.admin.delArticleById); // 删除文章
  router.get('/admin/getarticlebyid/:id', adminauth, controller.admin.admin.getArticleById);
};
