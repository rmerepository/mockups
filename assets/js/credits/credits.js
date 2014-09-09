$(function() {
    //-- form
    $('#frmEmails').meUIHelper();
    
    //-- initialize social media buttons
    initSocialMedia();
    
    //-- brochure action
   
    $('#download_brochure_btn').on("click", function() {
            $('#downloadModal').modal('show');
            $.fileDownload($(this).attr('href'), {
                successCallback: function(url) {
                   $('#downloadModal').modal('hide');
                    uiAlertMsg( 'Your brochure is downloading. Print to "Fit on the page" so it comes out perfectly.', 'success' );
                },
                failCallback: function(responseHtml, url) {

                }
            });
            return false;
        });
    
        
        /**
         * for the zclip
         * @type @call;$
         */
        var sendBtn = $('#sendLinkViaEmail')
                        , clipboardBtn = $('#clipboardBtn')						
                        , linkToCopyAndPaste = $('#linkToCopyAndPaste')
                        // , zclipswf = '//www.steamdev.com/zclip/js/ZeroClipboard.swf';
                         , zclipswf = window.location.protocol+'//'+window.location.host+'/assets/js/zclip/ZeroClipboard.swf';

        // highlight unique referral link		
        linkToCopyAndPaste.on("click", function () {
                $(this).select();
        });
					
                    // SENDING EMAIL
                    sendBtn.click(function(e) {
                            $('#frmEmails').data('meUIHelper').validate( e,this,
                                function(data,el,e,token){
                                    sendInvites(data);
                                })
                    });

		// COPY TO CLIPBOARD

                clipboardBtn.zclip({
	            path: zclipswf,
	            copy: function() {
	            	return linkToCopyAndPaste.val();
	            },
	            afterCopy: function() {	 
	            	var el = $(this);
	            	el.text('Copied!');	               
		            setTimeout(function(){						
									el.text('Copy to Clipboard');
								},3000);
	            }
	        });	

});


/**
 * social media buttons
 * @returns {undefined}
 */
function initSocialMedia(){
    /**
     * Share twitter
     */

    
       twttr.ready(function (twttr) {
            twttr.events.bind('tweet', function (event) {
                // your callback action here...
               sc_shared('tweet');
            });
        });
    
    /**
     * Share facebook
     */
    $("#fb_share_button").click(function(e){
                    FB.ui({
                        description: $(this).attr('share-description'),
                        name:'Rent My Estate',
                        method: 'feed',
                        picture:window.location.protocol+'//'+window.location.host+'/assets/images/n/FB-claim3RME.png',                    
                        link: $(this).attr('share-link'),
                        caption:'rentmyestate.com.au',
                    }, function (response) {
                        if ( response !== null && 
                                typeof response !== 'undefined' ) {
                            sc_shared('facebook');
                        }
                    });
  
	//mixpanel.track("Facebook Share");
         e.preventDefault();
         
});
}


/**
 * this will send invites
 * @returns {undefined}
 */
function sendInvites(data){

    //-- get all the list
    var list_emails = $('#emailAddress').val();    
    var arr_emails = $.grep(list_emails.split(','), function(elem) {
                        return ($.trim(elem) !== '')
                    });
      
     //-- check if its email
     for(var ctr =0;ctr<arr_emails.length;ctr++){

        if(! $('#frmEmails').data('meUIHelper').isEmail($.trim(arr_emails[ctr]))){
            $('#frmEmails').data('meUIHelper').showElementMsg(
                    'emailAddress',arr_emails[ctr]+' is not a valid email','error');
            return false;
        }
     }
     
     //-- disable for sending                 
        var el = $('#sendLinkViaEmail');
        el.text('Sending...');
        el.attr('disabled',true);
        $('#emailAddress').attr('disabled',true);
        
      $.ajax({ url: "/credits/send_email_invites"
        ,type:"POST"
        ,data:data
        ,success: function(response){
            el.text('Send');
            el.attr('disabled',false);
            $('#emailAddress').attr('disabled',false);
            uiAlertMsg('Invitation email successfully sent','success');

        },
        error: function(response){
            uiAlertMsg('There was a problem contacting the email server.','error');
        }, dataType: "json"})
}


/**
 * After success full sharing
 * @param {type} social_media
 * @returns {undefined}
 */
function sc_shared(social_media){
     $.ajax({ url: "/credits/sc_shared"
        ,type:"POST"
        ,data:$.extend({}, $('#frmEmails').data('meUIHelper').getToken(),{type:social_media})
        ,success: function(response){

        }, dataType: "json"})
}