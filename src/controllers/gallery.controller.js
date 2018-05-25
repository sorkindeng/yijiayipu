const AV = require('leancloud-storage');

module.exports = class {
  /////////////////////////////////////////////////////////////////////////////
async indexAction(ctx){


  await ctx.render('access-logon');
}
/////////////////////////////////////////////////////////////////////////////
async accessAction(ctx){
  let  accessCode = ctx.request.body.accesscode
  console.log('accessCode=', accessCode);

  let query =  new AV.Query('Group');
  query.equalTo('accessCode', accessCode);
  let ret = await query.first();
  if (ret){
    let groupId = ret.id || ret.objectId || ret.get('objectId');
    let groupName = ret.get('groupName') || '';
    
    ctx.session.user = {
      username: 'username',
      userid: '1001',
      groupId: groupId,
      groupName: groupName
    }
  
    return ctx.redirect('/gallery/list');  
  }else{
    return ctx.redirect('/gallery'); 
  }
  
}
///////////////////////////////////////////////////////////////////////////////
async listAction(ctx){
  let groupId = ctx.session.user.groupId;
  let groupName = ctx.session.user.groupName ;
  let imgArray = new Array();
  let group = AV.Object.createWithoutData('Group', groupId);
  let query = new AV.Query('Gallery');
  query.equalTo('group', group);
  let rets = await query.find();
  console.log('query.find rets.length', rets.length);
  //console.log(rets);
  for(let item of rets){
    let pic={};
    pic.thumbnailURL = item.get('thumbnailURL');
    pic.fullURL = item.get('fullURL') ||  pic.thumbnailURL ;
    pic.url = item.get('url') || pic.thumbnailURL ;
    imgArray.push(pic);
  }
  //console.log(imgArray);

  await ctx.render('gallery',{
    title: '群相册',
    albumName: groupName + ' 群相册',
    imgArray: imgArray
  });
}


}
