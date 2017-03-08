/*Parse Url Pubclic Module*/
function PublicUtil(){
	this.parseUrl=function(url){
		var jsonObj=[];
		if(url.indexOf('?')>=1){
		 	var urls = url.split('?');
		 	var data= urls[1].split('&');
		 	for(var i=0;i<data.length;i++){
		 		var parameter=data[i].split('=');
		 		jsonObj[parameter[0]]=parameter[1];
		 	}
		 			 	
			return jsonObj;
		}else{
			console.log('没有参数');
			return null;
		}
	};
	
//	this.POSTServer= function(url,jsonObj){
//	    $.ajax({
//	        type: "POST",
//	        url: url,
//	        contentType: "application/json",
//	        dataType: "json",
//	        data: JSON.stringify(jsonObj),
//	        success: function (data) {
//	            return data;
//	        },
//	        error: function (err) {
//	            return err;
//	        }
//	    });		
//	};
}



var publicUtil = new PublicUtil();
