const  fs   = require('fs');
//request 对象  log位置 访问位置
function start(request,wirtePath,pageName){
    var mes = "[访问者:"+request.connection.remoteAddress.toString().split(':')[3]+"访问页面:"+pageName+"]\r\n";
    console.log(mes);
    fs.appendFile(wirtePath,mes, (err)=>{
     if (err) throw err;
    });
}

exports.start = start;