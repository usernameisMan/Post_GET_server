const NewsList=require('../Model/Model_NewsList')
function DD(){
        this.Parse=function(page,urlquery){
            switch(page)
            {
            case 'NewsList':
            
            break;
            case 2:
            
            break;
            default:
            
            }               
        }
}
var dd=new DD();
exports.init=dd.init;

/*
    桥接db和server,并且起调用业务对象和包装数据的作用
    {
        页面名称=》业务对象,
        数据对象-》干什么和相关的数据，
     }
*/