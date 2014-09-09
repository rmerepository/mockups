/* 
 * @author Sharingan 
 * @description form validator. declare submit button to validate. button
 * should be inside a form.
 * @version 1.0
 * Copyright 2014 My Estate Pty Ltd
 */

(function($) {
  $.meUIHelper = function(element, options){
        //-- put default values
        var defaults = {
            profaneWords:[],
            hasError:[],
            formContainerId:null,
            textHelperClass:"uihelp-text",
            popOverHtmlRight:'<span data-html="true" id="{0}" data-trigger="hover" class="tooltip-blue pop-over-right" data-toggle="popover" data-original-title="{1}" data-content="{2}" data-placement="right" ></span>',
            containerClass:"msg",
            messageClass:"text",
            errorClass:"error",
            warningClass:"warning",
            successClass:"success",
            textSuccessClass:"text-success",
            textErrorClass:"text-error",
            textWarningClass:"text-warning",
            msgEmail:"Sorry that's not a real email address",
            msgCurrencyOnly:"This field must be a in currency format",
            msgNumberOnly:"This field must contain only numbers",
            msgCharOnly:"This field must contain #? characters only",
            msgCharLimit:"Please enter at least #? characters",
            msgPasswordMatch:"Passwords do not match. Please re-type.",
            msgOneNumeric:"1 character needs to be a number",
            msgPasswordLimit:"Password too short. You need at least 6 characters.",
            msgRequired:"Something's missing here.",
            msgFormContainer:null, //-- if not specified it will be shown after button

            maxChar:0,
            warnA4:0,

        } //-- end of default values
        //-- create instance
        rmePlugin = this;
        var config = {}

        var $element = $(element),
            element = element;        

        //-- declare constructor
         rmePlugin.render = function(){
             //-- merge config values
             config = $.extend({}, defaults, options);
             
             //if container specified check if there is declared form
             config.formContainerId = 
                    typeof $("#"+element.id).closest('form').attr('id') === 'undefined'?
                    $("#"+element.id).is('div')?element.id:
                     config.formContainerId : $("#"+element.id).closest('form').attr('id');
             
             if(config.formContainerId == null){
                console.log("meUIHelper error: Parent container is not specified.");
             }
             
             //-- loop to all controls that needs validation
             //-- then add onfocuout event to the control
                $('#'+config.formContainerId+' input, #'+
                        config.formContainerId+' select , #'+
                        config.formContainerId+' textarea ').each(
                    function(index){ 
                        //-- check if there is an attribute required
                        if($(this).attr('data-is-required') == "true"){
                            //-- since its required add on key up 
                            $(this).on('change', function(){
                                     addError(this,false);
                                     initMessage(this);
                                     validateInput(this);
                            });
                        }
                        
                      //-- check if there is an attribute for character limit
                       if($(this).attr('data-char-counter')){
                           config.maxChar = $(this).attr('maxlength');
                           config.warnA4 = $(this).attr('data-limit-A4');
                           
                           //-- check if maxLength is specified
                           if(!$(this).attr('maxlength')){
                               console.log("meUIHelper error: "+
                                        "No maxlength specified for char limit.")
                           }
                            
                           
                           if($(this).attr('data-char-counter')== 'show'){
                               $(this).after('<span id="charCount_'
                                       +this.name+'" class="'+
                                       config.textHelperClass+'"></span>');
                               countCharacters(this)
                           }
                          //-- add keyup event
                           $(this).on('keyup', function(){
                               countCharacters(this);
                           });
                       }
                       
                     //-- check if there is restriction for words
                        if($(this).attr('data-restrict')){
                            //-- add keyup event
                            $(this).on('keyup', function(){
                                var restrictions = $(this).attr('data-restrict');
                                var foundWords =[],category=[];
                                //-- check if email
                                if(restrictions.indexOf("email") != -1){
                                    var charFound = check_email($(this).val());
                                     if(charFound.length >0){
                                         addMoreInfoAdModal();
                                         foundWords.push(charFound);
                                         category.push('email address');
                                         var html = config.popOverHtmlRight.format(
                                                'popover_'+$(this).attr('name'),
                                                'Information',
                                                'Sorry, we know it\'s annoying but realestate.com.au doesn\'t allow contact details in the ad. <a href=\'#moreInfoMod\' class=\'moreInfoMod\' data-toggle=\'modal\'>more</a>');
                                         popOver(this,html,true);                                         
                                     }

                                }
                                //-- check if australian mobile
                                if(restrictions.indexOf("mobile") != -1){
                                    var charFound = check_au_mobile($(this).val());
                                     if(charFound.length >0){
                                         addMoreInfoAdModal();
                                         foundWords.push(charFound);
                                         category.push('phone numbers');
                                         var html = config.popOverHtmlRight.format(
                                                'popover_'+$(this).attr('name'),
                                                'Information',
                                                'Sorry, we know it\'s annoying but realestate.com.au doesn\'t allow contact details in the ad. <a href=\'#moreInfoMod\' class=\'moreInfoMod\' data-toggle=\'modal\'>more</a>');
                                         popOver(this,html,true);                                         
                                     }

                                }
                                //-- check if has url
                                if(restrictions.indexOf("url") != -1){
                                    var charFound = check_domain($(this).val());
                                     if(charFound.length >0){
                                         foundWords.push(charFound);
                                         category.push('url links');
                                         var html = config.popOverHtmlRight.format(
                                                'popover_'+$(this).attr('name'),
                                                'Information',
                                                'Sorry, we know it\'s annoying but realestate.com.au doesn\'t allow any links in your ad so please remove.');
                                         popOver(this,html,true);                                         
                                     }

                                } 
                                
                                //-- check if content has restricted words
                                if(restrictions.indexOf("profanity") != -1){
                                    var charFound = searchWord($(this).val());
                                     if(charFound.length >0){
                                         foundWords.push(charFound);
                                         category.push('words');
                                     }
                                }
                                
                                //-- check if special characters is restricted
                                if(restrictions.indexOf("chars") != -1){
                                    var charFound = checkCharacter($(this).val());
                                     if(charFound.length >0){
                                         foundWords.push(charFound);
                                         category.push('characters');
                                     }
                                }
                                
                                if(category.length >0){
                                    var tmp =foundWords.join(", ");
                                    var  msg ="The following "+category.join(", ")+
                                            " are not allowed <br/><b>"+tmp;+"</b>";

                                    addError(this,true);
                                    initMessage($(this));
                                    showMessage($(this),
                                                msg,
                                                 config.errorClass);
                                }

                             }); 
                        }
                    }
                )//-- end of for each           
             
         }//-- end of constructor
         
         
         //-- this will check if has a restricted words
         var searchWord = function(words){
                var v_foundWords =[];
                var v_array_words = config.profaneWords;
                var v_words = words.toLowerCase().split(/\b[\s,\.-:;]*/);
                
                if(v_array_words.length <1){
                    console.log("meUIHelper error: No profaneWords declared during initialization.");
                }

                 $.grep(v_words, function(kword,val) {
                    if( $.inArray(kword,config.profaneWords) != -1){
                        v_foundWords.push(kword);
                    }
                });

                return  v_foundWords;
        }
         
         
         //-- this will check if contents have url
           var check_domain = function(text){
                 var words = text;
                    //var urlRegex = /([a-zA-Z0-9-]*)+([a-zA-Z0-9-]+[/.])+([a-zA-Z]{3}|[a-zA-Z]{2})/;
                    var urlRegex = /(\b(((https?|ftp|file|):\/\/)|www[.])[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

                    var v_foundWords =[];
                    var match;

                while (match = urlRegex.exec(words)){
                    v_foundWords.push(match[0]);
                    words = words.replace(match[0],"")
                }
                return  v_foundWords;

            }         
         
         //-- this will check if contents have au mobile
         var check_au_mobile = function(text){
            var words =  text.replace(/[ -/*()]+/g, "");
            var v_foundWords =[];

            var urlRegex = /\d{11}|\d{10}|\d{9}|\d{8}/;
            var match;
            var phone;

            while (match = urlRegex.exec(words)){
                if(match[0].length == 11){
                    phone = "+"+match[0].substring(0,2)+" "+
                            match[0].substring(2,5)+" "+
                            match[0].substring(5,8)+" "+
                            match[0].substring(8,11);
                }
                if(match[0].length == 10){
                    phone = match[0].substring(0,4)+" "+
                            match[0].substring(4,7)+" "+
                            match[0].substring(7,10);
                }
                if(match[0].length == 9){
                    phone = "0"+match[0].substring(0,3)+" "+
                            match[0].substring(3,6)+" "+
                            match[0].substring(6,9);
                }

                if(match[0].length == 8){
                    phone = match[0].substring(0,4)+" "+
                            match[0].substring(4,8);
                }
                v_foundWords.push(phone);
                words = words.replace(match[0],"");
            }

                return  v_foundWords;

        }
         
         //-- check if there is not allowed characters
         var checkCharacter = function(v_words){
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
         
         /**
          * will show/hide popover
          * @param el = element
          * @param html = html format to be shown
          * @param popover = force to mouse enter
          * @param forceRemove = remove the element popover
          */
         var popOver = function(el,html,popover,forceRemove){
             var popoverId = 'popover_'+$(el).attr('name');
             
             if(forceRemove ===true && $('#'+popoverId).length){
                   $('#'+popoverId).triggerHandler('mouseleave');
                   $('#'+popoverId).closest('div').find('.popover').remove();
                   $('#'+popoverId).remove();
                   return;
             }
             
             if(!$('#'+popoverId).length){
                 $(el).after(html);
                   $('#'+popoverId).popover({ 
                                delay: { show: 100, hide: 3000 }  
                    })
                 
                 if(popover === true){
                    $('#'+popoverId).triggerHandler('mouseover');
                    setTimeout(function(){
                     $('#'+popoverId).triggerHandler('mouseleave');
                     },3000);                     
                 }
             }
         }
         
         //-- this will count how many characters entered
         var countCharacters = function(el){
               var charlen = config.maxChar - $(el).val().length;
               var popoverId = 'popover_'+$(el).attr('name');
               $('#charCount_'+el.name).text(charlen+
                        " Characters Left");
                var html = config.popOverHtmlRight.format(
                                   popoverId,
                                   'A4 brochure warning',
                                   'This is the max number of lines that will fit on your A4 brochure. Although you can add upto 2000 characters some of this description may not fit on the printable brochure.');
                 
                if(config.warnA4 >0 
                        && config.warnA4 <= $(el).val().length){
                    popOver(el,html,true);
                }else if(config.warnA4 >0 
                        && config.warnA4 > $(el).val().length){
                    popOver(el,'',false,true);
                }
                
         }
         
         //-- function that hold element with error
         var addError = function(el,isError){
            
             if(isError){
                if(config.hasError.indexOf(el) == -1 ){
                        config.hasError.push(el);
                }
             }else{
                  var ndx = config.hasError.indexOf(el);
                 if(ndx != -1 ){
                    config.hasError.splice(ndx,1); 
                 }
             }
         }
         

        //-- check if email
          var check_email =  function(text){

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
         
        //-- function for validation
        var validateInput = function(el){
            //-- initiate variables 
            var _number = /[\D]/;
            var _float = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
            var _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var val = $(el).val();
            
            //-- get the field
            if(typeof $(el).attr('data-type') !== 'undefined'){   
                var field = $(el).attr('data-type');

                //-- check if type is password
                if(field == 'password'){
                    showMessage($(el),checkStrength(el), 
                                config.warningClass);
                
                //-- check if confirm
                }else if(field.indexOf('confirm-') >=0){
                    //-- the id should be after the word confirm-
                    var id = field.replace('confirm-','');
                    //-- compare value
                    if($('#'+id).val() != val ){
                         addError(el,true);
                        showMessage($(el),config.msgPasswordMatch, 
                                config.errorClass);
                    }
                    
                   //-- check if email
                }else if(field == 'email'){
                    if(!_emailRegex.test(val)){
                         addError(el,true);
                        showMessage($(el),config.msgEmail, 
                                config.errorClass);
                    }
                    
                  //-- check if float
                }else if(field == 'float'){
                    if (!val.match(_float)){
                        addError(el,true);
                        showMessage($(el),config.msgCurrencyOnly, 
                                config.errorClass);
                    }
                 //-- check if numbers only
                }else if(field == 'number'){
                    if (val.match(_number)){
                        addError(el,true);
                        showMessage($(el),config.msgNumberOnly, 
                                config.errorClass);
                    }
                }
                
                
            }else{
                //-- if no datatype its just required
                var trimstr =  val.replace(/^\s*|\s*$/,"");
                if((trimstr == null) || (trimstr.length == 0)){
                    addError(el,true);
                    var msgRequired = config.msgRequired;
                    if($(el).attr('data-custom-msg')){
                        msgRequired = $(el).attr('data-custom-msg');
                    }
                    showMessage($(el),
                                msgRequired,
                                 config.errorClass);                    
                }
            }
        }
        
        //--- simple password strength meter
        var checkStrength = function(el){
            var str = $(el).val();
            var strength = 0;
            if (str.length < 6) {
                 addError(el,true);
                return config.msgPasswordLimit;
            }
            if (str.length > 7) strength += 1;
            if (str.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1;
            if (str.match(/([a-zA-Z])/) && str.match(/([0-9])/))  strength += 1;
            if (str.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1;
            //-- just incase no number
            if(!str.match(/([0-9])/)){
                return  config.msgOneNumeric;
            }else{
                if(strength < 2 ){
                     return 'Too weak';
                }else if(strength == 2){
                    return 'Weak';
                }else if(strength == 3){
                     return 'Moderate';
                }else{
                    return 'Strong';
                }
            }
        }
        
        
        var addMoreInfoAdModal = function(){
             var html =  '<div class="modal fade" id="moreInfoMod" tabindex="-1"  role="dialog" aria-labelledby="moreInfoMod" aria-hidden="true">\n\
                                     <div class="modal-dialog">\n\
                                        <div class="modal-content"> \n\
                                            <div class="modal-header">\n\
                                                <button class="close" id="closeContactUs" data-dismiss="modal">&times;</button>\n\
                                                <h3>The Rules</h3>\n\
                                            </div>\n\
                                        <div class="modal-body">\n\
                                            <p>Realestate.com.au only allows real estate agents to advertise so our contact details have to be on the ad. But don\'t worry, it will be just like having yours there.The moment a tenant calls us, we will give them your contact details, and we will give you theirs. When a tenant emails us, we will automatically email you the enquiry, so you will get it day or night.</p>\n\
                                        </div>\n\
                                     <div class="modal-footer">\n\
                                     </div> </div> </div> </div>';
            if(!$('#moreInfoMod').length){
                 $(document.body).append(html);
            }
        }
        
        //--  clean parent class
        var initMessage = function(el){
            var msgEl = el;
            if($('#charCount_'+el.name).length){
                msgEl = $('#charCount_'+el.name);
            }
            
            $(msgEl).next('.'+ config.containerClass).remove();
           
            $(msgEl).parent('div').removeClass(config.errorClass);
            $(msgEl).parent('div').removeClass(config.warningClass);
            $(msgEl).parent('div').removeClass(config.successClass);
        }
        //-- add the message
        var showMessage = function(el,msg,type){
            
            //-- if el is not an object then toast the message
            if(typeof el !=='object'){
                showToast(msg,type);
            }else{
                var msgEl = el;
                var elnm = $(el).attr('name');
                if($('#charCount_'+elnm).length){
                    msgEl = $('#charCount_'+elnm);
                }

                $(el).parent('div').addClass(type);
                $(msgEl).after('<div class="'+config.containerClass+'" >'+
                            '<div class="'+config.messageClass+'">'+
                            msg+'</div></div>');
            }
        }
        
        var showToast = function(msg, msgType,sticky){
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
        
        
        //-- function that will show message
        var formMessage = function(el,msg,type){
             $(el).next('.'+ config.textSuccessClass).remove();
             $(el).next('.'+ config.textErrorClass).remove();
             $(el).next('.'+ config.textWarningClass).remove();
             
             if(type == 'success'){
                $(el).after('<div class="'+config.textSuccessClass+
                                    '"><br><p>'+msg+'</p></div>');
             }else if(type == 'error'){
                $(el).after('<div class="'+config.textErrorClass+
                                    '"><br><p>'+msg+'</p></div>');                 
             }else if(type == 'warning'){
                $(el).after('<div class="'+config.textWarningClass+
                                    '"><br><p>'+msg+'</p></div>');                   
             }
        }
           

        //-- prevent default
        var stopEvent = function(event){
                event.preventDefault();  
                event.stopPropagation();  
        }
        
        var toValidate = function(e,el,fn){
            //-- validate loop all if there are required
                $('#'+config.formContainerId+' input, #'+
                        config.formContainerId+' select , #'+
                        config.formContainerId+' textarea ').each(
                    function(index){ 
                        //-- check if there is an attribute required
                        //-- but only check those element which enable and visible
                        if($(this).is(":visible") && !$(this).is(":disabled")){
                            if($(this).attr('data-is-required') == "true"){
                                    //-- check if it has value
                                    var str = $(this).val();
                                    var trimstr =  str.replace(/^\s*|\s*$/,"");
                                    if((trimstr == null) || (trimstr.length == 0)){
                                        addError(this,true);
                                        initMessage(this);
                                        showMessage(this,
                                                    config.msgRequired,
                                                     config.errorClass);
                                    }
                            }
                            //-- since its hidden or disbaled remove from validation
                        }else{
                             addError(this,false);
                        }
                        
                    }
                )//-- end of for each  
                    

                 //console.log(config.hasError)
                if(config.hasError.length >0){
                    config.hasError[0].focus();
                    stopEvent(e);
                }else{
                    stopEvent(e);
                        var hidInput = $('#'+config.formContainerId).find('input[type=hidden]');
                         var token = {};
                        if(hidInput){
                            token[$(hidInput).attr('name')]= $(hidInput).val();
                        }                    
                    if($('#'+config.formContainerId).is('div')){
                        fn($('#'+config.formContainerId).find('input').serialize(),el,e,token);
                    }else{
                        fn($('#'+config.formContainerId).serialize(),el,e,token);
                    }
                }            
        }
        
        
        /**
         * to return the token for posting
         * @returns {unresolved}
         */
        rmePlugin.getToken = function(){
             var token = {};
            var hidInput = $('#'+config.formContainerId).find('input[type=hidden]');
            if(hidInput){
                token[$(hidInput).attr('name')]= $(hidInput).val();
            }   
            return token;
        }
        
        
        /**
         * this will return if text is email or not. fn accessble outside
         * @param {type} text
         * @returns {Boolean}
         */
        rmePlugin.isEmail = function(text){
            return check_email(text) ==text?true:false;
        }
        
        /**
         * shows notification
         * @param {type} el element object
         * @param {type} msg message to display
         * @param {type} type error, warning, success
         * @returns {undefined}
         */
        rmePlugin.notification = function(el,msg,type){
            formMessage($(el),msg,type)
        }
        
        /**
         * it will force to remove any notification under the element
         * @param {el} element id
         * @returns {undefined}
         */
        rmePlugin.remNotification = function(el){
             $('#'+el).next('.'+ config.textSuccessClass).remove();
             $('#'+el).next('.'+ config.textErrorClass).remove();
             $('#'+el).next('.'+ config.textWarningClass).remove();
        }
        
        /**
         * shows toast message
         * @param {type} msg message to display
         * @param {type} type error, warning, success
         * @param {type} stick in the page or remove after few seconds         
         * @returns {undefined}
         */
        rmePlugin.toast = function(msg,type,sticky){
            showToast(msg,type,sticky);
        }

        /**
         * This will force to show message below the element
         * @param {el_id} element id
         * @param {type} type error, warning, success 
         * @returns {undefined}
         */       
        rmePlugin.showElementMsg = function(el_id,msg,type){
            
            var msgReq = msg?msg:config.msgRequired;
            var classtype = type?type: config.errorClass;
            
            initMessage($('#'+el_id));
            showMessage($('#'+el_id),msgReq, classtype);
            if( $('#'+el_id).is( "div" )){
               $("#"+el_id+" :input").focus();
            }else{
                $('#'+el_id).focus();
            }
        }
        
        /**
         * This force to remove below the element
         * @param {el_id} element id
         * @returns {undefined}
         */         
         rmePlugin.remElementMsg = function(el_id){
             initMessage($('#'+el_id));
         }
        
        /**
         * call validate manually from outside
         * @param {type} e event
         * @param {type} el element where to add the message below
         * @param {type} fn callback function if success
         * @returns {undefined}
         */
        rmePlugin.validate = function(e,el,fn){
          toValidate(e,el,fn);       
        }
        
        //-- call constructor
        rmePlugin.render();


    }//-- end of meUIHelper


   $.fn.meUIHelper = function(options) {
       return this.each(function() {
           if (undefined == $(this).data('meUIHelper')) {
               var plugin = new $.meUIHelper(this, options);
               $(this).data('meUIHelper', plugin);
           }
       });

   }
})(jQuery);



String.prototype.format = function(i, safe, arg) {
    function format() {
    var str = this, len = arguments.length+1;

    // For each {0} {1} {n...} replace with the argument in that position. If
    // the argument is an object or an array it will be stringified to JSON.
    for (i=0; i < len; arg = arguments[i++]) {
    safe = typeof arg === 'object' ? JSON.stringify(arg) : arg;
    str = str.replace(RegExp('\\{'+(i-1)+'\\}', 'g'), safe);
    }
    return str;
    }

    // Save a reference of what may already exist under the property native.
    // Allows for doing something like: if("".format.native) { /* use native */ }
    format.native = String.prototype.format;

    // Replace the prototype property
    return format;
}();



function lpad (str, max) {
  str = str.toString();
  return str.length < max ? lpad("0" + str, max) : str;
}