jQuery("#password").password_strength();
jQuery(document).ready(function()
{
	jQuery("#details").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			email:
			{
				required: true,
				email: true,
				uniqueEmail: true
			},
			password:
            {
	            maxlength: 30,
	            minlength: 6,  
	            minOneNumeric: true,
	            required: true
            },
			current_password:
            {
	            maxlength: 30,
	            required: true
            },
            reenter_password:
            {
              equalTo: "#password"
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
			if(element.name != 'current_password') jQuery(element).parent().append("<em></em>");
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