<?php $assets_link = "";

$version = time();
 ?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Rent My Estate</title>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width">
<meta name="description" content="RME" />
<meta name="keywords" content="rent, realestate" />
<meta name="author" content="Rent My Estate" />

<link href='//fonts.googleapis.com/css?family=Roboto:100,400,300,500' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/_style_bundle2.css?v=<?php echo $version; ?>" type='text/css'>
<!-- extra CSS -->
<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/fileupload/bootstrap-image-gallery.min.css?v=<?php echo $version; ?>">
<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/fileupload/jquery.fileupload-ui.css?v=<?php echo $version; ?>">


<link rel="stylesheet" href="/partials/css/modal-plan.css?v=<?php echo $version; ?>">

<link href='//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
<!--[if IE]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/ie.css?v=<?php echo $version; ?>">
<![endif]-->
<!-- base JS -->


<script src="<?php echo $assets_link; ?>/assets/js/u/c.js?v=<?php echo $version; ?>"> </script>
<!--[if lte IE 8]>
	<script src="<?php echo $assets_link; ?>/assets/js/respond.js?v=<?php echo $version; ?>"> </script>
<![endif]-->
<!--[if lte IE 9]>
	<script src="<?php echo $assets_link; ?>/assets/js/libs/jquery.placeholder.min.js?v=<?php echo $version; ?>"> </script>
<![endif]-->

<script src="<?php echo $assets_link; ?>/assets/js/common.js?v=1.1.4"> </script>
<style>
	body { overflow-x: hidden; }
</style>

</head>

<?php 

include('functions.php'); 

?>


<body class="window-no-padding-bottom <?php echo $body_app_class; ?>">
