jQuery(document).ready(function()
{
	jQuery("#forgot_password").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			email:
			{
				required: true
			}
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

		showErrors: function(errorMap, errorList) 
		{
			var indx=0;
			
			this.defaultShowErrors();
			
			jQuery.each(errorMap, function(name, value) 
			{	
				if(name =='email')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#email").next().hide();
					}
					else
					{
						jQuery("#email").parent().addClass('warning');
						jQuery("#email").parent().removeClass('error');
					}
					
				}
				indx = indx + 1;
            });
		},
	});
});