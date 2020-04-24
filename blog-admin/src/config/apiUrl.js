const host = 'http://127.0.0.1:7001/admin/';

let servicePath = {
    login: host + 'login', // 登录接口
    isLogin: host + 'islogin', // 是否登录
    getTypeInfo: host + 'gettypeinfo', // 获取文章类别
    addArticle: host + 'addarticle', // 添加文章
    updateArticle: host + 'updatearticle', // 修改文章
    getArticleList: host + 'getarticlelist', // 获取文章列表
    delArticleById: host + 'delarticlebyid/', // 删除文章接口
    getAritcleById: host + 'getarticlebyid/', // 根据文章id 获取文章
}

module.exports = servicePath;