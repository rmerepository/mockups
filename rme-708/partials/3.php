<div class="modal" id="summaryDetails"  role="dialog" aria-labelledby="summaryDetails" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h2 class="normal-weight">Summary</h2>
         </div>
         <div class="modal-body">


            <div class="box-details">
            <h3>Purchase Details</h3>
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


            

            </div>

            <?php include 'shipping-details.php'; ?> 
         
            <div class="box-details">
            
            <h3>Credit Card Information</h3>
            <div id="ccCreditCard">
               <div class="row">
                  <div class="col-md-6">
                     <div class="control-group">
                        <div class="controls">
                           <label class="control-label">Email</label>
                           <input autocomplete="off" name="email" id="email" placeholder="$" class="form-control" maxlength="30" tabindex="0" value="john.doe@email.com" type="text">
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6">
                     <div class="control-group">
                        <label class="control-label">Card Number</label>
                        <div class="controls">
                           <input autocomplete="off" name="card" id="card" placeholder="$" class="form-control" maxlength="30" tabindex="0" value="**** **** **** 4242" type="text">
                        </div>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="control-group">
                        <label class="control-label">Expiration Date</label>
                        <div class="controls">
                           <input autocomplete="off" name="asdas" id="sadasd" placeholder="$" class="form-control" maxlength="30" tabindex="0" value="12 / 17" type="text">
                        </div>
                     </div>
                  </div>
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