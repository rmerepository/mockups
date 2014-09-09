function rme_form_validate(element_id){
    jQuery("#"+element_id).validate(
		{
			onfocusout: function(element) { jQuery(element).valid();},
			errorElement: "div",
			errorClass: "msg",
			rules:
			{
				password: 
				{
					maxlength: 100,
					required: true
				},
				captcha_answer:
				{
					maxlength: 20,
					required: true
				},
				email:
				{
					maxlength: 100,
					required: true
				}
			},
			highlight: function(element, errorClass) 
			{
			     jQuery(element).parent().addClass('has-error');
			     jQuery(element).parent().removeClass('has-warning');
			     jQuery(element).parent().removeClass('has-success');
			     jQuery(element).parent().find("em").remove(); 
			     jQuery(element).parent().append("<em></em>");
			},
			unhighlight: function(element, errorClass) 
			{
			     jQuery(element).parent().addClass('has-success');
			     jQuery(element).parent().removeClass('has-error');
			     jQuery(element).parent().removeClass('<has-></has->warning');
			     jQuery(element).parent().find("em").remove(); 
			}
			

		}
	);
}