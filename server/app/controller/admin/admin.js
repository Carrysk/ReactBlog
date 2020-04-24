'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    this.ctx.body = 'this is admin';
  }

  async isLogin() {
    this.ctx.body = { success: true };
  }

  async login() {
    const userName = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    let res = [];
    if (userName && password) {
      const sql = `select id from admin_user where user_name = '${userName}' and password= md5(${password})`;
      res = await this.app.mysql.query(sql);
    }
    if (res.length) {
      const openId = new Date().getTime();
      this.ctx.session.openId = openId;
      this.ctx.body = {
        data: '登录成功',
        openId,
      };
    } else {
      this.ctx.body = {
        data: '登录失败',
      };
    }
  }

  async getTypeInfo() {
    const typeInfo = await this.app.mysql.select('blog_type');
    this.ctx.body = {
      data: JSON.stringify(typeInfo),
    };
  }

  // 增加文章
  async addArticle() {
    const postData = this.ctx.request.body;
    const res = await this.app.mysql.insert('blog_article', postData);
    if (res) {
      this.ctx.body = {
        isSuccess: !!res.affectedRows, // 影响行数存在 即插入成功
        articleId: res.insertId, // 返回id即可
      };
    }
  }

  // 修改文章
  async updateArticle() {
    const postData = this.ctx.request.body;
    const res = await this.app.mysql.update('blog_article', postData);
    this.ctx.body = {
      isSuccess: !!res.affectedRows,
    };
  }

  // 获取文章列表
  async getArticleList() {
    const sql = `SELECT blog_article.id AS id, blog_article.title AS title, blog_article.article_content AS content, blog_article.introduce AS introduce,FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%I:%S') AS addTime, blog_article.view_count AS view_count,blog_type.typeName AS typeName  from blog_article left join blog_type on blog_article.type_id = blog_type.id ORDER BY blog_article.id DESC
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 删除文章通过文章id
  async delArticleById() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('blog_article', { id });
    if (res && res.affectedRows) {
      this.ctx.body = {
        success: true,
      };
    } else {
      this.ctx.body = {
        success: false,
        error: res,
      };
    }
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    if (!id || id !== parseInt(id, 10)) {
      this.ctx.body = {
        data: {},
      };
    }
    const sql = `SELECT blog_article.id AS id, blog_article.title AS title, blog_article.article_content AS content, blog_article.introduce AS introduce,FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%I:%S') AS addTime, blog_article.view_count AS view_count,blog_type.typeName AS typeName, blog_type.id AS typeId from blog_article left join blog_type on blog_article.type_id = blog_type.id WHERE blog_article.id = ${id}
    `;

    const res = await this.app.mysql.query(sql);
    if (res && res.length) {
      this.ctx.body = {
        data: res[0],
      };
    } else {
      this.ctx.body = {
        data: {},
      };
    }

  }
}

module.exports = AdminController;
