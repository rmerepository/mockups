function rme_form_validate(element_id){
    jQuery("#"+element_id).validate(
		{
			onfocusout: function(element) { jQuery(element).valid();},
			errorElement: "div",
			errorClass: "msg",
			rules:
			{
				password: 
				{
					maxlength: 100,
					required: true
				},
				captcha_answer:
				{
					maxlength: 20,
					required: true
				},
				email:
				{
					maxlength: 100,
					required: true
				}
			},
			highlight: function(element, errorClass) 
			{
			     jQuery(element).parent().addClass('has-error');
			     jQuery(element).parent().removeClass('has-warning');
			     jQuery(element).parent().removeClass('has-success');
			     jQuery(element).parent().find("em").remove(); 
			     jQuery(element).parent().append("<em></em>");
			},
			unhighlight: function(element, errorClass) 
			{
			     jQuery(element).parent().addClass('has-success');
			     jQuery(element).parent().removeClass('has-error');
			     jQuery(element).parent().removeClass('<has-></has->warning');
			     jQuery(element).parent().find("em").remove(); 
			}
			

		}
	);
}

function rme_form_show_error(isvisible,msg,type,id){
    
    
    
    type = type == null?"error":type;
    id = id == null?"lblerr":id;

    if(isvisible){
         jQuery('#'+id).parent('li').removeClass("has-success");
        jQuery('#'+id).parent('li').removeClass("success");
        jQuery('#'+id).parent('li').addClass(type);
        if(jQuery("#rme_modal_err"+id).length){
                 jQuery("#rme_modal_err"+id).html(msg);
            }else{
                 jQuery('#'+id).after('<div id="rme_modal_err'+id+'" class="msg" generated="true" for="'+id+'">'+msg+'</div>');
            }
          jQuery("#rme_modal_err"+id).show();
    }else{
       jQuery('#'+id).parent('li').removeClass(type);
         jQuery('#'+id +" .msg").html("");
    }
}


function rme_login_manual_highlight(){

    jQuery('#password').parent('li').removeClass("has-success success");
    jQuery('#captcha_answer').parent('li').removeClass("has-success success");

    jQuery('#password').parent('li').addClass("has-error");
    jQuery('#captcha_answer').parent('li').addClass("has-error");
}
