function clear_form_elements(ele) 
{
    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}

jQuery(document).ready(function()
{
	//-----------------------------//
	//-- Advertise Button Clicked --//
	//-----------------------------//
	jQuery('a#progress_advertise_btn').click(function(event)
	{
		event.preventDefault();
		
		//-- Current Step, Form ID, Ajax URL where form will be submitted --//
		submit_form(this,'inspection','form_advertisement_contact','/publish/inspection/ajax_contact');
	});
	
	
	//-- Continue button clicked --//
	jQuery('.btn-continue').click(function(event)
	{
		var valid = TrackAdvertisement.validateForm('form_advertisement_contact');
		
		if(valid)
		{
			var res = TrackAdvertisement.ajaxSubmitForm('form_advertisement_contact', '/publish/inspection/ajax_contact');
			
			if(res.result == 'success')
			{
				var rme_next_step = window.location.protocol + "//" + window.location.hostname + "/advertisements/" + 'advertise'
				window.location = rme_next_step;
			}
		}
		
	});
	
	//-- Ajax handling of changing contact person --//
	jQuery('#dk_container_contact_person').find('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e)
	{
		var value 		= $(this).attr('data-dk-dropdown-value');
   		var fieldName 	= $(this).parents('.dk_container').attr('select-field-name');
		
		//-- set the form selected value to the value in dropkick --//
		jQuery("#contact_person").val(value);

		res = TrackAdvertisement.ajaxSubmitForm('form_advertisement_contact', '/publish/inspection/ajax_contact');
			
		if( res.result == 'error' && res.missing_data )	
		{
			//-- If missing mobile number --//
			if (res.missing_data.indexOf('mobile_number') != undefined && res.missing_data.indexOf('mobile_number') == -1)
			{
				jQuery("#mobile_number").hide();
			}
			else
			{
				jQuery("#mobile_number").show();
			}

			//-- If missing last name --//
			if ( res.missing_data.indexOf('last_name') != undefined && res.missing_data.indexOf('last_name') == -1)
			{
				jQuery("#last_name_field").hide();	
			}
			else
			{
				jQuery("#last_name_field").show();	
			}
			
		 	jQuery('.advertising-contact-person-info').slideDown();
		}
		else
		{
			jQuery('.advertising-contact-person-info').slideUp();
		}
	});
		
			
	//-- Ajax handling of submitting new inspection times --//
	jQuery('#form_advertisement_inspection').submit(function(event)
	{
		if(jQuery("#form_advertisement_inspection").validate().form()) 
		{
			event.preventDefault();
			var res = TrackAdvertisement.ajaxSubmitForm('form_advertisement_inspection', '/publish/inspection/ajax_submit');
			if (res.result==='success'){
				jQuery("#inspection_detail").html(res.data);
			}else if (res.result==='lapsed') {
				var emsg = "Inspection Time Has Already Lapsed";
				$().toastmessage('showToast', {
					text     : emsg,
					sticky   : true,
					position : 'top-center',
					type     : "error",
				});				
			}else{
				var emsg = "Inspection Time Conflict";
				$().toastmessage('showToast', {
					text     : emsg,
					sticky   : true,
					position : 'top-center',
					type     : "error",
				});
			}
			//clear_form_elements('#form_advertisement_inspection');
		}
		else
		{
			return false;
		}
	});


	//-- Ajax handling of deleting inspection time --//
	jQuery(document).on("click", ".btn-danger" ,function(event)
	{
		event.preventDefault();
		var action_url	= $(this).attr('href');
			
 		jQuery.ajax(
 		{
 			url: action_url,
 			type: 'GET',
 			async: false,
 			context: document.body,
 			success: function(data)
 			{
 				var res = jQuery.parseJSON(data);
 				
 				jQuery("#inspection_detail").html(res.data);
 			}
 		});
	});
	
	//-- Save and Exit --//
	jQuery(document).on("click", "#save_and_exit" ,function(event)
	{
		event.preventDefault();
		
		window.location = "index";
	});
	

	// Delete a inspection time 

	$('#inspection_detail').on("click", '.inspection-item', function(event) {
		event.preventDefault();
		var t = $(this),
			insId = t.data('inspection-id'),
			action_url = '/publish/inspection/ajax_delete/' + insId;

		jQuery.ajax(
 		{
 			url: action_url,
 			type: 'GET',
 			context: document.body,
 			success: function(data)
 			{
				t.closest('.inspection-sched-row').fadeOut().remove();
 			}
 		});
	});

});