jQuery(document).ready(function(){

	//uiDropDown( "#street_type", streetTypeSrc, "value" , "id");
	uiDropDown( "#state", stateSrc, "value" , "value");
	uiDropDown( "#organisation_type", orgTypeSrc, "value" , "id");
        
        var default_country_index =0;
        if(rCountry.length > 1){
            default_country_index = 9;
        }
        
        $( '#street_type' ).kendoDropDownList({
		dataSource : streetTypeSrc,
		dataTextField: 'value',
		dataValueField: 'id',
                select: function(e) {
                    var dataItem = this.dataItem(e.item.index());
                    if(dataItem.id === "......"){
                        e.preventDefault();
                    }
                }
	});

	$( '#country' ).kendoDropDownList({
		dataSource : rCountry,
		dataTextField: 'value',
		dataValueField: 'id',
		index: default_country_index
	});

	$("#suburb").kendoAutoComplete({    
		dataTextField: "full_locality",
		dataSource: postcodeSrc,
		select: FormSuburbUpdateAddress,
        minLength:"3", 
	});
	

	jQuery("#street_name").focusout(function(){
		var street_name = jQuery(this).val();
		jQuery(this).val(ucwords(street_name));
	})

	function ucwords (str) {
	    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
	        return $1.toUpperCase();
	    });
	}

	$("#add_address").submit(function(){

		if($('#state').val()=='State') {
			$('#state').val('');
		};

		if( submitValidate("#add_address") == false ) 
			return false
		else 
			return true
					
	})
	
});