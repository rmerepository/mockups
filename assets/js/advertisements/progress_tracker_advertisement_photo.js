jQuery(document).ready(function()
{
	
	//-------------------------//
	// Features Button Clicked //
	//-------------------------//
	jQuery('#save_and_exit').click(function(event)
	{
		event.preventDefault();
		
		window.location = 'index';
	});
	
	jQuery('#progress_advertise_btn').click(function(event)
	{
		event.preventDefault();

		if(!validate_inspection())
		{
			var emsg = "Please Assign Contact Person before proceeding to Advertise";
			$().toastmessage('showToast', {
				text     : emsg,
				sticky   : true,
				position : 'top-center',
				type     : "error",
			});
			return false;
		}
		else{
			window.location = 'advertise';			
		}
	});

});