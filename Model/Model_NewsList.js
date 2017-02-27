const  db=require('../dao/dataBase');
const  rp=require('../bin/responseOBJ');
const querystring = require('querystring');
function NewsList(){
    this.parse=(page,urlquery)=>{
        db.Custom('select count(*) from newslist',urlquery,(rows,urlquery)=>{
            console.log("rows:"+rows[0]['count(*)']);
            global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
            global.response.write(JSON.stringify(rows));
            global.response.end();                   
         });
         
    }
}
var newsList=new NewsList();
exports.parse = newsList.parse;