<div class="collapsible-forms">
  <div class="medium">
    <div class="medium-header">
      <h3>
      <span class="collapse-ad collapsed bg-gray" data-toggle="collapse" data-target="#currentAddress_section">
      <i class="colpd-icons"></i>Current Address</span>
      </h3>
    </div>
    <div id="currentAddress_section" class="colpd-content collapse">
      <div class="medium-items">
        <div class="row">
          <div class="col-md-9">
            <div class="control-group">
              <label class="control-label" for="AddressOfPremises">Address of premises</label>
              <div class="controls">
                <input autocomplete="off" name="AddressOfPremises" id="AddressOfPremises" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="control-group">
              <label class="control-label" for="AddressOfPremisesPostcode">Postcode</label>
              <div class="controls">
                <input autocomplete="off" name="AddressOfPremisesPostcode" id="AddressOfPremisesPostcode" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <div class="control-group">
              <label class="control-label" for="PostalAddress">Postal address</label>
              <div class="controls">
                <input autocomplete="off" name="PostalAddress" id="PostalAddress" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="control-group">
              <label class="control-label" for="PostalAddressPostcode">Postcode</label>
              <div class="controls">
                <input autocomplete="off" name="PostalAddressPostcode" id="PostalAddressPostcode" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="OccupancyType">Occupancy type</label>
              <div class="controls">
                <select class="k-dd input-full-width" id="OccupancyType" name="OccupancyType">
                  <option value="0">Please Select..</option>
                  <option value="1">Owner</option>
                  <option value="1">Renting through an agent</option>
                  <option value="1">Renting directly through owner</option>
                  <option value="1">With parents</option>
                  <option value="1">Share accomodation</option>
                  <option value="1">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <?php control_form_date('Move in Date', 'tenantMiD', 3 , "") ?>
          </div>
          <div class="col-md-4">
            <?php control_form('Weekly rent amount', 'tenantWeeklyRentAmount', 10 , "$") ?>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <?php control_form('Reason of moving', 'tenantReasonOfMoving', 10 , "") ?>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h4>Agent / Owner contact details</h4>
          </div>
          <div class="col-md-12">
            <div class="control-group">
              <label class="control-label" for="tenantReasonOfMoving">Agency or Oganisation name</label>
              <div class="controls">
                <input autocomplete="off" name="tenantReasonOfMoving" id="tenantReasonOfMoving" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
                <div class="uihelp-text">
                   Insert the contact details of the person in charge of the property you are renting. EG Property Manager, Owner, Parents etc
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="agentFName">First Name</label>
              <div class="controls">
                <input autocomplete="off" name="agentFName" id="agentFName" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="agentFName">Last Name</label>
              <div class="controls">
                <input autocomplete="off" name="agentFName" id="agentFName" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="agentmobile">Mobile</label>
              <div class="controls">
                <input autocomplete="off" name="agentmobile" id="agentmobile" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="control-group">
              <label class="control-label" for="agentEmail">Email</label>
              <div class="controls">
                <input autocomplete="off" name="agentEmail" id="agentEmail" placeholder="" class="form-control width-full" maxlength="30" tabindex="10" value="" type="text">
              </div>
            </div>
          </div>
        </div>
          <div class="row"><div class="btn-container-plain text-right">
          <button class="btn btn-primary btn-large" data-toggle="collapse" data-target="#currentEmployment_section"><span>Next</span></button>
        </div></div>
      </div>
    </div>
  </div>
</div>