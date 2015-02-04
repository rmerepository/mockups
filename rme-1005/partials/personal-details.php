<div class="collapsible-forms">
  <div class="medium">
    <div class="medium-header">
      <h3>
      <span class="collapse-ad bg-gray" data-toggle="collapse" data-target="#personalDetails_section">
      <i class="colpd-icons"></i>Personal Details</span>
      </h3>
    </div>
    <div id="personalDetails_section" class="colpd-content collapse in" style="height: auto;">
      <div class="medium-items">
        <div class="row">
          <div class="col-md-6">
            <div class="control-group">
              <label class="control-label" for="tenantFirstName">First Name</label>
              <div class="controls">
                <input autocomplete="off" name="tenantFirstName" id="tenantFirstName" placeholder="" class="form-control width-full" maxlength="30" tabindex="1" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="control-group">
              <label class="control-label" for="tenantLastName">Last Name</label>
              <div class="controls">
                <input autocomplete="off" name="tenantLastName" id="tenantLastName" placeholder="" class="form-control width-full" maxlength="30" tabindex="2" value="" type="text">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="control-group">
              <label class="control-label" for="tenantEmail">Email</label>
              <div class="controls">
                <input autocomplete="off" name="tenantEmail" id="tenantEmail" placeholder="" class="form-control width-full" maxlength="30" tabindex="3" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="control-group">
              <label class="control-label" for="tenantMobileNumber">Mobile #</label>
              <div class="controls">
                <input autocomplete="off" name="tenantMobileNumber" id="tenantMobileNumber" placeholder="" class="form-control width-full" maxlength="30" tabindex="4" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="control-group">
              <label class="control-label" for="tenant2ndContactNumber">Secondary Contant #</label>
              <div class="controls">
                <input autocomplete="off" name="tenant2ndContactNumber" id="tenant2ndContactNumber" placeholder="" class="form-control width-full" maxlength="30" tabindex="5" value="" type="text">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="control-group">
              <div class="input-append date controls">
                <label class="control-label" for="tenantDOB">Date of Birth</label>
                <div class="controls">
                  <input data-is-required="true" tabindex="6" width="30" name="tenantDOB" type="text" id="tenantDOB" class="form-control enable-click-date-window medium-datepicker">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="tenantStatus">Tick if applicable</label>
              <div class="controls clearfix">
                <select name="typeTenant" tabindex="7" id="typeTenant" multiple="multiple">
                  <option value="0">All Types</option>
                  <option value="1">Smoker</option>
                  <option value="2">Part-time student</option>
                  <option value="3">Full-time student</option>
                  <option value="4">Retired</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="tenantMaritalStatus">Marital Status</label>
              <div class="controls">
                <select tabindex="8" class="k-dd input-full-width" id="tenantMaritalStatus" name="tenantMaritalStatus">
                  <option value="0">Please Select..</option>
                  <option value="1">Engaged</option>
                  <option value="2">Married</option>
                  <option value="3">Single</option>
                  <option value="4">Live with partner</option>
                  <option value="5">Seperated</option>
                  <option value="6">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label">Gender </label>
              <div class="controls custom-radio-field">
                <div class="radio-group custom-radio-field">
                  <input tabindex="9" type="radio" name="tenantGender" data-bind="checked: tenantGender" id="tenantGenderMale" value="full"><label for="tenantGenderMale">Male</label>
                </div>
                <div class="radio-group custom-radio-field no-right-margin">
                  <input tabindex="10" type="radio" name="tenantGender" id="tenantGenderFemale" value="suburb"><label for="tenantGenderFemale">Female</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="control-group">
              <label class="control-label">Identification Type</label>
              <div class="row">
                <div class="controls custom-radio-field">
                  <div class="col-md-6">
                    <?php radio_input('Drivers license', 'driversLicense', 'IDtype', 'driversLicense'  ); ?>
                    <?php radio_input('Birth certificate', 'BirthCertificate', 'IDtype', 'BirthCertificate'  ); ?>
                  </div>
                  <div class="col-md-6">
                    <?php radio_input('Passport', 'passport', 'IDtype', 'passport'  ); ?>
                    <?php radio_input('Other', 'other', 'IDtype', 'other'  ); ?>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <?php control_form('Please Specify', 'otherIDtype', 5 , "") ?>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h4>Identification Information</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <?php control_form_date('Identification number', 'tenantEmail', 3 , "") ?>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="tenantStateRegion">State or region</label>
              <div class="controls">
                <select class="k-dd input-full-width" id="tenantStateRegion" name="tenantStateRegion">
                  <option value="0">Please Select..</option>
                  <option value="NSW">NSW</option>
                  <option value="VIC">VIC</option>
                  <option value="MEL">MEL</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <?php control_form_date('Expiry date of identification', 'tenantExpiryDateID', 5 , "") ?>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h4>Emergency Contact <span class="optional-field">(Optional)</span> </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="tenantERFirstName">First Name</label>
              <div class="controls">
                <input autocomplete="off" name="tenantERFirstName" id="tenantERFirstName" placeholder="" class="form-control width-full" maxlength="30" tabindex="14" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="tenantERLastName">Last Name</label>
              <div class="controls">
                <input autocomplete="off" name="tenantERLastName" id="tenantERLastName" placeholder="" class="form-control width-full" maxlength="30" tabindex="15" value="" type="text">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="control-group">
              <label class="control-label" for="tenantERnumber">Contact #</label>
              <div class="controls">
                <input autocomplete="off" name="tenantERnumber" id="tenantERnumber" placeholder="" class="form-control width-full" maxlength="30" tabindex="16" value="" type="text">
              </div>
            </div>
          </div>
        </div>
       <div class="row"><div class="btn-container-plain text-right">
          <button class="btn btn-primary btn-large" data-toggle="collapse" data-target="#otherOccupantAndPets_section"><span>Next</span></button>
        </div></div>
      </div>
    </div>
  </div>
</div>