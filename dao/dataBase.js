var SQLs = require('./SQLs');
var mysql = require('mysql');

//创建一个connection 
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    port:'3306'
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
function getData(){

}
//插入数据
function insertData(){

}
//设置数据
function setData(){

}