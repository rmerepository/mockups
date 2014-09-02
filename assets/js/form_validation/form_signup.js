jQuery.validator.addMethod("minOneNumeric", function(value, element) 
{ 
  return /\d{1}/.test(value); 
}, "Please include at least 1 numeric character");


jQuery("#password").password_strength();

////////////////
// FOR SIGNUP //
////////////////

jQuery(document).ready(function()
{	
jQuery("#signup").validate(
{  
		onfocusout: function(element) { jQuery(element).valid();},
		onkeyup: false,
    	errorElement: "div",
		errorClass: "msg",
		rules:
        {
                first_name:
                {
                        maxlength: 30,
                        minlength: 1  
                },
                password:
                {
                        maxlength: 100,
                        minlength: 6,  
                        minOneNumeric: true,
                        required: true
                },
	            reenter_password:
	            {
	              equalTo: "#password"
	            },
	            email:
				{
					required: true,
					email: true,
					uniqueEmail: true
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

					if(message == "Something's missing here.")
					{
						jQuery("#email").next().hide();
					}
					else
					{
						jQuery("#email").parent().addClass('warning');
						jQuery("#email").parent().removeClass('error');
					}
					
				}
				
				if(name =='password')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
					{
						jQuery("#password").next().hide();
					}
					else
					{
						jQuery("#password").parent().addClass('warning');
						jQuery("#password").parent().removeClass('error');
					}
					
				}
				
				if(name =='first_name')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
					{
						jQuery("#first_name").next().hide();
					}
					else
					{
						jQuery("#first_name").parent().addClass('warning');
						jQuery("#first_name").parent().removeClass('error');
					}
					
				}
				if(name =='reenter_password')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
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
	});

	jQuery('#signup').on('submit', function(e)
	{
		validateAgreeTermsCondition();
	});

	jQuery('#termsandcondition').on('change', function(e)
	{
		validateAgreeTermsCondition();
	});

	function validateAgreeTermsCondition()
	{
		var valid = true,
				termConditionLabel = jQuery('.termsandcondition label');
				terms = jQuery('#termsandcondition:checked').is(':checked');
				$('.termsandcondition .msg').remove();
		if(terms === false) 
		{
			termConditionLabel.addClass('required');
			termConditionLabel.parent('li').addClass('error');
		  $('.termsandcondition').append('<div for="termsandcondition" generated="true" class="msg">Oops, you forgot to agree with our Terms & Conditions.</div>');
			valid = false;
		} 
		else
		{
			termConditionLabel.parent('li').removeClass('error');
			termConditionLabel.removeClass('required');
		}
		return valid;
	}

});