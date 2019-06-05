var mongodbModel = require('./mongodbModel');
var mongodbObject = new mongodbModel('seraph','singer');
mongodbObject.init();
 
/*这里是插入*/
mongodbObject.insert({name:'啊xx'},function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})
 
/*这是删除*/
mongodbObject.remove({name:'啊xiao'},function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log('成功删除指定数据');
  }
})
 
/*这里是修改*/
mongodbObject.update({name:'小李'},{$set:{name:'小勇'}},function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})
 
/*这里是条件查询*/
mongodbObject.find({name:'李洛克'},function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})