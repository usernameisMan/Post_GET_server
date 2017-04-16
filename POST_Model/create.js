const db = require('../dao/dataBase');
exports.create =function(json){
    if(json.title){
        var sql="INSERT INTO newslist (title,date,description,descriptionIMG,content) VALUES ('"+json.title+"','"+new Date().toLocaleString()+"','"+json.intro+"','"+json.img+"','"+json.content.replace(/'/g,'"')+"')";
        db.Custom(sql,null,(rows,urlquery)=>{
            global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
            global.response.end(JSON.stringify({id:'创建成功'}));
         });
    }else{
            global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
            global.response.end(JSON.stringify({id:'不要为空'}));
    }
}
