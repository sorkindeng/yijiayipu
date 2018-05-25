

function ssleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

var queryString = require('querystring'); 


module.exports = class {
//////////////////////////////////////////////////////////////////////////////////////////
  async newAction(ctx){
    let username = 'Tom';
    let password = 'cat!@#123';

    if(ctx.request.querystring){
      console.log("ctx.request.querystring>>>>" + ctx.request.querystring  );
      var params = queryString.parse(ctx.request.querystring);  
      //let page = params.page;
      username = params.username;
      password = '111111';
    }
    ctx.body = 'user newww';
    
    // 新建 AVUser 对象实例
    var user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    //user.setEmail('tom@leancloud.cn');

    await user.signUp()
        .then(function (loginedUser) {
            console.log(loginedUser);
            console.log('AV.User new signUp success userid=================='+loginedUser.id);

            ctx.body = `AV.User(${username}) new signUp success`;
          }, function (error) {
            console.log('user new error==================');
            console.log(error);

            ctx.body = 'AV.User new signUp error';
        });
  }
//////////////////////////////////////////////////////////////////////////////////////////
  async loginAction(ctx){
    let tmpBody = 'loginAction';
    await AV.User.logIn('Tom', 'cat!@#123')
        .then(function (loginedUser) {
          console.log(loginedUser);
          var name = loginedUser.getUsername();
          var email = loginedUser.getEmail();
          console.log('AV.User.logIn success userid=================='+loginedUser.id);
          //ctx.res.saveCurrentUser(loginedUser);
          //ctx.res.send();

          tmpBody = 'login success, userid=' + loginedUser.id;
        }, function (error) {
          console.log('AV.User.logIn error==================');
          console.log(error);
          tmpBody = 'login error!'
        });

    //ctx.body = tmpBody;
    ctx.response.body = tmpBody;
  }
//////////////////////////////////////////////////////////////////////////////////////////
  async getIdAction(ctx){
    var currentUser = ctx.req.currentUser;
    if (currentUser) {
      console.log('getIdAction====' + currentUser.id);
    }
    else {
      //currentUser 为空时，可打开用户注册界面…
      console.log('getIdAction, userid不存在，需要用户登录或者注册！');
    }


    ctx.body = 'getIdAction';    
  }
//////////////////////////////////////////////////////////////////////////////////////////
async followerAction(ctx){
  console.log('followerAction...');
  let userid='';
  var query = new AV.Query('_User');
  //await query.get('5a94bae79f54544d6d62a70b')
  query.equalTo('username', 'deng');
  await query.first()
        .then(function (findUser) {
          if(findUser){
            console.log('find user(deng) result,id='+ findUser.id );
            userid=findUser.id;
          }

        }, function (error) {
          console.log('find user(deng) error');
          console.log(error);
        });
  if (userid){
    var loginedUser = await AV.User.logIn('Tom', 'cat!@#123')
    if(loginedUser){
      await loginedUser.follow(userid)
      .then(function(){
        console.log('关注成功')
      }, function(err){
        console.log('关注失败')
        console.dir(err);
      });
    }


  }

  ctx.body = 'followerAction';    
}
// async followerAction(ctx){
  //   let userid='';
  //   var query = new AV.Query('_User');
  //   query.lessThan('username', 'deng');
  //   query.find()
  //         .then(function (findUser) {
  //           console.log('find user(deng) result, userid='+ finduser.id );
  //           userid=finduer.id;

  //         }, function (error) {
  //           console.log('find user(deng) error');
  //           console.log(error);
  //         });

  //   AV.User.current().follow(userid).then(function(){
  //     console.log('关注成功')
  //   }, function(err){
  //     console.log('关注失败')
  //     console.dir(err);
  //   });
  // }

//////////////////////////////////////////////////////////////////////////////////////////
async createAction(ctx){
  console.log(ctx.params.id );
  ctx.body = 'create index';
}

}
