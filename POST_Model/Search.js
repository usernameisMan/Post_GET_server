const db = require('../dao/dataBase');
exports.Search =function(json){
            console.log(json.title)
            if(json.title!=" "||json.title!=""){
            var sql="SELECT * FROM newslist WHERE title Like '%"+json.title.replace(/'/g,'"')+"%'";
                db.Custom(sql,null,(rows,urlquery)=>{
                    global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                    console.log(rows[0])
                    global.response.end(JSON.stringify(rows));
                });
            }else{
                    global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                    global.response.end(JSON.stringify([]));               
            }
}
