document.addEventListener("DOMContentLoaded",function(){

},false);
window.nowPage = 1;
window.nowp_in = 12;
window.onload=function(){
	pushListDat(window.nowPage,window.nowp_in);//向列表Push的数据分页设置
	console.log('Holle-V-Holle-V-Holle-V-Holle-V-Holle-V-Holle-V-');
	mainMenu();
	set_buttom_Save_Event();
	initAnimation();
	up_img_click(document.querySelector('.upbut'));

	document.querySelector('#upl').onload=function(){
		var responseimg=this.contentWindow.document.querySelector('#responseimg').src;
		document.querySelector('#view_img').src=responseimg;
		this.src='upload.html';
	}

	document.querySelector('#allcheck').addEventListener('change',function(){
		var checks=document.querySelector('#Newslist').querySelectorAll('input');
		if(this.checked){
			for (var i=0;i<checks.length;i++){
				checks[i].checked=true;
			}
		}else{
			for (var i=0;i<checks.length;i++){
				checks[i].checked=false;
			}
		}
	});

}

function mainMenu(){/*右边的内容选择按钮*/
	var btu=document.querySelector(".as_c_menu");
	btu.addEventListener('click',function(event){
	    var eve = event || window.event;//浏览器用ev.target，IE浏览器用event.srcElement  
		var obj=eve.target||eve.srcElement;//获取到了事件源  
		obj.style.backgroundSize="45% 100%";
		document.querySelector("."+obj.dataset.name).style.display="block";
		var btu=document.querySelector(".as_c_menu");
		var btus=btu.getElementsByTagName('a');
		for(i=0;i<btus.length;i++){
			if((btus[i].dataset.name)!=(obj.dataset.name)){
				btus[i].style.backgroundSize="30% 100%";
				document.querySelector("."+btus[i].dataset.name).style.display="none";
			}
		}
	});	
}

function set_buttom_Save_Event(){/*给按钮添点击事件*/
		document.querySelector('#setSave').addEventListener('click',function(){
			var title = document.querySelector('#set_h').value;
			var intro = document.querySelector('#set_f').value;
			var img = document.querySelector('#view_img').src;
			var content= document.querySelector('.ke-edit-iframe').contentWindow.document.querySelector('.ke-content').innerHTML;
			var id=document.querySelector('#set_id').value;
			if(id!='create'){
					endServer({
							id:id||null,
							title:title||null,
							intro:intro||null,
							img:img||null,
							content:content||null,
							DDtype:'setContent'
						},function(id){
							alert(id.id+':修改成功');
							if(id.id!='不要为空'){window.location="http://127.0.0.1:8888/aSystem.html"}
						});
				}else{
						endServer({
							id:id||null,
							title:title||null,
							intro:intro||null,
							img:img||null,
							content:content||null,
							DDtype:'create'
						},function(id){
							alert(id.id+':修改成功');
							if(id.id!='不要为空'){window.location="http://127.0.0.1:8888/aSystem.html"}
						});				
				}
			});
}


function endServer(json,callbark){  /*ajax 请求*/
	 $.ajax({
		url: "http://127.0.0.1:8888/",
		method:'POST',
        dataType: "json",
        data:json
	 })
	 .done(function(data){
		pageData = data;
		console.log(pageData)
		callbark(pageData);
	 })
	 .fail(function(xhr){
		window.location='./pageNotFound.html';
	 });	
}

function initAnimation(){ /*初始化的动画*/
	var as_body = document.querySelector(".as_body");
	var style = window.getComputedStyle(as_body);	
	document.querySelector(".box_2").style.display="none";
	document.querySelector(".box_3").style.display="none";
	document.querySelector(".box_4").style.display="none";
	var int=setInterval(function(){
		var newop=parseFloat(style.opacity);
		if(newop<=1){
			as_body.style.opacity=newop+0.1;
		}else{
			setInterval(int);
		}
	},60);
}


function pushListDat(pageID,num){	
	//pageID=1&pages=5
	//DDtype 请求的接口
	var	option={
		pageID:pageID||1,
		pages:num||5,
		DDtype:'aSystem_List_data'
	}
	endServer(option,function(json){
		document.querySelector('#allcheck').checked=false
		window.NEWSLISTCONTENT=json;
		var Newslist=document.querySelector("#Newslist");
		Newslist.innerHTML='';
		for(var index in json.content){
			Newslist.innerHTML=Newslist.innerHTML+'<div class="l_b"><input type="checkbox" name="" id="" value="'+json.content[index].id+'" class="checkbox"/><span class="h">'+json.content[index].title+'</span><span class="date">'+json.content[index].date+'</span><button class="set" onclick="setcontent('+json.content[index].id+')">操作</button><button class="del" onclick="delectc('+json.content[index].id+')">删除</button></div>';
		}
		parsepagenum(json.pnum,window.nowPage);
		parsepagenum(json.pnum,window.nowPage);
	});
}

function setcontent(id){
	if(id!='create'){
		var buttoms = document.querySelectorAll('.as_c_menu a');
		buttoms[1].click();
		for(var i=0;window.NEWSLISTCONTENT.content.length;i++){
			if(window.NEWSLISTCONTENT.content[i].id==id){
				document.querySelector('#set_h').value=window.NEWSLISTCONTENT.content[i].title;
				document.querySelector('#set_f').value=window.NEWSLISTCONTENT.content[i].description;
				document.querySelector('#view_img').src=window.NEWSLISTCONTENT.content[i].descriptionIMG;
				document.querySelector('.ke-edit-iframe').contentWindow.document.querySelector('.ke-content').innerHTML=window.NEWSLISTCONTENT.content[i].content;
				document.querySelector('#set_id').value=window.NEWSLISTCONTENT.content[i].id;
			}
		}
	}else{
		var buttoms = document.querySelectorAll('.as_c_menu a');
		buttoms[1].click();
		document.querySelector('#set_id').value='create';		
	}	
}
function delectcs(){
	var checks=document.querySelector('#Newslist').querySelectorAll('input');
	 var arr=[];
	for(var i=0;i<checks.length;i++){
		if(checks[i].checked==true) arr.push(checks[i].value);
	}
	 delectc(arr)
}
function delectc(id){
	if(typeof id =='number'){
		var r=confirm("是否要删除")
		if (r==true) {
				var option={id:id,DDtype:'delectc'};
				endServer(option,function(json){
					alert('已经删除');
					window.location="http://127.0.0.1:8888/aSystem.html";
				});
			}
	}else{
		var r=confirm("是否要删除")
		if (r==true) {
				var option={ids:id,DDtype:'delectc'};
				endServer(option,function(json){
					alert('已经删除');
					window.location="http://127.0.0.1:8888/aSystem.html";
				});
			}
	}
}

function up_img_click(target,ifr){
		target.addEventListener('click',function(){	
		ifrdata=document.querySelector('#upl').contentWindow.document;
		ifrdata.querySelector("#data").addEventListener('change',function(){
			ifrdata.querySelector('#sub').click();
		});
		ifrdata.querySelector("#data").click();
	});
}


function parsepagenum(data){
	var news_ListBox=document.querySelector('.pagination');
	news_ListBox.innerHTML='';
	for(var i=0;i<=data+1;i++){
		if(i==0){
			if(1==arguments[1]){
				news_ListBox.innerHTML=news_ListBox.innerHTML+"<li class='disabled'><a aria-label='Previous'><span aria-hidden='true'>«</span></a></li>";
			}else{
				news_ListBox.innerHTML=news_ListBox.innerHTML+"<li><a href='javascript:jump("+(arguments[1]-1)+")' aria-label='Previous'><span aria-hidden='true'>«</span></a></li>";
			}
		}else if(i==(data+1)){
			if((i-1)==arguments[1]){
				news_ListBox.innerHTML=news_ListBox.innerHTML+"<li class='disabled' ><a  aria-label='Previous'><span aria-hidden='true'>»</span></a></li>";
			}else{
				news_ListBox.innerHTML=news_ListBox.innerHTML+"<li><a href='javascript:jump("+(parseInt(arguments[1])+1)+")' aria-label='Previous'><span aria-hidden='true'>»</span></a></li>";
			}
		}else{
			if(i==arguments[1]){
				news_ListBox.innerHTML=news_ListBox.innerHTML+"<li class='active'><a href='javascript:jump("+i+")'>"+i+"<span class='sr-only'>(current)</span></a></li>";
			}else{
				news_ListBox.innerHTML=news_ListBox.innerHTML+"<li><a href='javascript:jump("+i+")'>"+i+"</a></li>";
			}
			
		}
		
	}
}

function jump(id){
	window.nowPage=id
	pushListDat(window.nowPage,window.nowp_in);
}