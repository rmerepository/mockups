	<script>
		$(function(){
			$('.k-dd').kendoDropDownList();	
			$("[rel='tooltip']").tooltip();
	
		$(".pop-over-right").popover();

		$(".pop-over-right-with-delay").popover({
			'delay': { show: 100, hide: 3000 }
		});

		$('.burger').click(function(){
				var el = $(this),
						target = $(el).attr('data-target');

				$('#main-nav').toggleClass('show');
		});

		$('.close-lg').click(function(){
				var el = $(this);
				el.closest('nav').removeClass('show');
			})
		});
	</script>

	<script src="/assets/js/ui.dropdownchecklist-1.4-min.js"></script>


	</body>
</html>