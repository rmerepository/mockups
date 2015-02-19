<div class="collapsible-forms">
    <div class="medium">
        <div class="medium-header">
          <h3>
          <span class="collapse-ad collapsed bg-gray" data-toggle="collapse" data-target="#currentEmployment_section">
                    <i class="colpd-icons"></i>Current Employment</span>
          </h3>
        </div>
        <div id="currentEmployment_section" class="colpd-content collapse" >
            <div class="medium-items">
                <div class="row">
                  <div class="col-md-12">
                    <div class="control-group">
                      <label class="control-label">Are you currently employed or self-employed?</label>
                      <div class="controls custom-radio-field">
                          <?php radio_input('No', 'No', 'currentEmployment', 'other'  ); ?>
                          <?php radio_input('Yes', 'Yes', 'currentEmployment', 'employed'  ); ?>
                          </div>
                    </div>
                  </div>
                </div>
              <div class="hide employmentPane" data-option-target="employed">
                <div class="row">
                  <div class="col-md-12">
                    <h4>Employment Details</h4>
                  </div>
                  <div class="col-md-6">
                    <?php control_form('Name of Organisation', 'NameOfOrganisation', 3 , "") ?>  
                  </div>
                    <div class="col-md-6">
                    <?php control_form('Location', 'LocationOfOrganisation', 3 , "eg. Melbourne") ?>  
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <?php control_form('Occupation', 'Occupation', 3, "eg. Construction, Marketing, Health care") ?>  
                  </div>
                    <div class="col-md-6">
                    <?php control_form('Position Title', 'PositionTitle', 3 , "eg. Manager") ?>  
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <?php control_form_date('Date of first day', 'dateOfFirstDay', 3 , "") ?>  
                  </div>
                    <div class="col-md-4">
                    <?php control_form('Weekly income amount', 'weeklyIncomeAmount', 3 , "$") ?>  
                  </div>
                  <div class="col-md-4">
                                     <div class="control-group">                  
                      <label class="control-label" for="howOftenWork">How often do you work here?</label>
                       <div class="controls">
                              <select class="k-dd input-full-width" id="howOftenWork" name="howOftenWork">     
                                <option value="0">Please Select..</option>
                                <option value="1">Casual</option>
                                 <option value="1">Part time</option>
                                 <option value="1">Full time</option>
        
        
                              </select> 
                     </div>
                    </div> 
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <h4>Employer's Contact details <span>or Accountants contact details if self employed</span></h4>
                  </div>
                  <div class="col-md-4">
                    <?php control_form('First Name', 'employerFname', 3, "") ?>  
                  </div>
                    <div class="col-md-4">
                    <?php control_form('Last Name', 'employerFname', 3 , "") ?>  
                  </div>
                     <div class="col-md-4">
                    <?php control_form('Mobile', 'employerMobile', 3 , "") ?>  
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <?php control_form('Email', 'employerEmail', 3, "") ?>  
                  </div>
                </div>
                </div>

                <div class="hide employmentPane" data-option-target="other">

                <div class="row">
                  <div class="col-md-12"> <h4>Other Income</h4> </div>
              <div class="col-md-12">
                 <div class="control-group">
                   <label class="control-label">Do you receive government benefits?</label>
              </div>
              </div>

                <div class="col-md-3">
                  <div class="control-group">
                      <div class="controls custom-radio-field">
                          <?php radio_input('No', 'No', 'currentEmployment', 'No'  ); ?>
                          <?php radio_input('Yes', 'Yes', 'currentEmployment', 'Yes'  ); ?>
                          </div>
                </div>
              </div>

              <div class="col-md-6">
                <?php control_form('Type of Benefit', 'typeOfBenefit', 3, "unemployment benifit, youth allowance, pension") ?> 
              </div>

              <div class="col-md-3">
                <?php control_form('Weekly Benefit amount', 'WeeklyBenefit', 3, "$") ?> 
              </div>

                </div>

                <div class="row">
                 <div class="col-md-12">
                   <div class="control-group">
                      <label class="control-label">Do you receive any other source of income not already mentioned?</label>
                      </div>
                  </div>
                <div class="col-md-3">
                  <div class="control-group">                      
                      <div class="controls custom-radio-field">
                          <?php radio_input('No', 'No', 'currentEmployment', 'No'  ); ?>
                          <?php radio_input('Yes', 'Yes', 'currentEmployment', 'Yes'  ); ?>
                          </div>
                </div>
              </div>

              <div class="col-md-6">
                <?php control_form('Description of income', 'DescriptionOfIncome', 3, "eg. dividends or interest on shares") ?> 
              </div>

              <div class="col-md-3">
                <?php control_form('Amount', 'amount', 3, "$") ?> 
              </div>

              </div>

                </div>
                  <div class="row"><div class="btn-container-plain text-right">
          <button class="btn btn-primary btn-large" data-toggle="collapse" data-target="#references_section"><span>Next</span></button>
        </div></div>

            </div>
    </div>
</div>
</div>

<script>
$(function() {
  $("input:radio[name=currentEmployment]").click(function() {
   
    // Get the current selected item
    var value = $(this).val();

    // Loop thru target section
    $(".employmentPane").each(function(i, el) {
     
      var el = $(el);
     
      // Check fo the 'data-option-target' if equal to the selected item
      if ( el.attr('data-option-target') == value ) {
        el.removeClass('hide');
      } else {
        el.addClass('hide');
      }
    
    });
  });
})
</script>
