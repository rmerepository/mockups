<div class="modal fade" id="updateHouseHold" tabindex="-1" role="dialog" aria-labelledby="updateHouseHold" aria-hidden="true" style="display: none;">
<div class="modal-dialog overflow-visible">
    <form action="https://members-dev.rentmyestate.com.au/" accept-charset="utf-8" method="post" id="frmHousehold"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="2a90e0743aeb2c684110a0f04e2e9266">
</div>	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		<h2 class="normal-weight">Update Household</h2>
	</div>
	
	<div class="modal-body">

	<div class="well">
		<div class="text-danger"><b>Note: Need warning text</b></div>
	</div>
	
	<h3>Tenant Information</h3>

		<div class="control-group">
			<label class="control-label" for="firstName">First Name</label>
			<div class="controls">
                            <input autocomplete="off" data-is-required="true" name="first_name" placeholder="First Name" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">
			</div>
			<p class="uihelp-text">If multiple tenants, enter the main contact</p>
		</div>
		<div class="control-group">
			<label class="control-label" for="lastName">Last Name</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="last_name" placeholder="Last Name" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">
			</div>
		</div>

		<div class="control-group">
			<label class="control-label" for="mobileNumber">Mobile Number</label>
			<div class="controls controls-popover-float">
				<input autocomplete="off" data-is-required="true" name="mobile" placeholder="Mobile Number" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text"> <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Soon we'll be able to send late notifications when your tenants have not paid their rent." style="vertical-align: top;" data-original-title="Coming Soon"></span>
			</div>
		</div>

		<div class="control-group">
			<label class="control-label" for="paymentPeriod">Email Address</label>
			<div class="controls controls-popover-float">
				<input autocomplete="off" data-is-required="true" name="email" placeholder="Email" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">  <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Soon your tenant will be able to log in and see all their payments and get rent reminders." style="vertical-align: top;" data-original-title="Coming Soon"></span>
			</div>
		</div>



		<br/><h3>Lease &amp; Rent Payment</h3>

		<div class="control-group">
			<label class="control-label" for="leaseStartDate">Lease Start Date</label>
			<div class="controls controls-popover-float">
				<input autocomplete="off" data-is-required="true" name="move_in_date" placeholder="Move in Date" class="enable-click-date-window form-control fc-large ui-date-moved-in hasDatepicker" maxlength="30" tabindex="1" value="" type="text" id="dp1411953134896"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="...">
			<!--	<span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="If your tenant has already moved in, enter the date the rent is currently paid to." style="vertical-align: top;" data-original-title="Tenants already moved in?"></span> -->
			</div> 
		</div>

		<div class="control-group">
			<label class="control-label" for="rentAmount">Rent Amount</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="amount" placeholder="$500" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">
				<span class="uihelp-text">How much rent are they paying? </span>
			</div> 
		</div>

		<div class="control-group">
			<label class="control-label" for="modePayment">Payment Period</label>
			<div class="controls">
				<span class="k-widget k-dropdown k-header fc-large" unselectable="on" role="listbox" aria-haspopup="true" aria-expanded="false" tabindex="1" aria-owns="modePayment_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false" aria-activedescendant="modePayment_option_selected" style=""><span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">Weekly</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span><input data-is-required="true" name="frequency" id="modePayment" placeholder="Select how often" class="fc-large" maxlength="30" value="" type="text" data-role="dropdownlist" style="display: none;"></span> 
				<span class="uihelp-text">How often is the rent to be paid</span>
			</div> 
		</div>
               

	</div>

	<div class="modal-footer">
            <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" id="saveHousehold">Save</button>
	</div>
	</div>	
</form>
</div>
</div>