const  http = require('http');
const  fs   = require('fs');
const  url  = require('url');
const  URLParse = require('./URLParse');
const  pageNames = require('./pageName');
const  accessLog = require('./accessLog');
const  querystring = require('querystring');
const  DD = require('../dao/DealData');

function startServer(serCon){
    http.createServer(function(request,response){
        global.response=response;


        if(request.method=='GET'){
                        var urlObj = url.parse(request.url);//获取URL参数字符串
                        var urlquery=querystring.parse(urlObj.query);//把字符串转换成对象
                        var pageName = URLParse.StartParse(urlObj); //拿到请求的页面最后的名字
                        accessLog.start(request,serCon.accessLogPath,pageName.PageName);//open log
                        if(ispage(pageName.PageName)){
                            //确认页面存在根据页面名找数据
                            getData(pageName.PageName,urlquery);
                        }else{
                                var res='';
                                var str , dir;
                                dir=Find_ALL_Directory_file("tmp/News_List_to_server_test01",pageName.PageName);
                                if(typeof dir == "string"){
                                    str=fs.readFileSync(dir);
                                    response.writeHead(200,{'Access-Control-Allow-Origin':'*'});
                                    response.end(str);  
                                }else{
                                    str=fs.readFileSync("./tmp/News_List_to_server_test01/pageNotFound.html");
                                    response.writeHead(200,{'Access-Control-Allow-Origin':'*'});
                                    response.end(str);                                      
                                }
                    
                        }
        }else if(request.method=='POST'){
            var post = [],size=0; 
            
            request.on('data',function(chunk){
                post.push(chunk);
                size+=chunk.length;            
            });
            request.on('end',function(data){
                var urlObj = url.parse(request.url);//获取URL参数字符串
                var urlquery=querystring.parse(urlObj.query);//把字符串转换成对象

                if(urlquery['dir']=='image'){
                    imgParse(post,size);
                }else{
                    var buffer = Buffer.concat(post , size);//把post数组转换成buffer
                    var conOBJ = buffer.toString();//把buffer转换成字符串
                    POSTOBJ=querystring.parse(conOBJ);//把字符串形式的buffer转换成node 的 json 对象
                    getData('POST',POSTOBJ);
                } 
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

function Find_ALL_Directory_file(Folder,target){
    /*端口目录文件 下开始得文件夹Folder
    *要找的文件 target 带上后缀
    *最后会返回一个undefined
    */
    var File_list=fs.readdirSync(Folder);
    for(var i in File_list){
        if(File_list[i]==target){
            str = "./"+Folder+"/"+File_list[i];
            return str;
        }else if(fs.lstatSync(Folder+"/"+File_list[i]).isDirectory()){
            str = Find_ALL_Directory_file(Folder+"/"+File_list[i],target);
            if(str){ return str;}
        }
    }
}

function imgParse(chunks,size){
    var buffer = Buffer.concat(chunks , size);
    if(!size){
        response.writeHead(404);
        response.end('');
        return;
    }
    var rems = [];
    //根据\r\n(换行)分离数据和报头
    for(var i=0;i<buffer.length;i++){ 
        var v = buffer[i];
        var v2 = buffer[i+1];
        if(v==13 && v2==10){
            rems.push(i);
        }
    }

    //图片信息第几行的第几 具体看具体buffer数据
    var picmsg_1 = buffer.slice(rems[4],rems[5]).toString();
    var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];
    //图片数据息第几行的第几
    var nbuf = buffer.slice(rems[7]+2,rems[rems.length-2]);

    //  //图片信息
    // var picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();
    // var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];
    // console.log(filename);
    // //图片数据
    // var nbuf = buffer.slice(rems[3]+2,rems[rems.length-2]);   

    var path = './tmp/News_List_to_server_test01/upload/'+filename;
    fs.writeFileSync(path , nbuf);
    console.log("保存"+filename+"成功");

    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8',"Access-Control-Allow-Origin":"*"});
    response.end(JSON.stringify({"error":0,"url":path}));
}

exports.startServer=startServer;