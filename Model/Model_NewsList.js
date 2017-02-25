const  db=require('../dao/dataBase') 
function NewsList(){
    this.getPageNumber = (num)=>{
        //一个参数,多少文章一页
        //返回总共页数
         var allList=db.Custom('select count(*) from newslist')[0]['count(*)'];
         return;
    }
    this.getPages=(start,end)=>{
        //取出多ID为多少开始到结束的,的新闻内容
    }
    this.parse=(page,urlquery)=>{
        var json={};
      getPageNumber(urlquery.pages);
         return 1;
    }

}
var newsList=new NewsList();
exports.parse = newsList.parse;