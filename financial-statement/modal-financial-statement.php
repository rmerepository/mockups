<div class="modal fade" id="financialStatement" tabindex="-1" role="dialog" aria-labelledby="financialStatement" aria-hidden="true">
<div class="modal-dialog overflow-visible">
<div class="modal-content">
<div class="modal-header">
<button class="close" data-dismiss="modal">×</button>
<h3>Create Your Statement</h3>
</div>
<div class="modal-body">

<h4 class="normal-weight clearfix">
			<label class="control-label normal-weight" for="reportingPeriod">Reporting Period</label>
			
			<!-- <span style="margin-top: 0;top: -2px;position: relative" class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Select July to the following June if this report is for your tax accountant." style="vertical-align: top;" data-original-title="Reporting Period"></span> -->
		</h4>


		<div class="control-group inspection-time clearfix">
			
		<label class="control-label" >From</label>
			<div class="controls clearfix">
					<div class="controls">
					
						<div class="controls">
							<select class="k-dd k-dd-small" >					
								<option value="1">January</option>
								<option value="2">Feb</option>
								<option value="3">March</option>
							</select>	
						</div>

						<div class="controls">
							<select class="k-dd k-dd-small" >					
								<option value="1">2011</option>
								<option value="2">2012</option>
								<option value="3">2013</option>
							</select>	
						</div>						
				</div>
			</div>
			</div>

	<div class="control-group mnu">
    	<div class="controls">    
    	<label>
       	 For end of financial year? <a href="#" data-toggle="collapse" data-target="#additionalInfo"> Provide additional info for your accountant.</a>
     	</label>
     	</div>
	</div>

	<div id="additionalInfo" class="colpd-content oe-mar collapse">
	<div class="control-group">
			<label class="control-label" for="dateAvailable">Date the property first became available for rent</label> 
			<div class="controls controls-popover-float">
				<input autocomplete="off" data-is-required="true" name="dateAvailable" placeholder="Date Availabilty" class="enable-click-date-window form-control fc-large ui-date-moved-in hasDatepicker" maxlength="30" value="" type="text" id="dp1411953134896"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="..."><span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="This date should be the first time a tenant ever moved into the property while you owned it. This info may help your tax accountant save you money. Leave blank if you do not know the answer." style="vertical-align: top;" data-original-title="Date Availabilty"></span>

			</div> 
		</div>


		<div class="control-group">
			<label class="control-label" for="loa">Date loan acquired on property</label> 
			<div class="controls controls-popover-float">
				<input autocomplete="off" data-is-required="true" name="dateLoan" placeholder="Date loan acquired" class="enable-click-date-window form-control fc-large ui-date-moved-in hasDatepicker" maxlength="30"  value="" type="text" id="dp1411953134896"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="..."><span class="tooltip-blue pop-over-right" da	ta-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="This might typically be when you purchased the property. Leave blank if you do not have a loan or unsure of the answer." style="vertical-align: top;" data-original-title="Date loan acquired"></span>

			</div> 
		</div>


		<div class="control-group">
			<label class="control-label" for="lastName">Borrowing fees on loan when first acquired</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="last_name" placeholder="$" class="form-control fc-large" maxlength="30" value="" type="text">
				<span class="tooltip-blue pop-over-right" da	ta-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="This will help your tax accountant save you money. If over 5 years ago it may not be required by your accountant. Leave blank if you are unsure of the answer or don't have a loan on the property." style="vertical-align: top;" data-original-title="Borrowing fees"></span>
			</div>
		</div>


		<div class="control-group">
	    <div class="custom-checkbox-field features-item custom-radio-field">
	        <input  type="checkbox" value="1" id="d2">
	        <label for="d2" data-toggle="collapse" data-target="#depreciationSchedule">Do you have a Depreciation Schedule?</label> <span class="tooltip-blue pop-over-right-with-delay" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="This report is created by a Quantity Surveyor and helps you save $1,000's every year by claiming depreciation on the building and fixtures. <a target='_blank' href='http://www.rentmyestate.com.au/save-over-1000-every-year-when-you-understand-asset-depreciation-on-your-property/'> More info</a>" style="vertical-align: top;" data-original-title="Depreciation Schedule"></span>
	     </div>
		</div>

		<div id="depreciationSchedule" class="colpd-content oe-mar collapse">

		<div class="control-group">
			<label class="control-label" for="capitalAllowance">Total Capital Working Allowance for period</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="capitalAllowance" placeholder="$" class="form-control fc-large" maxlength="30" value="" type="text"> <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Check your report for the total Capital Allowance you can claim for the year. Capital Allowance is the depreciation you can claim on the building (house). Call your accountant for advice." style="vertical-align: top;" data-original-title="Total Capital Working Allowance"></span>
			</div>
		</div>


		<div class="control-group">
		<label class="control-label" for="lastName">Total Fixture &amp; Fittings for period</label>
	    <div class="controls">
	       <input autocomplete="off" data-is-required="true" name="last_name" placeholder="$" class="form-control fc-large" maxlength="30" value="" type="text"><span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Check your report for the total fixture and fittings you can claim for the period. This refers to the depreciation you can claim on things like air conditioning, appliances, curtains etc." style="vertical-align: top;" data-original-title="Total Fixture &amp; Fittings"></span>
	     </div>
		</div>
		</div>
	</div>

</div>
<div class="modal-footer">


<a href="#" data-dismiss="modal">Cancel</a>
&nbsp;&nbsp;&nbsp;<button class="btn btn-primary" id="confirmDelete" data-dismiss="modal">Get Report</button>
</div>
</div>
</div>
</div>