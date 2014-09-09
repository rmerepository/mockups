var Dashboard_Selector =
	{
	init : function ()
		{
		$('[data-account-switcher=btn]').mouseenter(function(e)
			{
			var elem = $(this);
			elem.children('.ac-overlay').fadeIn();
			elem.children('.button-section').fadeIn();
			elem.children('.account-description').animate({bottom:0});
			})
		.mouseleave(function(e)
			{
			var elem = $(this);
			elem.children('.button-section').hide();
			elem.children('.ac-overlay').hide();
			elem.children('.account-description').animate({bottom:-49});
			});
		}
	};
Dashboard_Selector.init();

