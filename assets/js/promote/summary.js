$(function(){

		//	Checking to disable the facebook,twitter and pdf button
		$('.top-media-l.disable .control a').each(function() {
			var t = $(this);
			t.parent().append('<div class="btn-blocker"></div>');
			t.unbind('hover');
			t.attr({
				'id' : '#',
				'href':'#'
			});
		});

		$('a.mix-media-pdf').on("click", function() {

		 		$('#downloadModal').modal('show');

		        $.fileDownload($(this).attr('href'), {
		            successCallback: function(url) {
						mixpanel.track("Download Brochure");
		               $('#downloadModal').modal('hide');
		            },
		            failCallback: function(responseHtml, url) {

		            }
		        });

        return false; //this is critical to stop the click event which will trigger a normal file download!
    	});

		/*-- Add mixpanel create advertisement --*/
    	if ($('.process_ad').length) mixpanel.track_links('.process_ad', "Create Advertisement");

		$('#notToDisplay').on('click', function()
		{
			$('#signage_name').toggleClass('disable');
			$('#signage_name').toggleClass('is-required');
		});

		$('#useRmePhone').on('click', function()
		{
			var useRmePhone = $(this);
			$('#signage_phone').toggleClass('disable');
			$('#signage_phone').toggleClass('is-required');
			if ($('#signage_phone').hasClass('disable')){
				for (var i=0;i<apk.length;i++)
				{
					if ($('select#state').val()==apk[i]){
						$('#signage_phone').val(apv[i]);
					}
				}
/* disable name feature removed
				$('#notToDisplay').prop('checked', true);
				$('#signage_name').addClass('disable');
				$('#signage_name').removeClass('is-required');
				$('#signage_name').val('');
*/
			}
		});


		$('#signage_set_address').click(function(e){
			var signage_address = $('#signage_address').val();
//			var signage_address = $('#unit_number').val()=='' ? '' : $('#unit_number').val() + ' / ';
//			signage_address = signage_address + $('#street_number').val() + ' ' + $('#street_name').val() + ' ' + $('#street_type').val() + ', ' + $('#suburb').val() + ' ' + $('#postcode').val();
			$('#signage_address').val(signage_address);
//			console.log( submitValidate('#deliveryAddress') );  // validation for submit event
			e.preventDefault();
		});

		var descHeight = $('.description').height(),
			midSection = $('.mid-section'),
			reHeight = Math.abs(descHeight - 130);
			// midSection.css('min-height', $('.mid-section').height() + reHeight);

		$('#sideCol').toggle( function() {

			$('.summary-sidebar').animate({ width: 155 }  );
			$('.summary-promote').animate({ marginLeft: -205 });
			$('.summary-sidebar').addClass('collapse');
			$('.summary').hide();
			setTimeout(function(){
				$('.summary').fadeIn();
			},400)

		}, function() {
			$('.summary-sidebar').animate({ width: 360 });
			$('.summary-promote').animate({ marginLeft: 0 });
			$('.summary-sidebar').removeClass('collapse');
			$('.summary').hide();
			setTimeout(function(){
				$('.summary').fadeIn();
			},400)
		});


		$('.collapse-btn').toggle(function(){
			$(this).addClass('toggle').closest('.media-item').find('.collapsible-content').slideDown();
		}, function() {
			$(this).removeClass('toggle').closest('.media-item').find('.collapsible-content').slideUp();
		});


		$("#quantity").kendoDropDownList({
 			change : updateTotal
		});


		// $('#quantity').dropkick({
		//   change: function (value, label) {
		//   	updateTotal();
		//   }
		// });

		function updateTotal(){
			var checkout_price = 0,
				flagCart = 0;

			if ($('#for_lease_sign').is(':checked')) {
				// get quantity
				var lease_sign_quantity = $('#quantity').val();
				checkout_price = lease_sign_quantity * lease_sign_price;
				$('.for_lease_sign_amount').html(checkout_price);
				flagCart++;
			} else {
				checkout_price = 0;
				$('.for_lease_sign_amount').html(lease_sign_price);
//				flagCart++;
   }
			if ($('#agentpoint').is(':checked')) {
				// get quantity
				checkout_price = checkout_price + agentpoint_price;
				flagCart++;
			}
			//for_lease_sign_amount

			if(flagCart) {
				$('button.btnc').removeAttr('disabled');
			} else {
				$('button.btnc').attr('disabled','disable');
			}

			$('b.total').html(checkout_price);
                        return checkout_price;

		}

		$('#for_lease_sign_amount').change(function(){
			updateTotal();
		});
		

		$('#agentpoint').click(function(){
			updateTotal();
		});

		$('#for_lease_sign').click(function(){
				var leaseSign = $(this);

//				console.log(leaseSign.is(':checked'))

				updateTotal();
				if(leaseSign.is(':checked')) {
					$('#forLeaseSignForm').addClass('open');
				} else {
					$('#forLeaseSignForm').removeClass('open')
				}

			});





$("#summary_fb_sharer").click(function(){
	var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
	width = 550,
	height = 420,
	winHeight = screen.height,
	winWidth = screen.width;

	var left = Math.round((winWidth / 2) - (width / 2));
	var top = 0;
	if (winHeight > height){
		top = Math.round((winHeight / 2) - (height / 2));
	}
        
	window.open(facebook_sharer_link, 'fbWin', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);

	mixpanel.track("Facebook Share");
});

$("#summary_twitter_intent").click(function(e){
	var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
		windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
		width = 550,
		height = 420,
		winHeight = screen.height,
		winWidth = screen.width;
	e = e || window.event;
	var target = e.target || e.srcElement,
		m, left, top;
	while (target && target.nodeName.toLowerCase() !== 'a') {
		target = target.parentNode;
	}
	if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
		m = target.href.match(intentRegex);
		if (m) {
			left = Math.round((winWidth / 2) - (width / 2));
			top = 0;
			if (winHeight > height) {
				top = Math.round((winHeight / 2) - (height / 2));
			}
			window.open(target.href, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
			e.returnValue = false;
			e.preventDefault && e.preventDefault();
		}
	}

	mixpanel.track("Twitter Share");
});




		$('#checkoutSummaryOrderLeaseOrRea').on('click', function(event)
		{
			var proceed = '';
			if ($('#for_lease_sign').is(':checked')){
				proceed = submitValidate('#forLeaseSignForm');
			}else{
				proceed = true;
			}
//			console.log(  proceed  );

//			if($("#form_advertisement_advertise").validate())
//			if(  submitValidate('#forLeaseSignForm')  )
			if(  proceed && updateTotal() >0  )
			{
				//-- Submit  Form --//
				$.ajax(
				{
					type: "POST",
					url: '/promote/ajax_submit_publish',
					data: $("#form_advertisement_advertise").serialize() + '&' + $("#add_address").serialize(),
					async: false,
					dataType: 'JSON',
					success: function(data)
					{
						if(data.result == 'success')
						{

                                                        $('#billing_modal').modal('show');
                                                       							//console.log(data.details);
							//-- Get Total Amount --//
//							var totalAmount = data.details;

                                                        Billing.launch();

							//if (totalAmount > 0)
							//{
								//-------------//
								//-- Billing --//
								//-------------//
							//
							//}
							//else
							//{

							//}

							return true;
						}
						else
						{
                                                        var dtails =""

                                                        if((typeof (data.details) != 'undefined') || (data.details != null)){
                                                            dtails = data.details;
                                                        }
							$().toastmessage('showToast', {
								text     : 'Please complete Delivery Details. '+dtails,
								sticky   : true,
								position : 'top-center',
								type     : 'error',
							});
//							console.log(data.details);
							return false;
						}
					}
				});

			}
			else
			{
//				console.log("form error");
				return false;
			}

			event.preventDefault();
		});




/// For REA ACTION is published

// popover

$("[data-toggle='popover']").popover();

var popOverTitle = 'Action Description '
	, popOverContent = '<p><b>Withdraw</b> - This marks the advertisement as withdrawn and is removed from the property websites.</p>' +
	  				   '<p><b>Leased</b> - This marks the property as leased and the advertisement is removed from the property websites.</p>' +
	  				   '<p><b>Extend</b> - This extends the advertisements for another 30 days from the current date but does not repost your changes.</p>' +
	  				   '<p><b>Republish</b> - This updates the changes you have made to your advertisement on the 3rd party websites.</p>' +
	  '';

$(".pop-over").attr('data-original-title', popOverTitle );
$(".pop-over").attr('data-content', popOverContent);

var reaPublished = [
		{ value : "withdrawn" , text : "Withdraw" },
		{ value : "leased" , text : "Leased" },
		{ value : "extend" , text : "Extend" },
//		{ value : "renew" , text : "Renew" },

	];

if (thereAreChanges==true){
	reaPublished[reaPublished.length]={ value : "repost" , text : "Republish" };
}

var reaLeased = [
		{ value : "leased" , text : "Leased" },
		{ value : "renew" , text : "Renew" },

	];

var reaWithdrawn = [
		{ value : "withdrawn" , text : "Withdrawn" },
		{ value : "renew" , text : "Renew" },

	];

function onChangeReaPublished(){
	var reaAction = $.trim( $('#reaAction').val() );
	var reaActionMessage = '';
//	console.log( reaAction );

	// Call Modal $('#reaConfirmation').modal();
	// Suggest to pass value to the message $('#reaActionMessage').html('Message here').
	if (reaAction=='extend'){
		reaActionMessage = 'Are you sure you want to extend your advertisement?';
	}
	if (reaAction=='leased'){
		reaActionMessage = 'Are you sure you want to mark your property as leased?';
	}
	if (reaAction=='withdrawn'){
		reaActionMessage = 'Are you sure you want to withdraw your advertisement?';
	}
	if (reaAction=='repost'){
		reaActionMessage = 'Are you sure you want to update your changes to the Real Estate Websites?';
	}
	if (reaActionMessage!=''){
		$('#reaConfirmation').modal();
		$('#reaActionModal').val(reaAction);
		$('#reaActionMessage').html(reaActionMessage);
	}
/*
	$.ajax(
	{
		type: "POST",
		url: '/promote/summary/ajax_set_status',
		data: 'advertisement_id=' + advertisement_id + '&summary_event=' + reaAction,
		async: false,
		dataType: 'JSON',
		success: function(data)
		{
			if(data.status == 'success')
			{
				$().toastmessage('showToast', {
					text     : data.message,
					sticky   : true,
					position : 'top-center',
					type     : 'success',
				});
				return true;
			}
			else
			{
				$().toastmessage('showToast', {
					text     : 'There was an error submitting your request. Please Try Again Later',
					sticky   : true,
					position : 'top-center',
					type     : 'error',
				});
				return false;
			}
		}
	});
*/

} // end onChangeReaPublished

var draftCol3 = '<span class="amount"><sup>$</sup>' + agentpoint_price + '</span><div class="checkbox-bg custom-checkbox-field2"><input type="checkbox" id="agentpoint" amount="' + agentpoint_price + '" name="agentpoint" ><label for="agentpoint">&nbsp;</label></div>';

$('#confirmedReaAction').on('click', function(event){
	$("#reaActionLoader").show();

	var ad_action = $('#reaActionModal').val();

	$.ajax(
	{
		type: "POST",
		url: '/promote/summary/ajax_set_status',
		data: 'advertisement_id=' + advertisement_id + '&summary_event=' + ad_action,
		async: false,
		dataType: 'JSON',
		success: function(data)
		{
			$("#reaActionLoader").hide();
			if(data.status == 'success')
			{
				// change dropdown content
				if (ad_action=='extend'){
					$("#reaAction").data("kendoDropDownList").setDataSource(reaPublished);
$('.progress-period').html(data.data);
				}
				if (ad_action=='leased'){
					$("#reaAction").data("kendoDropDownList").setDataSource(reaLeased);
					$('.r-italic span').html('Leased on ' + summaryDate);
					$('.pr-container').hide();
					$('div#summaryDropdownContainer').html('');
//					$('#summaryDropdownContainer').html(draftCol3);
                                        //-- check if survey is needed
                                            survey_modal();
				}
				if (ad_action=='withdrawn'){
					$("#reaAction").data("kendoDropDownList").setDataSource(reaWithdrawn);
					$('.r-italic span').html('Withdrawn on ' + summaryDate);
					$('.pr-container').hide();
					$('div#summaryDropdownContainer').html('');
//					$('#summaryDropdownContainer').html(draftCol3);
                                        //-- check if survey is needed
                                            survey_modal();
				}
				if (ad_action=='repost'){
					$('p#deniedbyadminnotifinsummary').hide();
					$("#repost-changes-to-property-websites").hide();
					if (onLoad_latest_status=='denied' || onLoad_latest_status=='published'){
						$('.r-italic span').html('Awaiting Re-Approval');
					}
					else{
						$('.r-italic span').html('Awaiting Approval');
					}
//					$("#reaAction").data("kendoDropDownList").setDataSource(reaPublished);
					$('.pr-container').hide();
					$('div#summaryDropdownContainer').html('');
				}


				$().toastmessage('showToast', {
					text     : data.message,
					sticky   : true,
					position : 'top-center',
					type     : 'success',
				});
				if (ad_action=='renew'){
					// will be issued with new ad id, so page must reload with current property id
				}
				return true;
			}
			else
			{
				$().toastmessage('showToast', {
					text     : 'Cannot change the status of your advertisement at the current time. Please try again later or contact us',
					sticky   : true,
					position : 'top-center',
					type     : 'error',
				});
				return false;
			}
		}
	});


});

// hide modal
$('#reaConfirmation').on('hidden', function () {
	var dropdownlist = $("#reaAction").data("kendoDropDownList");
	if (typeof dropdownlist != 'undefined') {
		$("#reaAction").data("kendoDropDownList").value(0);
	}
})

function ajax_set_ad_status(ad_id, ad_action){
	$.ajax(
	{
		type: "POST",
		url: '/promote/summary/ajax_set_status',
		data: 'advertisement_id=' + advertisement_id + '&summary_event=' + ad_action,
		async: false,
		dataType: 'JSON',
		success: function(data)
		{
			if(data.status == 'success')
			{
				$().toastmessage('showToast', {
					text     : data.message,
					sticky   : true,
					position : 'top-center',
					type     : 'success',
				});
				return true;
			}
			else
			{
				$().toastmessage('showToast', {
					text     : 'There was an error submitting your request. Please Try Again Later',
					sticky   : true,
					position : 'top-center',
					type     : 'error',
				});
				return false;
			}
		}
	});

}

uiDropDownOnChangeEvent( '#reaAction' , "Action" ,  reaPublished , "text", "value",  onChangeReaPublished );

var dropdownlist = $("#reaAction").data("kendoDropDownList");
// for default onload selected latest status of ad in audits table
if (typeof dropdownlist != 'undefined') {
	dropdownlist.value(onLoad_latest_status);
	if (onLoad_latest_status=='extend' || onLoad_latest_status=='published'){
		$("#reaAction").data("kendoDropDownList").setDataSource(reaPublished);
	}
	if (onLoad_latest_status=='leased'){
		$("#reaAction").data("kendoDropDownList").setDataSource(reaLeased);
	}
	if (onLoad_latest_status=='withdrawn'){
		$("#reaAction").data("kendoDropDownList").setDataSource(reaWithdrawn);
	}

}


/*
$("#repost-changes-to-property-websites").click(function(){
	$.ajax(
	{
		type: "POST",
		url: '/promote/summary/ajax_set_status',
		data: 'advertisement_id=' + advertisement_id + '&summary_event=repost',
		async: false,
		dataType: 'JSON',
		success: function(data)
		{
			if(data.status == 'success')
			{
				$().toastmessage('showToast', {
					text     : data.message,
					sticky   : true,
					position : 'top-center',
					type     : 'success',
				});
				$("#repost-changes-to-property-websites").hide();
				if (onLoad_latest_status=='denied'){
					$('.r-italic').html('Awaiting Re-Approval');
				}
				else{
					$('.r-italic').html('Awaiting Approval');
				}
				return true;
			}
			else
			{
				$().toastmessage('showToast', {
					text     : 'There was an error submitting your request. Please Try Again Later',
					sticky   : true,
					position : 'top-center',
					type     : 'error',
				});
				return false;
			}
		}
	});
});
*/
$("#repost-changes-to-property-websites a").click(function(){
	var reaAction='repost',
	reaActionMessage = 'Are you sure you want to update your changes to the Real Estate Websites?';
	$('#reaConfirmation').modal();
	$('#reaActionModal').val(reaAction);
	$('#reaActionMessage').html(reaActionMessage);
});



	uiDropDown( "#street_type", streetTypeSrc, "value" , "id");
	uiDropDown( "#state", stateSrc, "value" , "value");

	$("#suburb").kendoAutoComplete({    
		dataTextField: "full_locality",
		dataSource: postcodeSrc,
		select: FormSuburbUpdateAddress,
        minLength:"3", 
	});

	 var default_country_index =0;
        if(rCountry.length > 1){
            default_country_index = 9;
        }

	$( '#country' ).kendoDropDownList({
		dataSource : rCountry,
		dataTextField: 'value',
		dataValueField: 'id',
		index: default_country_index
	});
 
 var opt = {
     componentRestrictions: {country: 'au'}
 };
    rme_delivery_property = new google.maps.places.Autocomplete((document.getElementById('signage_address')), opt);
    var geolocation = new google.maps.LatLng(-25.274398, 133.775136);
    rme_delivery_property.setBounds(new google.maps.LatLngBounds(geolocation,geolocation));
    google.maps.event.addListener(rme_delivery_property, 'place_changed', function(){
        var place = rme_delivery_property.getPlace();
           
            if(place.geometry){ 
                var componentForm = {
                  street_number: ['street_number', 'short_name'],
                  route: ['street_name','long_name'],
                  locality: ['suburb','long_name'],
                  administrative_area_level_1: ['state','short_name'],
                  country: ['country','long_name'],
                  postal_code: ['postal_code','short_name']
                };
                
                

                for (var i = 0; i < place.address_components.length; i++) {
                  var addressType = place.address_components[i].types[0];
                  if(componentForm[addressType]){
                      var val = place.address_components[i][componentForm[addressType][1]];
                  }
                }

            }
            
            //--- format 

    });


    //-- force z index due to modal
    var pacContainerInitialized = false;
    $('#signage_address').keypress(function() {
            if (!pacContainerInitialized) {
                    $('.pac-container').css('z-index', '9999');
                    pacContainerInitialized = true;
            }
    }); 

});
