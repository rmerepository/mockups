var InviteAC =
	{
	initialjson : null,
	itemsel : null,

	sourcearray : [],
	autocomp_url : '/properties/invite_user/ajax_search_owner',

	/*-- INITIALIZE_AUTOSEARCH -----------------------------------------------*/
	initialize_autosearch : function ()
		{
		var widgetInst = $('#user_organisation').autocomplete
			({
			delay : 500,
			minLength : 3,
			source : function(request, response)
				{
				var term = request.term.toLowerCase();
				var cache_term = term.substr(0, 3);

				if (cache_term in InviteAC.sourcearray)
					{
					var localresult = InviteAC.sourcearray[cache_term];
					response($.ui.autocomplete.filter(localresult,
					  request.term));
					}
				else
					{
					$.ajax
						({
						url : InviteAC.autocomp_url + '?term=' + cache_term,
						dataType : 'json',

						success : function(data)
							{
							InviteAC.sourcearray[cache_term] = [];

							if (InviteAC.initialjson)
							  $.extend(InviteAC.initialjson, data);
							else InviteAC.initialjson = data;

							$.map(data, function(object, index)
								{
								InviteAC.sourcearray[cache_term].push
									({
									'label' : object.terms,
									'value' : index
									});
								});

							var localresult = InviteAC.sourcearray[cache_term];
							response($.ui.autocomplete.filter(localresult,
							  request.term));
							}
						});
					}
				},

			search : function(event, ui)
				{
				InviteAC.itemsel = null;
				},

			focus : function(event, ui)
			 	{
				InviteAC.itemsel = InviteAC.initialjson[ui.item.value];

				$("#user_organisation").val(InviteAC.itemsel.name);
				return false;
				},

			select : function(event, ui)
			 	{
				InviteAC.itemsel = InviteAC.initialjson[ui.item.value];

				$("#user_organisation").val(InviteAC.itemsel.name);

				var origEvent = event;
				while (origEvent.originalEvent !== undefined)
				  origEvent = origEvent.originalEvent;
				if (origEvent.type != 'keydown')
				  InviteAC.addowner();

				return false;
				}
			})
			.data("autocomplete");

		widgetInst._renderMenu = function (ul, items)
			{
			var that = this;
			$.each( items, function( index, item )
				{
				that._renderItem( ul, item );
				});
			};

		widgetInst._renderItem = function (ul, item)
			{
			var itemsel = InviteAC.initialjson[item.value];

			var listItem = $("<li></li>").data("item.autocomplete", item);
			listItem.html('<a>' + itemsel.layout + '</a>');
			listItem.appendTo(ul);
			return listItem;
			};
		},
	/*------------------------------------------------------------------------*/

	/*-- INITIALIZE_ADDOWNER -------------------------------------------------*/
	initialize_addowner : function()
		{
		$('#user_organisation').keyup(function(e)
			{
    		if(e.keyCode == 13)
    			{
				e.preventDefault();
				InviteAC.addowner();
				$(this).autocomplete('close');
    			}
			});
		},
	/*------------------------------------------------------------------------*/

	/*-- DO_ADDOWNER_ACTION --------------------------------------------------*/
	addowner : function ()
		{
		var newitem = null;
		if (!InviteAC.itemsel)
			{
			var typedvalue = $('#user_organisation').val();
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			if (!pattern.test(typedvalue))
				{
				uiAlertMsg("Please type in a valid email address or select a "
				  + "user/organisation from the list.");
				return false;
				}

			newitem = {'id':typedvalue,'type':'email'};
			}
		else
			{
			var iarray = InviteAC.itemsel.id.split("-");
			newitem = {'id':iarray[1],'type':InviteAC.itemsel.type};
			}

		AddOwner.searchAddOwner(newitem);
		},
	/*------------------------------------------------------------------------*/


	/*-- INIT ----------------------------------------------------------------*/
	init : function()
		{
		InviteAC.initialize_autosearch();
		InviteAC.initialize_addowner();
		}
	/*------------------------------------------------------------------------*/
	};
InviteAC.init()

