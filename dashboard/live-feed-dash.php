<?php
$body_app_class = "bg-gray"; 
$app_module =""
?>

<style>
 	.activity-feed .invite-tenant:before{
		background-color: #2980b9;
	}

	 .activity-feed .property-status:before{
		background-color: #2980b9;
	}

	.activity-feed .feed:before { color: #FFF !important }

</style>

<?php require('../partials/header.php') ?>
<?php require('../partials/new-top-nav.php') ?>

<?php require('../partials/new-menu-top-property-dashboard.php') ?>
<?php require('partials/with-live-feed.php') ?>

<?php require('../partials/footer.php') ?>