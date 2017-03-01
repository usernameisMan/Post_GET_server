const db = require('../dao/dataBase')
exports.password = function(pass){

    db.Custom('',urlquery,(rows,urlquery)=>{          
        global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
        global.response.write(JSON.stringify(json));
        global.response.end();
    });

}