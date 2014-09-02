var AccountSetting = {

	jQuery : $,

	init : function ()
	{
		this.ajaxifyTab();
    },

    ajaxifyTab: function() {

		// Load the first tab

		$('#password').load('tab_password', function() {
            $('#account_settings').tab(); //initialize tabs
            $("#new_password").password_strength(); // Password Strength
            AccountSetting.processEmailForm();
            AccountSetting.processPasswordForm();
        });

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        	var pattern=/#.+/gi,  //use regex to get anchor(==selector)
			contentUrl = e.target.toString().match(pattern)[0];

			$(contentUrl).empty();
				$(contentUrl).load('tab_' + contentUrl.replace('#','') , function(event){
				AccountSetting.processEmailForm();
				AccountSetting.processPasswordForm();
            });


			$.ajax( {
	  			complete : function() {
	  				$('#loader').hide();
	  			}
	  		});

        });
    },

	//------------------------------------------//
	//-- Function that handles processes form --//
	//------------------------------------------//
	processEmailForm: function() {
		$('#changeEmail').on('submit', function(e) {
			e.preventDefault();

			if( submitValidate( '#changeEmail' ) ) {

				var currentPassword = $('#email_current_password').val();
				var newEmail = $('#new_email').val();

				$.ajax({
					url: 'account_settings/change_email',
					type: 'POST',
					data:
						{
						'password':currentPassword,
						'email':newEmail
						},
					async: false,
					dataType: 'JSON',
					success: function(data) {
						status = data.status;
						if (data.status == "success")
							{						
								uiBasicMsg(data.data,'success');
                                                                 window.location.href =front_end_url +"/#unverified"
							}
						else {							
								uiBasicMsg(data.data,'error');
						}

					},
					error: function() {
						uiAlertMsg("Server communication error. Please try again later");
					}
				});
			}
		});

	},

	processPasswordForm: function() {
		$('#changePassword').on('submit', function(e) {
			e.preventDefault();

			var currentPassword = $('#current_password').val();
			var passwordField = $('#new_password').val();
			var retypePassword = $('#retype_password').val();
		
			if( submitValidate( '#changePassword' ) ) {
		
				$.ajax({
					url: 'account_settings/change_password',
					type: 'POST',
					data:
						{
						'current_password':currentPassword,
						'new_password':passwordField,
						'retype_password':retypePassword
						},
					async: false,
					dataType: 'JSON',
					success: function(data) {
						status = data.status;
						if (data.status == "success")
							{							
							uiBasicMsg(data.data,'success');
							}
						else {							
							uiBasicMsg(data.data,'error');
							
						}
					},
					error: function() {
						uiAlertMsg("Server communication error. Please try again later");
					}
				});

			}

		});

	}

};

AccountSetting.init();