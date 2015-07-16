<?php 
$name 		= isset($_GET["name"]) ? $_GET["name"] : "" ;
$position 	= isset($_GET["position"]) ? $_GET["position"] : "" ;
$tel 		= isset($_GET["tel"]) ? str_replace(" ", "&nbsp;", $_GET["tel"]) : "";
$address 	= isset($_GET["address"]) ? $_GET["address"] : "";
?>

<?php if($_GET) { ?>
<table cellspacing="0" cellpadding="0" style="border:none;font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif;" width="100%">
	<tr>	
		<td style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif;" width="400">			
			<span style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; color: #82cec6"><?php echo $name; ?> </span> <span style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #ee7682"><?php echo $position; ?></span>			
		</td>		
		<td rowspan="4"> <a href="http://cubbi.com.au" title="cubbi" style="color: #b3b3b3; text-decoration: none;"><img border="0" src="https://s3-ap-southeast-2.amazonaws.com/cubbi/cubbi-logo.jpg" width="124" width="49" title="cubbi" alt="cubbi"> </a></td>
	</tr>
		<tr>
		<td height="7px"></td>
	</tr>
	<tr>
		<td> <span style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #b3b3b3">Suite 504, 365 Little Collins Street, Melbourne 3000</span></td>
	</tr>
	<tr>
		<td>
		<table cellspacing="0" cellpadding="0" style="border:none" width="345px;">
			<tr>
				<td style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #b3b3b3">
				 	<span style="color: #b3b3b3; text-decoration: none;">t: 1300 654 600</span>
				</td>
				<td style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #b3b3b3">
					<span style="color: #b3b3b3; text-decoration: none;">m: 0401 572 425</span>
				</td>
				<td style="font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #b3b3b3">
					<span><a href="http://cubbi.com.au" title="cubbi" style="color: #b3b3b3; text-decoration: none;">w: cubbi.com.au</a></span>
				</td>
			</tr>
			<tr>
				<td></td>
			</tr>
			</td>
		</table>
	</tr>
</table>

<?php } ?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Generate Email Signature</title>
	<style type="text/css">
		@import url('http://fonts.googleapis.com/css?family=Open+Sans');
		.gen {
			 font-family:'Open Sans', 'Helvetica Neue', Helvetica, sans-serif;
		}

		
		input[type="text"] {
			width: 400px;
			padding: 10px;
			text-decoration: 
		}
		input {
			font-size: 13px;
			outline: none;
		}
		.submit {
			padding: 10px 20px;
			cursor: pointer;
			border: 1px solid rgb(228, 228, 228);
			background: rgb(233, 233, 233);
			font-weight: bold;
		}
		.submit:hover {
			background: rgb(221, 221, 221);	
		}
	</style>
</head>
<body class="gen">
	<hr style="margin-top:100px;" />
	<?php if($_GET) { ?> <p>Copy above and paste on gmail signature</p> <?php } ?>
	<form action="" method="GET" autocomplete="off">
		<p>Name <br /> <input type="text" name="name" required="required"></p>
		<p> Position <br />	<input type="text" name="position" required="required"></p>
		<input type="submit" value="Generate!" class="submit">
		<a href="<?php echo $_SERVER['PHP_SELF']; ?>">Clear</a>
	</form>
</body>
<!-- http://www.youtube.com/watch?v=tsf_eVD3p9s -->

</html>


