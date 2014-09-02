var Advertise = {

	jQuery : $,

	init : function (flsamount, apamount)
	{
		for_lease_sign_amount 	= typeof flsamount !== 'undefined' ? flsamount : 55;
		agentpoint_amount 		= typeof apamount !== 'undefined' ? apamount : 100;

		//-- Hide "next" arrow in the progress tracker --//
		jQuery(".next-arrow").hide();

		//-----------------------------------//
		//-- Click handler of all checkbox --//
		//-----------------------------------//
		jQuery('.ads-checkbox input').on('click',function()
		{
			jQuery(this).parents('tr').toggleClass('selected');
			Advertise.calculateTotalAmount();
		});

		this.facebook();
		//this.twitter();
		this.forLeaseSign();
		this.handleSubmit();
		this.handleSaveAndExit();
		this.leaseSignageForm();
		this.suburbAutoComplete();
    },


    ucfirst : function(str)
	{
		var firstLetter = str.slice(0,1);
		return firstLetter.toUpperCase() + str.substring(1);
	},

	suburbAutoComplete : function()
	{
    jQuery("#suburb").typeahead(
		{
			items:9,
			source: function(typeahead, query)
			{
				if(query.length > 2)
				{
					jQuery.ajax(
					{
						url: '/postcodes/suburbs',
						type: 'POST',
						data: {suburb: query},
						dataType: 'JSON',
						async: false,
						beforeSend : function(data) {
							$('.suburb-section').append('<span class="suburb-indicator">Checking your suburb on our database...</span>');
						},
						success: function(data)
						{
							typeahead.process(data);
							$('.suburb-indicator').remove();
						}
					});
				}
			},
			onselect: function (obj)
			{
				var selArr 		= 	obj.split(",");
				var suburb		=	selArr[0];
				var selArr2		=	selArr[1].split(" ");
				var state		=	selArr2[1];
				var postcode	=	selArr2[2];

				jQuery("#suburb").val(suburb);
				jQuery("#postcode").val(postcode);
				jQuery("#state").val(state);

				updateDropkickDDL('#state',state);
			}
    	});
	},


	leaseSignageForm : function ()
	{
		jQuery("#signage_set_address").on("click",function(event)
    	{

    		event.preventDefault();
    		var isFormComplete = jQuery("#add_address").validate().form();

    		if ( isFormComplete ) {

	    		//-- Set the Value of the address --//
	    		var unit_number 	= jQuery("#unit_number").val();
	    		var street_number 	= jQuery("#street_number").val();
	    		var street_name 	= jQuery("#street_name").val();
	    		var street_type 	= jQuery("#street_type").val();
	    		var suburb 			= jQuery("#suburb").val();
	    		var state 			= jQuery("#state").val();
	    		var postcode 		= jQuery("#postcode").val();
	    		var country 		= jQuery("#country").val();



	    		var full_address	= '';

	    		if(unit_number != "")
	    		{
	    			full_address = full_address.concat(unit_number+" / ");
	    		}

	    		full_address = full_address.concat(street_number," " ,Advertise.ucfirst(street_name)," " ,Advertise.ucfirst(street_type)," " ,Advertise.ucfirst(suburb)," " ,postcode);

	    		jQuery("#signage_address").html(full_address);

				jQuery('.modal.in').modal('hide');

			}
    	});
	},


	//---------------------------------//
	//-- Alert Notification function --//
	//---------------------------------//
	alertNotification: function (message,alert_type)
	{
		alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';

	    $().toastmessage('showToast', {
	        text     : message,
	        sticky   : true,
	        position : 'top-center',
	        type     : alert_type,
	    });
	},


	//--------------------------------//
   	//-- Calucalte the total amount --//
   	//--------------------------------//
	calculateTotalAmount: function()
	{
		var totalAmount = 0;

		jQuery(".ads-checkbox input").each(function()
		{
			if ($(this).is(':checked'))
			{
				totalAmount += (parseInt($(this).attr('amount')));
			}
		});
		if (totalAmount === 0)
		{
			$("#totalAmount").html('FREE');
		}
		else
		{
			$("#totalAmount").html('$' + totalAmount);
		}
	},

	//--------------//
	//-- Facebook --//
	//--------------//
	facebook: function()
	{
		jQuery('#facebook').change(function()
		{
			var checked = jQuery(this).attr('checked');
/* useSharer
			if(checked)
			{
				FB.login(function(response)
				{
//					console.log(response);
					if (response.status === 'connected')
					{
//						console.log('token: ' + response.authResponse.accessToken + '.');
//						alert(response.status);

						jQuery.ajax(
						{
							type: "POST",
							url: 'advertise/ajax_submit_token',
							data: 'access_token=' + response.authResponse.accessToken,
							async: false,
							dataType: 'JSON',
							success: function(data)
							{
								if(data.result == 'success')
								{
									return true;
								}
								else
								{
									return false;
								}
							}
						});



					}
					else
					{
						jQuery('input:checkbox[name=facebook_medium]').attr('checked', false);
//						console.log('Not Logged In');
					}
				}, {scope: 'publish_stream'});
			}
			else
			{
//				FB.logout(function(response) {
//				  console.log('Logged Out of Facebook');
				});
			}
useSharer */
		});
	},





	//------------------------//
	//-- Set For Lease Sign --//
	//------------------------//
	forLeaseSign: function()
	{
		//----------------------------------------------------//
		//-- During page load, shows or hide for lease sign --//
		//----------------------------------------------------//
		if(jQuery('#for_lease_sign').is(':checked'))
		{
			jQuery('#forLeaseSignForm').slideDown();
		}

		if(jQuery('#notToDisplay').is(':checked'))
		{
			jQuery('#signage_name').toggleClass('disable');
		}

		if(jQuery('#useRmePhone').is(':checked'))
		{
			jQuery('#signage_phone').toggleClass('disable');
		}

		//-------------------------------------------//
		//-- For Lease Sign Checkbox click handler --//
		//-------------------------------------------//
		jQuery('#for_lease_sign').on('click', function()
		{
			var leaseSign = jQuery(this);
			if(leaseSign.is(':checked'))
			{
				jQuery('#forLeaseSignForm').slideDown();
			}
			else
			{
				jQuery('#forLeaseSignForm').slideUp();
				jQuery('#forLeaseSignFormAmount').html('$'+for_lease_sign_amount);

				jQuery('#quantity').val(1);
				jQuery('#for_lease_sign').attr('amount',for_lease_sign_amount);

				jQuery('#dk_container_quantity .dk_label').html(1);
				jQuery('#dk_container_quantity .dk_options_inner li').removeClass();
			}
		});


		//--------------------------------------//
		//-- Not to display name on the Lease --//
		//--------------------------------------//
		jQuery('#notToDisplay').on('click', function()
		{
			var notToDisplay = jQuery(this);
			if(notToDisplay.is(':checked'))
			{
				jQuery('#signage_name').addClass('disable');
				jQuery('#signage_name').val('');
			}
			else
			{
				jQuery('#signage_name').removeClass('disable');
			}
		});


		//---------------------------------------------------//
		//-- Re Calculate the amount if quantity is changed--//
		//---------------------------------------------------//
		jQuery('#dk_container_quantity a').live(($.browser.msie ? 'mousedown' : 'click'), function (e)
		{
	   		var quantity = parseInt(jQuery(this).attr('data-dk-dropdown-value'));
	   		if (quantity)
	   		{
	   			total_value = quantity * for_lease_sign_amount;
	   			jQuery('#forLeaseSignFormAmount').html('$' + total_value);
	   			jQuery('#for_lease_sign').attr('amount', total_value);

				//-- Calculate Amount --//
	   			Advertise.calculateTotalAmount();

	   		}
	   		return false;
	   	});
	},





	//------------------------------//
	//-- If the Form is submitted --//
	//------------------------------//
	handleSubmit: function()
	{
		jQuery('#publish').on('click', function(event)
		{
			if(jQuery("#form_advertisement_advertise").validate())
			{
				//-- Submit  Form --//

				jQuery.ajax(
				{
					type: "POST",
					url: '/publish/ajax_submit_publish',
					data: jQuery("#form_advertisement_advertise").serialize() + '&' + jQuery("#add_address").serialize(),
					async: false,
					dataType: 'JSON',
					success: function(data)
					{
						if(data.result == 'success')
						{
                                                   
                                                        $('#billing_modal').modal('show');
                                                       var twitwin = Advertise.check_twitter(data.social_sites.twitter_link);
                                                       							//console.log(data.details);
							//-- Get Total Amount --//
//							var totalAmount = data.details;
                                                        
                                                        //== check if share facebook                                                      
                                                            var checked = jQuery('#facebook').attr('checked');                                                                
                                                            if(checked){
                                                                if(twitwin){
                                                                    Advertise.is_popup_window_block(data.social_sites.facebook_link);
                                                                }else{
                                                                    Advertise.check_facebook(data.social_sites.facebook_link);
                                                                    Billing.launch();
                                                                }
                                                            }else{
                                                                 Billing.launch();
                                                            }

                                                        //== checking second popup before executing billing
                                                        
                                                        


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
							$().toastmessage('showToast', {
								text     : 'Please complete Delivery Address',
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
	},




	//------------------------------//
	//-- If the Form is submitted --//
	//------------------------------//
	handleSaveAndExit: function()
	{
		jQuery('#save_and_exit').on('click', function(event)
		{
			if(jQuery("#form_advertisement_advertise").validate())
			{
				//-- Submit  Form --//

				jQuery.ajax(
				{
					type: "POST",
					url: '/publish/ajax_save_and_exit_publish',
					data: jQuery("#form_advertisement_advertise").serialize(),
					async: false,
					dataType: 'JSON',
					success: function(data)
					{
//						console.log(data);
						if(data.result == 'success')
						{
							window.location = "index";
						}
						else
						{
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
	},





	/*
         * Twitter function
         * @param {string} twitter_link 
         * @returns {nothing}
         */

	check_twitter: function(twitter_link){

			var checked = jQuery('#twitter').attr('checked');
			if(checked && twitter_link != ""){

                                var twitter_href = "https://twitter.com/intent/tweet?source=webclient&text="+encodeURIComponent(twitter_link);
                                var twitWin = window.open(twitter_href, 'twitWin',  Advertise.window_options());
                                twitWin.focus();
                                return twitWin;

			}

	},
        
        /*
         * facebook function
         * @param {string} facebook_link 
         * @returns {nothing}
         */
        check_facebook: function(facebook_link){
                        
                     window.open(facebook_link, 'fbWin', Advertise.window_options());
                                                                

        },
        window_options:function(){
                windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
                width = 550,
                height = 420,
                winHeight = screen.height,
                winWidth = screen.width;

                left = Math.round((winWidth / 2) - (width / 2));
                left = Math.round((winWidth / 2) - (width / 2));
                var top = 0;
                if (winHeight > height){
                      top = Math.round((winHeight / 2) - (height / 2));
                }
                return  windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
        },
                
        is_popup_window_block:function(facebook_link){

                        
                 var win = window.open(facebook_link, 'child',  Advertise.window_options());
                var isblock = false;
                
                setTimeout(function(){ 
                    if(typeof(win)==="object"){
                        try{
                        if(typeof(win.outerHeight) ==="undefined" || parseInt(win.outerHeight)<10){
                            isblock =true;
                        };
                        }catch(e){
                            try{
                                if(typeof($(win).height())){
                                    isblock =true;
                                }
                            }catch(e){}
                        }                       
                    }else{
                           isblock =true;
                    }
                    
                      if(isblock){
                                $.ajax({
                                     type : "GET", 
                                     url : "/publish/summary/show_social_site/fb",
                                     dataType :"json", 
                                     async : false,
                                     success : function (response){
                                          Billing.launch();
                                     }
                                })
                          }

                              Billing.launch();
                },2000);
              
        }

};


