<div class="modal" keyboard="true" id="upgradePlan"  role="dialog" aria-labelledby="upgradePlan" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-overlap-loader"></div>
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h2 class="normal-weight">Upgrade Your Plan</h2>
    </div>
    <div class="modal-body">
      <p style="margin-top:10px;">You need to upgrade your plan to start tracking rent for this property</p>

      <hr class="hr-in-m">

      <?php include('purchased-item.php') ?>

      <?php include('grand-total.php') ?>

      <?php // include('payment-option-cc-saved.php'); ?>
      <?php include('payment-option-cc.php'); ?>      
      <?php include('payment-option-pp.php'); ?>

    </div>
    <div class="modal-footer">
      <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Proceed</button>
    </div>
  </div>	
</div>
</div>