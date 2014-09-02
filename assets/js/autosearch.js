;(function($) {
	var defaults = {
		delay 				: 1000, 		// keyup delay [second(s)]
		url 				: "",			// url
		charLimit 			: 2, 			// Set Minimum charater
		searchResultId 		: "AutoResult",
		appendTheResultTo 	: "", 			// An element where you want to insert the result;
		noDataResultMessage	: "No Result",
		allowUserSendEmail	: false,		// Set True if user can send invitation
		defaultAvatar		: "/assets/uploads/thumbnails/user_profile_photo.png-46x46_tmb.jpg",
		userOrgResultClass  : 'user_organisation_result'
	},

	// Set the list template
	listTemplate = [
		'<li class="result clearfix" data-options="{"id":"{{userId}}", "usertype":"{{userType}}"}" >',
			'<div class="photo"><img src="{{ imgSrc}}" /></div>',
			'<div class="name">{{ userName }}</div>',
		'</li>'
	].join(''),

	// Set the delay
	delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();

	// Validate Email
	function validateEmail(email) {
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	}

	// Auto Search
	function Autosearch( element, options ) {

		var widget = this;
		widget.config = $.extend( {}, defaults, options );
		widget.element = element;

		var searchResultId = widget.config.searchResultId;

		widget.element.on('keyup', function( event ) {

			var items = [],
				inputVal = widget.element.val();

			$( "#" + searchResultId).remove();

			if( inputVal && inputVal.length > widget.config.charLimit) {

				delay(function(){
					$.ajax({
					type : "POST",
					url : widget.config.url,
					data : widget.element.attr('name') + "=" + inputVal,
					cache : true,
					async : false,
					dataType : "json",
					success : function( data ) {

						if (data.length) {
							$.each(data, function(key, val) {
							items.push( '<li class="result clearfix" data-options=\'{"id":"'+ val.id +'", "usertype": "' + val.owner_type + '"}\' >'
										 + '<div class="photo"><img src="' + val.photo + '" /></div>'
										 + '<div class="name">' + val.name + "</div>"
									   	 + '</li>' )
							});
						} else {
							if ( widget.config.allowUserSendEmail && validateEmail( inputVal ) ) {
//								items.push( '<li class="result clearfix" data-option-email="'+ inputVal  +'">'
								items.push( '<li class="result clearfix" data-options=\'{"id":"'+ inputVal +'", "usertype": "email"}\' >'
										 + '<div class="photo"><img src="' + widget.config.defaultAvatar + '" /></div>'
										 + '<div class="name" data-send-email="' + inputVal + '">' + inputVal + "</div>"
									   	 + '</li>' )
							} else {
								items.push('<li class="noresult">' + widget.config.noDataResultMessage  + '</li>');
							}
						}

						$('<ul/>', {
							'id' : searchResultId,
							'class' : widget.config.userOrgResultClass,
							'html' : items.join('')
						}).appendTo( widget.config.appendTheResultTo );
					}
				});

				}, widget.config.delay );
			}

		});

		this.init();
	}

	Autosearch.prototype.init = function() {}

	$.fn.autosearch = function( options ) {
		new Autosearch(this.first(), options);
		return this.first();
	};
}( jQuery ));