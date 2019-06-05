var mongodb=require("mongodb");
var MongoClient=mongodb.MongoClient;
module.exports.add = function(){
	
}
var connStr="mongodb://127.0.0.1:27017/product";
//连接数据库
function _connect(callBack){
	var dbname="product"
    MongoClient.connect(connStr,function(err,client){
        if(err){
            console.log("失败");
        }else{
            //指定数据库的名字"dbname"
            var db=client.db(dbname);
            callBack(db);
        }
    })
}


/***********************插入*******************************/
//插入一条记录
module.exports.insertOne=function(collection,obj,callBack){
    _connect(function(db){
        db.collection(collection).insertOne(obj,function(err,results){
            callBack(err,results);
        })
    })
}
//插入多条记录
/*
* collection:插入的集合，
* arr:插入的文档
* callBack:回调函数。通过该函数返回执行的结果*/
module.exports.insertMany=function(collection,arr,callBack){
    _connect(function(db){
        db.collection(collection).insertMany(arr,function(err,results){
            callBack(err,results);
        })
    })
}
/*********************查找**********************************/
//根据条件查找记录数
module.exports.count=function(collection,whereObj,callBack){
    _connect(function(db){
        db.collection(collection).count(whereObj).then(function(count){
            callBack(count);
        })
    })

}
/*查找
* collection：集合
* obj:
*   whereObj:条件，默认是{}
*   sortObj:排序，默认是{}
*   limit:显示提定条数,默认是0
*   skip:跳过指定条数，默认是0*/
module.exports.find=function(collection,obj,callBack){
    //如果有条件，将条件赋值给obj.whereObj,没有传条件默认为{}
    obj.whereObj=obj.whereObj||{};
    obj.sortObj=obj.sortObj||{};
    obj.limit=obj.limit||0;
    obj.skip=obj.skip||0;
    _connect(function(db){
        db.collection(collection)
            .find(obj.whereObj)
            .sort(obj.sortObj)
            .limit(obj.limit)
            .skip(obj.skip)
            .toArray(function(err,results){
            callBack(err,results);
        })
    })
}
/*
* 查找一条记录*/
module.exports.findOne=function(collection,whereObj,callBack){
    _connect(function(db) {
        db.collection(collection).findOne(obj, function (err, results) {
            callBack(err, results);
        });
    });
}
//根据ID来查找记录
module.exports.findOneById=function(collection,id,callBack){
    _connect(function(db) {
        db.collection(collection).findOne({_id: mongodb.ObjectId(id)}, function (err, results) {
            callBack(err, results);
        });
    });
}
/*********************修改******************************************/
//根据ID修改一条记录
module.exports.updateOneById=function(collection,id,upObj,callBack){
    _connect(function(db) {
        db.collection(collection).updateOne({_id:mongodb.ObjectId(id)}, upObj, function (err, results) {
            callBack(err, results);
        })
    });
}
//修改一条记录
module.exports.updateOne=function(collection,whereObj,upObj,callBack){
    _connect(function(db) {
        db.collection(collection).updateOne(whereObj, upObj, function (err, results) {
            callBack(err, results);
        })
    });
}
//修改多条记录
module.exports.updateMany=function(collection,whereObj,upObj,callBack){
    db.collection(collection).updateMany(whereObj,upObj,function(err,results){
        callBack(err,results);
    })
}
/**********************删除**************************************/
//根据ID来删除一条记录
module.exports.deleteOneById=function(collection,id,callBack){
    _connect(function(db) {
        db.collection(collection).deleteOne({_id: mongodb.ObjectId(id)}, function (err, results) {
            callBack(err, results);
        })
    });
}
//删除一条记录
module.exports.deleteOne=function(collection,whereObj,callBack){
    _connect(function(db) {
        db.collection(collection).deleteOne(whereObj, function (err, results) {
            callBack(err, results);
        })
    });
}
//删除多条记录
module.exports.deleteMany=function(collection,whereObj,callBack){
    _connect(function(db) {
        db.collection(collection).deleteMany(whereObj, function (err, results) {
            callBack(err, results);
        })
    });
}






/*使用方法 注意 和上面代码类似 不是相同的
 * //先包含进来
var MongoDB = require('./mongodb');
 
//查询一条数据
MongoDB.findOne('user_info', {_id: user_id}, function (err, res) {
  console.log(res);
});
 
//查询多条数据
MongoDB.find('user_info', {type: 1}, {}, function (err, res) {
  console.log(res);
});
 
//更新数据并返回结果集合
MongoDB.updateData('user_info', {_id: user_info._id}, {$set: update_data}, function(err, user_info) {
   callback(null, user_info);
});
 
//删除数据
MongoDB.remove('user_data', {user_id: 1});
 */