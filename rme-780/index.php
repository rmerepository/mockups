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

	.add-fa-sort:hover {
		color: #22B2E2;
		cursor: pointer;
	}

	.add-fa-sort:after {
		font-family: 'FontAwesome';
		content: "\f0de";
		position: relative;
		top: 3px;
		margin-left: 7px;
	}
	
	.add-fa-sort.collapsed:after {
		content: "\f0dd";
		top: -3px;
	}

	.cs-chck-box.custom-radio-field label { 
		padding: 21px 0 23px 44px;
		background-color: #F2F2F2;
		border: 1px solid #EBEBEB;
		display: block;
		height: auto;
	}	

	/*Apply custom icon for uncheck*/
	.cs-chck-box.custom-checkbox-field:not(#dummy) > input[type="checkbox"] + label {
		background-position: -5px -209px;
	}
	
	/*Apply custom icon for uncheck hover*/
	.cs-chck-box.custom-checkbox-field:not(#dummy) > input[type="checkbox"] + label:hover {
		background-position: -5px -271px;
	}
	
	/*Apply custom icon for checked*/
	.cs-chck-box.custom-checkbox-field:not(#dummy) > input[type="checkbox"]:checked + label {
		background-position: -5px -334px;
	}
	
	/*Apply custom icon for checked hover*/
	.cs-chck-box.custom-checkbox-field:not(#dummy) > input[type="checkbox"]:checked + label:hover {
		background-position: -5px -395px;
	}

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
<?php require_once('partials/confirm-payment-modal.php') ?>


	<script>
		$(function(){
			
			$("[rel='tooltip']").tooltip();

			// forward action modals

			$('#confirmPayment').on('click', function (e) {
			 	$('#upgradePlan').modal('hide');
			 	$('#doneModal').modal('show');
			});

			var selectedBox = null;

			  $(".paymentOptionAD").click(function() {
			  	el = $(this);
        		selectedBox = this.id;

    //     		var attr = $(this).attr('data-with-col-option');
        		
    //     		if (typeof attr !== typeof undefined && attr !== false) {
        			
    //     			$( el.attr('data-target') ).addClass('in') ;
					
				// }

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