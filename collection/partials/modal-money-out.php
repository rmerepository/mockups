
<div class="modal fade" id="moneyOut"  role="dialog" aria-labelledby="moneyOut" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         <h2 id="captionPayment">Enter Your Expense</h2>
	</div>
	
	<div class="modal-body">

		<div class="control-group">
			<label class="control-label" for="dateRecieved">Date Paid</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="dateRecieved" id="dateRecieved" placeholder="01-Jan-2014"s class="ui-date-received enable-click-date-window form-control" maxlength="30" tabindex="1" type="text" value="">
			</div>
		</div>	

        <div class="control-group">
            <label class="control-label" for="fortype">Paid For</label>
            <div class="controls">
               	<select class="k-dd" >	
              <option value="1">General Maintenance</option>
              <option value="2">Electrical</option>
              <option value="3">Plumbing</option>
              <option value="4">Property Rates</option>
              <option value="5">Building Insurance</option>
              <option value="6">Landlord Insurance</option>
              <option value="7">Cleaning</option>
              <option value="8">Gardening</option>
              <option value="9">Building</option>
              <option value="10">Painting</option>		
					<option value="">Add more type...</option>
				</select>
            </div> 
        </div>

        <div class="control-group" id="section_newtype" style="display:none">
            <div class="controls">
                <input autocomplete="off" data-is-required="true" name="newtype" id="newtype" placeholder="Enter New Type" class="form-control" maxlength="30" tabindex="1" value="" type="text" >
            </div>
        </div>

                <div class="control-group" id="section_description">
            <label class="control-label" for="description">Description</label>
            <div class="controls">
                <textarea name="description" id="description" placeholder="Repair dishwasher handle" class="form-control"  maxlength="1000"></textarea>  
            </div> 
        </div>


  <div class="control-group">
      <label class="control-label" for="amount">Amount Received</label>
      <div class="controls">
        <input autocomplete="off" data-is-required="true" name="amount" id="amount" placeholder="$" class="form-control" maxlength="30" tabindex="1" value="" type="text" >
      </div>
    </div>
    
        <div class="control-group" id="section_description" style="display:none">
            <label class="control-label" for="description">Description</label>
            <div class="controls">
                <textarea name="description" id="description" placeholder="For June - Aug 14 qrt" class="form-control"  maxlength="1000"></textarea>  
            </div> 
        </div>

	</div>



	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Confirm Payment</button>
	</div>
	</div>	
 
</div>


</div>


<div class="modal fade" id="Remove_confirm" tabindex="-1" role="dialog" aria-labelledby="reaConfirmation" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
	<div class="modal-header">
	  <button class="close" data-dismiss="modal">&times;</button>
	  <h3>Do you want to delete this entry?</h3>
	</div>
	<div class="modal-body">
		<div ></div>
                <div id="confirm_desc"></div>
                <input type="hidden" id="remove_lease" name="remove_lease" value="" />
                <input type="hidden" id="remove_collection" name="remove_collection" value="" />
                <input type="hidden" id="payment_type" name="payment_type" value="" />

	</div>

   <div class="modal-footer">

       <a href="#" data-dismiss="modal">Cancel</a>
         &nbsp;&nbsp;&nbsp;<button class="btn btn-primary" id="confirmDelete" data-dismiss="modal">Ok</button>
   </div>
</div>
      </div>
    </div>