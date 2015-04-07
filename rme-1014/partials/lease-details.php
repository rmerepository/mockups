<style type="text/css">
   .col-sep-control {
   float: left;
   text-align: center;
   display: inline-block;
   padding: 40px 0 0 0;
   }
   .btn-default {
   border: 1px solid #e3e3e3;
   color: #666666;
   }
   .btn-default:hover {
   background-color: #FBFBFB;
   }
</style>
<div class="blue-header">
   <h3 class="fw200">Get your new tenancy set up</h3>
</div>
<div class="collapsible-forms">
   <div class="medium-header">
      <h3>
         <span href="#" class="collapse-ad collapsed bg-gray" data-toggle="collapse" data-target="#TenantDetails_section">
         <i class="colpd-icons"></i>Tenant Details</span>
      </h3>
   </div>
   <div class="colpd-content collapse" id="TenantDetails_section">
      <div class="medium-items">
         <div class="row">
            <div class="col-md-6">
               <div class="control-group">
                  <div class="input-append date controls">
                     <label class="control-label" for="firstName">First Name</label>
                     <div class="controls">
                        <input tabindex="1" width="30" name="firstName" readonly="true" value="John" type="text" id="firstName" class="form-control">
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="control-group">
                  <div class="input-append date controls">
                     <label class="control-label" for="lastname">Last Name</label>
                     <div class="controls">
                        <input value="Deleon" width="30" name="lastname" type="text" id="lastname" readonly="true" class="form-control">
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-5">
               <div class="control-group">
                  <div class="input-append date controls">
                     <label class="control-label" for="mobile">Mobile</label>
                     <div class="controls">
                        <input tabindex="1" width="30" name="mobile" readonly="true" value="000000000000" type="text" id="mobile" class="form-control">
                     </div>
                  </div>
               </div>
            </div>
             <div class="col-md-1" style="padding-left:0">
             <span class="tooltip-blue pop-over-right"  data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Soon your tenant will be able to log in and see all their payments and get rent reminders." style="vertical-align: top;margin-top: 34px;margin-left: 0;" data-original-title="Coming Soon"></span>
             </div>
            <div class="col-md-6">
               <div class="control-group">
                  <div class="input-append date controls">
                     <label class="control-label" for="email">Email</label>
                     <div class="controls">
                        <input value="email@email.com" width="30" name="email" type="text" id="email" readonly="true" class="form-control">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="collapsible-forms">
   <div class="medium-header">
      <h3>
         <span href="#" class="collapse-ad collapsed bg-gray" data-toggle="collapse" data-target="#leaseDetails_section">
         <i class="colpd-icons"></i>Lease Details</span>
      </h3>
   </div>
   <div id="leaseDetails_section">
      <div class="medium-items">
         <div class="row">
            <div class="col-md-5">
               <div class="control-group">
                  <div class="input-append date controls">
                     <label class="control-label" for="LeaseStartDate">Lease Start Date</label>
                     <div class="controls">
                        <input tabindex="1" width="30" name="LeaseStartDate" type="text" id="LeaseStartDate" class="form-control enable-click-date-window medium-datepicker">
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-5">
               <div class="control-group">
                  <div class="input-append date controls">
                     <label class="control-label" for="LeaseEndDate">Lease End Date</label>
                     <div class="controls">
                        <input tabindex="2" width="30" name="LeaseEndDate" type="text" id="LeaseEndDate" class="form-control enable-click-date-window medium-datepicker">
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-sep-control">
               <span class="control-text-info"> <a href="http://support.rentmyestate.com.au/article/64-why-enter-a-lease-end-date" target="_blank">Help</a> </span>
            </div>
         </div>
         <div class="row">
            <div class="col-md-4">
               <div class="control-group">
                  <label class="control-label" for="rent">Rent</label>
                  <div class="controls">
                     <input autocomplete="off" name="rent" id="rent" class="form-control width-full" maxlength="30" value="$1892.45" type="text">
                  </div>
               </div>
            </div>
            <div class="col-sep-control">
               <span class="control-text-info">/</span>
            </div>
            <div class="col-md-3">
               <div class="control-group">
                  <label class="control-label" for="datePayment">&nbsp;</label>
                  <div class="controls">
                     <select name="datePayment" id="datePayment" class="k-dd input-full-width">
                        <option value="0">Please select...</option>
                        <option value="1">Week</option>
                        <option value="2">Fortnight</option>
                        <option value="3">4 Weeks</option>
                        <option value="4">Month</option>
                        <option value="4">Year</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-4">
               <div class="control-group">
                  <label class="control-label" for="firstRentPayment">First Rent Payment (Deposit)
                  <a href="http://support.rentmyestate.com.au/article/72-first-rent-payment-deposit" target="_blank"></a>
                  </label>
                  <div class="controls">
                     <input autocomplete="off" name="firstRentPayment" id="firstRentPayment" placeholder="" class="form-control width-full" maxlength="30" tabindex="3" value="$1892.45" type="text">
                  </div>
               </div>
            </div>
            <div class="col-sep-control">
               <span class="control-text-info">due</span>
            </div>
            <div class="col-md-3">
               <div class="control-group">
                  <label class="control-label" for="firstDatePayment">&nbsp;</label>
                  <div class="controls">
                     <input autocomplete="off" name="firstDatePayment" id="firstDatePayment" class="form-control enable-click-date-window medium-datepicker" maxlength="30" tabindex="4" value="" type="text">
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-6">
               <div class="control-group">
                  <label class="control-label" for="rentToBePaid">How rent is to be paid</label>
                  <div class="controls">
                     <select name="preferredLeaseLength" tabindex="7" id="preferredLeaseLength" class="k-dd input-full-width">
                        <option value="0">Please select...</option>
                        <option value="1">Bank Account</option>
                        <option value="2">Direct Debit</option>
                        <option value="3">Other</option>
                     </select>
                  </div>
               </div>
            </div>
            <div class="col-sep-control" id="rentPayDirectDebit">
               <span class="control-text-info"> <a href="http://support.rentmyestate.com.au/article/66-setting-up-direct-debit" target="_blank">Help</a> </span>
            </div>
         </div>
         <div id="rentPayViaBankAccount">
            <div class="row">
               <div class="col-md-4">
                  <div class="control-group">
                     <label class="control-label" for="AccountName">Account Name</label>
                     <div class="controls">
                        <input autocomplete="off" name="AccountName" id="AccountName" placeholder="" class="form-control width-full" maxlength="30" value="" type="text">
                     </div>
                  </div>
               </div>
               <div class="col-md-4">
                  <div class="control-group">
                     <label class="control-label" for="bsbNumber">BSB Number</label>
                     <div class="controls">
                        <input autocomplete="off" name="bsbNumber" id="bsbNumber" placeholder="" class="form-control width-full" maxlength="30" value="" type="text">
                     </div>
                  </div>
               </div>
               <div class="col-md-4">
                  <div class="control-group">
                     <label class="control-label" for="AccountNumber">Account Number</label>
                     <div class="controls">
                        <input autocomplete="off" name="AccountNumber" id="AccountNumber" placeholder="" class="form-control width-full" maxlength="30" value="" type="text">
                     </div>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-5">
                  <div class="control-group">
                     <label class="control-label" for="reference">Reference</label>
                     <div class="controls">
                        <input autocomplete="off" name="reference" id="reference" placeholder="" class="form-control width-full" maxlength="30" value="" type="text">
                     </div>
                  </div>
               </div>
               <div class="col-sep-control">
                  <span class="control-text-info"><a href="http://support.rentmyestate.com.au/article/69-giving-your-tenant-a-reference-to-use-when-transferring-rent" target="_blank">Help</a> </span>
               </div>
            </div>
         </div>
         <div id="payViaOther">
            <div class="row">
               <div class="col-md-5">
                  <div class="control-group">
                     <label class="control-label" for="payOther">Other</label>
                     <div class="controls">
                        <input autocomplete="off" name="payOther" id="payOther" placeholder="" class="form-control width-full" maxlength="30" value="" type="text">
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-4">
               <div class="control-group">
                  <label class="control-label" for="bond">Bond</label>
                  <div class="controls">
                     <input autocomplete="off" name="bond" id="bond" class="form-control width-full" maxlength="30" value="$1892.45" type="text">
                  </div>
               </div>
            </div>
            <div class="col-sep-control">
               <span class="control-text-info"> due </span>
            </div>
            <div class="col-md-4">
               <div class="control-group">
                  <label class="control-label">&nbsp;</label>
                  <div class="controls">
                     <input autocomplete="off" name="bondDate" id="bondDate" placeholder="" class="form-control width-full" maxlength="30" value="" type="text">
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-5">
               <div class="control-group">
                  <label class="control-label" for="bondIsToBePaid">How the bond is to be paid &bull; <a href="http://support.rentmyestate.com.au/article/70-how-should-the-bond-be-paid" target="_blank">Help</a> </label>
                  <div class="controls">
                     <input autocomplete="off" name="bondIsToBePaid" id="bondIsToBePaid" class="form-control width-full" maxlength="30" value="" type="text">
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-7">
               <label class="control-label">&nbsp;</label>
               <div class="control-group">
                  <button class="btn btn-default"> <i class="fa fa-upload"></i> &nbsp; Upload lease agreement for your tenant to sign</button>
                  &nbsp;&nbsp;
                  <a href="http://support.rentmyestate.com.au/article/71-uploading-a-lease-agreement-for-your-new-tenant-to-sign" target="_blank">Help</a>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-12">
               <p class="control-group">Don’t have the lease? <a href="#">Download yours now and fill it out.</a> </p>
            </div>
         </div>
      </div>
   </div>
</div>