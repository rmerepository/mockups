<div class="modal fade" id="rentUpdate" role="dialog" aria-labelledby="rentUpdate" aria-hidden="true">
<div class="modal-dialog overflow-visible">
  
	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
         <h2 class="normal-weight" id="captionPayment">Rent Update</h2>
	</div>
	
	<div class="modal-body">

	<div class="well w-warning">
	<table>
		<tr>
			<td>
				<i class="fa fa-exclamation-circle fa-icd"></i>		
			</td>
			<td>Your current rent amount is $400</td>
		</tr>
	</table>
	</div>

		<div class="control-group">
			<label class="control-label" for="newAmount">New Rent Amount</label>
			<div class="controls controls-popover-float">
				<input autocomplete="off" data-is-required="true" name="newAmount" id="newAmount" placeholder="$" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">
				<div class="uihelp-text">1.9% increase from the current rent</div>
			</div>
		</div>	


		<div class="control-group">
			<label class="control-label" for="paymentPeriod">Payment Period</label>
			<div class="controls controls-popover-float">
			<select class="k-dd fc-large" >					
				<option value="1">Weekly</option>
				<option value="2">Fornightly</option>
				<option value="3">4 Weekly</option>
				<option value="4">Monthly</option>
			</select>	
				<span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Content here" style="vertical-align: top;" data-original-title="Title"></span>
			</div>
		</div>

	</div>



	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Confirm Update</button>
	</div>
	</div>	
    </div>


</div>
