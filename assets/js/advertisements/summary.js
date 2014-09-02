 var Summary = {
 	jQuery: $,
 	init: function(advertisement_id) {
 		jQuery('#btn-activation-lease').on('click', function() {
 			jQuery(this).toggleClass('active');
 			jQuery('.activation-lease').toggleClass('active');
 		});
 		jQuery('.activation-lease li a').on('click', function() {
 			var getEvent = jQuery(this).attr('value');
// 			console.log(getEvent);
 			jQuery('#btn-activation-lease').toggleClass('active');
 			jQuery('.activation-lease').toggleClass('active');
 			jQuery("#btn-activation-lease").attr('value', getEvent);
 		});
 		this.handleChangeStatus(advertisement_id);
 	},
 	//---------------------------------//
 	//-- Alert Notification function --//
 	//---------------------------------//
 	alertNotification: function(message, alert_type) {
 		alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';
 		$().toastmessage('showToast', {
 			text: message,
 			sticky: true,
 			position: 'top-center',
 			type: alert_type,
 		});
 	},
 	//---------------------------------------------------//
 	//-- Function called for downloading brochure file --//
 	//---------------------------------------------------//
 	downloadFile: function(url) {
 		var iframe;
 		iframe = document.getElementById("download-container");
 		if (iframe === null) {
 			iframe = document.createElement('iframe');
 			iframe.id = "download-container";
 			iframe.style.visibility = 'hidden';
 			document.body.appendChild(iframe);
 		}
 		iframe.src = url;
 	},
 	//--------------------------------------//
 	//-- Function that validates the form --//
 	//--------------------------------------//
 	handleChangeStatus: function(advertisement_id) {
 		if (typeof advertisement_id === "undefined") return false;
 		jQuery('.summary_event').on('click', function(event) {
 			event.preventDefault();
 			var action_taken = jQuery(this).attr('data-event');
 			if (action_taken == 'edit') {
 				window.location = "lease";
 			} else if (action_taken == 'repost') {
 				window.location = "repost";
 			} else {
 				//-- Update Menu --//
 				jQuery.ajax({
 					url: 'summary/ajax_update_menu',
 					type: 'POST',
 					async: false,
 					data: {
 						'summary_event': action_taken
 					},
 					context: document.body,
 					success: function(data) {
 						var res = jQuery.parseJSON(data);
 						if (res.status == 'success') {
 							jQuery("#summary_menu").html(res.data);
 						}
 					}
 				});
 				//-- Update Status --//
 				jQuery.ajax({
 					url: 'summary/ajax_update_status',
 					type: 'POST',
 					async: false,
 					data: {
 						'summary_event': action_taken,
 						'advertisement_id': advertisement_id
 					},
 					context: document.body,
 					success: function(data) {
 						var res = jQuery.parseJSON(data);
 						if (res.status == 'success') {
 							jQuery("#progress-period").html(res.data);
 							Summary.alertNotification(res.message, 'success');
 						}
 					}
 				});
 				//-- Bind this JS to the newly loaded html --//
 				Summary.init(advertisement_id);
 			}
 		});
 	},
 	//----------------------------//
 	//-- TWITTER INTENT HANDLER --//
 	//----------------------------//
 	handleIntent: function(e) {
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
 	}
 };