const NewsList=require('../Model/Model_NewsList');
const NewsContent = require('../Model/Model_NewsContent');
const NewsContentAdmin = require('../Model/NewsContentAdmin')
function DD(){
        this.Parse=function(page,urlquery){
            //返回页面刷新请求的初始化数据
            console.log(page);
            switch(page)
            {
            case 'NewsList.html':
                return NewsList.parse(page,urlquery);
            break;
            case 'NewsContent.html':
                return NewsContent.parse(page,urlquery);
            break;
            case 'NewsContentAdmin.html':
                return NewsContentAdmin.parse(page,urlquery);
            break;
            case 'POST':
                return NewsContent.parse(urlquery);
            break;
            }               
        }
}
var dd=new DD();
exports.Parse=dd.Parse;

/*
    桥接db和server,并且起调用业务对象和包装数据的作用
    {
        页面名称=》业务对象,
        数据对象-》干什么和相关的数据，
     }
*/