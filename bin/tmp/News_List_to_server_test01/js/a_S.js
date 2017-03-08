document.addEventListener("DOMContentLoaded",function(){

},false);
window.onload=function(){
	mainMenu();  	
	setSave();
}


function mainMenu(){
	var btu=document.querySelector(".as_c_menu");
	btu.addEventListener('click',function(event){
	    var eve = event || window.event;//浏览器用ev.target，IE浏览器用event.srcElement  
		var obj=eve.target||eve.srcElement;//获取到了事件源  
		obj.style.backgroundSize="45% 100%"
		var btu=document.querySelector(".as_c_menu");
		var btus=btu.getElementsByTagName('a');
		for(i=0;i<btus.length;i++){
			console.log(btus[i].dataset.name+"+"+obj.dataset.name)
			if((btus[i].dataset.name)!=(obj.dataset.name)){
				btus[i].style.backgroundSize="30% 100%"
			}
		}
	});	
}

function setSave(){
		document.querySelector('#setSave').addEventListener('click',function(){
			var title = document.querySelector('#set_h').value;
			var intro = document.querySelector('#set_f').value;
			var img = document.querySelector('#set_img').value;
			var content= document.querySelector('.ke-edit-iframe').contentWindow.document.querySelector('.ke-content').innerHTML;
			endServer({
				title:title,
				intro:intro,
				img:img,
				content:content,
				DDtype:'setContent'
			});
		});
}


function endServer(json){
	 $.ajax({
		url: "http://127.0.0.1:8888/",
		method:'POST',
        dataType: "json",
        data:json
	 })
	 .done(function(data){
		pageData = data;
	 })
	 .fail(function(xhr){
		window.location='./pageNotFound.html';
	 });	
}