const db = require('../dao/dataBase');
exports.del =function(json){
    if(json.id){
        var sql="DELETE FROM newslist WHERE id = "+json.id;
        db.Custom(sql,null,(rows,urlquery)=>{
            global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
            global.response.end(JSON.stringify({id:null}));
         });
    }else{
        console.log();
        for(var i=0;i<json['ids[]'].length;i++){
            var sql="DELETE FROM newslist WHERE id = "+json['ids[]'][i];
            db.Custom(sql,null,(rows,urlquery)=>{
                global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                global.response.end(JSON.stringify({id:null}));
            });           
        }
    }
}
