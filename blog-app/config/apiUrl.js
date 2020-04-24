let ipUrl = 'http://localhost:7001/default/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList', // 首页获取文章list
    getArticleById: ipUrl + 'getArticleById/', // 获取文章详情接口，需要传递文章id
    getTypeInfo: ipUrl + 'getTypeInfo', // 获取博客类别
    getArticleListById: ipUrl + 'getAritcleListById/', // 获取每个类别下的文章
}

export default servicePath
