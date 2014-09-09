//////////////////////////////
// JS FOR form validations  //
//////////////////////////////

jQuery(document).ready(function(){

	jQuery("#form_advertisement_features").validate(
	{
		//onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			
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
		messages:
		{
	
		}
	});
});