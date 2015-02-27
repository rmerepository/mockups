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