jQuery(document).ready(function(){
	
	uiDropDown( "#organisation_type", orgTypeSrc, "value" , "id");
	
	jQuery("#add_organisation").validate(
		{
			onfocusout: function(element) { jQuery(element).valid();},
			errorElement: "div",
			errorClass: "msg",
			rules:
			{
				abn: 
				{
					required: true,
					number: true,
					maxlength: 11,
					minlength: 11,
					uniqueAbn: true
				},
				email: 
				{
					email: true,
					maxlength: 50
				},
				organisation_name: 
				{
					required: true,
					maxlength: 50,
				},
				unit_number: 
				{
					required: false,
					maxlength: 5,
				},
				street_number: 
				{
					required: false,
					maxlength: 10,
				},
				street_name: 
				{
					required: true,
					maxlength: 50
				},
				suburb: 
				{
					required: true,
					maxlength: 50
				},
				postcode: 
				{
					required: true,
					maxlength: 4,
					number: true
				},
				postal_unit_number: 
				{
					required: false,
					maxlength: 5,
					number: true
				},
				postal_street_number: 
				{
					required: false,
					maxlength: 10,
					number: true
				},
				postal_street_name: 
				{
					required: true,
					maxlength: 50
				},
				postal_suburb: 
				{
					required: true,
					maxlength: 50
				},
				postal_postcode: 
				{
					required: true,
					maxlength: 4,
					number: true
				}
			},
			highlight: function(element, errorClass) 
			{
			     jQuery(element).parent().addClass('error');
			     jQuery(element).parent().removeClass('warning');
			     jQuery(element).parent().removeClass('success');
			     jQuery(element).parent().find("em").remove(); 
			     jQuery(element).parent().append("<em></em>");
			},
			unhighlight: function(element, errorClass) 
			{
			     jQuery(element).parent().addClass('success');
			     jQuery(element).parent().removeClass('error');
			     jQuery(element).parent().removeClass('warning');
			     jQuery(element).parent().find("em").remove(); 
			     jQuery(element).parent().append("<em></em>");
			},
			messages:
			{
				unit_number:
				{
					number: 'Numeric characters only',
					maxlength: 'Maximum of 5 characters'
				},
				street_number:
				{
					number: 'Numeric characters only',
					maxlength: 'Maximum of 10 characters'
				},
				postcode:
				{
					number: 'Numeric characters only',
					maxlength: 'Maximum of 4 characters'
				}
			}
		}
	);
});