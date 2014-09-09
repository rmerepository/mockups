var AddOrg =
	{
	config : null,
	address : null,
	autocomplete : null,

	/*-- CLEARFIELDS ---------------------------------------------------------*/
	clearfields : function ()
		{
		var dropdownlist = $("#organisation_type").data("kendoDropDownList");
		dropdownlist.select(0);

		$('#modalOrganisation input:text').val('');
		$('#modalOrganisation .controls').removeClass('error success');
		$('#modalOrganisation .controls').find('em, .msg').remove();
		$('#show_address').attr('checked',false);
		$('#address_form').hide();
		},
	/*------------------------------------------------------------------------*/


	/*-- ADDORGANISATION -----------------------------------------------------*/
	addOrganisation : function ()
		{
		var orgdata =
			{
			"orgType" : $("#organisation_type").val(),
			"orgName" : $("#organisation_name").val(),
			"abn" : $("#abn").val(),
			"diffAddr" : $("#show_address").attr('checked'),
			"address" : $("#modalAc").val(),
			"address_google" :
				{
				'unit_number' : AddOrg.address.unit_number,
				'street_number' : AddOrg.address.street_number,
				'street_name' : AddOrg.address.street_name,
				'street_type' : AddOrg.address.street_type,
				'suburb' : AddOrg.address.suburb,
				'state' : AddOrg.address.state,
				'postal_address' : AddOrg.address.postal_code,
				'country' : AddOrg.address.country
				}
			};
		var action_url = "/organisations/create/api";

		$.ajax(
			{
			url : action_url,
			type : 'POST',
			async : false,
			data : orgdata,

			success : function(data)
				{
				var data = jQuery.parseJSON(data);

				if(data.status != 'ERROR')
					{
					uiAlertMsg(data.message,'success');
					AddOrg.clearfields(),
					$('#modalOrganisation').modal('hide');

					var item =
						{
						'id' : data.organisation_id,
						'type' : 'organisation'
						};
					AddOwner.searchAddOwner(item);
					}
				else uiAlertMsg(data.message);

				return false;
				}
			});

		},
	/*------------------------------------------------------------------------*/

	/*-- INITCONTROLS --------------------------------------------------------*/
	initcontrols : function ()
		{
		uiDropDown('#organisation_type', orgTypeSrc, "value", "id");

		$('#submit_organisation').on('click', function(event)
			{
			$('#modalOrganisation').data('meUIHelper')
			  .validate(event, this, function(data,el)
			  	{
 				var abnval = $('#abn').val();
				var action_url = "/organisations/create/ajax_check_abn?abn="
				  + abnval;

				$.ajax(
					{
					url : action_url,
					type : 'GET',
					async : false,

					success : function(data)
						{
						var data = jQuery.parseJSON(data);

						if(data.status == 'ERROR')
							{
							$('#modalOrganisation').data('meUIHelper')
							  .showElementMsg('abn','ABN already exists.',
						      'error');
						    }
						else AddOrg.addOrganisation();
						}
					});
				});
			});

		if ($("#show_address").is(':checked')) $("#address_form").toggle(true);
		else $("#address_form").toggle(false);

		$("#show_address").click(function ()
			{
			$("#address_form").toggle(this.checked);
			});

		$("#closeOrgForm").on('click', function(e)
			{
			AddOrg.clearfields();
			});
		},
	/*------------------------------------------------------------------------*/

	/*-- INITVALIDATE --------------------------------------------------------*/
	initvalidate : function ()
		{
		$('#modalOrganisation').meUIHelper();

		$('#abn').on('blur', function()
			{
			var abnval = $('#abn').val();
			var action_url = "/organisations/create/ajax_check_abn?abn="
			  + abnval;

			$.ajax(
				{
				url : action_url,
				type : 'GET',
				async : false,

				success : function(data)
					{
					var data = jQuery.parseJSON(data);

					if(data.status == 'ERROR')
					  $('#modalOrganisation').data('meUIHelper')
					    .showElementMsg('abn','ABN already exists.', 'error');
					else return true;
					}
				});
			});

		},
	/*------------------------------------------------------------------------*/

	/*-- INIT_GOOGLEMAPS -----------------------------------------------------*/
	init_googlemaps : function ()
		{
		var modal = this;
		modal.config = {}
		modal.address=
			{
			unit_number:"",
			street_number:"",
			street_name:"",
			street_type:"",
			suburb:"",
			state:"",
			postal_code:"",
			country:"",
			full:""
			};

		var opt =
			{
			componentRestrictions: {country: 'au'}
			};
		modal.autocomplete = new google.maps.places.Autocomplete((document.getElementById('modalAc')), opt);

		google.maps.event.addListener(modal.autocomplete, 'place_changed', function()
			{
			var place = modal.autocomplete.getPlace();

			if(place.geometry)
				{
				var componentForm =
					{
					street_number: ['street_number', 'short_name'],
					route: ['street_name','long_name'],
					locality: ['suburb','long_name'],
					administrative_area_level_1: ['state','short_name'],
					country: ['country','long_name'],
					postal_code: ['postal_code','short_name']
					};

				for (var i = 0; i < place.address_components.length; i++)
					{
					var addressType = place.address_components[i].types[0];
					if(componentForm[addressType])
						{
						var val = place.address_components[i][componentForm[addressType][1]];
						modal.address[componentForm[addressType][0]]=val;
						}
					}
				}

			modal.address.full = place.formatted_address;

			$('#modalAc').val(modal.address.full);
			$('#modalAc').on('blur', function()
				{
				// timeoutfunction allows to force the autocomplete field to only display the street name.
				if(place){ setTimeout(function(){ $('#modalAc').val(modal.address.full); }, 1); }
				});

			//--- format
			});

		$('#modalAc').keypress(function(e)
			{
			$('.pac-container').css('z-index', '9999');
			if (e.which == 13)
				{
				formSubmit(e);
				}
			});

		$('#modalAc').val(modal.address.full);
		},
	/*------------------------------------------------------------------------*/

	/*-- GEOLOCATE -----------------------------------------------------------*/
	geolocate : function()
		{
		var geolocation = new google.maps.LatLng(-25.274398, 133.775136);

		AddOrg.autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
		  geolocation));
		},
	/*------------------------------------------------------------------------*/

	/*-- INIT ----------------------------------------------------------------*/
	init : function ()
		{
		AddOrg.initcontrols();
		AddOrg.initvalidate();
		AddOrg.init_googlemaps();
		}
	/*------------------------------------------------------------------------*/
	}
AddOrg.init();
