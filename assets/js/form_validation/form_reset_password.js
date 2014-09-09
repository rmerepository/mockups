jQuery(document).ready(function()
{

	jQuery("#password").password_strength();

	jQuery("#reset_password").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			password: 
			{
				maxlength: 100,
				minlength: 6,
				minOneNumeric: true,
				required: true
			},
		    reenter_password: 
		    {
		      required: true,	
		      equalTo: "#password"
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
				if(name =='password')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#password").next().hide();
					}
					else
					{
						jQuery("#password").parent().addClass('warning');
						jQuery("#password").parent().removeClass('error');
					}
					
				}
				
				if(name =='reenter_password')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#reenter_password").next().hide();
					}
					else
					{
						jQuery("#reenter_password").parent().addClass('warning');
						jQuery("#reenter_password").parent().removeClass('error');
					}
					
				}
				
				indx = indx + 1;
            });
		},
		messages:
		{
			reenter_password:
			{
				equalTo: 'Not a match'
			}
		}
		
	}
	);
});