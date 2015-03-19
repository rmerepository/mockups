<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../dashboard/tenant-partials/tenant-top.php') ?>

<div class="mailwrap">
	<?php require('partials/filters.php'); ?>
	<?php require('partials/mail-list.php'); ?>
	<?php require('partials/mail-content.php'); ?>
</div>

<?php require('partials/components/mail-compose-msg.php') ?>

<?php require('../partials/footer.php') ?>