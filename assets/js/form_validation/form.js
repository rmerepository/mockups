jQuery(document).ready(function()
{
	var formMiscFunction = {

	jQuery : $,

	init : function() {
		this.validateFields();
		this.confirmInputPassword();
	},



	confirmInputPassword : function() {
		
		var inputFieldPassword = $('input.password');
		var confirmInputFieldPassword = $('input.re-enter-password');
	
		var paswordCheckMatch = function() {
			var element = confirmInputFieldPassword;
			var parentListElement = element.parents('li');
			if(confirmInputFieldPassword.val()){
				var success = inputFieldPassword.val() === confirmInputFieldPassword.val();
		
				if(success) {
					msgValue = 'Password match';
					parentListElement.addClass('success');
					parentListElement.removeClass('error');
				} else {
					msgValue = 'Password do not match';
					parentListElement.removeClass('success');
					parentListElement.addClass('error');
					$('div.msg').css('display','block');
				}
				
				
				$('div.msg').html(msgValue);
			}
		}

		inputFieldPassword.keyup(paswordCheckMatch).focus(paswordCheckMatch).blur(paswordCheckMatch);
		confirmInputFieldPassword.keyup(paswordCheckMatch).blur(paswordCheckMatch);
	},

	validateFields : function() {

		var EMAIL_REG_EX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// Validate empty fields 

		$('input.required').blur(function(){
				var element = $(this);
				var value = element.val();
				var parentListElement = element.parents('li');
				
					parentListElement.append('<em></em>');
			
				value = $.trim(value);

				if(value == '') {
					parentListElement.removeClass('success');
					
					parentListElement.addClass('error');
				} else {
					parentListElement.removeClass('error');
					parentListElement.addClass('success');
				
				}
		});

		// Validate email 

		$('input.email').blur(function() {
			var element = $(this);
			var value = element.val();
			var parentListElement = element.parents('li');

			if(value != ''){
				parentListElement.removeClass('error');
				if (!EMAIL_REG_EX.test(value)) {
					parentListElement.removeClass('success');
					parentListElement.addClass('warning');	
					if($("#warnins").length==0) {
					parentListElement.append('<div id="warnins">Invalid Email</div>');
					}	
					
				} else {
					parentListElement.addClass('success');
					parentListElement.removeClass('warning');
					parentListElement.children('div').remove();
				} 
			}	
			else {
					parentListElement.addClass('error');
					parentListElement.removeClass('warning');
			}
			
		 });

		
		$('#submitForm').submit(function(){
			
			var valid = true;
			var termsAndCondition = $('input.condition:checked').val();
			if(termsAndCondition == 'on'){
				
				$('input.condition').parents('label').removeClass('redcolorfont');
			} else {
				valid = false;
				$('input.condition').parents('li').addClass('error');
				$('input.condition').parents('label').addClass('redcolorfont');
				$('.msg-termsandcondition').html('Please accept the terms and condition');
			}

			$('input.required').each(function(){
				getValue = $.trim($(this).val());
				if(getValue == ''){
						valid = false;
				}
			});


			$('input.email').each(function() {
				var value = $.trim($(this).val());
				if (!EMAIL_REG_EX.test(value)) {
				valid = false;
				}
			});

			if (!valid) {
					$('input.required').blur();
			}
			
			return valid;
		});
	} 

}

formMiscFunction.init();
});