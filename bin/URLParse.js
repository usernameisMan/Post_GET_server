
function StartParse(url){
    var urlArry=url.pathname.toString().split('/');
    return urlArry[urlArry.length-1];
}
exports.StartParse= StartParse;