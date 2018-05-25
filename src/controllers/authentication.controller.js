// authentication
// 用户 session 鉴权，判断 session.user 是否已登录？ 未登录重定向到登录页面；已登录鉴权通过，next();

module.exports = class {
  /////////////////////////////////////////////////////////////////////////////
async validate(ctx,next){
  console.log('=========================authentication.validate');
  console.log(ctx.session);
  //判断用户是否已经登陆
  if (!ctx.session.user) {     
    return ctx.redirect('/gallery');
  }

  return next();
}
/////
}