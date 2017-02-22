const  http = require('http');
const  url  = require('url');
const  URLParse = require('./URLParse');
const  pageNames = require('./pageName');
const  accessLog = require('./accessLog');
const  querystring = require('querystring');
const dataBase = requery('../dao/dataBase');

function startServer(serCon){
    http.createServer(function(request,response){
            var urlObj = url.parse(request.url);
            var urlquery=querystring.parse(urlObj.query);
            var pageName = URLParse.StartParse(urlObj); //拿到请求的页面
            accessLog.start(request,serCon.accessLogPath,pageName);//open log 
             if(ispage(pageName)){
                 //确认页面存在根据页面名找数据
                getData(pageName,urlquery.pageID);
             }else{
                response.writeHead(404,{'Access-Control-Allow-Origin':'*'});
                response.end();
             }
            response.writeHead(200,{'Access-Control-Allow-Origin':'*'});
            response.end();
    }).listen(serCon.port)
}

//看看权限数组里面又没有
function ispage(pageName){ 
    for(var i=0;i<pageNames.pageNumber;i++){
        if(pageNames.List[i]==pageName){
            return true;
        }
    }
}

//传入数据处理对象
function getData(page,pageID){
    console.log("OK")
}

exports.startServer=startServer;