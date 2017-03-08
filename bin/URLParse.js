
function StartParse(url){
    var urlArry=url.pathname.toString().split('/');
    return {PageName:urlArry[urlArry.length-1],Folder:urlArry[urlArry.length-2]};
}
exports.StartParse= StartParse;