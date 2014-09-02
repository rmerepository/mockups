// Custom validation //
jQuery.validator.addMethod("minOneNumeric", function(value, element) 
{ 
  return /\d{1}/.test(value); 
}, "Please include at least 1 numeric character");

jQuery.validator.addMethod("uniqueAbn", function(value, element) 
{ 
	var result;
	
	jQuery.ajax(
	{
		url: '/organisations/search_abn',
		type: 'POST',
		data: {abn: value},
		async: false,
		success: function(data)
		{
			if(data == 0)
				result = false;
			else
				result = true;
		}
	});
	
	return result;
	
}, "Not available, ABN already created as an organisation within the system.");

//////////////////////////////
// JS FOR form validations  //
//////////////////////////////

jQuery(document).ready(function(){

	
	
	/////////////////////
	// FOR ADD ADDRESS //
	/////////////////////
	
	jQuery("#user_add_address").validate(
		{
			errorElement: "span",
			errorClass: "help-inline",
			rules:
			{
				unit_number: 
				{
					required: false,
					maxlength: 5,
				},
				street_number: 
				{
					required: false,
					maxlength: 10,
				},
				street_name: 
				{
					required: true,
					maxlength: 50
				},
				suburb: 
				{
					required: true,
					maxlength: 50
				},
				postcode: 
				{
					required: true,
					maxlength: 4,
					number: true
				}
			},
			highlight: function(element, errorClass) {
			     jQuery(element).parent().parent().addClass('error');
			},
			unhighlight: function(element, errorClass) {
			     jQuery(element).parent().parent().removeClass('error');
			},
			messages:
			{
				unit_number:
				{
					number: 'Numeric characters only',
					maxlength: 'Maximum of 5 characters'
				},
				street_number:
				{
					number: 'Numeric characters only',
					maxlength: 'Maximum of 10 characters'
				},
				postcode:
				{
					number: 'Numeric characters only',
					maxlength: 'Maximum of 4 characters'
				}
			}
		}
	);
});