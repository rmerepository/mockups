var AddOwner =
	{
	/*-- CHANGEOWNERROLE -----------------------------------------------------*/
	changeOwnerRole : function()
		{
		$("#owner_carousel_ul").off("mouseenter");
		$("#owner_carousel_ul").on("mouseenter", "li", function(event)
			{
			$(this).addClass('current');
			});

		$("#owner_carousel_ul").off("mouseleave", "li");
		$("#owner_carousel_ul").on("mouseleave", "li", function(event)
			{
			$(this).removeClass('current');

			$(this).find('.changeuserRole-popover-holder').hide();
			$(this).find('h5').removeClass('active');

			$(this).find('.changeusertype-popover-holder').hide();
			$(this).find('.owner-label').removeClass('active');
			});

		$(".owner-name").off("mouseenter", "h5");
		$(".owner-name").on("mouseenter", "h5", function(event)
			{
			$(this).addClass('active');
			$(this).parents('li').find('.changeuserRole-popover-holder')
			  .show();
			});

		$(".owner-type").off("mouseenter", ".owner-label");
		$(".owner-type").on("mouseenter", ".owner-label", function(event)
			{
			$(this).parents('li').find('.changeusertype-popover-holder').show();
			$(this).addClass('active');
			});


		$("#owner_carousel_ul").off("click", ".changeuserRole a");
		$("#owner_carousel_ul").on("click", ".changeuserRole a", function(event)
			{
			event.preventDefault();

			var action_url 	= $(this).attr('href');
			var role 		= $(this).html();
			var roleHolder	= $(this).parents('li').find('h5');

			$.ajax(
				{
				url: action_url,
				type: 'GET',
				async: false,
				context: document.body,

				success: function(data)
					{
					var data = jQuery.parseJSON(data);

					if(data.status != 'ERROR')
						{
						roleHolder.html(role);
						uiAlertMsg(data.message,'success');
						}
					else uiAlertMsg(data.message);

					return false;
					}
				});

			return false;
			});

		$(".owner-list").off('click', '.changeuserType a');
		$(".owner-list").on('click', '.changeuserType a', function(event)
			{
			event.preventDefault();

			var action_url 	= jQuery(this).attr('href');
			var ownerType 	= jQuery(this).data('user-type');
			var roleHolder	= jQuery(this).parents('li').find('.owner-label');

			$.ajax(
				{
				url: action_url,
				type: 'GET',
				async: false,
				context: document.body,

				success: function(data)
					{
					var data = jQuery.parseJSON(data);

					if(data.status != 'ERROR')
						{
						roleHolder.html(ownerType);
						uiAlertMsg(data.message,'success');
						}
					else uiAlertMsg(data.message);

					return false;
					}
				});

			return false;
			});
		},
	/*------------------------------------------------------------------------*/

	/*-- SEARCHADDOWNER ------------------------------------------------------*/
	searchAddOwner: function(item)
		{
		var userid 		= item.id;
		var usertype	= item.type;

		var action_url ="/properties/invite_user/ajax_add_owner?"
			+ "itype=" + usertype + "&iid=" + userid;
		$.ajax(
			{
			url: action_url,
			type: 'GET',
			async: false,
			context: document.body,

			success: function(data)
				{
				var data = jQuery.parseJSON(data);

				if(data.status != 'ERROR')
					{
					$("#owner_carousel_ul").append(data.carousel);
					AddOwner.adjustUserCount(1);

					AddOwner.changeOwnerRole();

					$("#user_organisation").val('');
					$('#AutoResult').hide();
					$(".current-owners_carousel").jCarouselLite(
						{
						btnNext: ".next",
						btnPrev: ".prev"
						});

					uiAlertMsg(data.message,'success');
					}
				else
					{
					uiAlertMsg(data.message);
					}

				return false;
				}
			});
		},
	/*------------------------------------------------------------------------*/

	/*-- REMOVEOWNER ---------------------------------------------------------*/
	removeOwner : function ()
		{
		$("#owner_carousel_ul").on("click", ".remove-user-form-owner-list",
		  function(event)
			{
			event.preventDefault();

			var action_url  = $(this).attr('href');

			var li_parent  = $(this).parent('li');
			var owner_name = li_parent.find('.name').text();

			var confirm_message = "Remove " + owner_name
			  + " from the property?";

			/*-- Create confirm delete modal --*/
			var mod =$("#confirmRemove").rmeModal(
				{
				title : "Confirm Owner Removal",
				body : confirm_message,
				sectionClass : ["modal-dialog"],
				headerClass : ["modal-header"],
				buttons : ["cancel","confirm"],
				cancelText : "No",
				confirmText : "Yes",
				onConfirm : function(data, e)
					{
					AddOwner.removeUserProperty(action_url, li_parent);
					}
				});
			mod.show();

			return false;
			});
		},
	/*------------------------------------------------------------------------*/

	/*-- REMOVEUSERPROPERTY --------------------------------------------------*/
	removeUserProperty : function (action_url, li_parent)
		{
		$.ajax(
			{
			url: action_url,
			type: 'GET',
			async: false,
			context: document.body,

			success: function(data)
				{
				var data = jQuery.parseJSON(data);

				if(data.status != 'ERROR')
					{
					li_parent.remove();
					AddOwner.adjustUserCount(-1);

					uiAlertMsg(data.message,'success');
					}
				else
					{
					uiAlertMsg(data.message);
					}

				return false;
				}
			});

		},
	/*------------------------------------------------------------------------*/

	/*-- ADJUSTUSERCOUNT -----------------------------------------------------*/
	adjustUserCount : function (adjust)
		{
		$('#ucount').html(parseInt($('#ucount').html(), 10)
		  + parseInt(adjust, 10));
		},
	/*------------------------------------------------------------------------*/




	/*-- INITIALIZATION ------------------------------------------------------*/
	init : function ()
		{
		this.changeOwnerRole();
		this.removeOwner();
		}
	/*------------------------------------------------------------------------*/
	};
AddOwner.init();
