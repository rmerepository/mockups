/*
 * @author Felix bacat - massquote
 * Copyright 2013 Rent My Estate
 */

;(function($) {
    $.rmeAddressModal = function(element, options) {

        var defaults = {
            origin:"frontend",
            show:"onClick",
            access:0,
            class:"",
            id:"rmePropertyPlugin_"+element.attr("id"),
            host: "https://members.rentmyestate.com/",
            proxy:null,
            userdata:null,
            onSuccess:null,
            isNotLogin:null,
            backdrop:"static",
            windowType:"property",
            withLoader:0
        }


        var modal = this;
        modal.config = {}
        modal.address={
            unit_number:"",
            street_number:"",
            street_name:"",
            street_type:"",
            suburb:"",
            state:"",
            postal_code:"",
            country:"",
            full:""
        };

        /**
         * @description  create the object
         */
        var create = function() {
                    modal.config = $.extend({}, defaults, options);
                    modal.element = element;

                    modal.config.withLoader = $("#loader").length;

                    var divmodal = '<div class="modal fade '+modal.config.class+'" id="'+modal.config.id+'" tabindex="-1" role="dialog" aria-labelledby="'+modal.config.id+'" aria-hidden="true"></div>';
                    var loading = $("#loader").length !=0?"":"<div><div id='loader' style='height: 20px;background-color: #C8C8C8;font-size: .8em;position: fixed;bottom: 0px; padding: 0 50px 0 10px;z-index: 9999;display: none' >processing... please wait...</div></div>";
                    var iframe = '<iframe id="'+modal.config.id+'_frame" name="'+modal.config.id+'_frame" src="'+modal.config.host+'public/address/views/port/'+modal.config.origin+'" seamless="seamless" width="0" scrolling="no" height="0" frameborder="0" ></iframe>';

                    $(document.body).append(divmodal+iframe+loading);
                    //--
                      $("#"+modal.config.id+'_frame').attr("src", $("#"+modal.config.id+'_frame').attr("src"));
                    //-- append script
                    $(document.body).append('<script type="text/javascript" src="'+modal.config.host+'assets/js/libs/jquery.validate.min.js"></script>');

                    if(typeof($.valid) === 'undefined'){
                         //  console.log("jquery.validate dependency not loaded.");
                    }
                    if(typeof($.fn.modal) === 'undefined'){
                           console.log("bootstrap.js dependency not loaded.");
                           return false;
                    }



                var rmeProxyListener = function(msg){
                    if(msg.data.action =="view"){
                        switch(msg.data.render){

                            case "add":
                                renderAdd(msg.data.view);
                                break;

                            case "confirm":
                                renderConfirm(msg.data.view);
                                break;

                            case "property":
                                renderPropertySuccess(msg.data.view);
                                break;

                            case "toast":
                                toastMessage(msg.data.values);
                                break;

                        }
                    }else{
                        switch(msg.data.action){
                            case "init":
                                modal.config.access = msg.data.values.access;
                                modal.config.userdata = msg.data.values;
                                break;

                            case "toast":
                                toastMessage(msg.data.values);
                                break;

                            case "redirect":
                                redirectPage(msg.data);
                                break;

                            case "error":
                                errorCustom(msg.data.values);
                                break;

                        }
                    }
                }

                //-- create proxy  object
                 modal.config.proxy = new Porthole.WindowProxy(
                 modal.config.host+'membership/proxy', modal.config.id+'_frame');
                 modal.config.proxy.addEventListener(rmeProxyListener);


                if(modal.config.show =="onClick"){
                    modal.element.click(function(e){
                            if($(this).closest('li.widget').length > 0 && $(this).closest('li.widget').hasClass('dragging')) return false;
                           //-- check dependency
                             if(modal.config.access !="1"){
                                 modal.config.isNotLogin();
                             }else{
                                if(modal.config.onSuccess != null){
                                    modal.config.onSuccess(modal.address);
                                }else{
                                    modal.post({action:"view",url:"add",origin:modal.config.origin});
                                }
                             }

                    });
                }

        }//-- end of create

        //-- post action
        modal.post= function(data){
             loading("loading",true);
             modal.config.proxy.post(data);
        }



        modal.show = function() {
           modal.post({action:"view",url:"add",origin:modal.config.origin});
        }

           var redirectPage = function(data){
               var url;
               switch(data.values.type){
                   case "properties":
                        url= "promote/property/"+data.values.values;
                        break;
                   case "dashboard":
                        url= "dashboard/switcher/"+data.values.values;
                        break;
               }

               $("#"+modal.config.id).modal("hide");
               window.location.href = modal.config.host+url;
           }

            var renderPropertySuccess = function(data){
               initBackdrop();
              $("#"+modal.config.id).html(data);
              $("#"+modal.config.id).modal("show");
            }

            /**
             * @description render add address
             */
        var renderAdd = function(data) {
               initBackdrop();



               
              $("#"+modal.config.id).html(data);
              // Init tooltip
                $(".pop-over-right").popover();
              $("#"+modal.config.id).modal("show");
              



             var opt = {
                componentRestrictions: {country: 'au'}
             };

             var autocomplete = new google.maps.places.Autocomplete((document.getElementById('modalAc')), opt);

             var geolocation = new google.maps.LatLng(-25.274398, 133.775136);
             autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,geolocation));
             google.maps.event.addListener(autocomplete, 'place_changed', function(){
                    // Parse selected address to determine if [street#-street#] format is present
                    var selectedAddress = $('#modalAc').val();
                    var preAddr = selectedAddress.split(" ");
                    var repNumFlag = 0;
                    var firstChkFlag = 0;
                    var secondChkFlag = 0;
                    if(preAddr[0].contains("-"))
                    {
                        var strNumber = preAddr[0];
                        repNumFlag = 1;
                    }
                    // Check if first element has an integer
                    var firstChk = preAddr[0].match(/\d+/g);
                    // Check if second element has an integer
                    var secondChk = preAddr[1].match(/\d+/g);
                    if (firstChk != null)
                    {
                        if (secondChk == null)
                            var strNumber = preAddr[0];
                        else
                        {
                            var strNumber = preAddr[1];
                            secondChkFlag = 1;
                        }
                        firstChkFlag = 1;
                    }

                    // get Autocomplete place information from Google
                    var place = autocomplete.getPlace();

                    if(place.geometry){
                        var componentForm = {
                            street_number: ['street_number', 'short_name'],
                            route: ['street_name','long_name'],
                            locality: ['suburb','long_name'],
                            administrative_area_level_1: ['state','short_name'],
                            country: ['country','long_name'],
                            postal_code: ['postal_code','short_name']
                        };

                        modal.address.street_number = '';
                        for (var i = 0; i < place.address_components.length; i++) {
                            var addressType = place.address_components[i].types[0];
                            if(componentForm[addressType]){
                                var val = place.address_components[i][componentForm[addressType][1]];
                                modal.address[componentForm[addressType][0]]=val;
                            }
                        }
                    }

                    // alert(place.address_components.toSource());
                    var postAddr = place.formatted_address.split(" ");
                    if((postAddr[0].contains("/")) && (repNumFlag == 1))
                        postAddr[0] = preAddr[0];
                    if((modal.address.street_number == '') && (firstChkFlag == 1))
                    {
                        if(secondChkFlag == 1)
                            postAddr.unshift(preAddr[0],preAddr[1]);
                        else
                            postAddr.unshift(preAddr[0]);
                    }
                    var fullAddr = postAddr.join(" ");
                    /*
                     * AJAX Address parsing.
                     * handle and pass address
                     * info to RME_address library.
                     */
                    var params = {
                        "address":fullAddr
                    };
                    var addressURL = "/membership/parse";
                    // alert('ADDRESS FULL: '+fullAddr);

                    // post
                    ajaxPost(addressURL, params, function(response){
                        if(response.status =="success"){
                            modal.address.full = response.result.full;
                            /*
                             * priority is giving to RME_address library result.
                             * if no result is returned from address library,
                             * stick with the default result from Google API.
                             */
                            if(response.result.unitno != '')
                                modal.address.unit_number = response.result.unitno;
                            if(response.result.number != '')
                                modal.address.street_number = response.result.number;
                            if(response.result.street != '')
                                modal.address.street_name = response.result.street;
                            if(response.result.type != '')
                                modal.address.street_type = response.result.type;
                            if(response.result.suburb != '')
                                modal.address.suburb = response.result.suburb;
                            if(response.result.state != '')
                                modal.address.state = response.result.state;
                            if(response.result.postcode != '')
                                modal.address.postal_code = response.result.postcode;
                            if(response.result.country != '')
                                modal.address.country = response.result.country;
                        }

                        $('#modalAc').val(modal.address.full);
                    },null);

                    $('#modalAc').addEventListener('blur', function(){
                        // timeoutfunction allows to force the autocomplete field to only display the street name.
                        if(place){ setTimeout(function(){ $('#modalAc').val(modal.address.full); }, 1); }
                    });

                //--- format
             });

               $('#modalAc').keypress(function(e) {
                      $('.pac-container').css('z-index', '9999');
                      if (e.which == 13) {
                        formSubmit(e);
                      }
               });
               $('#modalAc').val(modal.address.full);

               //-- create on submit
            $('#submit').click(function(e){
                    formSubmit(e);
            });

        }


        /**
         * @description submit address
         */
        var formSubmit = function(){
            modal.address.full = $('#modalAc').val();
            formAddress();
             var form_value = $("#form_address").serializeArray();
            modal.post({action:"post",url:"construct_address",origin:modal.config.origin,values:form_value,type:"confirm"});
        }

        /**
         * @description ad elements
         */
        var formAddress = function(){
             //-- remove the form action attribute
            $("#form_address").removeAttr("action");
            $("#form_address").removeAttr("method");

                        //-- add necessary forms
            $("#form_address").append('<input type="hidden" id="origin" name="origin" value="'+modal.config.origin+'">');
            $("#form_address").append('<input type="hidden" id="type" name="type" value="'+modal.config.windowType+'">');

            $("#form_address").append('<input type="hidden" id="unit_number" name="unit_number" value="'+modal.address.unit_number+'">');
            $("#form_address").append('<input type="hidden" id="street_number" name="street_number" value="'+modal.address.street_number+'">');
            $("#form_address").append('<input type="hidden" id="street_name" name="street_name" value="'+modal.address.street_name+'">');
            $("#form_address").append('<input type="hidden" id="street_type" name="street_type" value="'+modal.address.street_type+'">');
            $("#form_address").append('<input type="hidden" id="suburb" name="suburb" value="'+modal.address.suburb+'">');
            $("#form_address").append('<input type="hidden" id="state" name="state" value="'+modal.address.state+'">');
            $("#form_address").append('<input type="hidden" id="postal_code" name="postal_code" value="'+modal.address.postal_code+'">');
            $("#form_address").append('<input type="hidden" id="country" name="country" value="'+modal.address.country+'">');
            $("#form_address").append('<input type="hidden" id="full" name="full" value="'+modal.address.full+'">');
        }
           /**
            * @description render confirm
            */
          var renderConfirm = function(data) {
               initBackdrop();
              $("#"+modal.config.id).html(data);
              $("#"+modal.config.id).modal("show");

                           //-- remove the form action attribute
            $("#form_address").removeAttr("action");
            $("#form_address").removeAttr("method");

              $("#form_address").append('<input type="hidden" id="origin" name="origin" value="'+modal.config.origin+'">');
              $("#form_address").append('<input type="hidden" id="type" name="type" value="'+modal.config.windowType+'">');
              $('#addressDash').click(function(e){

                    if(modal.config.onSuccess == null){
                        $("#form_address").append('<input type="hidden" id="goto" name="goto" value="dashboard">');
                        var form_value = $("#form_address").serializeArray();
                         modal.post({action:"post",url:"add_submit",values:form_value,type:modal.config.windowType});
                    }
              });

              $('#addressAd').click(function(e){

                  if(modal.config.onSuccess == null){
                      $("#form_address").append('<input type="hidden" id="goto" name="goto" value="properties">');
                        var form_value = $("#form_address").serializeArray();
                         modal.post({action:"post",url:"add_submit",values:form_value,type:modal.config.windowType});
                  }
              });


              $('#addressback').click(function(e){
                  modal.post({action:"view",url:"add",origin:modal.config.origin});
                  e.preventDefault();
              });
          }

                 /**
          * @desc to check backdrop
          */
         var initBackdrop = function(){
             loading("",false);
             if(modal.config.backdrop == null){
                $("#"+modal.config.id).removeAttr("data-backdrop");
             }else{
                 $("#"+modal.config.id).attr("data-backdrop",modal.config.backdrop);
             }
         }

         var errorCustom = function(data){
              loading("",false);
               $('#'+data.type).parent('div').removeClass("error");
               $('#'+data.type).parent('div').addClass("error");
               if($("#rme_modal_errmsg").length){
                   $("#rme_modal_errmsg").html(data.message);
               }else{
                    $('#'+data.type).after('<div id="rme_modal_errmsg" class="msg" generated="true" for="'+data.type+'">'+data.message+'</div>');
               }
         }



         var toastMessage = function(data){
            $("#"+modal.config.id).modal("show");
               msgType = typeof data.status !== 'undefined' ? msgType : data.status;
                    return $().toastmessage('showToast', {
                         text     : data.message,
                         sticky   : false,
                         position : 'top-center',
                         type     : msgType,
                         stayTime : 10000,
                         close:forceClose
                     });

            modal.config.onSuccess(data.values);
              $("#"+modal.config.id).hide();
         }

         var loading = function(msg,visible){
             if(modal.config.withLoader ==0){
                $("#loader").html(msg+"...");
             }
             if(visible){
                  $("#loader").fadeIn("slow");
             }else{
                  $("#loader").fadeOut("slow")
             }

         }
        create();

    }

})(jQuery);
