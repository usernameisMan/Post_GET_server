var SQLs = require('./SQLs');
var mysql = require('mysql');

//创建一个connection 
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    port:'3306',
    database:'t1'
});
//启动链接
connection.connect((err)=>{
    if(err){
         console.log('[query] = '+err);
         return;
        }
     console.log('[connection connect] succeed!') ;
});

//get方法
function getData(id,callback){
    connection.query("select * from newslist where id="+id,function(err,rows,fields){
            if(err) { throw err }
            callback(rows);
    });
}
//插入数据
function insertData(){

}
//设置数据
function setData(){

}
//自定义查询语句
function Custom(str,urlquery,callback){
    var json;
    connection.query(str,function(err,rows,fields){
            if(err) {throw err}
            callback(rows,urlquery);
    });
}

exports.Custom=Custom;
exports.setData=setData;
exports.insertData=insertData;
exports.getData=getData;