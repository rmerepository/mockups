//$.metadata.setType("attr", "validate");
$.validator.addMethod("#signage_phone", function(value, element) {  
return this.optional(element) ||  /^[(][0-9]{3,}[)][ ][0-9]{3,}[-][0-9]{4,}$/i.test(value);  
}, "Please enter a valid Phone no.");

$('#notToDisplay').change(function(){
	$('#signage_name').valid();
	$('#signage_phone').focus();
});

jQuery(document).ready(function()
{	
	jQuery("#form_advertisement_advertise").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			signage_name: 
			{
				maxlength: 12
			},
			signage_phone: 
			{
				maxlength: 10,
				number: true
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

		messages:
		{
			signage_phone:
			{
				number: 'Numeric characters only',
				maxlength: 'Maximum of 10 characters'
			}
		}
	});
});