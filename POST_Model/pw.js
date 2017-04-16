const db = require('../dao/dataBase');
exports.password = function(pass){
    if(pass['password']!=null){
        db.Custom("select * from pass_word_map where Location = 'login'",pass,(rows,urlquery)=>{
        if(pass['password']!=rows[0].passWord){
                    global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                    global.response.write(JSON.stringify('false'));
                    global.response.end();          
            }else{
                    global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                    global.response.write(JSON.stringify('true'));
                    global.response.end();            
            }
        });
    }else{
                global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                global.response.write(JSON.stringify('false'));
                global.response.end();             
    }
}