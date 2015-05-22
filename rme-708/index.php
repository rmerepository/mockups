<?php require('../partials/header.php') ?>

<?php 
	
	function control_form_summary ( $lbl, $name, $tabindex = 0) {
		echo '<div class="control-group">
		        <label class="control-label">'.$lbl.'</label>
		        <div class="controls">
		          	<input autocomplete="off" name="'.$name.'" id="'.$name.'" placeholder="$" class="form-control fc-large" maxlength="30" tabindex="'.$tabindex.'" value="" type="text">

		        </div>
		      </div>';
	}

?>

<div style="margin: 20px;">
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#upgradePlan">Add Household</a>
</div>
<!--
<div style="margin: 20px;">
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#creditCardInfo">Payment Info</a>
</div>
 -->
 
<div style="margin: 20px;">
	<p>Summary modal for user to review their details</p>
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#summaryDetails">Summary</a>
</div>



<div style="margin: 20px;">
	<p>After User made the payment</p>
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#doneModal">'Thank you' modal</a>
</div>

<div style="margin: 20px;">
	<p>Modal for error transaction on stripe</p>
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#errorStripe">Error on stripe</a>
</div>

<?php require_once('partials/1.php') ?>
<?php require_once('partials/confirm-payment-modal.php') ?>
<?php require_once('partials/3.php') ?>


<?php require_once('partials/confirm-payment-modal.php') ?>


<?php require_once('partials/error-from-stripe.php') ?>

	<script>
		$(function(){
			
			$("[rel='tooltip']").tooltip();

			// forward action modals

			// $('#confirmPayment').on('click', function (e) {
			//  	$('#upgradePlan').modal('hide');
			//  	$('#doneModal').modal('show');
			// });

			var selectedBox = null;

			  $(".paymentOptionAD").click(function() {
			  	el = $(this);
        		selectedBox = this.id;

       		var attr = $(this).attr('data-with-col-option');

       		$( '.collapse-cc-details' ).removeClass('in') ;

        		
         	if (typeof attr !== typeof undefined && attr !== false) {
        		$( el.attr('data-target') ).addClass('in') ;
			}

		        $(".paymentOptionAD").each(function() {


		            if ( this.id == selectedBox ) {
		                this.checked = true;
		            }
		            else {
		                this.checked = false;
		            };   

		          

		        });
		   	 });    	


		});
	</script>

<?php require('../partials/footer.php') ?>