//////////////////////////////
// JS FOR form validations  //
//////////////////////////////

jQuery(document).ready(function(){

	jQuery("#form_advertisement_lease").validate(
	{
		//onfocusout: function(element) { jQuery(element).valid();},
		errorElement: "div",
		errorClass: "msg",
		rules:
		{
			weekly_rent_amount: 
			{
				required: true,
				maxlength: 10,
				min: 1,
				max: 10000,
				number: true
			},
			bond_amount: 
			{
				required: true,
				maxlength: 10,
				max: 50000,
				number: true
			},
			date_available: 
			{
				required: true,
				maxlength: 15
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
			weekly_rent_amount:
			{
				number: 'Numeric characters only'
			},
			bond_amount:
			{
				number: 'Numeric characters only'
			}
		}
	});
	
	jQuery("#weekly_rent_amount").keyup(function(){

			var rentAmount = $(this).val();
			if( !isNaN(rentAmount)  )	
				jQuery("#bond_amount").val(Number(rentAmount * 4));

	});
});