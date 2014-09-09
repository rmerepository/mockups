jQuery(document).ready(function()
{
	jQuery("#change_password").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			current_password: 
			{
				maxlength: 50,
				required: true
			},
			new_password: 
			{
				maxlength: 50,
				minlength: 6,
				minOneNumeric: true,
				required: true
			},
		    retype_password: 
		    {
		      maxlength: 50,
		      equalTo: "#new_password"
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
		},
		
		showErrors: function(errorMap, errorList) 
		{
			var indx=0;
			
			this.defaultShowErrors();
			
			jQuery.each(errorMap, function(name, value) 
			{
				if(name =='current_password')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#current_password").next().hide();
					}
					else
					{
						jQuery("#current_password").parent().addClass('warning');
						jQuery("#current_password").parent().removeClass('error');
					}
					
				}
				
				if(name =='retype_password')
				{
					var message = errorList[indx]['message'];

					if(message == 'This field is required.')
					{
						jQuery("#retype_password").next().hide();
					}
					else
					{
						jQuery("#retype_password").parent().addClass('warning');
						jQuery("#retype_password").parent().removeClass('error');
					}
					
				}
				
				indx = indx + 1;
            });
		},
		messages:
		{
			retype_password:
			{
				equalTo: 'Not a match'
			}
		}
		
	}
	);
});