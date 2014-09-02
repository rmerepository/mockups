jQuery(document).ready(function()
{

	jQuery(".prev-arrow").hide();
	
	/////////////////////////////
	// Features Button Clicked //
	/////////////////////////////
	jQuery('#progress_photo_btn, #progress_owner_btn').click(function(event)
	{
		event.preventDefault();

		//-- Current Step, Form ID, Ajax URL where form will be submitted --//
		 submit_form(this,'add_address','add_address','add_address/ajax_submit');
	});
	
});