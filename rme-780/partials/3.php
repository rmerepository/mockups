<div class="modal" id="summaryDetails"  role="dialog" aria-labelledby="summaryDetails" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h2 class="normal-weight">Summary</h2>
    </div>

    <div class="modal-body">

    <div class="purchased-items">
    <div class="medium">
        <div class="medium-header">
              <a href="#" class="collapse-ad collapsed" data-toggle="collapse" data-target="#propertySite_2">
              <span class="colpd-icons"></span>Subscription Fee</a>
              <span class="inline-amount">$15</span>            
        </div>
        <div id="propertySite_2" class="colpd-content">
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

    <div>&nbsp;</div>
    
   	<h4 class="collapse-ad collapse in">Credit Card Information </h4>
    
      <div id="ccCreditCard">

        <div class="row">
            <div class="col-md-6">
              <?php control_form_summary ('Email', 'john.doe@email.com' ) ?> 
            </div>            
          </div> 
     
         	<div class="row">
         		<div class="col-md-6">
         			<?php control_form_summary ('Card Number', '**** **** **** 4242' ) ?>	
         		</div>
            <div class="col-md-6">
              <?php control_form_summary ('Expiration Date', '12 / 17' ) ?> 
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