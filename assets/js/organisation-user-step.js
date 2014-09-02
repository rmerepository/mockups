function alertNotification(message,alert_type) 
{
	alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';

    $().toastmessage('showToast', {
        text     : message,
        sticky   : true,
        position : 'top-center',
        type     : alert_type,
    });
}


var AddOwner = {
	 init : function () {
	        this.showAddOwnerBtn(); 
		    this.addOwnerBtn();    
			this.changeUserRole();
			this.searchAddOwner();
			this.removeUser();
	    },

	showAddOwnerBtn : function() 
	{
		var currentOwner = $(".select-owners");
	
		currentOwner.on("mouseenter", "li", function(event)
		{
			 $(this).find('a.addOwnerBtn').show();
		});

		currentOwner.on("mouseleave", "li", function(event)
		{
			 $('a.addOwnerBtn').hide();
		});
		
		currentOwner.on("click", "a.addOwnerBtn", function(event)
		{
				var action_url = $(this).attr('href');
				
				jQuery.ajax(
				{
					url: action_url,
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						jQuery.ajax(
						{
							url: 'invite_user/ajax_get_owner_list',
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
							url: 'invite_user/ajax_get_selected_owner_list',
							type: 'GET',
							async: false,
							context: document.body,
							success: function(data)
							{
								jQuery("#owner_selected_carousel").html(data);
							}
						});
					}
				});
				
				
				
				//-- Re initialize jCarousel --//
				jQuery(".current-owners_carousel").jCarouselLite(
				{
		        	btnNext: ".next",
		        	btnPrev: ".prev"
		    	});
		    	
		    	AddOwner.showAddOwnerBtn(); 
		    	AddOwner.addOwnerBtn();    
				AddOwner.changeUserRole();
				AddOwner.removeUser();
				
				return false;
		});		
    },
	
	
	
	
	/**
	 * Function that handles removal of user
	 */
	removeUser : function ()
	{
		var currentOwner 		= $(".owners-section");
		
		currentOwner.on("click", ".remove-user-form-owner-list", function(event)
		{
			var action_url = $(this).attr('href');
			var own_user	= jQuery(this).attr('data-loggeduser');
			
			if(own_user == 1)
			{
				var confirm_message = "Are you sure you want to remove your access to this organisation?";
			}
			else
			{
				var confirm_message = "Remove this owner from the organisation?";
			}

        $("#hlink").val(action_url);
        $("#message_confirm").html(confirm_message);
        $("#confirm_remove").show();
        /*
			var remove_user = confirm(confirm_message);
			
			if(remove_user)
			{
				jQuery.ajax({
					url: action_url,
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						var data = jQuery.parseJSON(data);
							
						if(data.success == 1)
						{
							//-- If deleting own account from organisation, redirect to owner dashboard after --//
							if(own_user == 1)
							{
								window.location = "/";
							}
							else
							{
								
								jQuery.ajax(
								{
									url: 'invite_user/ajax_get_owner_list',
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
									url: 'invite_user/ajax_get_selected_owner_list',
									type: 'GET',
									async: false,
									context: document.body,
									success: function(data)
									{
										jQuery("#owner_selected_carousel").html(data);
									}
								});
							}
							
							AddOwner.showAddOwnerBtn(); 
					    	AddOwner.addOwnerBtn();    
					    	AddOwner.changeUserRole();
							AddOwner.removeUser();
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
	 * Function for changing user role
	 */
	changeUserRole : function() 
	{
		var currentOwner 		= $(".owners-section");
		var ownerNameSection 	= $('.owner-name');
	
		currentOwner.on("mouseenter", "li", function(event){
			$(this).addClass('current');
		});
	
		currentOwner.on("mouseleave", "li", function(event){
			$(this).removeClass('current');
			$(this).find('.changeuserRole-popover-holder').hide();
			$(this).find('h5').removeClass('active');
		});

		ownerNameSection.on("mouseenter", "h5", function(event){
			$(this).addClass('active');
			$(this).parents('li').find('.changeuserRole-popover-holder').show();
		});
		
		currentOwner.on("click", ".changeuserRole a", function(event)
		{
			var action_url 	= $(this).attr('href');
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
					}
					else
					{
						alertNotification(data.message);
					}
				}
			});
			return false;
		});
		},




		
		addOwnerBtn : function()
		{
				jQuery(".current-owners").on("click", "a", function(event){
					 return false;
				});
		},
		
	
		/**
		 * Function that handles the adding of user via the auto-complete
		 */
		searchAddOwner: function()
		{
			// GET USER ID WHEN CLICKED ON THE USER RESULT 
			jQuery(".results").on("click", "li.result", function(event)
			{

				var userid 		= $(this).data('options').id;
				var usertype	= $(this).data('options').usertype;
				var action_url  = "/organisations/invite_user/ajax_add_remove_owner?action=add&type="+usertype+"&id="+userid;
		
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
							url: 'invite_user/ajax_get_owner_list',
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
							url: 'invite_user/ajax_get_selected_owner_list',
							type: 'GET',
							async: false,
							context: document.body,
							success: function(data)
							{
								jQuery("#owner_selected_carousel").html(data);
							}
						});
								 			
			 			alertNotification(data1.message,'success');
				    
				 		AddOwner.showAddOwnerBtn(); 
				 		AddOwner.addOwnerBtn();    
						AddOwner.changeUserRole();
						AddOwner.removeUser();
					}
			 	});
						
		 		jQuery("#user_organisation").val('');
		
				jQuery('.search-meta .results #AutoResult').remove();
		
				jQuery(".current-owners_carousel").jCarouselLite(
				{
					btnNext: ".next",
					btnPrev: ".prev"
			    });
			});
			// HIDE RESULT 
			jQuery("body").on("click", function(event)
			{
				jQuery('.search-meta .results #AutoResult').hide();
				// will prevent click event from executing	return false;
			});

		},
		
	};

AddOwner.init();


function removeUserProperty(){
    var action_url =$("#hlink").val();
    var own_user	= jQuery(this).attr('data-loggeduser');
jQuery.ajax({
					url: action_url,
					type: 'GET',
					async: false,
					context: document.body,
					success: function(data)
					{
						var data = jQuery.parseJSON(data);
							
						if(data.success == 1)
						{
							//-- If deleting own account from organisation, redirect to owner dashboard after --//
							if(own_user == 1)
							{
								window.location = "/";
							}
							else
							{
								
								jQuery.ajax(
								{
									url: 'invite_user/ajax_get_owner_list',
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
									url: 'invite_user/ajax_get_selected_owner_list',
									type: 'GET',
									async: false,
									context: document.body,
									success: function(data)
									{
										jQuery("#owner_selected_carousel").html(data);
									}
								});
							}
							
							AddOwner.showAddOwnerBtn(); 
					    	AddOwner.addOwnerBtn();    
					    	AddOwner.changeUserRole();
							AddOwner.removeUser();
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