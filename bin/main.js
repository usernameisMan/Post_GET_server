/*
mian.js
用于加载配置信息
*/
const  fs   = require('fs');
const  URLParse = require('./URLParse');
const  pageName = require('./pageName');
const  server = require('./server');
//read Server Config
const config= '../conf/conf.json'
const serCon = JSON.parse(fs.readFileSync(config,'utf-8'));



function main(serCon){
    console.log('服务器端口号:'+serCon.port+'\n');
    console.log('有请求权限页面数:'+pageName.pageNumber+"\n");
    server.startServer(serCon);
}

main(serCon); //服务器配置文件的路径

