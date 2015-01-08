<div class="modal" id="creditCardInfo"  role="dialog" aria-labelledby="creditCardInfo" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h2 class="normal-weight">Payment Details</h2>
    </div>

    <div class="modal-body">

    <h4>Credit Card Information</h4>
     
      <div class="control-group">
        <label class="control-label" for="creditCardNumber">Card Number</label>
        <div class="controls">
          <input autocomplete="off" name="creditCardNumber" id="creditCardNumber" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div>  

      <div class="control-group">
        <label class="control-label" for="creditCardExpDate">Expiration Date</label>
        <div class="controls">
          <input autocomplete="off" placeholder="MM" name="creditCardExpDateMonth" id="creditCardExpDateMonth" class="med-frm form-control" maxlength="30" tabindex="2"> <span class="date-sep">/</span>
           <input autocomplete="off" name="creditCardExpDateYear" id="creditCardExpDateYear" class="med-frm form-control" maxlength="30" placeholder="YY" tabindex="3">
        </div>
      </div>  


     <div class="control-group">
        <label class="control-label" for="creditCardCSC">CSC</label>
        <div class="controls">
          <input autocomplete="off" name="creditCardCSC" id="creditCardCSC" class="med-frm form-control" maxlength="30" tabindex="5"> <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="<img src='/assets/images/n/myestate-csc-info.jpg'>" style="vertical-align: top;" data-original-title="Security Code"></span>
        </div>
      </div>  

      <h4>Billing Information</h4>


      <div class="control-group">
        <label class="control-label" for="firstName">First Name</label>
        <div class="controls">
          <input autocomplete="off" name="firstName" id="firstName" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

       <div class="control-group">
        <label class="control-label" for="middleName">Middle Name</label>
        <div class="controls">
          <input autocomplete="off" name="middleName" id="middleName" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 


      <div class="control-group">
        <label class="control-label" for="lastName">Last Name</label>
        <div class="controls">
          <input autocomplete="off" name="lastName" id="lastName" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 


      <div class="control-group">
        <label class="control-label" for="address1">Address 1</label>
        <div class="controls">
          <input autocomplete="off" name="address1" id="address1" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

      <div class="control-group">
        <label class="control-label" for="address2">Address 2</label>
        <div class="controls">
          <input autocomplete="off" name="address2" id="address2" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

       <div class="control-group">
        <label class="control-label" for="suburb">Suburb</label>
        <div class="controls">
          <input autocomplete="off" name="suburb" id="suburb" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

      <div class="control-group">
        <label class="control-label" for="stateProvinceRegion">State / Province / Region</label>
        <div class="controls">
          <input autocomplete="off" name="stateProvinceRegion" id="stateProvinceRegion" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

      <div class="control-group">
        <label class="control-label" for="postalCode">Postal Code</label>
        <div class="controls">
          <input autocomplete="off" name="postalCode" id="postalCode" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

      <div class="control-group">
        <label class="control-label" for="Country">Country</label>
           <select class="k-dd" >  
              <option value="1">Australia</option>
              <option value="2">NOTE: all country will be added default will (AU)</option>
        </select>
      </div> 

    
  
      <h4>Shipping Information</h4>

    <div class="control-group">
      <div class="custom-checkbox-field features-item custom-radio-field">
          <input  type="checkbox" value="1" id="d2">
          <label for="d2" data-toggle="collapse" data-target="#shippingAddress">Same as Billing Address</label>
       </div>
    </div>

      <?php require_once('shipping-address.php') ?>


      <h4>Contact Information</h4>

      <div class="control-group">
        <label class="control-label" for="contactNumber">Mobile / Home Number</label>
        <div class="controls">
          <input autocomplete="off" name="contactNumber" id="contactNumber" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

      <div class="control-group">
        <label class="control-label" for="email">Email</label>
        <div class="controls">
          <input autocomplete="off" name="email" id="email" class="form-control" maxlength="30" tabindex="1">
        </div>
      </div> 

    </div>

    <div class="modal-footer">
      <a href="#" id="completeCreditInfoBack">Back</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="completeCreditInfo">Proceed</button>
    </div>
  </div>	
</div>
</div>