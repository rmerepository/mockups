var PreviewAddProperty = {
    jQuery : $,
    init : function () {
        this.inlineEdit();  
        this.disableInlineEdit();
        this.removeFeature();  
        this.setDatePicker();  
        this.contactPerson();  
    },
    
    // SET DATE PICKER
    setDatePicker : function() {
    $(".hasDatePicker").datepicker({ numberOfMonths: [1,2], dateFormat: "dd M yy", yearRange: "2011:2017",showOn: "button",
        buttonImage: "/assets/images/calendar-btn.png",
        buttonImageOnly: true});
    },

    // ENABLING THE INLINE EDITING

    inlineEdit : function() {
       $('.edit-btn').on("click", function(event){
            $(this).hide();
            $('.save-btn').show();
            $('.preview-property-container').addClass('edit-mode');
            $('.editable-value').css('visibility','hidden');
       });
     
       // RENT AMOUNT 
       $('.in-rent-amount').blur(function()
       {
           var perWeekVal =  $(this).val();
           var bondAmount = perWeekVal * 4;
           
           $('#rent-amount-value').html('$' + perWeekVal);
           $('#amount-bond').html('$' + bondAmount);

			jQuery.ajax(
			{
				url: 'lease/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: {'weekly_rent_amount': perWeekVal},
				success: function(data)
				{
					parse_data = jQuery.parseJSON(data);
				}
			});
       });
       
       
       // RENT DATE
       $('.in-rent-date').blur(function()
       {
           var date_available =  $(this).val();
           
           $('#date_available_value').html(date_available);
           
			jQuery.ajax(
			{
				url: 'lease/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: {'date_available': date_available},
				success: function(data)
				{
					parse_data = jQuery.parseJSON(data);
				}
			});
       });

       // BASIC TEXT FIELDS 
       $('.basic-text-fields').blur(function(){
          var textValue = $(this).val();
          var setTextValueOfCaption = $(this).parents('.inline-text-data').children('span');
          setTextValueOfCaption.html(textValue);
         
          var fieldName = $(this).attr('name');
          
          var postData	= {};
	   		
	   		postData[fieldName] = textValue;
	   		
	   		jQuery.ajax(
			{
				url: 'description/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: postData,
				success: function(data)
				{
					parse_data = jQuery.parseJSON(data);
				}
			});
          
       });

	   // DROPDOWN DROPKICK
	   $('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e){
	   		var value 		= $(this).attr('data-dk-dropdown-value');
	   		var fieldName 	= $(this).parents('.dk_container').attr('select-field-name');
	   		var postData	= {};
	   		
	   		postData[fieldName] = value;
	   		
	   		jQuery.ajax(
			{
				url: 'features/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: postData,
				success: function(data)
				{
					parse_data = jQuery.parseJSON(data);
				}
			});
  	   });
		 	
       // MAIN FEATURES
       $('.features-value').on("click", ".dk_options li a" ,function(event){
           var selectValue = $(this).attr('data-dk-dropdown-value');
           var setValueOfCaption = $(this).parents('.features-value').children('span');
           var nameOfFieldToBePosted = setValueOfCaption.attr('id');
          
           // console.log("value: " + selectValue + " | name of field: " + nameOfFieldToBePosted);

           setValueOfCaption.html(selectValue);
        });

       // DATE PICKER 
       $('.hasDatePicker').change(function(){
          var dateValue = $(this).val();
          var setDateValueOfCaption = $(this).parents('.date-picker-value').children('span');
          setDateValueOfCaption.html(dateValue);
       });
    },

    // DISABLE THE INLINE EDITING

    disableInlineEdit : function() {
        $(".save-btn").on("click", function(event){
            $(this).hide();
            $('.edit-btn').show();
            $('.preview-property-container').removeClass('edit-mode');
            $('.editable-value').css('visibility','visible');
       });
    },

   
    contactPerson : function() {
        $('.select-person, .select-controller').on("click", function(event){
            $(this).parent().toggleClass('active');
            return false
        });

        $(".contact-person li a").on("click", function(event){

          event.preventDefault();

           $('.contact-person li a').removeClass('selected');
           $(this).addClass('selected');
           var contactId = $(this).data('contact').id;
           var contactNo = $(this).data('contact').number;
           var contactEmail = $(this).data('contact').email;
           var contactName = $(this).html();

    			$('.contact-name span, .select-person').html(contactName);
    			$('.contact-no span').html(contactNo);
    			$('.contact-email span').html(contactEmail);
    			$(this).parents('.select-contact-person').toggleClass('active'); 
      
      jQuery.ajax({
        url: 'inspection/ajax_contact',
        type: 'POST',
        async: false,
        data: {contact_person: contactId},
        success: function(data) {

//          console.log( data )

          // parse_data = jQuery.parseJSON(data);
        }
		  });
   
       });
    },

     // REMOVING FEATURES

    removeFeature : function() {
        $(".remove-this-feature").on("click", function(event){
            var featureItem = $(this).parent('li');
            var featureItemId = featureItem.attr('feature-data-id');
            featureItem.remove();
            
           	jQuery.ajax({
                url: 'features/ajax_submit_remove_feature',
                type: 'POST',
                async: false,
                data: {feature_id: featureItemId},
                success: function(data)
                				{
                					parse_data = jQuery.parseJSON(data);
                				}
		  	});
            return false;
      });
    },
};
PreviewAddProperty.init();