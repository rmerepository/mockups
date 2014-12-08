<?php require('../partials/header.php') ?>

<style>
	.med-frm {
		width: 100px;
	}

	.date-sep {
		margin: 0px 4px;
		font-size: 17px;
	}

	.lbl-value {
		color: #ACACAC
	}

	.boxed-well {
		background-color: #F2F2F2;
		padding: 10px;
		border: 1px solid #D0D0D0;
		border-radius: 2px;
	} 

	.boxed-well .inline-amount {
		right: 10px !important;
	}

	/*
	@fa-cc-amex: #007bc1;
	@fa-cc-discover: #f68121;
	@fa-cc-mastercard: #0a3a82;
	@fa-cc-paypal: #253b80;
	@fa-cc-stripe: #00afe1;
	@fa-cc-visa: #0157a2;
	*/

	.cc-type  {
		font-size: 33px;
	}
	
	.fa-cc-amex { color: #007bc1; }
	.fa-cc-discover { color: #f68121; }
	.fa-cc-mastercard { color: #0a3a82; }
	.fa-cc-paypal { color:  #253b80; }
	.fa-cc-stripe { color: #00afe1; }
	.fa-cc-visa { color: #0157a2; }

</style>


<?php 
	
	function control_form_summary ( $lbl, $value ) {
		echo '<div class="control-group">
		        <label class="control-label">'.$lbl.'</label>
		        <div class="controls">
		          <div class="lbl-value">'.$value.'</div>
		        </div>
		      </div>';
	}

?>

<div style="margin: 20px;">
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#upgradePlan">Add Household</a>
</div>

<!-- <div style="margin: 20px;">
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#creditCardInfo">Payment Info</a>
</div>

<div style="margin: 20px;">
	<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#summaryDetails">Summary</a>
</div> -->

<?php require_once('partials/1.php') ?>
<?php require_once('partials/2.php') ?>
<?php require_once('partials/3.php') ?>

	<script>
		$(function(){
			$('.k-dd').kendoDropDownList();	
			$("[rel='tooltip']").tooltip();

			// forward action modals

			$('#upgradeNow').on('click', function (e) {
			 	$('#upgradePlan').modal('hide');
			 	$('#creditCardInfo').modal('show');
			});

			$('#completeCreditInfo').on('click', function (e) {
			 	$('#creditCardInfo').modal('hide');
			 	$('#summaryDetails').modal('show');
			});

			$('#confirmPayment').on('click', function (e) {
			 	$('#summaryDetails').modal('hide');		
			 	window.location.href = 'thank-you-page.php'	 	
			});

			// back action modals

			$('#confirmPaymentBack').on('click', function (e) {
			 	$('#summaryDetails').modal('hide');
			 	$('#creditCardInfo').modal('show');
			});

			$('#completeCreditInfoBack').on('click', function (e) {
			 	$('#creditCardInfo').modal('hide');
			 	$('#upgradePlan').modal('show');
			});

		});
	</script>

<?php require('../partials/footer.php') ?>