function alertNotification(message,alert_type) 
{
	alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';

    $().toastmessage('showToast', {
        text     : message,
        sticky   : false,
        position : 'top-center',
        type     : alert_type,
        stayTime : 5000
    });
}


var AddOwner = {
	 init : function () {
		    this.addOwnerBtn();    
			this.changeOwnerRole();
			this.removeOwner();
			this.searchAddOwner();
	        this.showAddOwnerBtn(); 
	    },

	showAddOwnerBtn : function() 
	{
		var currentOwner = jQuery(".select-owners");
	
		currentOwner.on("mouseenter", "li", function(event)
		{
			 jQuery(this).find('a.addOwnerBtn').show();
		});

		currentOwner.on("mouseleave", "li", function(event)
		{
			 jQuery('a.addOwnerBtn').hide();
		});
		
		currentOwner.on("click", "a.addOwnerBtn", function(event)
		{
				var action_url = jQuery(this).attr('href');
				
				
				jQuery.ajax(
				{
					url: action_url,
					type: 'GET',
					async: false,
					context: document.body,
					success: function(rspns)
					{
                                            
                                            var data = jQuery.parseJSON(rspns);
                                            if(data.success =="1"){
                                                    jQuery.ajax(
                                                    {
                                                            url: '/properties/invite_user/ajax_get_owner_list',
                                                            type: 'GET',
                                                            async: false,
                                                            context: document.body,
                                                            success: function(data)
                                                            {
                                                                    jQuery("#owner_carousel").html(data);
                                                            }
                                                    });

                                                    jQuery.ajax(
                                                    {
                                                            url: '/properties/invite_user/ajax_get_selected_owner_list',
                                                            type: 'GET',
                                                            async: false,
                                                            context: document.body,
                                                            success: function(data)
                                                            {
                                                                    jQuery("#owner_selected_carousel").html(data);
                                                            }
                                                    });

                                                    //-- Re attach the script to the page after ajax reload --//
                                                    AddOwner.addOwnerBtn();
                                                    AddOwner.changeOwnerRole();
                                                    AddOwner.removeOwner();
                                                    AddOwner.showAddOwnerBtn();
                                            }else{
                                                alertNotification(data.message);
                                            }
					}
				});
				
				
				
				//-- Re initialize jCarousel --//
				jQuery(".current-owners_carousel").jCarouselLite(
				{
		        	btnNext: ".next",
		        	btnPrev: ".prev"
		    	});

				return false;
		});		
    },
	
	
	
	
	/**
	 * Function that handles removing of user from property
	 */
	removeOwner : function ()
	{
		var currentOwner = jQuery(".owners-section");
		
		currentOwner.on("click", ".remove-user-form-owner-list", function(event)
		{
			var action_url  = jQuery(this).attr('href');
			var own_user	= jQuery(this).attr('data-loggeduser');
			
			if(own_user == 1)
			{
				var confirm_message = "Are you sure you want to remove your access to this property?";
			}
			else
			{
				var confirm_message = "Remove this owner from the property?";
			}
			
        $("#hlink").val(action_url);
        $("#message_confirm").html(confirm_message);
        $("#confirm_remove").modal();

			//var remove_user = confirm(confirm_message);
			/*
			if(remove_user)
			{
				jQuery.ajax(
				{
					url: action_url,
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						var data = jQuery.parseJSON(data);
						
						if(data.success == 1)
						{
							//-- If deleting own account from property, redirect to owner dashboard after --//
							if(own_user == 1)
							{
								window.location = "/";
							}
							else
							{
								jQuery.ajax(
								{
									url: '/properties/invite_user/ajax_get_owner_list',
									type: 'GET',
									async: false,
									context: document.body,
									success: function(data)
									{
										jQuery("#owner_carousel").html(data);
									}
								});
								
								jQuery.ajax(
								{
									url: '/properties/invite_user/ajax_get_selected_owner_list',
									type: 'GET',
									async: false,
									context: document.body,
									success: function(data)
									{
										jQuery("#owner_selected_carousel").html(data);
									}
								});
							}
							
							AddOwner.addOwnerBtn();    
							AddOwner.changeOwnerRole();
							AddOwner.showAddOwnerBtn(); 
							AddOwner.removeOwner();

						}
						else
						{
							alertNotification(data.message);
						}
					}
				});
			
				//-- Re initialize jCarousel --//
				jQuery(".current-owners_carousel").jCarouselLite(
				{
		        	btnNext: ".next",
		        	btnPrev: ".prev"
		    	});
		   	}
                    */


			return false;
		});
	},
	
	
	/**
	 * Function that handles changing of user role
	 */
	changeOwnerRole : function() 
	{
	
		var currentOwner 		= jQuery(".owners-section");
		var ownerNameSection 	= jQuery('.owner-name');
		var ownerType 			= jQuery(".owner-type");
		var ownerList 			= jQuery(".owner-list");
		
		currentOwner.on("mouseenter", "li", function(event){
			jQuery(this).addClass('current');
		});
	
		currentOwner.on("mouseleave", "li", function(event){
			jQuery(this).removeClass('current');
			jQuery(this).find('.changeuserRole-popover-holder').hide();
			jQuery(this).find('h5').removeClass('active');
		});

		ownerNameSection.on("mouseenter", "h5", function(event){
			jQuery(this).addClass('active');
			jQuery(this).parents('li').find('.changeuserRole-popover-holder').show();
		});

		currentOwner.on("click", ".changeuserRole a", function(event)
		{
			var action_url 	= jQuery(this).attr('href');
			var role 		= jQuery(this).html();
			var roleHolder	= jQuery(this).parents('li').find('h5');
			
			jQuery.ajax(
			{
				url: action_url,
				type: 'GET',
				async: false,
				context: document.body,
				success: function(data)
				{
					var data = jQuery.parseJSON(data);
					
					if(data.success == 1)
					{
						roleHolder.html(role);
						alertNotification(data.message,'success');
						return false;
					}
					else
					{
						alertNotification(data.message);
						return false;
					}
				}
			});
			
			return false;
		});
		
		//-- For Owner / Not Owner --//
		ownerType.on("mouseenter", ".owner-label", function(event)
		{
			jQuery(this).parents('li').find('.changeusertype-popover-holder').show();
			jQuery(this).addClass('active');
		});

		currentOwner.on("mouseleave", "li", function(event)
		{
			jQuery(this).removeClass('current');
			jQuery(this).find('.changeusertype-popover-holder').hide();
			jQuery(this).find('.owner-label').removeClass('active');
		});

		ownerList.on('click', '.changeuserType a', function(e)
		{ 
			e.preventDefault();

			var ownerType 	= jQuery(this).data('user-type');
			var action_url 	= jQuery(this).attr('href');
			var roleHolder	= jQuery(this).parents('li').find('.owner-label');
			
			jQuery.ajax(
			{
				url: action_url,
				type: 'GET',
				async: false,
				context: document.body,
				success: function(data)
				{
					var data = jQuery.parseJSON(data);
					
					if(data.success == 1)
					{
						roleHolder.html(ownerType);
						alertNotification(data.message,'success');
					}
					else
					{
						alertNotification(data.message);
					}
				}
			});
		});

	},
		
	addOwnerBtn : function()
	{
			jQuery(".current-owners").on("click", "a", function(event){
				 return false;
			});
	},




	ajaxAddOwner : function (userid, usertype, userdata)
	{
           
		var action_url ="/properties/invite_user/ajax_add_remove_owner?action=add&type="+usertype+"&id="+userid+"&udata="+userdata;
			
 		jQuery.ajax(
 		{
 			url: action_url,
 			type: 'GET',
 			async: false,
 			context: document.body,
 			success: function(data1)
 			{
                            
 				var data1 = jQuery.parseJSON(data1);
 				
 				jQuery.ajax(
				{
					url: '/properties/invite_user/ajax_get_owner_list',
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						jQuery("#owner_carousel").html(data);
					}
				});
				
				jQuery.ajax(
				{
					url: '/properties/invite_user/ajax_get_selected_owner_list',
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						jQuery("#owner_selected_carousel").html(data);
					}
				});
				
				alertNotification(data1.message,'success');
				
				AddOwner.addOwnerBtn();    
				AddOwner.changeOwnerRole();
				AddOwner.removeOwner();
				AddOwner.showAddOwnerBtn(); 
 			}
 		});
			
 		jQuery("#user_organisation").val('');

		jQuery('.input-owner-result').hide();

		jQuery(".current-owners_carousel").jCarouselLite(
		{
			btnNext: ".next",
			btnPrev: ".prev"
	    });

	},



		
		/**
		 * Function that handles the adding of user via the auto-complete
		 */
	searchAddOwner: function()
	{
		// GET USER ID WHEN CLICKED ON THE USER RESULT 
		jQuery(".user_organisation_result").on("click", ".result", function(event)
		{
			var userid 		= jQuery(this).attr('data-user-id');
			var usertype	= jQuery(this).attr('data-user-type');

			AddOwner.ajaxAddOwner(userid, usertype, '');
			
		});
		
		// HIDE RESULT 
		jQuery(".user_organisation_result").on("mouseleave", ".input-owner-result", function(event)
		{
			jQuery('.input-owner-result').hide();
		});
		
		// SEARCH RESULT 
/* old
		jQuery("#user_organisation").keyup(function(e) 
		{
			var searchbox 	= jQuery(this).val();
			var dataString 	= 'user_organisation='+ searchbox;
			if(searchbox && searchbox.length > 2)
			{
				jQuery.ajax({
					type: "POST",
					url: "/users/search_user_org",
					data: dataString,	
					cache: false,
					success: function(html)
					{
//						jQuery(".user_organisation_result").html(html).show();
						appendTheResultTo : '.user_organisation_result'

					}
				});
			}
		});
*/

	jQuery("#user_organisation").autosearch({
				url : '/users/search_user_org',
				appendTheResultTo : '.results'
				,allowUserSendEmail : true
	});


	// GET USER ID WHEN CLICKED ON THE USER RESULT 
	jQuery(".search-meta .results").on("click", ".result", function(event)
	{
	
		var userid 		= $(this).data('options').id;
		var usertype	= $(this).data('options').usertype;

		var action_url ="/properties/invite_user/ajax_add_remove_owner?action=add&type="+usertype+"&id="+userid; // +"&udata="+userdata
 		jQuery.ajax(
 		{
 			url: action_url,
 			type: 'GET',
 			async: false,
 			context: document.body,
 			success: function(data1)
 			{
 				var data1 = jQuery.parseJSON(data1);
 				
 				jQuery.ajax(
				{
					url: '/properties/invite_user/ajax_get_owner_list',
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						jQuery("#owner_carousel").html(data);
					}
				});
				
				jQuery.ajax(
				{
					url: '/properties/invite_user/ajax_get_selected_owner_list',
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						jQuery("#owner_selected_carousel").html(data);
					}
				});
				
				alertNotification(data1.message,'success');
				
				AddOwner.addOwnerBtn();    
				AddOwner.changeOwnerRole();
				AddOwner.removeOwner();
				AddOwner.showAddOwnerBtn(); 
 			}
 		});
			
 		jQuery("#user_organisation").val('');

		jQuery('#AutoResult').hide();

		jQuery(".current-owners_carousel").jCarouselLite(
		{
			btnNext: ".next",
			btnPrev: ".prev"
	    });



	});



	},
};

AddOwner.init();


function removeUserProperty(){
    var action_url =$("#hlink").val();
    var own_user	= jQuery(this).attr('data-loggeduser');

				jQuery.ajax(
				{
					url: action_url,
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						var data = jQuery.parseJSON(data);
						
						if(data.success == 1)
						{
							//-- If deleting own account from property, redirect to owner dashboard after --//
							if(own_user == 1)
							{
								window.location = "/";
							}
							else
							{
								jQuery.ajax(
								{
									url: '/properties/invite_user/ajax_get_owner_list',
									type: 'GET',
									async: false,
									context: document.body,
									success: function(data)
									{
										jQuery("#owner_carousel").html(data);
									}
								});
								
								jQuery.ajax(
								{
									url: '/properties/invite_user/ajax_get_selected_owner_list',
									type: 'GET',
									async: false,
									context: document.body,
									success: function(data)
									{
										jQuery("#owner_selected_carousel").html(data);
									}
								});
							}
							
							AddOwner.addOwnerBtn();    
							AddOwner.changeOwnerRole();
							AddOwner.showAddOwnerBtn(); 
							AddOwner.removeOwner();

						}
						else
						{
							alertNotification(data.message);
						}
					}
				});
			
				//-- Re initialize jCarousel --//
				jQuery(".current-owners_carousel").jCarouselLite(
				{
		        	btnNext: ".next",
		        	btnPrev: ".prev"
		    	});
                         $("#confirm_remove").hide();
                         return false;
}