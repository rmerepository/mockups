var TrackAdvertisement = {

	jQuery : $,
 
	init : function () {
	    },



	//-------------------------------------------------------------//
	//-- Function that checks if Description was filled properly --//
	//-------------------------------------------------------------//
	checkDescription: function()
	{
		var parse_data;
		
		jQuery.ajax(
		{
			url: '/publish/description/ajax_check_if_exist',
			type: 'GET',
			async: false,
			success: function(data)
			{
				parse_data = jQuery.parseJSON(data);
			}
		});
		
		return parse_data;
	},
	
	
	checkContact: function()
	{
		var parse_data;
		
		jQuery.ajax(
		{
			url: '/publish/inspection/ajax_check_if_exist',
			type: 'GET',
			async: false,
			success: function(data)
			{
				parse_data = jQuery.parseJSON(data);
			}
		});
		
		return parse_data;
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
			,error: function(data)
			{
				parse_data.result = 'error';
			}
		});
		
		return parse_data;
	},
};

TrackAdvertisement.init();




//----------------------------------------------------------------------------//
//-- Function that checks if the description sub page was already fulfilled --//
//----------------------------------------------------------------------------//
function validate_description(next_step)
{
	var details = TrackAdvertisement.checkDescription();
					
	if(details.result == 'error')
	{
		jQuery('.form-global-error').html("Please Fill Description Forms before proceeding to "+next_step);
		jQuery('.form-global-error').show();
		
		return false;
	}
	
	return true;
}

//function validate_inspection(strRedirect)
function validate_inspection()
{
	var details = TrackAdvertisement.checkContact();
					
	if(details.result == 'error')
	{
		var emsg = "Please Assign Contact Person before proceeding to Advertise";
		window.location = 'inspection/no_contact_person';
/*
		jQuery('.form-global-error').html(emsg);
		jQuery('.form-global-error').show();

		$().toastmessage('showToast', {
			text     : emsg,
			sticky   : true,
			position : 'top-center',
			type     : "error",
		});
*/		
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
/*
	if(next_step == 'advertise')
	{
		if(!validate_inspection())
		{
			return false;
		}
	}
*/	
	switch(current_step)
	{
		case "lease":
		{
			if(next_step == 'photo' || next_step == 'inspection' || next_step == 'advertise')
			{
				if(!validate_description(next_step))
				{
					return false;
				}
				else
				{
					if(next_step == 'advertise')
					{
						if(!validate_inspection())
						{
							return false;
						}
					}
				}
			}
			
			return true;
		}
		break;
		
		case "features":
		{
			if(next_step == 'photo' || next_step == 'inspection' || next_step == 'advertise')
			{
				if(!validate_description(next_step))
				{
					return false;
				}
				else
				{
					if(next_step == 'advertise')
					{
						if(!validate_inspection())
						{
							return false;
						}
					}
				}
			}
			
			return true;
		}
		break;
		
		case "description":
		{
			if(next_step == 'advertise')
			{
				if(!validate_inspection())
				{
					return false;
				}
			}
			
			return true;
		}
		break;

		case "photo":
		{
			if(next_step == 'advertise')
			{
				if(!validate_inspection())
				{
					return false;
				}
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
		//-- Lease --//
		case "progress_lease_btn":
		{
			var next_step	= 'lease';
		}
		break;
		
		//-- Features --//
		case "progress_features_btn":
		{
			var next_step	= 'features';
		}
		break;
		
		//-- Description --//
		case "progress_description_btn":
		{
			var next_step	= 'description';
		}
		break;
		
		//-- Photos --//
		case "progress_photos_btn":
		{
			var next_step	= 'photo';
		}
		break;
		
		//-- Inspection --//
		case "progress_inspection_btn":
		{
			var next_step	= 'inspection';
		}
		break;
		
		//-- Advertise --//
		case "progress_advertise_btn":
		{
			var next_step	= 'advertise';
		}
		break;

		//-- Save And Exit --//
		case "save_and_exit":
		{
			var next_step	= 'index';
		}
		break;
		
		default:
		{
			var form_id 	= 'form_advertisement_lease';
			var ajax_url	= '/publish/lease/ajax_submit';
			var next_step	= 'lease';
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
				var rme_next_step = window.location.protocol + "//" + window.location.hostname + "/advertisements/" + next_step
				window.location = rme_next_step;
			}
		}
		else
		{
			jQuery('.form-global-error').show();
		}
		
	}
}