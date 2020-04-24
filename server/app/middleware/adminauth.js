'use strict';

module.exports = options => {
  return async function adminauth(ctx, next) {
    if (ctx && ctx.session && ctx.session.openId) {
      await next();
    } else {
      ctx.body = { success: false, errorMessage: '请先登录' };
    }
  };
};
