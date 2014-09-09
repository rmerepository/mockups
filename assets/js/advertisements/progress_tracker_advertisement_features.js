jQuery(document).ready(function()
{
	
	/////////////////////////////
	// Features Button Clicked //
	/////////////////////////////
	jQuery('#progress_description_btn, #progress_photos_btn, #progress_inspection_btn, #progress_advertise_btn, #save_and_exit, #progress_lease_btn').click(function(event)
	{
		event.preventDefault();

		//-- Current Step, Form ID, Ajax URL where form will be submitted --//
		submit_form(this,'features','form_advertisement_features','/publish/features/ajax_submit');
	});
	
});