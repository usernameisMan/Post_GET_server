const db = require('../dao/dataBase')
function NewsContent(){
    this.parse=(page,urlquery)=>{
        db.getData(urlquery.pageID,(rows)=>{
            var json={
                'content':rows[0]
            };
                global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                global.response.write(JSON.stringify(json));
                global.response.end();
        })
    }
}
var newsContent=new NewsContent();
exports.parse = newsContent.parse;