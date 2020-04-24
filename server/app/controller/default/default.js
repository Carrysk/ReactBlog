'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async index() {

    const { ctx } = this;
    const result = await this.app.mysql.get('blog_content', {});
    ctx.body = JSON.stringify(result);
  }

  async getArticleList() {
    const sql = `SELECT blog_article.id AS id, blog_article.title AS title, blog_article.article_content AS content, blog_article.introduce AS introduce,FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%I:%S') AS addTime, blog_article.view_count AS view_count,blog_type.typeName AS typeName  from blog_article left join blog_type on blog_article.type_id = blog_type.id
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = `SELECT 
        blog_article.id AS id, 
        blog_article.title AS title,
        blog_article.article_content AS content, 
        blog_article.introduce AS introduce,
        FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%I:%S') AS addTime,
        blog_article.view_count AS view_count,
        blog_type.typeName AS typeName,
        blog_type.id as typeId
        FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.id
        WHERE blog_article.id= ${id}`;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result[0] };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('blog_type');
    this.ctx.body = { data: result };
  }


  async getAritcleListById() {
    const id = this.ctx.params.id;
    const sql = `SELECT blog_article.id AS id, blog_article.title AS title, blog_article.article_content AS content, blog_article.introduce AS introduce,FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%I:%S') AS addTime, blog_article.view_count AS view_count,blog_type.typeName AS typeName  from blog_article left join blog_type on blog_article.type_id = blog_type.id WHERE blog_type.id = ${id}`;
    const getTypeNameSql = `SELECT id, typeName FROM blog_type WHERE id = ${id}`;
    const result = await this.app.mysql.query(sql);
    const type = await this.app.mysql.query(getTypeNameSql);
    let resType = { id: undefined, typeName: undefined };
    if (type && type.length) {
      resType = type[0];
    }
    this.ctx.body = { data: result, typeAbout: resType };
  }
}

module.exports = DefaultController;
