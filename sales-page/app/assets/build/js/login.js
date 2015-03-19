jQuery( document ).ready(function( $ ){

	var appSite = 'https://members.rentmyestate.com.au/' , 
			referurl = '';

 	$('#uiLoginWrap').rmeAuth({
		host:appSite,
		renderNav:true,
		page_url: window.location.href,
		sourceUrl:referurl,
		page_title:document.title
	});
	
	// Register
	$('[data-register=me]').on('click', function() {
		var el = $(this), 
			elTarget = el.attr('data-target-members');

		if ( $('#uiLoginWrap .logged-in').length ) {

			if ( typeof elTarget === "undefined" ) {
				window.location.href = appSite;
			} else {
				window.location.href = elTarget;
			}
			

		} else {
			$('#SIGNUPRME').click();		
			return false;
		}

	});
	// Login
	$('[data-login=me]').on('click', function() {

		var el = $(this), 
			elTarget = el.attr('data-target-members');

		if ( $('#uiLoginWrap .logged-in').length ) {

			if ( typeof elTarget === "undefined" ) {
				window.location.href = appSite;
			} else {
				window.location.href = elTarget;
			}
			
		} else {
			$('#LOGINRME').click();		
			return false;
		}

	});

	// Register
	$('[data-ref-signup=me]').on('click', function() {
		$('#SIGNUPRME').click();
		$('#referralModal').modal('close');
		return false;
	});
});