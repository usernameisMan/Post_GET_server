var http = require('http');
var fs = require('fs');

http.createServer(function(req , res){
console.log(req.url.split("/"));
var imaps = req.url.split("?");
    imaps=imaps[0].split("/");
    var maps = [];
    imaps.forEach(function(m){
        if(m){maps.push(m)}
    });
    
    switch (maps[0]||"index"){
        case "index":
            var str = fs.readFileSync("./index.html");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str , "utf-8");
            break;

        case "upl":
            var str = fs.readFileSync("./upload.html");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str , "utf-8");
            break;

        case "upload":
            console.log("upload");
            break;

        default :
            var path = maps.join("/");
            var value = "";
            var filename = maps[maps.length-1];
            var checkReg = /^.+.(gif|png|jpg|css|js)+$/;
            if(maps[0]=="databox"){
                checkReg = /.*/
            }
            if(checkReg.test(filename)){
                try{
                    value = fs.readFileSync(path);
                }catch(e){
                    console.log("报错:"+e)
                }
            }
            
            if(value){
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8',"Access-Control-Allow-Origin":"*"});
                res.end(value);
            }else {
                res.writeHead(404);
                res.end('');
            }
            break;
    }

var chunks = [];
var size = 0;
req.on('data' , function(chunk){
    chunks.push(chunk);
    size+=chunk.length;
});

req.on("end",function(){
    var buffer = Buffer.concat(chunks , size);
    if(!size){
        res.writeHead(404);
        res.end('');
        return;
    }
    var rems = [];
    //根据\r\n分离数据和报头
    for(var i=0;i<buffer.length;i++){
        var v = buffer[i];
        var v2 = buffer[i+1];
        if(v==13 && v2==10){
            rems.push(i);
        }
    }

    //图片信息
    var picmsg_1 = buffer.slice(rems[4],rems[5]).toString();
    var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];
    //图片数据
    var nbuf = buffer.slice(rems[7]+2,rems[rems.length-2]);

    //  //图片信息
    // var picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();
    // var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];
    // console.log(filename);
    // //图片数据
    // var nbuf = buffer.slice(rems[3]+2,rems[rems.length-2]);   

    var path = '../upload/'+filename;
    fs.writeFileSync(path , nbuf);
    console.log("保存"+filename+"成功");

    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8',"Access-Control-Allow-Origin":"*"});
    res.end(path);
    
});

}).listen(9010);
