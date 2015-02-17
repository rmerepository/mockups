<?php $assets_link = ""; ?>

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

<!--  for fb purpose -->
<meta property="og:url" content="//members-dev.rentmyestate.com.au" />
<meta property="og:title" content="Rent My Estate" />
<meta property="og:description" content="RME" />

<link href='//fonts.googleapis.com/css?family=Roboto:100,400,300,500' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/_style_bundle2.css?v=1.1.2" type='text/css'>
<!-- extra CSS -->
<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/fileupload/bootstrap-image-gallery.min.css?v=1.1.2">
<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/fileupload/jquery.fileupload-ui.css?v=1.1.2">
<link href='//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
<!--[if IE]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<link rel="stylesheet" href="<?php echo $assets_link; ?>/assets/css/ie.css?v=1.1.2">
<![endif]-->
<!-- base JS -->


<script src="<?php echo $assets_link; ?>/assets/js/u/c.js?v=1.1.2"> </script>
<!--[if lte IE 8]>
	<script src="<?php echo $assets_link; ?>/assets/js/respond.js?v=1.1.2"> </script>
<![endif]-->
<!--[if lte IE 9]>
	<script src="<?php echo $assets_link; ?>/assets/js/libs/jquery.placeholder.min.js?v=1.1.2"> </script>
<![endif]-->

<script src="<?php echo $assets_link; ?>/assets/js/common.js?v=1.1.4"> </script>
</head>

<style type="text/css">
/*	body:before{
		content: "Mockup Site";
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 9999;
		padding: 7px 12px;
		border: 1px solid #616161;
		background-color: rgba(0, 0, 0, 0.47);
		color: #FFF;
		font-family: arial;
		font-size: 12px;
	}*/
</style>

<?php 

function form_prep($str = '', $field_name = '')
	{
		static $prepped_fields = array();

		// if the field name is an array we do this recursively
		if (is_array($str))
		{
			foreach ($str as $key => $val)
			{
				$str[$key] = form_prep($val);
			}

			return $str;
		}

		if ($str === '')
		{
			return '';
		}

		// we've already prepped a field with this name
		// @todo need to figure out a way to namespace this so
		// that we know the *exact* field and not just one with
		// the same name
		if (isset($prepped_fields[$field_name]))
		{
			return $str;
		}

		$str = htmlspecialchars($str);

		// In case htmlspecialchars misses these.
		$str = str_replace(array("'", '"'), array("&#39;", "&quot;"), $str);

		if ($field_name != '')
		{
			$prepped_fields[$field_name] = $field_name;
		}

		return $str;
	}


function _parse_form_attributes($attributes, $default)
	{
		if (is_array($attributes))
		{
			foreach ($default as $key => $val)
			{
				if (isset($attributes[$key]))
				{
					$default[$key] = $attributes[$key];
					unset($attributes[$key]);
				}
			}

			if (count($attributes) > 0)
			{
				$default = array_merge($default, $attributes);
			}
		}

		$att = '';

		foreach ($default as $key => $val)
		{
			if ($key == 'value')
			{
				$val = form_prep($val, $default['name']);
			}

			$att .= $key . '="' . $val . '" ';
		}

		return $att;
	}
	
function control_form ( $lbl, $name, $tabindex, $placeholder ) {
		echo '<div class="control-group">
		        <label class="control-label" for="'.$name.'">'.$lbl.'</label>
		        <div class="controls">
		          	<input autocomplete="off" name="'.$name.'" id="'.$name.'" placeholder="'.$placeholder.'" class="form-control width-full" maxlength="30" tabindex="'.$tabindex.'" value="" type="text">

		        </div>
		      </div>';
	}

	function control_form_date ( $lbl, $name, $tabindex, $placeholder ) {
		echo '<div class="control-group inspection-date">
				<div class="input-append date controls">
					<label class="control-label" for="'.$name.'">'.$lbl.'</label>
					<div class="controls"><input data-is-required="true" width="30" name="'.$name.'" type="text" id="'.$name.'" class="form-control enable-click-date-window medium-datepicker" ></div>
				</div>
			</div>';
	}

	function radio_input ( $lbl, $id, $name, $value ) {
		echo '<div class="radio-group custom-radio-field">
                <input type="radio" name="'.$name.'" id="'.$id.'" value="'.$value.'">
                <label for="'.$id.'">'.$lbl.'</label>
             </div>';
	}

	function custom_form_input($data = '',  $textHelper = '' , $value='' , $extra = '')
	{
		$defaults = array('type' => 'text', 'name' => (( ! is_array($data)) ? $data : ''), 'value' => $value);

		return "<input "._parse_form_attributes($data, $defaults).$extra." /><p>asdas".$textHelper."</p>";
	}

	

?>


<body class="bg-gray window-no-padding-bottom">
<div class="rme-wrap rent-collection">