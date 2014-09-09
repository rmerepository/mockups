$(document).ready( function() {
	$('.delete_action').click(function(event) {
		var $this = $(this);
		jQuery.ajax({
			url: $this.attr('href'),
			type: 'POST',
			dataType: 'JSON',
			async: true,
			success: function(data){
				if (data.result=='success'){
					$this.parent().parent().parent().remove();
				}
			}
		});
		
		
		return false;
	});
} );