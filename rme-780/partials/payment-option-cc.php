<div class="control-group mno-22">
  <div class="cs-chck-box custom-checkbox-field features-item custom-radio-field">
      <input class="paymentOptionAD" data-with-col-option="true" data-target="#creditCardinfo" type="checkbox" value="creditCard1" id="paymenTypeCC">
      <label for="paymenTypeCC">Pay with Credit Card</label>
   </div>
</div>

<div id="creditCardinfo" class="collapse collapse-cc-details">

	<div class="control-group">
		<label class="control-label" for="email">Email</label>
		<div class="controls">
			<input autocomplete="off" name="email" id="email" class="form-control" maxlength="30" tabindex="1">
		</div>
	</div> 

	 <div class="control-group">
        <label class="control-label " for="creditCardNumber">Card Number</label>
        <div class="controls has-error">
          <input autocomplete="off" name="creditCardNumber" id="creditCardNumber" class="form-control" maxlength="30" tabindex="1">
          <div class="msg"><div class="text">Invalid Card Number</div></div>
        </div>
      </div>  

      <div class="control-group">
        <label class="control-label" for="creditCardExpDate">Expiration Date</label>
        <div class="controls has-error">
          <input autocomplete="off" placeholder="MM" name="creditCardExpDateMonth" id="creditCardExpDateMonth" class="med-frm form-control" maxlength="30" tabindex="2"> <span class="date-sep">/</span>
           <input autocomplete="off" name="creditCardExpDateYear" id="creditCardExpDateYear" class="med-frm form-control" maxlength="30" placeholder="YY" tabindex="3">
           <div class="msg"><div class="text">Invalid Expiration Date</div></div>
        </div>
      </div>  


     <div class="control-group">
        <label class="control-label" for="creditCardCSC">CSC</label>
        <div class="controls has-error">
          <input autocomplete="off" name="creditCardCSC" id="creditCardCSC" class="med-frm form-control" maxlength="30" tabindex="5"> <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="<img src='/assets/images/n/myestate-csc-info.jpg'>" style="vertical-align: top;" data-original-title="Security Code"></span>
          <div class="msg"><div class="text">Invalid CSC</div></div>
        </div>
      </div>  
</div>