<div class="info-group ig-border-bottom">
	<h3 id="lblRentReminider">Last sent [21/05/2014]</h3>
	<div class="v-lighter-text">Rent Reminders <span id="addAdressPopover" data-html="true" data-trigger="hover" data-toggle="popover" data-original-title="Rent Reminders" data-content="If your tenant has missed or not paid their rent in full, they will receive email notifications over the following 16 days or until the rent is paid. Please ensure you still follow the formal procedures to terminate the tenancy if they don’t pay. <a href='http://www.rentmyestate.com.au/rent-payments/' target='_blank'>Read more." class="tooltip-blue po-small pop-over-right va-middle base-align" data-placement="right"></span></div>

	<div class="info-g-action"> 
		<div class="sw_small onoffswitch clearfix inline-block va-middle" style="margin-right: 22px;">
	    <input type="checkbox" name="rentReminiders" class="onoffswitch-checkbox" id="rentReminiders" checked="checked" >
	    <label class="onoffswitch-label" for="rentReminiders">
	        <div class="onoffswitch-inner"></div>
	        <div class="onoffswitch-switch"></div>			        
	    </label>
	</div>
	</div>

</div>

<script>
	$(function(){
		$(".pop-over-right").popover({
			'delay': { show: 100, hide: 3000 }
		});

		$('#rentReminiders').click(function(){

			var el = $(this);
			// open switch
			// sample
			
			if ( el.is(':checked') ) {
				$('#lblRentReminider').text('Last sent [21/05/2014]');
			} else {
				$('#lblRentReminider').text('Turned off	');
			}

		})

	})

</script>