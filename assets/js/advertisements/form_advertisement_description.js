//////////////////////////////
// JS FOR form validations  //
//////////////////////////////

jQuery(document).ready(function(){

	jQuery("#form_advertisement_descriptions").validate(
	{
		onfocusout: false,
		onkeyup: false,
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			headline: 
			{
				required: true,
				isProfane: true,
				maxlength: 50
			},
			description: 
			{
				required: true,
				isProfane: true,
				maxlength: 1000
			},
		},
		highlight: function(element, errorClass) 
		{
		     jQuery(element).parent().addClass('error');
		     jQuery(element).parent().removeClass('warning');
		     jQuery(element).parent().removeClass('success');
		     jQuery(element).parent().find("em").remove(); 
		     jQuery(element).parent().append("<em></em>");
		},
		unhighlight: function(element, errorClass) 
		{
		     jQuery(element).parent().addClass('success');
		     jQuery(element).parent().removeClass('error');
		     jQuery(element).parent().removeClass('warning');
		     jQuery(element).parent().find("em").remove(); 
		     jQuery(element).parent().append("<em></em>");
		},
	});
});