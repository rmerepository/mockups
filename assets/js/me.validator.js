/* 
 * @author Sharingan 
 * @version 1.0
 * Copyright 2014 My Estate Pty Ltd
 */

(function($) {
  $.rmeValidator = function(element, options){
        //-- put default values
        var defaults = {
            hasError:[],
            formContainerId:null,
            containerClass:"msg",
            messageClass:"text",
            errorClass:"error",
            warningClass:"warning",
            successClass:"success",
            textSuccessClass:"text-success",
            textErrorClass:"text-error",
            textWarningClass:"text-warning",
            msgEmail:"Invalid email address",
            msgNumberOnly:"This field must contain only numbers",
            msgCharOnly:"This field must contain #? characters only",
            msgCharLimit:"Please enter at least #? characters",
            msgPasswordMatch:"Password does not match",
            msgOneNumeric:"Please include at least 1 numeric character",
            msgRequired:"This field is required",
            msgFormContainer:null, //-- if not specified it will be shown after button
            onSuccess:null

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
                     config.formContainerId : $("#"+element.id).closest('form').attr('id');
             
             if(config.formContainerId == null){
                console.log("rmeValidator error: Parent container is not specified.");
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
                            $(this).on('keyup', function(){
                                     addError(this,false);
                                     initMessage(this);
                                     validateInput(this);
                            });
                        }
                    }
                )//-- end of for each           
             
         }//-- end of constructor
         
         
         //-- function that hold element with error
         var addError = function(el,isError){
             if(isError){
                if(config.hasError.indexOf(el) == -1 ){
                    config.hasError.push(el);
                }
             }else{
                 var ndx = config.hasError.indexOf(el);
                 config.hasError.splice(ndx,1); 
             }

         }
         
        //-- function for validation
        var validateInput = function(el){
            //-- initiate variables 

            var _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var val = $(el).val();
            
            //-- get the field
            if(typeof $(el).attr('data-type') !== 'undefined'){   
                var field = $(el).attr('data-type');
                
                //-- check if type is password
                if(field == 'password'){
                    showMessage($(el),checkStrength(val), 
                                config.warningClass);
                
                //-- check if confirm
                }else if(field.indexOf('confirm-') >=0){
                    //-- the id should be after the word confirm-
                    var id = field.replace('confirm-','');
                    //-- compare value
                    if($('#'+id).val() != val ){
                         addError(this,true);
                        showMessage($(el),config.msgPasswordMatch, 
                                config.errorClass);
                    }
                    
                   //-- check if email
                }else if(field == 'email'){
                    if(!_emailRegex.test(val)){
                         addError(this,true);
                        showMessage($(el),config.msgEmail, 
                                config.errorClass);
                    }
                }
            }
        }
        
        //--- simple password strength meter
        var checkStrength = function(str){
            var strength = 0;
            if (str.length < 6) {
                 addError(this,true);
                return config.msgCharLimit.replace('#?',6);
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
        
        
        //--  clean parent class
        var initMessage = function(el){
            $(el).closest('div').find('.'+ config.containerClass).remove();
            $(el).parent('div').removeClass(config.errorClass);
            $(el).parent('div').removeClass(config.warningClass);
            $(el).parent('div').removeClass(config.successClass);
        }
        //-- add the message
        var showMessage = function(el,msg,type){
            $(el).parent('div').addClass(type);
            $(el).after('<div class="'+config.containerClass+'" >'+
                        '<div class="'+config.messageClass+'">'+
                        msg+'</div></div>');
        }
        
        
        //-- function that will show message
        var formMessage = function(el,msg,type){
             $(el).closest('div').find('.'+ config.textSuccessClass).remove();
             $(el).closest('div').find('.'+ config.textErrorClass).remove();
             $(el).closest('div').find('.'+ config.textWarningClass).remove();
             
             if(type == 'success'){
                $(el).after('<div class="'+config.textSuccessClass+
                                    '"><br><p>'+msg+'</p></div>');
             }else if(type == 'error'){
                $(el).after('<div class="'+config.textErrorClass+
                                    '"><br><p>'+msg+'</p></div>');                 
             }
        }
           
        
        //--on click submit
        $(element).click(function(e){                 
                //-- validate loop all if there are required
                $('#'+config.formContainerId+' input, #'+
                        config.formContainerId+' select , #'+
                        config.formContainerId+' textarea ').each(
                    function(index){ 
                        //-- check if there is an attribute required
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
                    }
                )//-- end of for each  

                if(config.hasError.length >0){
                    config.hasError[0].focus();
                    stopEvent(e);
                }else{
                    if(config.onSuccess != null){
                        stopEvent(e);
                        config.onSuccess(
                                $('#'+config.formContainerId).serialize(),this,e);
                    }
                }
        });

        //-- prevent default
        var stopEvent = function(event){
                event.preventDefault();  
                event.stopPropagation();  
        }
        
        //--- function accessble outside
        rmePlugin.notification = function(el,msg,type){
            formMessage($(el),msg,type)
        }
        
        //-- call constructor
        rmePlugin.render();


    }//-- end of rmeValidator


   $.fn.rmeValidator = function(options) {
       return this.each(function() {
           if (undefined == $(this).data('rmeValidator')) {
               var plugin = new $.rmeValidator(this, options);
               $(this).data('rmeValidator', plugin);
           }
       });

   }
})(jQuery);