<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../partials/bread.php') ?>


<div class="row">
		<div class="col-md-12">
			
		<div class="push-up-wrap-hi" style="margin-top: 32px;">
			<div class="single-col-mid w-shadow bg-white rb-font">
			
	<div id="payment-wrap-info" class="wrap-main-holder no-image  ">


	<div class="top-cp-action" id="divButton">
		<a href="javascript:update_household(6)" rel="tooltip" data-original-title="Change lease details" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span> </a>
		<a href="#" data-original-title="Remove tenancy" rel="tooltip" data-placement="top" data-toggle="modal" data-target="#removeHouseHold"> <span class="fa fa-trash-o"></span> </a>
	</div>


	<div class="content">
		<div class="f26 fw-100">12 / 32 123 Drive, The Bight </div>
		<div class="f14" id="tname">John Doe</div>
		<div class="f14" id="capRent">$400 Per Week</div>		
        <div> <b class="text-danger" id="caption_balance">$800 owing</b></div>
        <div class="f14 text-success" id="caption_due_date">Rent Due</div>
	</div>
</div>

				<?php require_once('partials/menu-area.php') ?>

				<?php require_once('partials/modal-money-in.php') ?>
				<?php require_once('partials/modal-money-out.php') ?>


				<div class="info-group text-center bg-gray">
					<h3>Payment History</h3>
					<div class="mnu">
						<a href="#" rel="tooltip" data-original-title="Hi, Tell more about me" data-placement="top" data-toggle="tooltip">
							<i class="fa fa-paste"></i> Financial Statement 
						</a>
					</div>
				</div>

				<?php require_once('partials/tab-area.php') ?>

			</div>

		</div>	



		</div>
	</div>

	<script>
		$(function(){
			$('.k-dd').kendoDropDownList();	
			$("[rel='tooltip']").tooltip();
		});
	</script>

<?php require('partials/update-household.php') ?>
<?php require('../partials/footer.php') ?>