const  http = require('http');
const  url  = require('url');
const  URLParse = require('./URLParse');
const  pageNames = require('./pageName');
const  accessLog = require('./accessLog');
const  querystring = require('querystring');
const  DD = require('../dao/DealData');


function startServer(serCon){
    http.createServer(function(request,response){
        if(request.method=='GET'){
                        global.response=response;
                        var urlObj = url.parse(request.url);//获取URL参数字符串
                        var urlquery=querystring.parse(urlObj.query);//把字符串转换成对象
                        var pageName = URLParse.StartParse(urlObj); //拿到请求的页面
                        accessLog.start(request,serCon.accessLogPath,pageName);//open log
                        if(ispage(pageName)){
                            //确认页面存在根据页面名找数据
                            getData(pageName,urlquery);
                        }else{
                            response.writeHead(404,{'Access-Control-Allow-Origin':'*'});
                            response.end();
                        }
            }else if(request.method=='POST'){
                var post = ''; 
                request.on('data',function(chunk){
                    post += chunk;
                });
                request.on('end',function(data){
                        //确认页面存在根据页面名找数据
                     getData('POST',post);
                });
            }
    }).listen(serCon.port);
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
function getData(page,urlquery){
    DD.Parse(page,urlquery);
}

exports.startServer=startServer;