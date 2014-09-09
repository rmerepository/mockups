var AddOwner = {

	
	 init : function () {
			this.showAddOwnerBtn(); 
			this.addOwnerBtn();    
			this.changeUserRole();
			this.addProperty();
	    },

	showAddOwnerBtn : function() {

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
					
					//-- Re initialize jCarousel --//
					jQuery(".current-owners_carousel").jCarouselLite(
					{
			        	btnNext: ".next",
			        	btnPrev: ".prev"
			    	});
			    	
					AddOwner.init();
					
					return false;
			});		
	    },
	
	
	changeUserRole : function() 
	{
	
		var currentOwner = $(".owners-section");
		var ownerNameSection = $('.owner-name');
	
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
	
		currentOwner.on("click", ".remove-user-form-owner-list", function(event)
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
		
			//-- Re initialize jCarousel --//
			jQuery(".current-owners_carousel").jCarouselLite(
			{
	        	btnNext: ".next",
	        	btnPrev: ".prev"
	    	});
	    	
	    	AddOwner.init();
			
			return false;
		});
		
		currentOwner.on("click", ".changeuserRole a", function(event)
		{
			var role 		= $(this).html();
			var roleCaption = $(this).parents('li').find('h5').html(role);
			var action_url 	= $(this).attr('href');
			
			jQuery.ajax(
			{
				url: action_url,
				type: 'GET',
				async: false,
				context: document.body,
				success: function(data)
				{
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
		
		addProperty : function()
		{
			jQuery(".save-and-exit-btn").on("click", function(event)
			{
				return false;
			});
		},
	};

AddOwner.init();


