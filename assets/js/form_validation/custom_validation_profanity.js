//-- JQUERY validator of profane word / words --//
//-- Returns JSON array data                  --//
//-- status -> true / false                   --//
//-- if status == 'true'                      --//
//-- profane_words -> [list , of, words ]      --//

jQuery.validator.addMethod("isProfane", function(value, element) 
{ 
	var is_profane
	
	jQuery.ajax(
	{
		url: '/api/check_profanity/index',
		type: 'POST',
		data: {word: value},
		async: false,
		success: function(data)
		{
			if(data.status == 'false')
				is_profane = true;
			else
				is_profane = false;
			result = data.profane_words;			
		}
	});
	
	return is_profane;
	
}, function(data){
	return "The following words or characters are not allowed <br/> <b>"+result+"</b>";
});