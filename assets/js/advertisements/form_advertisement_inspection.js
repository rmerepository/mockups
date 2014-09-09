//////////////////////////////
// JS FOR form validations  //
//////////////////////////////
jQuery(document).ready(function()
{
	jQuery("#form_advertisement_inspection").validate(
	{
		//onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			start_at_date: 
			{
				required: true,
			},
			start_at_hour: 
			{
				required: true,
			},
			start_at_minute: 
			{
				required: true,
			},
			start_at_am_pm: 
			{
				required: true,
			},
			duration: 
			{
				required: true,
			}
		},
		showErrors: function(errorMap, errorList) 
		{
			this.defaultShowErrors();
			$('.msg, .controls em').hide();
		},
		highlight: function(element, errorClass) 
		{	
		     jQuery(element).parent().addClass('error');
		     jQuery(element).parent().removeClass('warning');
		     jQuery(element).parent().removeClass('success');
		},
		unhighlight: function(element, errorClass) 
		{
		     jQuery(element).parent().addClass('success');
		     jQuery(element).parent().removeClass('error');
		     jQuery(element).parent().removeClass('warning');
		},
	});
});