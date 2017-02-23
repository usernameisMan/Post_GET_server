function NewsList(){
    this.getPageNumber = function(num){
        //一个参数,多少文章一页
        return 1;
    }
    this.getPages=function(start,end){
        //取出多ID为多少开始到结束的,的新闻内容
    }
}
var newsList=new NewsList();
exports.NewsList = newsList;