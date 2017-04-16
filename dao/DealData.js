const NewsList=require('../Model/Model_NewsList');
const Content = require('../Model/Model_NewsContent');
const NewsContentAdmin = require('../Model/NewsContentAdmin');
const pw = require('../POST_Model/pw')
const fs = require('fs');
const Alist = require('../POST_Model/a_List');
const set_content = require('../POST_Model/set_content');
const create = require('../POST_Model/create');
const del = require('../POST_Model/del');
const Search = require('../POST_Model/Search');
function DD(){
        this.Parse=function(page,urlquery){
            //返回页面刷新请求的初始化数据
            console.log(page);
            switch(page)
            {
            case 'NewsList.html':
                console.log("OK! NewsList");
                NewsList.parse(page,urlquery);
            break;
            case 'content.html':
                console.log("OK! content");
                Content.parse(page,urlquery);
            break;
            case 'NewsContentAdmin.html':
                NewsContentAdmin.parse(page,urlquery);
            break;
            case 'aSystem.html':
                var str = fs.readFileSync("./tmp/News_List_to_server_test01/aSystem.html");
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(str , "utf-8");
            break;
            case 'POST':
                switch(urlquery.DDtype){
                    case'loginPassWord'://登陆
                        pw.password(urlquery);
                    break;
                    case'setContent'://处理内容储存
                        set_content.scon(urlquery);
                    break;
                    case 'aSystem_List_data':
                        Alist.parse(page,urlquery);
                    break;
                    case 'create':
                        create.create(urlquery);
                    break;            
                    case 'delectc':
                        del.del(urlquery);
                    break;
                    case 'Search':
                        Search.Search(urlquery);
                    break;                                               
                 }
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