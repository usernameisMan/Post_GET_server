function NewsList(){
    this.getPageNumber = (num)=>{
        //一个参数,多少文章一页
        return 1;
    }
    this.getPages=(start,end)=>{
        //取出多ID为多少开始到结束的,的新闻内容
    }
    this.parse=(page,urlquery)=>{

    }

}
var newsList=new NewsList();
exports.parse = newsList.parse;