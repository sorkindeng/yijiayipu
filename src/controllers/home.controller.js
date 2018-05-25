

module.exports = class {
  async indexAction(ctx){
    console.log('home.controller.js indexAction.')
    await ctx.render('index');
  }
}
