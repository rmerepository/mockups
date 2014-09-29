<div class="modal fade" id="addPayment" role="dialog" aria-labelledby="addPayment" aria-hidden="true">
<div class="modal-dialog">
     <form action="https://members-dev.rentmyestate.com.au/" accept-charset="utf-8" method="post" id="frmPayment"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="dc13d0b2fdc765011adb33e673609e73">
</div>    <input type="hidden" name="lease" id="lease" value="66">
    <input type="hidden" name="collection" id="collection">
	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
         <h2 id="captionPayment">Add New Payment</h2>
	</div>
	
	<div class="modal-body">

		<div class="control-group">
			<label class="control-label" for="dateRecieved">Date Received</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="dateRecieved" id="dateRecieved" placeholder="01-Jan-2014" s="" class="ui-date-received enable-click-date-window form-control hasDatepicker" maxlength="30" tabindex="1" type="text" value="16-Sep-2014"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="...">
			</div>
		</div>	


		<div class="control-group">
			<label class="control-label" for="amount">Amount Received</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="amount" id="amount" placeholder="$" class="form-control" maxlength="30" tabindex="1" value="" type="text">
			</div>
		</div>



		<p class="text-success paymentMsg ds-hide text-center">Payment has been saved</p>

	</div>



	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Confirm Payment</button>
	</div>
	</div>	
    </form></div>


</div>
