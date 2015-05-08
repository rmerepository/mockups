<style type="text/css">
.ls-opt-lbl {
  background: #F7F7F7;
  margin-left: -45px;
  top: 16px;
  position: relative;
  padding: 10px 19px;
  border-radius: 0 0 2px 2px;
  color: #898989;
  font-size: 13px;
  line-height: 150%;
}
.lsff-lbl {
  padding: 10px 19px;
  margin-left: -7px;
  font-size: 13px;
  border: 1px solid #EBEBEB;
  color: #FFF;
  border-radius: 2px;
  background-color: #F2C858;
}
</style>

<div class="control-group mno-22">
  <div class="cs-chck-box custom-checkbox-field features-item custom-radio-field">
      <input class="paymentOptionAD" data-with-col-option="true" data-target="#creditCardinfo" type="checkbox" value="creditCard1" id="paymenTypeCC">
      <label for="paymenTypeCC" class="powered-by-stripe-solid-inline">
        <span class="credit-cards-icons lbl-pay-option"></span>
        <div class="ls-opt-lbl">Use a different credit card for this one off payment. (using a new credit card will not replace your monthly billing information).</div>
      </label>
   </div>
</div>



<div id="creditCardinfo" class="collapse collapse-cc-details">

<!-- 	<div class="control-group">
		<label class="control-label" for="email">Email</label>
		<div class="controls">
			<input autocomplete="off" name="email" id="email" class="form-control" maxlength="30" tabindex="1">
		</div>
	</div>  -->

	 <div class="control-group">
        <label class="control-label " for="creditCardNumber">Card Number</label>
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
</div>

<div class="well with-fa w-warning">
   New card information entered here will not be saved as your monthly renewal billing details.
  </div>