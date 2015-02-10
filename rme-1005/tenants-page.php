<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav-no-menu.php') ?>
<?php require('../partials/bread.php') ?>

<div class="center-fold">
	<div>
			<h2 class="text-center mnu-40">Tenant Applications</h2>
	</div>
	<div>
		<div class="cbox w-shadow bg-white row-margin-bottom">
			<?php require('partials/pre-header-app.php') ?>	
			<?php require('partials/tenants-list-table.php') ?>	
		</div>

		<?php require('partials/modal-tenant-details.php') ?>
	</div>
</div>


<?php require('../partials/footer.php') ?>




