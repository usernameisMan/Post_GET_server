document.addEventListener("DOMContentLoaded",function(){
	
},false);
window.onload=function(){
	var btu=document.querySelector("#login");
	btu.addEventListener('click',function(){
		login();
	});
}

function login(){
	var pw=document.querySelector("#password");
	 $.ajax({
		url: "http://127.0.0.1:8888/",
		method:'POST',
        dataType: "json",
        data:{
			password:pw.value||null,
			DDtype:'loginPassWord'
		}	
	 })
	 .done(function(data){
		pageData = data;
		if(pageData=='true'){
			alert('密钥验证成功');
		window.location='./aSystem.html';
		}else{
			alert('密钥验证失败');
			pw.value='';
		}
	 })
	 .fail(function(xhr){
		window.location='./pageNotFound.html';
	 });
}
