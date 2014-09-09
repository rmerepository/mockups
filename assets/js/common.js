'use strict';

var _floatRegex = /^[+-]?\d+(\.\d+)?$/;
var _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var _apiLists = window.location.protocol+'//'+window.location.host + "/api/lists";

    // API SETTINGS
    var
      // street type source

       streetTypeSrc = new kendo.data.DataSource({
        transport: {
            read: { url: _apiLists, data:{ type:"street" }  }
          },
        schema: {   data:"data" }
      })


      // post code source

      , postcodeSrc = new kendo.data.DataSource({
        transport: {
            read: { url: _apiLists, data:{ type:"postcodes" }  }
          },
        schema: {   data:"data" },
        serverFiltering: true
      })


      , stateSrc = new kendo.data.DataSource({
        transport: {
            read: { url: _apiLists, data:{ type:"state" }  }
          },
        schema: {   data:"data" }
      })

      , orgTypeSrc = new kendo.data.DataSource({
        transport: {
            read: { url: _apiLists, data:{ type:"organisation_type" }  }
          },
        schema: {   data:"data" }
      })
    ;


    function FormSuburbUpdateAddress(e) {
       var dataItem = this.dataItem(e.item.index());
        $('#postcode').val(dataItem.postcode);

        var dropdownlist = $("#state").data("kendoDropDownList");

        dropdownlist.value( dataItem.state );
//        dropdownlist.toggle();
        dropdownlist.refresh();

        $("#suburb").data("kendoAutoComplete").value(dataItem.locality);
        e.preventDefault();
    }

    // for code review
    function FormSuburbUpdatePostalAddress(e) {
       var dataItem = this.dataItem(e.item.index());
        $('#postal_postcode').val(dataItem.postcode);

        var dropdownlist = $("#postal_state").data("kendoDropDownList");

        dropdownlist.value( dataItem.state );
        dropdownlist.refresh();

        $("#postal_suburb").data("kendoAutoComplete").value(dataItem.locality);
        e.preventDefault();
    }

// kendo DropDown
function uiDropDown( kSelector, kDataSource, kText, kValue ) {
    $( kSelector ).kendoDropDownList({
        dataSource : kDataSource,
        dataTextField: kText,
        dataValueField: kValue
    });
}

// kendo DropDown
function uiDropDownOnChangeEvent( kSelector, kOptionLabel, kDataSource, kText, kValue, kOnChange ) {
    $( kSelector ).kendoDropDownList({
        dataSource : kDataSource,
        optionLabel: kOptionLabel,
        dataTextField: kText,
        dataValueField: kValue,
        change: kOnChange
    });
}

// kendo Slider
function uiRangeSlider( kSelector, kMin, kMax, kSmallStep, kLargeStep ) {
    $('#weeklyRentAmount').kendoRangeSlider({
            min: kMin,
            max: kMax,
            smallStep: kSmallStep,
            largeStep: kLargeStep,
            tickPlacement: "both"
    });
}

// kendo MultiSelect
function uiMultiSelect( kSelector, kDataSource, kText, kValue  ) {
    $( kSelector ).kendoMultiSelect({
        dataSource : kDataSource,
        dataTextField: kText,
        dataValueField: kValue
    });
}

// Date Picker
function uiDatePicker( jSelector,default_date ) {

    var rmeDateToday = default_date?default_date:new Date(), // Get Current Date
        jDateFormat = "dd-M-yy",
        calendarIcon = "/assets/images/calendar-btn.png";

    $( jSelector ).datepicker({

        numberOfMonths: [1,2],
        minDate: rmeDateToday,
        dateFormat: jDateFormat,
        yearRange: "2011:2017",
        showOn: "button",
        buttonImage: calendarIcon,
        buttonImageOnly: true,
    });

     $('.enable-click-date-window').on('click', function(){
        $(this).datepicker('show');
     })


}

// Toast Message
function uiAlertMsg( msg, msgType,sticky ){
   var stick=false;
   if(sticky){
       stick =true;
   }
    
   msgType = typeof msgType !== 'undefined' ? msgType : 'error';
   return $().toastmessage('showToast', {
        text     : msg,
        sticky   : stick,
        position : 'top-center',
        type     : msgType,
        stayTime : 5000
    });
}

// Basic Alert Message
// @param target an element where you add the message
function uiBasicMsg( msg, msgType ){

  var uiTarget = $('[data-alert-target=me]');
  uiTarget.removeClass();
  uiTarget.addClass('has-'+msgType);
  uiTarget.html('');
  uiTarget.html('<span class="help-block">'+msg+'</span>');

}


function isNumber (o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function formAlertMessage( param ){

 var customMessage = 'This field is required';
 var number = '';

 if( isNumber(param) )  
    number = param;
  else  
    customMessage = param;

 return {
     iconStatus  : "<div class='msg'></div>",
     msgRequired : "<div class='msg'><div class='text'>"+customMessage+"</div></div>" ,
     msgInvalidEmail : "<div class='msg'><div class='text'>Invalid email address</div></div>" ,
     msgRequiredNumber : "<div class='msg'><div class='text'>This field must contain only numbers</div></div>",
     msgMaxLength : "<div class='msg'><div class='text'>This field must contain " + number + " characters only</div></div>",
     msgMinLength : "<div class='msg'><div class='text'>Password too short. You need at least " + number + " characters</div></div>",
     passwordNotMatch : "<div class='msg'><div class='text'>Passwords do not match. Please re-type.</div></div>",
     numericd : "<div class='msg'><div class='text'>1 character needs to be a number</div></div>",
     passwordMatch : "<div class='msg'><div class='text'>Password match</div></div>"
    };
}
// Clear Validation Components
function cleanControlFields( element ) {
    element.closest('.controls').find('.msg').remove();
    element.removeClass('error success warning')
           .closest('.controls').removeClass('error success warning');
}

// Set Class
function setControlClass( element, selectorClass ) {
    element.addClass( selectorClass )
      .closest('.controls').addClass( selectorClass );
}

// Set Validation Message
function setMessage ( element, msg ) {
    element.closest('.controls').append( msg );
}

// Validation process
function validationProcess( element ) {

    var el = element
      , elVal = $.trim( el.val() )
      , elValLength = elVal.length
      , maxLength = el.data('maxlength') == undefined ? 0 : el.data('maxlength')      
      , customMessage = el.data('custom-message') == undefined ? '' : el.data('custom-message')
      , valid = true;
      
        if ( elVal == "" ) {
            setControlClass( el, 'error' );
            setMessage( el , formAlertMessage( customMessage ).msgRequired );
            valid = false;
        } else {

            // is Number
            if ( el.hasClass('is-number') && !_floatRegex.test(elVal) ) {
                valid = false;
                setControlClass( el, 'warning' );
                setMessage( el , formAlertMessage().msgRequiredNumber );

            // is Email
            } else if ( el.hasClass('is-email') && !_emailRegex.test(elVal) ) {
                setControlClass( el, 'warning' );
                setMessage( el , formAlertMessage().msgInvalidEmail );
                valid = false;


            // MaxLength
            } else if ( maxLength &&  maxLength < elValLength ) {
                setControlClass( el, 'warning' );
                setMessage( el , formAlertMessage( el.data('maxlength')  ).msgMaxLength );
                valid = false;

            } else {
                setControlClass( el, 'success' );
                setMessage( el , formAlertMessage().iconStatus );
                valid = true;
            }
          
            // Min Lenght

            if ( typeof el.attr('data-minlength') !== 'undefined' ) {
                valid = false;
                cleanControlFields(el);
                setControlClass( el, 'warning' );
                setMessage( el , formAlertMessage(el.attr('data-minlength')).msgMinLength );
                if ( elValLength >= el.attr('data-minlength')  ) {
                    cleanControlFields(el);
                    setControlClass( el, 'success' );            
                    valid = true;
                }              
            } 

            if ( typeof el.attr('data-field-pattern') !== 'undefined' ) {
                valid = false;
                cleanControlFields(el);
                setControlClass( el, 'warning' ); 
                setMessage( el , formAlertMessage().numericd );                              
                if ( elVal.match(/\d+/g) != null ) {
                  valid = true;
                  cleanControlFields(el);
                  setControlClass( el, 'success' );     
                }
            }

            // Field Matching 
            if ( typeof el.attr('data-is-equalTo') !== 'undefined' ) {
              valid = false;
              cleanControlFields(el);
              setControlClass( el, 'warning' );
              setMessage( el , formAlertMessage().passwordNotMatch );
            if ( $(el.attr('data-is-equalTo')).val() == elVal ) {
              cleanControlFields(el);
              setControlClass( el, 'success' );            
              valid = true;
             } 
            }

        }

        return valid;

}

// run keyup validation UX friendly
function rmefocusOutValidate() {
    $('[data-is-required="true"]').on('keyup', function() {
      var el = $(this);
      cleanControlFields( el );
      validationProcess( el );
    });
}

function submitValidate( form ){

  rmefocusOutValidate(); // run keyup validation UX friendly

  var formWrap = (form != undefined) ? form + ' ': ''
    , counter = 0
    , validity = true;

    $.each( $( formWrap + '[data-is-required="true"]' ), function(){

        var el = $(this)
          , elVal = $.trim( el.val() );

         cleanControlFields( el );

         if( validationProcess( el ) == false ) {
            counter++;
         }

    });

  if(counter != 0) {
    validity = false;
  }

  return validity;
};



function searchWord(v_words,v_array_words){
        var v_foundWords =[];

         $.grep(v_words, function(kword,val) {
            if( $.inArray(kword,v_array_words) != -1){
                v_foundWords.push(kword);
            }
        });

        return  v_foundWords;
}

function checkCharacter(v_words){
    //== allowed characters \words\space\comma\period\digits\_
//== reg ex ref http://www.w3schools.com/jsref/jsref_obj_regexp.asp

var str = v_words;
var specialChar =[];

   for(var chk=true; chk ==true;true){
        var regex = /[^\w\s\,\.\d\_\-\*\)\$\!\(\=\+\:\"\'\;\/\`\?\~]/gi;

         var char = regex.exec(str);

        if(char == null){
           chk =false;
       }else{
           specialChar.push(char+"");
           str = str.replace(char+"","");

       }
   }

    return specialChar;

}


function compute_month(rentWeekly){
    var inDays = rentWeekly /7;
    var inYear = inDays * 365;
    var inMonths= inYear /12;
    return Math.round(inMonths * 100)/100;
}


function forceValidate(element_id,customMessage){
    var t =  $("#"+element_id), tVal =  $("#"+element_id).val();

     var msg = "<div class='msg'><div class='text'>"+customMessage+"</div></div>";

      if ( t.hasClass('success') || t.hasClass('error')) {
            t.closest('.controls').find('.msg').remove();
            t.removeClass('error, success')
            .closest('.controls').removeClass('error, success');
      }
              t.addClass('error')
             .closest('.controls').addClass('error')
             .closest('.controls').append(msg);




    return false;
}


function check_email(text){

    var words = text.toLowerCase();
    var v_foundWords =[];

    var urlRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    var match;

    while (match = urlRegex.exec(words)){
        v_foundWords.push(match[0]);
        words = words.replace(match[0],"")
    }

        return  v_foundWords;
}

function check_au_mobile(text){
    var words =  text.replace(/[ -/*()]+/g, "");
    var v_foundWords =[];

    var urlRegex = /\d{11}|\d{10}|\d{9}|\d{8}/;
    var match;
    var phone;

    while (match = urlRegex.exec(words)){
        if(match[0].length == 11){
            phone = "+"+match[0].substring(0,2)+" "+match[0].substring(2,5)+" "+match[0].substring(5,8)+" "+match[0].substring(8,11);
        }
        if(match[0].length == 10){
            phone = match[0].substring(0,4)+" "+match[0].substring(4,7)+" "+match[0].substring(7,10);
        }
        if(match[0].length == 9){
            phone = "0"+match[0].substring(0,3)+" "+match[0].substring(3,6)+" "+match[0].substring(6,9);
        }

        if(match[0].length == 8){
            phone = match[0].substring(0,4)+" "+match[0].substring(4,8);
        }
        v_foundWords.push(phone);
        words = words.replace(match[0],"");
    }

        return  v_foundWords;

}

function check_domain(text){

     var words = text;

        //var urlRegex = /([a-zA-Z0-9-]*)+([a-zA-Z0-9-]+[/.])+([a-zA-Z]{3}|[a-zA-Z]{2})/;
        var urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

        var v_foundWords =[];
        var match;

    while (match = urlRegex.exec(words)){
        v_foundWords.push(match[0]);
        words = words.replace(match[0],"")
    }

    return  v_foundWords;

}

function strToUpper(str){
   return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
});
}


function custom_validate(element_id){
    var words = $('#'+element_id).val().toLowerCase().split(/\b[\s,\.-:;]*/);
    var foundWords =[];
    var foundCharacters =[];
    var msg="";
    var hmsg=[];
    var category=[]
    var customMsg = $('#'+element_id).data('custom-message');

    $("#descriptionInfo").hide();
    $("#descriptionInfo").triggerHandler('mouseleave');

    addMessage(true,element_id,msg);

    if($.trim($('#'+element_id).val()) ==""){      
         
         msg = "Something's missing here.";
         
         if (customMsg) {
          msg = customMsg;
         } 
         
         return addMessage(false,element_id,msg);
    }


    foundWords = check_email($('#'+element_id).val());
   if(foundWords.length >0){
       category.push("email address");
       hmsg.push(foundWords);
        isWebsite('descriptionInfo',false);
        $("#descriptionInfo").show();
         $("#descriptionInfo").triggerHandler('mouseenter');
            setTimeout(function(){
                       $("#descriptionInfo").triggerHandler('mouseleave');

                },4000);

  }

  foundWords = check_au_mobile($('#'+element_id).val());
   if(foundWords.length >0){
       hmsg.push(foundWords);
       category.push("phone numbers");
        if(category.length==1){
            isWebsite('descriptionInfo',false);
             $("#descriptionInfo").show();
              $("#descriptionInfo").triggerHandler('mouseenter');
                 setTimeout(function(){
                            $("#descriptionInfo").triggerHandler('mouseleave');
                     },4000);
        }

  }

    foundWords = check_domain($('#'+element_id).val());
   if(foundWords.length >0){
       hmsg.push(foundWords);
       category.push("url links");
       if(category.length==1){
        isWebsite('descriptionInfo',true);
            $("#descriptionInfo").show();
             $("#descriptionInfo").triggerHandler('mouseenter');
                setTimeout(function(){
                           $("#descriptionInfo").triggerHandler('mouseleave');
                    },4000);
       }
  }

   foundWords = searchWord(words,array_words);
  if(foundWords.length >0){
      hmsg.push(foundWords);
      category.push("words");

  }
    foundCharacters = checkCharacter($('#'+element_id).val());

    if(foundCharacters.length >0){
        hmsg.push(foundCharacters);
        category.push("characters");

    }

    if(category.length >0){
        var tmp =hmsg.join(", ");
        msg ="The following "+category.join(", ")+" are not allowed <br/><b>"+tmp;+"</b>";
        return addMessage(false,element_id,msg);
    }

    return true;
}

function isWebsite(ttID,isWebsite){
    if(!isWebsite){
        $("#"+ttID).attr("data-content","<ul><li>Sorry, for your own privacy we don't display your contact details on your profile. Find out <a href='#moreInfoMod' class='moreInfoMod' data-toggle='modal'>more</a></li></ul>");
    }else{
        $("#"+ttID).attr("data-content","<ul><li>Sorry, we know it's annoying but realestate.com.au doesn't allow any links in your ad so please remove.</li></ul>");
    }
}


 var array_words =[];
 
 /*====================================
 *  Read model remote bind for contac person
 * ===================================
 */
var dtRestricted = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"x-words"}
            }
        },
        schema: { 
                data: "data"
            }
    })

/**
 * Just to format currency
 * @param {type} amount
 * @returns {unresolved}
 */
function formatCurrency(amount){
    var tmp_amount = parseFloat(amount)*1;
    return tmp_amount.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}