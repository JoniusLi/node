function mongodbModel(dbname,dataform) {
  var MongoClient;
  var DB_CONN_STR;
  this.init = function() {
      MongoClient = require('mongodb').MongoClient;
      DB_CONN_STR = 'mongodb://localhost:27017/' + dbname;
  }
  /*这里是插入数据*/
  this.insert = function(data,callback) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log('连接成功')
      var collection = db.collection(dataform);
      collection.insert(data, function(err,result){
        callback(err,result);
      })
    })
  }
  /*这里是删除数据*/
  this.remove = function(data,callback){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log('连接成功')
      var collection = db.collection(dataform);
      collection.remove(data, function(err,result){
        callback(err,result);
      })
    })
  }
  /*这里是修改*/
  this.update=function(data,updata,callback){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log('连接成功')
      var collection = db.collection(dataform);
      collection.update(data,updata,function(err,data){
        callback(err,data);
      })
    })
  }
  /*这里是查询*/
  this.find=function(data,callback){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log('连接成功')
      var collection = db.collection(dataform);
      collection.find(data).toArray(function(err,data){
        callback(err,data);
      })
    })
  }
}
module.exports = mongodbModel;