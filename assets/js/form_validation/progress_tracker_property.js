var TrackAdvertisement = {

	jQuery : $,
 
	init : function () {
	    },


	//--------------------------------------//
	//-- Function that validates the form --//
	//--------------------------------------//
	validateForm: function(form_id)
	{
		if(typeof form_id === "undefined")
			return false;

		if(jQuery("#"+form_id).validate().form()) 
		{
			return true;
		}
		else
		{
//			console.log("form error");
			return false;
		}
	},
	
	
	
	
	
	//-----------------------------------------//
	//-- Function that Ajax submits the form --//
	//-----------------------------------------//
	ajaxSubmitForm: function(form_id, ajax_url)
	{
		if(typeof form_id === "undefined" || typeof ajax_url === "undefined")
			return false;
		
		
		var parse_data = new Object();
					
		jQuery.ajax(
		{
			url: ajax_url,
			type: 'POST',
			async: false,
			data: jQuery("#"+form_id).serialize(),
			success: function(data)
			{
				parse_data = jQuery.parseJSON(data);
			}
		});
		
		return parse_data;
	},
};

TrackAdvertisement.init();




//----------------------------------------------------------------------------//
//-- Function that checks if the photo sub page was already fulfilled --//
//----------------------------------------------------------------------------//
function validate_photos(next_step)
{
	//-------------------------------------------------------------//
	//-- Function that checks if Description was filled properly --//
	//-------------------------------------------------------------//
	var parse_data;
	
	jQuery.ajax(
	{
		url: 'add_image/ajax_check_if_exist',
		type: 'GET',
		async: false,
		success: function(data)
		{
			parse_data = jQuery.parseJSON(data);
		}
	});

	if(parse_data.result == 'error')
	{
		jQuery('.form-global-error').html("Please Fill Photos before proceeding to the next step");
		jQuery('.form-global-error').show();
		
		return false;
	}
	
	return true;
}





//------------------------------------------------------------------------------------------------------//
//-- Function that checks for sub pages in between the current sub page and the next sub page clicked --//
//-- and see if the sub page in the middle of this two steps were fulfilled                           --//
//------------------------------------------------------------------------------------------------------//
function validate_blind(current_step, next_step)
{
	switch(current_step)
	{
		case "add_address":
		{
			if(next_step == 'add_owner')
			{
				//if(!validate_photos(next_step))
				//{
				//	return false;
				//}
			}
			
			return true;
		}
		break;
		
		default:
			return true;
		break;
	}
}




//-------------------------------------------//
//-- function that handles form submission --//
//-------------------------------------------//
function submit_form(element, current_step, form_id, ajax_url)
{
	var next_step = element.id;
	
	switch(next_step)
	{
		//-- Photos --//
		case "progress_photo_btn":
		{
			var next_step	= 'add_image';
		}
		break;
		
		//-- Add Owner --//
		case "progress_owner_btn":
		{
			var next_step	= 'add_owner';
		}
		break;
		
	
		default:
		{
			var form_id 	= 'add_address';
			var ajax_url	= 'add_address/ajax_submit';
			var next_step	= 'add_image';
		}
		break;
	}
		
	if(TrackAdvertisement.validateForm(form_id))
	{
		var parse_data = TrackAdvertisement.ajaxSubmitForm(form_id, ajax_url);

		if(parse_data.result == 'success')
		{
			if(validate_blind(current_step, next_step))
			{
				window.location = next_step;
			}
		}
		else
		{
			jQuery('.form-global-error').show();
		}
		
	}
}