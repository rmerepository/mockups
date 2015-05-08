<div class="tpl-hidden" id="updateCardInfo">
   <h3 class="ma-line"><span class="text-de">Update Details</span></h3>
   <div class="control-group">
      <label class="control-label" for="cardno">Credit Card No.</label>
      <div class="controls">
         <input id="cardno" tabindex="1" class="form-control fc-large" maxlength="50" name="cardno" type="text" autocomplete="off" value="**** **** **** 1234" >
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
   <p>
      <a href="#">Cancel</a> &nbsp;&nbsp;
      <button id="btnSaveCard" class="btn btn-primary" tabindex="8">Save Details</button>
   </p>
</div>