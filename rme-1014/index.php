<?php
$body_app_class = "bg-gray"; 
$app_module = ""
?>

<?php require('../partials/header.php') ?>
<?php require('../partials/new-top-nav.php') ?>

<?php require('../partials/new-menu-top-property-dashboard.php') ?>

<div class="center-fold">
	<div>
			<h2 class="text-center mnu-40"></h2>
	</div>
	<div>
		<div class="cbox w-shadow bg-white row-margin-bottom">
			<?php require('partials/lease-details.php') ?>
			<div class="row">
				<div class="col-md-12">
					<div class="btn-container-plain text-right">
						<a href="#">Cancel</a> &nbsp;&nbsp;
						<button class="btn btn-primary btn-large"><span>Next</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<script>
  $(function(){
    uiDatePicker( '#LeaseStartDate' );
    uiDatePicker( '#LeaseEndDate' );
    uiDatePicker( '#firstDatePayment' );
    uiDatePicker( '#bondDate' );
 

  })

</script>

<?php require('../partials/footer.php') ?>