<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav-no-menu.php') ?>

<div class="center-fold">
	<div>
			<h2 class="text-center mnu-40">Online Tenant Application</h2>
	</div>
	<div>
		<div class="cbox w-shadow bg-white row-margin-bottom">
			<?php require('partials/property.php') ?>
			<?php require('partials/personal-details.php'); ?>
			<?php require('partials/other-occupants-and-pets.php'); ?>
			<?php require('partials/current-address.php'); ?>
			<?php require('partials/current-employment.php'); ?>
			<?php require('partials/references.php'); ?>
			<?php require('partials/privacy-statement-declaration.php'); ?>
			<div class="row">
				<div class="col-md-12">
					<div class="btn-container-plain text-right">
						<button class="btn btn-primary btn-large"><span>Submit</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



<script>
  $(function(){
    uiDatePicker( '#tenantDOB' );
    uiDatePicker( '#tenantMiD' );
    uiDatePicker( '#tenantExpiryDateID' );
    uiDatePicker( '#dateOfFirstDay' );
    uiDatePicker( '#preferredLeaseStartDate' );
    uiDatePicker( '#earliestLeaseStartDate' );
    
    

       $("#typeTenant").dropdownchecklist( 
       		{ 
       		firstItemChecksAll: true, icon: {},
            emptyText: "Please select ...", 
            width: 226, 
            maxDropHeight: 200,
        });

  })

</script>

<?php require('../partials/footer.php') ?>




