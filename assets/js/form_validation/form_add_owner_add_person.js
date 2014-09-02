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

jQuery(document).ready(function()
{
	jQuery("#details").validate(
	{
		onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			first_name:
			{
				required: true,
				maxlength: 30,
				minlength: 1
			},
			
			last_name:
			{
				required: true,
				maxlength: 30,
				minlength: 1
			},
			
			email:
			{
				required: true,
				email: true,
				uniqueEmail: true
			},
			
			unit_number: 
			{
				required: false,
				maxlength: 8,
			},
			street_number: 
			{
				required: false,
				maxlength: 8,
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
			},
			postal_unit_number: 
			{
				required: false,
				maxlength: 8,
			},
			postal_street_number: 
			{
				required: false,
				maxlength: 8,
			},
			postal_street_name: 
			{
				required: true,
				maxlength: 50
			},
			postal_suburb: 
			{
				required: true,
				maxlength: 50
			},
			postal_postcode: 
			{
				required: true,
				maxlength: 4,
				number: true
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
	}
	);
	
	//////////////////////////
	// FOR ADD ORGANISATION //
	//////////////////////////
	
	jQuery("#add_organisation").validate(
		{
			errorElement: "div",
			errorClass: "msg",
			rules:
			{
				abn: 
				{
					required: true,
					number: true,
					maxlength: 11,
					minlength: 11
				},
				unit_number: 
				{
					required: false,
					maxlength: 5,
					number: true
				},
				street_number: 
				{
					required: true,
					maxlength: 10,
					number: true
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