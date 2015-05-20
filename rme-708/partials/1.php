<style>

.modal-body {

  padding: 20px 20px;
}
  .box-details {
      background-color: #FFF;
      padding: 16px;
      border-radius: 10px;
      box-shadow: 0px 2px 3px #EBEBEB;
      margin: 20px 0px;
  }

  .modal-wid-wrap {
    margin-left: -16px;
    margin-right: -16px;
    padding: 22px 20px 0px;
    background-color: #FFF;
    border-bottom: none;
  }


  .box-details h3 {
    margin-top: 0px;
    font-size: 18px;
    margin-bottom: 20px;
    color: #A5A5A5;
    position: relative;
      margin-bottom: 35px;
  }

   .box-details h3 .top-action{ 
      font-size: 12px;
      position: absolute;
      bottom: 0;
      right: 0;
   }

  .box-details .custom-checkbox-field  {
    margin-left: 0px;
  }

.credits-by-rme::after {
    content: " ";
  display: block;
  position: absolute;
  top: 24px;
  right: 9px;
  height: 27px;
  width: 121px;
  background-image: url('/assets/images/credits-rme.png');
  background-repeat: no-repeat;
  opacity: .8;
}
.medium-header .collapse-ad {
  display: inline-block;
  max-width: 450px;
  position: relative;
  padding-left: 42px;
}

.collapse-cc-details {
  padding: 0 25px 20px;
}

.medium-header .colpd-icons  {
   position: absolute;
  left: 0;
  top: 0;
}

.purchased-items .medium-header.sub-sf {
  font-size: 14px;
  margin-bottom: 2px;
  padding-left: 10px;
  border-bottom: dashed 1px #F1F1F1;
  margin-bottom: 10px;
  padding-bottom: 5px;
}

.medium-items {
  margin-left: 43px;
}

.fixed-top {
  position: absolute;
  max-width: 400px;
  margin: auto;
  z-index: 9999;
}

.fixed-modal-body .modal-body {
  padding-top: 129px;
}

</style>


<div class="modal" keyboard="true" id="upgradePlan"  role="dialog" aria-labelledby="upgradePlan" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h2 class="normal-weight">Upgrade Your Plan</h2>
    </div>
    <div class="modal-body">

    <div class="well with-fa w-warning">
    You need to upgrade your plan to start tracking rent for this property
    </div>


            <div class="box-details">

        <h3>Purchase Details</h3>
        
  
        <?php include('purchased-item.php') ?>

        <div style="margin:0px 0px 30px 0px">
          <?php include('promo-php.php') ?>
        </div>

        <?php include('grand-total.php') ?>

      </div>

             <div class="box-details">

        <h3>Shipping Details <a href="#" id="changeShippingAddress" class="top-action">Change</a></h3>
        
        <p id="shippingAddress">123 ABC Street VIC 1234</p>


        <div id="editShippingAddress" class="hide">
        <div class="control-group" >
        <label class="control-label " for="shippingAddress">Shipping Address</label>
        <div class="controls">
          <input autocomplete="off" name="shippingAddress" id="shippingAddress" class="form-control" maxlength="30" tabindex="1">
        </div>

       
      </div>
       <p> <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="save">Update Address</button></p>
      </div>

      </div>

      

     <div class="box-details">
      
       <h3>Pay With</h3>

      <?php include('payment-option-rme-credits.php') ?>
      <?php include('payment-option-cc-saved.php'); ?>
      <?php include('payment-option-cc.php'); ?>      
      <?php //include('payment-option-pp.php'); ?>

      </div>

    </div>
    <div class="modal-footer">
      <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Proceed</button>
    </div>
  </div>  
</div>
</div>


<!---

<div class="modal" keyboard="true" id="upgradePlan"  role="dialog" aria-labelledby="upgradePlan" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h2 class="normal-weight">Upgrade Your Plan</h2>
    </div>
    <div class="modal-body">
      <p style="margin-top:10px;">You need to upgrade your plan to start tracking rent for this property</p>

      <hr class="hr-in-m">

      <?php // include('purchased-item.php') ?>

      <?php // include('promo-php.php') ?>

      <?php // include('grand-total.php') ?>

      <?php // include('payment-option-cc-saved.php'); ?>
      <?php // include('payment-option-cc.php'); ?>      
      <?php //include('payment-option-pp.php'); ?>

    </div>
    <div class="modal-footer">
      <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Proceed</button>
    </div>
  </div>	
</div>
</div>

-->

<script>

$(function(){
  $('#changeShippingAddress').on('click', function(){
    $('#shippingAddress').hide();
    $('#editShippingAddress').removeClass('hide');
  });



})

</script>