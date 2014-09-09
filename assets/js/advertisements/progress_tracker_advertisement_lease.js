jQuery(document).ready(function()
{
	jQuery(".prev-arrow").hide();
	
	//-------------------------//
	// Features Button Clicked //
	//-------------------------//
	jQuery('#progress_features_btn, #progress_description_btn, #progress_photos_btn, #progress_inspection_btn, #progress_advertise_btn, #save_and_exit').click(function(event)
	{
		event.preventDefault();

		//-- Current Step, Form ID, Ajax URL where form will be submitted --//
		submit_form(this,'lease','form_advertisement_lease','/publish/lease/ajax_submit');
	});

});