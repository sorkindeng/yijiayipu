var KoaRouter=require('koa-router')
var home=require('../controller/home')

const router = new KoaRouter();
const homeCtrl = new home();

router.get('/',       homeCtrl.indexAction)
      .get('/abc',    homeCtrl.indexAction)

module.exports = router