var PreviewAddProperty = {
    jQuery : $,
    init : function () {
		arrDeleteFeatures = [];

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

            var weeklyRent = $('#weekly_rent').val();
            var trmRent = parseInt(weeklyRent);
            $('#weekly_rent').val(trmRent);

       });

       // RENT AMOUNT
       $('.in-rent-amount').blur(function()
       {
           var perWeekVal =  $(this).val();
           var bondAmount = perWeekVal * 4;
           $('#amount-bond').html('$' + bondAmount);

       });


       // RENT DATE
       $('.in-rent-date').blur(function()
       {
           var date_available =  $(this).val();

       });

       // BASIC TEXT FIELDS
       $('.basic-text-fields').blur(function(){
          var textValue = $(this).val();
          var setTextValueOfCaption = $(this).parents('.inline-text-data').children('span');
          setTextValueOfCaption.html(textValue);

          var fieldName = $(this).attr('name');

          var postData	= {};

	   		postData[fieldName] = textValue;


       });

	   // DROPDOWN DROPKICK
	   $('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e){
	   		var value 		= $(this).attr('data-dk-dropdown-value');
	   		var fieldName 	= $(this).parents('.dk_container').attr('select-field-name');
	   		var postData	= {};

	   		postData[fieldName] = value;
			$('#preview_'+fieldName).val(value);
  	   });

       // MAIN FEATURES
       $('.features-value').on(($.browser.msie ? 'mousedown' : 'click'), ".dk_options li a" ,function(event){
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

      		var perWeekVal =  $('#weekly_rent').val();
    			var bondAmount = perWeekVal * 4;
  		  	var date_available =  $('.in-rent-date').val();

          $('#date_available_value').html(date_available);
          $('#rent-amount-value').html('$' + perWeekVal);
          $('#amount-bond').html('$' + bondAmount);
          $('body').addClass('saving-data');


			jQuery.ajax(
			{
				url: 'lease/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: {'weekly_rent_amount': perWeekVal, 'date_available': date_available},
				success: function(data)
				{
				}
			});


	   		jQuery.ajax(
			{
				url: 'description/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: {'headline': $('#preview_headline').val(), 'description': $('#preview_description').val()},
				success: function(data)
				{
				}
			});

	   		jQuery.ajax(
			{
				url: 'features/ajax_submit_preview',
				type: 'POST',
				async: false,
				data: {  'number_of_bedrooms': $('#preview_number_of_bedrooms').val()
				,'number_of_bathrooms': $('#preview_number_of_bathrooms').val()
				,'number_of_car_spaces': $('#preview_number_of_car_spaces').val()
				,'property_type': $('#preview_property_type').val()
				 },
				success: function(data)
				{
				}
			});


			jQuery.ajax({
				url: 'inspection/ajax_contact',
				type: 'POST',
				async: false,
				data: {contact_person: $('#preview_contact_id').val()},
				success: function(data) {
				}
			});

			for (var i=0;i<arrDeleteFeatures.length;i++)
			{
				jQuery.ajax({
					url: 'features/ajax_submit_remove_feature',
					type: 'POST',
					async: true,
					data: {feature_id: arrDeleteFeatures[i]},
					success: function(data)
					{
						parse_data = jQuery.parseJSON(data);
					}
		  	});


			}





			arrDeleteFeatures = [];

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
				$('#preview_contact_id').val(contactId);

       });
    },

     // REMOVING FEATURES

    removeFeature : function() {
        $(".remove-this-feature").on("click", function(event){
            var featureItem = $(this).parent('li');
            var featureItemId = featureItem.attr('feature-data-id');
            featureItem.remove();
			      arrDeleteFeatures.push(featureItemId);
            return false;
      });
    },
};

$(function(){
  PreviewAddProperty.init();
})
