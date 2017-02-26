const  db=require('../dao/dataBase') 
function NewsList(){

    this.parse=(page,urlquery)=>{
         db.Custom('select count(*) from newslist',urlquery,(rows)=>{
            urlquery.pages
            console.log("rows:"+rows[0]['count(*)']);
         });
    }

}
var newsList=new NewsList();
exports.parse = newsList.parse;