
//-----------------------//
//-- Custom validation --//
//-----------------------//

jQuery.validator.addMethod("minOneNumeric", function(value, element) 
{ 
  return /\d{1}/.test(value); 
}, "1 character needs to be a number");




//--------------------------------------------------------//
//-- Checks if the ABN supplied is unique in the system --//
//--------------------------------------------------------//
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





//----------------------------------------------------------//
//-- Checks if the Email supplied is unique in the system --//
//----------------------------------------------------------//
jQuery.validator.addMethod("uniqueEmail", function(value, element) 
{ 
	var result;
	
	jQuery.ajax(
	{
		url: '/users/search_email',
		type: 'POST',
		data: {email: value},
		async: false,
		success: function(data)
		{
			if(data == 0)
				result = false;
			else
				result = true;
		}
	});
	
	jQuery.validator.messages.uniqueEmail = "Sorry this email is already being used.";

	return result;
	
},"Sorry this email is already being used");
