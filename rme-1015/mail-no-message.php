<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../partials/bread.php') ?>

<style>
	.no-converasation {
		border-left: 1px solid #eee;
		height: 76VH;
		overflow-y: auto;
		background-color: #FFF;
	}
	.no-converasation h2 {
		color: #d8d8d8;
		margin-top: 120px;
	}
</style>

<div class="mailwrap">
	<?php require('partials/filters.php'); ?>
	<div class="no-converasation">
		<h2 class="text-center">No Message...</h2>
	</div>
	
</div>


<?php require('../partials/footer.php') ?>