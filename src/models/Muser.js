const APP_ID = 'hnVQQe0BccOx11v1qNyMgSJ3-gzGzoHsz';
const APP_KEY = '6U0sie3qndINrG3iXBxUuSC2';
var AV = require('leancloud-storage');
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

//const lc_ObjectName = '_User' ;   
// 直接使用 AV.User

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })


module.exports = class {
  async newUser(username, password) {

    // 新建 AVUser 对象实例
    var user = new AV.User();
    username = username || 'Tom2';
    password = password || 'cat!@#123';
    user.setUsername(username);
    user.setPassword(password);
    //user.setEmail('tom@leancloud.cn');
    
    // let loginedUser = await user.signUp();
    // console.log(loginedUser);
    // return true;

    user.signUp().then(function (loginedUser) {
      console.log(loginedUser);
    }, function (error) {
      console.log('error==================');
      console.log(error);
    });

  }
  async login(username, password){
    AV.User.logIn('Tom', 'cat!@#123').then(function (loginedUser) {
      console.log(loginedUser);
      var name = loginedUser.getUsername();
      var email = loginedUser.getEmail();
      // 请注意，密码不会明文存储在云端，因此密码只能重置，不能查看
    }, function (error) {
    });
  }
  getID(){
    var currentUser = AV.User.current();
    if (currentUser) {
       // 跳转到首页
       return currentUser.id;
    }
    else {
       //currentUser 为空时，可打开用户注册界面…
       return null;
    }
  }
}
