//////////////////////////////
// JS FOR form validations  //
//////////////////////////////
jQuery(document).ready(function()
{
	jQuery("#form_advertisement_contact").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			contact_person: 
			{
				required: true,
			},
			last_name: 
			{
				required: true,
			},
			mobile_number: 
			{
				required: true,
			},
		},
		showErrors: function(errorMap, errorList) 
		{
			var indx=0;
			
			this.defaultShowErrors();
			
			jQuery.each(errorMap, function(name, value) 
			{	
				if(name =='contact_person')
				{
					jQuery('.msg, .controls em').hide();
				}
				
				if(name =='last_name')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#last_name").next().hide();
					}
					else
					{
						jQuery("#last_name").parent().addClass('warning');
						jQuery("#last_name").parent().removeClass('error');
					}
					
				}
				
				if(name =='mobile_number')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#mobile_number").next().hide();
					}
					else
					{
						jQuery("#mobile_number").parent().addClass('warning');
						jQuery("#mobile_number").parent().removeClass('error');
					}
					
				}
				
				indx = indx + 1;
            });
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