var SummaryTenant = {

	jQuery : $	

	, element : {
		labelStat : $('.stat-label')
		, offLabelStat : $(".off-label-stat")
		, onLabelStat : $(".on-label-stat")
		, seekingNotseekingCheckbox : $('#seekingNotseeking')
		, wrapContentSeeking : $('.wrap-seeking')
		, wrapNotContentSeeking : $('.wrap-not-seeking')
		, seeHowItLooks : $('.preview-btn')
		, summaryHeaderText : $('#tenantHeaderLabel')
		, tenantStatusLabel : $('[data-tenant-status=label]')
		, buttonToCopyAndPaste : $('#buttonToCopyAndPaste')
		
		// clipboard swf for crossbrowser support
		, clipClipboardSupport: window.location.protocol+'//'+window.location.host+'/assets/js/zclip/ZeroClipboard.swf'
		, clipBoardFeild : $('#linkToCopyAndPaste')
		, clipBoardCopiedMsg : 'Copied to Clipboard'

	}


	, init : function () {
		this.seekingNotseeking();
		this.seekingNotseekingToggle();
		this.sideColToggle();
		this.copyLink();
	}

	, copyLink : function () {
		var e = this.element;
		e.buttonToCopyAndPaste.zclip({
            path: e.clipClipboardSupport,
            copy: function() {
                return e.clipBoardFeild.val();
            },
            afterCopy: function() {
               var el = $(this);              
               uiAlertMsg(e.clipBoardCopiedMsg,"success");
            }
        });		
	}

	, seekingNotseeking : function () {
		var e = this.element;
		
	  	if( e.seekingNotseekingCheckbox.is(':checked')) {			
			e.onLabelStat.css('font-weight','bold'); 
			e.wrapNotContentSeeking.hide();
			e.wrapContentSeeking.show();
			e.summaryHeaderText.html("You're in the box seat to finding your next home");
			e.tenantStatusLabel.html('Seeking');			
		} else {
			e.offLabelStat.css('font-weight','bold'); 
			e.wrapContentSeeking.hide();
			e.wrapNotContentSeeking.show();
			e.summaryHeaderText.html("Turn your profile on so people know you're looking for a home");
			e.tenantStatusLabel.html('Not Seeking');
		}



/*
		$.ajax(
		{
			type: "POST",
			url: '/tenant/summary/ajax_set_seeking',
			data: 'seekingNotseeking=' + e.seekingNotseekingCheckbox.attr('checked'),
			async: false,
			dataType: 'JSON'
		});
*/

	}

	, seekingNotseekingToggle : function() {
		var e = this.element;
		e.seekingNotseekingCheckbox.click(function() {			
			e.labelStat.css('font-weight','');
			SummaryTenant.seekingNotseeking();
		});
	}

	, sideColToggle : function () {

		$('#sideCol').toggle( function() {
			$(this).addClass('toggle');
			$('.summary-sidebar').animate({ width: 108 }  );
			$('.summary-tenant').animate({ marginLeft: -205 });
			$('.summary-sidebar, .summary-tenant').addClass('collapse');
			$('.summary').hide();
			setTimeout(function(){
				$('.summary').fadeIn();
			},400)
		}, function() {
			$(this).removeClass('toggle');
			$('.summary-sidebar').animate({ width: 300 });
			$('.summary-tenant').animate({ marginLeft: 0 });
			$('.summary-sidebar, .summary-tenant').removeClass('collapse');
			$('.summary').hide();
			setTimeout(function(){
				$('.summary').fadeIn();
			},400)
		
		});

	}

};

SummaryTenant.init();

$(function(){



$("#summary_twitter_intent").click(function(e){
	var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
		windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
		width = 550,
		height = 420,
		winHeight = screen.height,
		winWidth = screen.width;
	e = e || window.event;
	var target = e.target || e.srcElement,
		m, left, top;
	while (target && target.nodeName.toLowerCase() !== 'a') {
		target = target.parentNode;
	}
	if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
		m = target.href.match(intentRegex);
		if (m) {
			left = Math.round((winWidth / 2) - (width / 2));
			top = 0;
			if (winHeight > height) {
				top = Math.round((winHeight / 2) - (height / 2));
			}
			window.open(target.href, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
			e.returnValue = false;
			e.preventDefault && e.preventDefault();
		}
	}

	mixpanel.track("Twitter Share");
});

$("#summary_fb_sharer").click(function(){
	var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
	width = 550,
	height = 420,
	winHeight = screen.height,
	winWidth = screen.width;

	var left = Math.round((winWidth / 2) - (width / 2));
	var top = 0;
	if (winHeight > height){
		top = Math.round((winHeight / 2) - (height / 2));
	}
        
	window.open(facebook_sharer_link, 'fbWin', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);

	mixpanel.track("Facebook Share");
});

$(".preview-btn").click(function () {
	window.location.href = $(this).attr('data-content');
});

$(".save-and-exit-btn").click(function () {
	window.location.href = $(this).attr('data-content');
});

$('#seekingNotseeking').change(function () {
	$.ajax(
	{
		type: "POST",
		url: '/tenant/summary/ajax_set_seeking',
		data: 'seekingNotseeking=' + $(this).attr('checked'),
		async: true,
		dataType: 'JSON',
		success: function(data)
		{
			if(data.result == 'success')
			{
                          
			}
		}

	});
});

$("input#linkToCopyAndPaste").on("click", function () {
	$(this).select();
});



});	



function sendEmail(){
    // check and parse email addresses
    var emails = $("#emailCollection").val();
    var message = $("#message").val();
    var email_collection = emails.split((/,|;/));
    for(var ctr =0;ctr<email_collection.length;ctr++){
        if(email_collection[ctr]==""){
            if(emails==""){
                uiAlertMsg("No email address specified.","error");
            }else{
                uiAlertMsg(email_collection[ctr]+" is not a valid email address","error");
            }
            return false;
        }
    }
    var params = {
        "to":email_collection,
        "message":message,
        "from":$("#fromID").val()
    };
    var url = "/tenant/invitation";
    // post
    ajaxPost(url, params, function(data){
                        if(data.status == 'success')
			{
                            uiAlertMsg("Invitation successfully sent.","success")
			}else{
                uiAlertMsg("Error in sending email invitation.","error");
   }
    },null);
}

