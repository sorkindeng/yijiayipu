var KoaRouter=require('koa-router')
var Auth=require('../controllers/authentication.controller')
var Home=require('../controllers/home.controller')
var Gallery = require('../controllers/gallery.controller');

const router = new KoaRouter();

const authCtrl = new Auth();
const homeCtrl = new Home();
const galleryCtrl = new Gallery();

router.get('/',       homeCtrl.indexAction)
      .get('/gallery',            galleryCtrl.indexAction)
      .get('/gallery/list',       authCtrl.validate,  galleryCtrl.listAction)
      .post('/gallery/access',    galleryCtrl.accessAction)
      



/*      .get('/login',      userCtrl.loginAction)
      .get('/user/id',    userCtrl.getIdAction)
      .get('/user/new/',  userCtrl.newAction)
      .get('/user/create/:id', userCtrl.createAction)
      .get('/user/follower',   userCtrl.followerAction)
*/

module.exports = router