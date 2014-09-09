jQuery(document).ready(function()
{
	//-----------------------------//
	//-- Features Button Clicked --//
	//-----------------------------//
	jQuery('#progress_photos_btn, #progress_inspection_btn, #progress_advertise_btn, #save_and_exit, #progress_lease_btn, #progress_features_btn').click(function(event)
	{
		
		
		//-- Current Step, Form ID, Ajax URL where form will be submitted --//
		submit_form(this,'description','form_advertisement_descriptions','/publish/description/ajax_submit');

		return false;
	});
	
});