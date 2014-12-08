<div class="modal" id="summaryDetails"  role="dialog" aria-labelledby="summaryDetails" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h2 class="normal-weight">Summary</h2>
    </div>

    <div class="modal-body">
    
   	<h4>Credit Card Information</h4>

   	<div class="row">
   		<div class="col-md-6">
   			<?php control_form_summary ('Card Number', '4242 4242 4242 4242' ) ?>	
   		</div>
   		<div class="col-md-6">
		   	<?php control_form_summary ('Card Type', '<i class="cc-type fa fa-cc-visa"></i>' ) ?>	
   		</div>
   	</div>
     

     <div class="row">
     	<div class="col-md-6">
		     <div class="control-group">
		        <label class="control-label">Expiration Date</label>
		        <div class="controls">
		         	<div class="lbl-value">12 / 17</div>
		        </div>
		      </div> 
     	</div>
     	<div class="col-md-6">
		     <div class="control-group">
		        <label class="control-label">CSC</label>
		        <div class="controls">
		         	<div class="lbl-value">123</div>
		        </div>
		      </div> 
     	</div>
     </div>
     
     <hr class="hr-in-m">


	<div class="row">
     <div class="col-md-6">
     	<h4>Billing Information</h4>

	      <div class="control-group">
	        <label class="control-label">Name</label>
	        <div class="controls">
	          <div class="lbl-value">John Doe</div>
	        </div>
	      </div> 
   
	      <div class="control-group">
	        <label class="control-label" for="address1">Address 1</label>
	        <div class="controls">
	          <div class="lbl-value">123/45 James, St.</div>
	        </div>
	      </div> 

	      <div class="control-group">
	        <label class="control-label" for="suburb">Suburb</label>
	        <div class="controls">
	        	 <div class="lbl-value">Melbourne</div>
	        </div>
	      </div> 

	      <div class="control-group">
	        <label class="control-label" for="stateProvinceRegion">State / Province / Region</label>
	        <div class="controls">
	          <div class="lbl-value">NSW</div>
	        </div>
	      </div> 

      <div class="control-group">
        <label class="control-label" for="postalCode">Postal Code</label>
        <div class="controls">
        <div class="lbl-value">12345</div>
        </div>
      </div> 	


      <div class="control-group">
        <?php control_form_summary('Country' , 'Australia') ?>
      </div>
     </div>
     

     <div class="col-md-6">
     	
  <h4>Shipping Information</h4>

    <div class="control-group">
     	<?php control_form_summary('Same as Billing Address' , 'Yes') ?>
    </div>

     </div>

     </div>

  
    
<hr class="hr-in-m">
   
      <h4>Contact Information</h4>

      <div class="control-group">
        <label class="control-label" for="contactNumber">Mobile / Home Number</label>
        <div class="controls">
         <div class="lbl-value">+123121123</div>
        </div>
      </div> 

      <div class="control-group">
        <label class="control-label" for="email">Email</label>
        <div class="controls">
          <div class="lbl-value">email@yahoo.com</div>
        </div>
      </div> 

<hr class="hr-in-m">

<div class="purchased-items">
    <div class="medium">
        <div class="medium-header">
              <a href="#" class="collapse-ad collapsed" data-toggle="collapse" data-target="#propertySite_0">
              <span class="colpd-icons"></span>Subscription Fee</a>
              <span class="inline-amount">$15</span>            
        </div>
        <div id="propertySite_0" class="colpd-content">
            <div class="medium-items">
              <div class="medium-desc">Montly Subscription</div>
            </div>
        </div>
    </div>
    
</div>

<div class="modal-wid-wrap brdr-top mno-22">
        <div class="purchased-items">
            <div class="medium-header theme-color">
                <b>Total</b>
                <span class="inline-amount"><b>$<span id="general_total">15</span></b></span>
           </div>
        </div>
</div>

</div>


    <div class="modal-footer">
      <a href="#" id="confirmPaymentBack">Back</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Confirm &amp; Pay</button>
    </div>
  </div>	
</div>
</div>