const db = require('../dao/dataBase');
exports.scon = (json)=>{
    if(json.title){
        var sql="UPDATE newslist SET title = '"+json.title+"', date = '"+new Date().toLocaleString()+"',description = '"+json.intro+"',descriptionIMG = '"+json.img+"', content = '"+json.content.replace(/'/g,'"')+"' WHERE id ='"+json.id+"'";
        var id = json.id;
        db.Custom(sql,id,(rows,urlquery)=>{
            global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
            global.response.end(JSON.stringify({id:id}));
        });
    }else{
            global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
            global.response.end(JSON.stringify({id:'不要为空'}));
    }
}