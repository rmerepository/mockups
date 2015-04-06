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

<!--
 <?php/*
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>

	.wrap {
			height: 380px;
		  position: relative;
		  width: 600px;
	}
	.mail-wrap {
		position: relative;
		overflow-y: scroll;
		padding-bottom: 200px;
		height: 190px;
		width: 600px;
	}
	.camo {
		height: 200px;
		width: 100%;
		margin: 20px 0px;
		background: green;
	}
	.message {
		background-color: red;
		height: 150px;
		width: 100%;
		position: absolute;
		bottom: 0px;
	}
	</style>
	<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>

</head>
<body>
		
		<div class="wrap">
			<div class="mail-wrap">
					<div class="m">
						<?php  
							for($i = 1; $i <= 10; $i++) {
								echo '<div class="camo">asdfds</div>';
							}
						?>
					</div>
			
			</div>
			<div class="message"></div>
		</div>


	<script>
		$(function(){

			$(".wrap-conv").scrollTop($('.conversation').height());
  return false;
		})
		
	</script>

</body>
</html>
*/?>

-->