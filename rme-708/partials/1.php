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