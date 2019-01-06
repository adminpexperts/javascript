/***
@ Global Ajax call to AdminAjax(any file you wish..)
@ Params : 
   url : Segment(no absolute URL. typehint only)
   data : Data to be sent over via POST
   elm : Callback consumed within this element(optional)
@ Response : JSON => HTML => || Redirection
**/
function callAjax(url, data, elm  = false){	 
	$.ajax({
		url: jQuery("#base_url").val()+"AdminAjax/"+url,
		type:"post",
		data:$("#"+data).serialize(),
		success:function(resp){
			var json = JSON.parse(resp);
            var msgToken = '<span style="color:#93989c">'+json.msg+'</span>';
			
			if(json.status == 1){
				msgGreen = "<b style='color:green'><i class='fa fa-check'></i></b> "+msgToken;				
				$("#"+elm).fadeIn().children().html(msgGreen);
				/***
				@ Check & Redirect for returning URL 
				@ No redirection on json.status = 0
				**/
				if(json.redirect){
					setTimeout(function(){
						window.location.href = json.redirect;
						return 0;
					},1000)
				}
			}else{
				msgRed = "<b style='color:red'>Error: </b>"+msgToken;				
				$("#"+elm).fadeIn().children().html(msgRed);
			}
		}
	})
}

/***
@ Sample usage
**/

jQuery("a").on("click", function(e){
		e.preventDefault();
		var actions = ['login','register'];
		if($(this).attr("action")){
			var attr = $(this).attr("action");
			callAjax(attr+"_ajax", attr+"_data", attr+"_msg");
			return 0;
		}
		window.location.href = $(this).attr("href");
	})	
});
