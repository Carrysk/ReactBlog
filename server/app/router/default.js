'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.default.index);
  router.get('/default/getArticleList', controller.default.default.getArticleList);
  router.get('/default/getArticleById/:id', controller.default.default.getArticleById); // xxx.xxx.xxx.xxx:xxx/default/getAritcleByIdX(X:数字)
  router.get('/default/getTypeInfo', controller.default.default.getTypeInfo); // 获取博客类型
  router.get('/default/getAritcleListById/:id', controller.default.default.getAritcleListById); // 根据类型id获取文章列表数据
};
