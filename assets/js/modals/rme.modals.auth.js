/* 
 * @author Felix bacat - massquote 
 * @version 3.0
 * Copyright 2013 Rent My Estate
 */

(function($) {
    $.rmeAuth = function(element, options){

        //-- put default values
        var defaults = {
             uid:'', //-- used to identify in segment io
             sourceUrl:'', //-- use for segment io
             page_title:'', //--use for segment io
             page_url:'', //-- use for segment io
             id:"rme-auth-modal",
             host:"https://members.rentmyestate.com.au/",
             class:"rme-ui-login",
             backdrop:  null, //-- static 
             origin:"frontend", //-- if from wordpress
             withToast:true, //-- if toast message script is already included
             proxy:null, 
             renderNav:false, //-- if want to have dropdow 
             renderTo:"", //-- which element should dropdown be drawn
             menu:"", 
             onSuccess:null,
             onLoad:null,
             show:"",
             loginCount:0,
             tncLoaded:false,
             emailSent:false,
             userId:null,
             fbToken:"",
             dashboard:null
        }
        //-- create instance
        rmePlugin = this;
        rmePlugin.config = {}

        var $element = $(element),
            element = element;

       //-- serve as constructor
       rmePlugin.render = function(){
           rmePlugin.config = $.extend({}, defaults, options);

           //-- always use 1 instance of modal html
           //-- check if div modal html is already created
           //-- if not present start adding neccessary scripts
           if($("#"+ rmePlugin.config.id ).length <1){
               
               //-- render the scripts first
               var j_validator,j_toast;
               
               //-- check jquery validate if present if not include
               j_validator ="";
               if(typeof $().validate == 'undefined'){
                   j_validator ='<script type="text/javascript" src="'+rmePlugin.config.host+
                           '/assets/js/libs/jquery.validate.min.js"></script>'
               }
                              
               j_toast ="";
               if(!rmePlugin.config.withToast){ 
                  j_toast = '<script src="'+rmePlugin.config.host+
                           '/assets/js/libs/jquery.toastmessage.js"> </script>';
               }
         
                //-- append in the body
               $(document.body).append(
                       j_validator+
                       j_toast
                   );
               
               //-- create all the html element needed
               var  container,loader,iframe,tnc;
               container = '<div class="modal fade '+rmePlugin.config.class+'" \n\
                           id="'+rmePlugin.config.id+'" tabindex="-1" \n\
                           role="dialog" \n\
                           aria-labelledby="'+rmePlugin.config.id+'" \n\
                               aria-hidden="true"></div>';

               //--check if loader is already created
               //-- if not create one
               loader="";
               if($("#loader").length<1){
                   loader = "<div class='loader-wrap'>\n\
                            <div id='loader' class='ui-m-loader' >\n\
                            <div class='inner-text'>Loading...</div></div></div>";
               }

               //-- create the iframe for passing values
                iframe = '<iframe \n\
                            id="'+rmePlugin.config.id+'_frame" \n\
                            name="'+rmePlugin.config.id+'_frame" \n\
                           src="'+rmePlugin.config.host+'oauth/port/'+
                            rmePlugin.config.origin+'" seamless="seamless" \n\
                            width="0" scrolling="no" height="0" \n\
                           frameborder="0" ></iframe>';
               //-- terms and condition
               tnc = '<div class="modal fade" id="ifmtnc" tabindex="-1"\n\
                     role="dialog" aria-labelledby="ifmtnc" \n\
                        aria-hidden="true"></div>' ;
               
               //-- append in the body
               $(document.body).append(
                       iframe+
                       container+
                       loader+
                       tnc
                   );
                       
                //-- check if html5 storage is supported
               if(typeof(Storage)!=="undefined"){
                   if(typeof(sessionStorage.menu)!=="undefined"){
                    rmePlugin.config.menu = sessionStorage.menu;
                    navigation_menu({navigation: sessionStorage.menu,access:0});
                   }
               }
           }
           
           
         //-- create proxy  object
         rmePlugin.config.proxy = new Porthole.WindowProxy(
             rmePlugin.config.host+'membership/proxy', 
             rmePlugin.config.id+'_frame');
             rmePlugin.config.proxy.addEventListener(rmeAuthProxyListener); 
             
             
       }//=============== end of the constructor
       
       //-- get request
       //-- action what view
       var _get = function(param){
           if(param.modal != "menu"){ loading("loading",true) }
           rmePlugin.config.proxy.post({action:"get",modal:param.modal,
               url:param.url});
       };

       //-- post request
       var _post = function(param){
           loading("processing",true)
           rmePlugin.config.proxy.post({action:"post",modal:param.modal,
               url:param.url,values:param.data});
       };
       //-- this switch the storage
       var _store = function(data){
            //-- check if html5 storage is supported
            if(typeof(Storage)!=="undefined"){
                 if(sessionStorage.access != data.access){
                    rmePlugin.config.menu ="";
                    sessionStorage.access  = data.access
                }
            }else{
                rmePlugin.config.menu ="";
            }
            rmePlugin.config.userId = data.id;
       }
       
       //-- this will handle the hash url paramters
       var _hash_parameters = function(){
          var params = location.hash.substr(1).split('&').map(function(pair) {
                var kv = pair.split('/', 2);
                return [decodeURIComponent(kv[0]), kv.length === 2 ? 
                        decodeURIComponent(kv[1]) : null];
            });
            
            var modal = params[0][0];
            var dashboard = params[0][1];

            //-- fail safe just incase its already login
          
                    if(rmePlugin.config.userId ==0){
                        if(dashboard=="tenant"){
                            rmePlugin.config.dashboard = 3;
                        }else if(dashboard=="owner"){
                            rmePlugin.config.dashboard = 1;
                        }else{
                            rmePlugin.config.dashboard = 0;
                        }
                        rmePlugin.show(modal);
                    }

       }
        
        //-- function that will response to ping
        var pong= function(data){

           //-- check if there things to render
           if(rmePlugin.config.renderNav){
               //-- check if there is in no prevous data
                _get({
                modal:"menu",
                url:"/membership/access"})
           }
           //-- check if there are onload request
           if(rmePlugin.config.show !=""){
               rmePlugin.show(rmePlugin.config.show)
           }
            
           //-- check if there are onload request
           if(rmePlugin.config.onLoad){
              rmePlugin.config.onLoad(rmePlugin.config.userId);
           }
           
           //-- for segment IO
           rmePlugin.config.proxy.post({action:"post",modal:'',
               url:"/membership/analytics"
               ,values:{
                   sio:rmePlugin.config.uid,
                   source:rmePlugin.config.sourceUrl,
                   page_url:rmePlugin.config.page_url,
                   page_title:rmePlugin.config.page_title
               }});
           
        }
        
        //-- handles terms and condition
        var modal_tnc = function(param,data){
            
           if(!rmePlugin.config.tncLoaded){
                if(param =="show"){           
                    _get({
                    modal:"tnc",
                    url:"/oauth/tnc/"+rmePlugin.config.origin});                    
                }
                if(param =="view"){
                    $("#ifmtnc").html(data);
                    rmePlugin.config.tncLoaded = true;
                }
           }
        }
        
        //-- handles facebook unverified email
        var _fb_unverified_email = function(param, data){
            if(param == "access"){
                modal_verify("show");
            }
            
            if(param =="show"){
                  _get({
                        modal:"_facebook_register",
                        url:"/oauth/verify/"+rmePlugin.config.origin});
            }
            
            if(param == "error"){
                    $('#email').parent('div').removeClass("error");
                    $('#email').parent('div').removeClass("success");
                    $('#email').parent('div').removeClass("has-succes");
                    $('#email').parent('div').addClass("error");
                    if($("#rme_modal_errmsg").length){
                        $("#rme_modal_errmsg").html(data.error);
                        $("#rme_modal_errmsg").show();
                    }else{
                         $('#email').after('<div id="rme_modal_errmsg" \n\
                            class="msg" generated="true" for="email">'+
                            data.error+'</div>');                          
                    }                
            }
            
            if(param == "post"){
                loading("registering",true);
            var pictureHeight='picture.height(250),picture.width(250)';
            var username = data.fbnew?'':',username';
            var otherFields = 'first_name,last_name'+username+',email';
                FB.api('/me?fields=id,'+pictureHeight+','+otherFields, function(resp){
                        var arr ={};
                        if(resp.error){
                            var n_data = {
                                token:data.token,
                                email:data.email,
                                fbnew:true
                            }
                            _fb_unverified_email('post',n_data);
                            return;
                        }
                    
                        
                        arr["token"] = data.token;
                        arr["email"] = data.email;
                        arr["origin"] = rmePlugin.config.origin;
                        arr["dashboard"] =null;
                        
                        $.each(resp, function(i,val) {     
                           var v = i=="picture"?val.data.url:val;
                            if(i !== "email"){
                                 arr[i] =v;
                            }
                        });
                        _post({
                        modal:"_fb_unverified_email",
                        data:arr,
                        url:"/membership/fb_verify_register"});
               });
            }
            
        }
        
        //-- handles facebook sign up
        var _facebook_register = function(param,data){
            if(param =="fbaccess"){
                if(!data.view){
                  _fb_unverified_email("show");
                
                }else{
                    if(data.view =="unverified"){
                         modal_verify("show");
                    }
                    if(data.view =="registered"){
                         _facebook_register("error",data);
                    }
                    
                }
                
                
            }
            
            if(param == "access"){
                if(data.access =="1"){
                    //-- get suggested by controller
                    if(data.view == "redirect"){
                        window.location.href =data.description;
                    }else{
                        window.location.href = config.host+"dashboard/index";
                    }
                }else{
                    if(data.view =="signup"){
                        modal_verify("show")
                    }
                }
            }
            if(param == "error"){
                var msg=". Try logging in using \n\
                                your facebook account. \n\
                                <a id='rme_sign_fb' href='/login' \n\
                                id='rme_sign_up_link' >Click here</a>";
                    $('#fbregister').parent('li').removeClass("error");
                    $('#fbregister').parent('li').addClass("error");
                    if($("#rme_modal_errmsg").length){
                        $("#rme_modal_errmsg").html(data.error+msg);
                    }else{
                        $('#fbregister').after('<div id="rme_modal_errmsg" \n\
                         class="msg" generated="true" for="fblogin">'+data.error+msg+'</div>');
                    }
                
                    //== signup register 
                     if(!_is_home()){
                         $('#rme_sign_fb').click(function(e){
                             stopEvent(e);
                             modal_login("show")
                         });                
                     }
            }
            
            if(param == "view"){
                  _draw(data);
                 
                 //-- on back to register
                $('#cancel_email_verify').click(function(e){
                    stopEvent(e)
                    modal_register("show");
               });    
                     
                $('#fb_verify').submit(function(e){
                     stopEvent(e);

                    FB.getLoginStatus(function(response){
                             if (response.status === 'connected') {
                                var accessToken = response.authResponse.accessToken;
                                 rmePlugin.config.fbToken = response.authResponse.accessToken;
                                 var val = {token:accessToken, email:$("#email").val()}
                                 _fb_unverified_email("post",val)
                            } else {
                               FB.login(function(response){
                                    if (response.authResponse){
                                         var accessToken = response.authResponse.accessToken;
                                          rmePlugin.config.fbToken = response.authResponse.accessToken;
                                          var val = {token:accessToken, email:$("#email").val()}
                                            _fb_unverified_email("post",val)
                                    }else{
                                         loading("",false);
                                    }
                                }, {scope:'email'});
                            }
                          });    

                });
                  rme_form_validate("fb_verify");
            }
        }
        
        var modal_change_email = function(param,data){
            if(param =="access"){
                modal_verify("show");
                rmePlugin.config.emailSent = true;
            }
            if(param =="error"){
                    $('#email').parent('div').removeClass("error");
                    $('#email').parent('div').removeClass("success");
                    $('#email').parent('div').removeClass("has-succes");
                    $('#email').parent('div').addClass("error");
                    if($("#rme_modal_errmsg").length){
                        $("#rme_modal_errmsg").html(data.error);
                        $("#rme_modal_errmsg").show();
                    }else{
                         $('#email').after('<div id="rme_modal_errmsg" \n\
                            class="msg" generated="true" for="email">'+
                            data.error+'</div>');                          
                    }
            }
            
            if(param == "show"){
                _get({
                modal:"change_email",
                url:"/oauth/email/"+rmePlugin.config.origin});
            }
            if(param=="view"){
                 _draw(data);
                
                //-- on close top
                $('#cancel_change_email').click(function(e){
                     modal_verify("show");
                     stopEvent(e)
                });
                
                //-- on submit new email
                $('#submitEmail').click(function(e){
                    if($("#email").val() !=""){
                        var form_value = $("#change_email").serializeArray();
                            _post({
                              modal:"change_email",
                              data:form_value,
                              url:'/membership/change_resend'});
                        stopEvent(e)
                    }else{
                        $("#email").focus();
                    }
               });
                rme_form_validate("change_email"); 
            }
        }
        
        //--- for unverify
        var modal_verify = function(param,data){
            
            if(param =="access"){
                rmePlugin.config.emailSent = true;
                 //-- if email was successfully sent
                if(rmePlugin.config.emailSent){
                    $("#succesfull_sent").fadeIn("slow")
                    setTimeout(function(){
                        $("#succesfull_sent").fadeOut("slow")},5000);
                    rmePlugin.config.emailSent=false;
                }
            }
            
            if(param == "show"){
                _get({
                modal:"verify",
                url:"/oauth/unverified/"+rmePlugin.config.origin});
            }
            if(param =="view"){
                _draw(data);
                
                //-- if email was successfully sent
                if(rmePlugin.config.emailSent){
                    $("#succesfull_sent").fadeIn("slow")
                    setTimeout(function(){
                        $("#succesfull_sent").fadeOut("slow")},5000);
                    rmePlugin.config.emailSent=false;
                }
                
                //-- create on change email
                $("#btnchange").click(function(e){
                     modal_change_email("show")
                     stopEvent(e)
                })
                

                //-- on close top
                $('#cancel').click(function(e){
                      stopEvent(e)
                      modal_verify("show");
                       
                });
                
              //-- on click resend
                $('#verify').submit(function(e){
                    stopEvent(e);
                    var form_value = $("#verify").serializeArray();
                    _post({
                      modal:"verify",
                      data:form_value,
                      url:'/membership/resend'});
                });
                

            }
        }
        
        //-- for register modal
        var modal_register = function(param,data){
             if(param =="access"){
                 modal_verify("show")
             }
            
            if(param =="error"){
                if(data.error =="duplicate"){
                    var msg = "Sorry this email is already being used.";
                    rme_form_show_error(true,msg,"warning","email");
                }
            }
            if(param == "show"){
                _get({
                modal:"register",
                url:"/oauth/register/"+rmePlugin.config.origin});
                //-- load the terms and condition
                modal_tnc("show")
            } 
            if(param=="view"){
                _draw(data); 
                
                //-- on back to login
                if(!_is_home()){
                    $('#loginback').click(function(e){
                        stopEvent(e)
                        modal_login("show");
                   });
                }
                //-- create on register using fb
                $("#fbregister").click(function(e){
                       FB.getLoginStatus(function(response){
                            if (response.status === 'connected') {
                               var accessToken = response.authResponse.accessToken;
                                rmePlugin.config.fbToken = response.authResponse.accessToken;
                                _post_signup_fb(data,accessToken)
                           } else {
                              FB.login(function(response){
                                   if (response.authResponse){
                                        var accessToken = response.authResponse.accessToken;
                                         rmePlugin.config.fbToken = response.authResponse.accessToken;
                                         _post_signup_fb(data,accessToken)
                                   }else{
                                        loading("",false);
                                   }
                               }, {scope:'email'});
                           }
                         });                 

                       stopEvent(e)
                });


            //-- create on submit
            $('#createAccount').click(function(e){
                if($("#signup").valid() && validateAgreeTermsCondition()){
                     if(!$("#dashboard").length){
                     $("#signup").append('<input type="hidden" \n\
                                            id="dashboard" \n\
                                            name="dashboard" \n\
                                            value="'+
                                            rmePlugin.config.dashboard+'" />');
                     }
                    var form_value = $("#signup").serializeArray();
                        _post({
                          modal:"register",
                          data:form_value,
                          url:'/membership/register'});
                    
                }
                    stopEvent(e);
            });
                
                rme_form_validate_signup("signup");
            }
        }
        
         var _post_signup_fb = function(data,accessToken){
            loading("registering",true);
            var pictureHeight='picture.height(250),picture.width(250)';
            var otherFields = 'first_name,last_name,username,email';
                FB.api('/me?fields=id,'+pictureHeight+','+otherFields, function(resp){
                    var email="";
                   //-- check if email is passed
                    email = typeof data.email != 'undefined'?data.email:"";
                    //-- check if has email
                    email = email =="" && typeof resp.email != 'undefined'?resp.email:email;
                   //-- now check if we have email value
                   if(email ==""){
                        _post({
                        modal:"_facebook_register",
                        data:{token:accessToken,id:resp.id},
                        url:"/membership/fbcheckemail"});
                   }else{
                        var arr ={};
                        arr["token"] = accessToken;
                        arr["email"] = email;
                        arr["origin"] = rmePlugin.config.origin;
                        arr["dashboard"] =null;
                        
                        $.each(resp, function(i,val) {     
                           var v = i=="picture"?val.data.url:val;
                            if(i !== "email"){
                                 arr[i] =v;
                            }
                        });
                        _post({
                        modal:"_facebook_register",
                        data:arr,
                        url:"/membership/fbregister"});
                   }
               });
         }        
        
        //== for forgot password
        var modal_forgot_password = function(param,data){
            if(param == "access"){
               $("#succesfull_sent").html(data.description)
              $("#succesfull_sent").fadeIn("slow")
                    setTimeout(function(){
                            modal_login("show")
                            },5000);
            }
            if(param == "error"){
                  rme_form_show_error(true,data.error,"has-error","email");
            }
            if(param == "show"){
                _get({
                modal:"forgot",
                url:"/oauth/password/"+rmePlugin.config.origin});
            
            }
            if(param=="view"){
                _draw(data); 
                rme_form_validate("forgot"); 
                
               //-- on back to login
               $('#loginback').click(function(e){
                    modal_login("show");
                    stopEvent(e);
               });
               
               //-- on submit
                $('#forgot').submit(function(e){ 
                   if($("#forgot").valid()){
                        var form_value = $("#forgot").serializeArray();   
                            _post({
                                modal:"forgot",
                                data:form_value,
                                url:'/membership/forgot_pass'});
                   }
                   stopEvent(e)
               });               
               
               
            }            
        }
        
        //-- for facebook
        var modal_facebook = function(param,data){
 
            if(param =="fbaccess"){
               if(data.view=="registered"){
                   //-- login the user
                   var arr ={};
                    arr["token"] = rmePlugin.config.fbToken;
                    arr["email"] = data.email;
                    arr["origin"] = rmePlugin.config.origin;
                    _post({
                    modal:"facebook",
                    data:arr,
                    url:"/membership/fblogin"});
               
                }else if(data.view =="unverified"){
                     modal_verify("show");
                }else{
                  var msg_alert = "Your facebook account is currently not yet \n\
                                registered on our system. \n\
                                <a id='rme_sign_fb' href='users/signup' \n\
                                id='rme_sign_up_link' >Click here</a>";
                    
                  
                    $('#fblogin').parent('li').removeClass("error");
                    $('#fblogin').parent('li').addClass("error");
                    if($("#rme_modal_errmsg").length){
                        $("#rme_modal_errmsg").html(msg_alert);
                    }else{
                        $('#fblogin').after('<div id="rme_modal_errmsg" \n\
                         class="msg" generated="true" for="fblogin">'+msg_alert+'</div>');
                    }
                    
                       //== signup register 
                       if(!_is_home()){
                           $('#rme_sign_fb').click(function(e){
                               stopEvent(e);
                               modal_register("show")
                           });                
                       }
               }
               //-- check if successful login or not
            } 
            if(param =="access"){
                if(data.access =="1"){
                    _success(data);
                }else{
                  if(data.view == "signup"){
                        modal_verify("show");
                  }   
                }
            }
        }
        
        
        
        //-- function that will handle all login modal
        var modal_login = function(param,data){
            if(param=="access"){
                if(data.access =="1"){
                    _success(data);
                }else{
                    //-- need to verify email
                    if(data.view =="signup"){
                        modal_verify("show");
                    }
                }
            }
            if(param=="error"){
                $("#password").val("");
                if(data.description =="captcha"){
                    $("#captcha_holder").show();
                    $("#captcha_image").show();
                    $("#captcha").html(data.navigation);
                    $("#captcha_answer").val(""); 
                    rmePlugin.config.loginCount +=1;
                }
                if(rmePlugin.config.loginCount ==1){
                    rme_form_show_error(true,"You have reached the maximum \n\
                        number of login attempts.",data.action)
                }else{
                    rme_form_show_error(true,data.error,data.action)
                }
                    rme_login_manual_highlight()
            }
            if(param == "show"){
               _get({
               modal:"login",
               url:"/oauth/login/"+rmePlugin.config.origin});
            
            //-- render login
            }
            if(param=="view"){
                _draw(data);                
                rme_form_validate('login');
                
                //-- onclick forgot password
                $('#btnforgot').click(function(e){
                    stopEvent(e);
                    modal_forgot_password("show")

                });  
                
                //-- onclick submit
               $('#login input[type="submit"]').click(function(e){
                   if($("#login").valid()){
                    var form_value = $("#login").serializeArray();
                    _post({
                        modal:"login",
                        data:form_value,
                        url:"/membership/login"});
                   }
                    stopEvent(e);
               });                
                
                //-- onclick facebook button
                $('#fblogin').click(function(e){
                    FB.getLoginStatus(function(response){
                        if (response.status === 'connected') {
                         //  var uid = response.authResponse.userID;
                           var accessToken = response.authResponse.accessToken;
                            rmePlugin.config.fbToken = response.authResponse.accessToken;
                             _post_check_fb_email(accessToken);
                       }else{
                          FB.login(function(response){
                               if (response.authResponse){
                                   var accessToken = response.authResponse.accessToken;
                                    rmePlugin.config.fbToken = response.authResponse.accessToken;
                                  _post_check_fb_email(accessToken);

                               }
                           }, {scope:'email'});
                       }
                     });
                    e.preventDefault();
                });
                
                //== onclick register 
                if(!_is_home()){
                    $('#register').click(function(e){
                        stopEvent(e);
                        modal_register("show")
                    });                
                }
            }//-- end of rendering login modal
        }//-- end of function modal
        
        var _post_check_fb_email = function(accessToken,username){
            loading("verifying",true);
            username = username==null?',username':username;
                //-- send processing alert
            var pictureHeight='picture.height(250),picture.width(250)';
            var otherFields = 'first_name,last_name'+username+',email';
            FB.api('/me?fields=id,'+pictureHeight+','+otherFields,
                function(resp) {
                    var arr ={};
                    if(resp.error){
                        _post_check_fb_email(accessToken,' ');
                        return;
                    }
                    
                    arr["token"] = accessToken;
                    $.each(resp, function(i,val) {
                       var v = i=="picture"?val.data.url:val;
                          arr[i]=v;
                    });

                    _post({
                    modal:"facebook",
                    data:arr,
                    url:"/membership/fbcheckemail"});
              });
        }

        //-- function that will handle login dropdown 
        var navigation_menu = function(data){
            rmePlugin.config.menu =data.navigation;
           //-- check if html5 storage is supported
           if(typeof(Storage)!=="undefined"){
               sessionStorage.menu=data.navigation;
           }
            _store(data);
            
            //-- check if there is a specific div to render
            if(rmePlugin.config.renderNav){
                if(rmePlugin.config.renderTo !=""){
                    $("#"+rmePlugin.config.renderTo).html(data.navigation);
                }else{
                    $("#"+element.id).html(data.navigation);
                }
            }
            //-- if element is present
            if($('#LOGINRME').length>0){
                    $('#LOGINRME').click(function(e){
                        modal_login("show");
                        stopEvent(e);
                    });
            }
            if($('#SIGNUPRME').length>0){
                $("#SIGNUPRME").click(function(e){
                         stopEvent(e);
                         modal_register("show");
                 });   
            }
            
           //-- check if there is there is hash parameter
           //-- but also check if not login
           if(rmePlugin.config.userId<1){
                _hash_parameters();
           }
        }
        
        
        //-- handles all successful login
        var _success = function(data){
            rmePlugin.config.userId = data.id;
            navigation_menu(data);
            //-- check if trap success
            if(rmePlugin.config.onSuccess !=null){
                rmePlugin.config.onSuccess(data.id);
                
            }else{
                //-- get suggested by controller
                if(data.view == "redirect"){
                    window.location.href =data.description;
                }else{
                    window.location.href = config.host+"dashboard/index";
                }
            }
            
           $("#"+rmePlugin.config.id).modal("hide");
        }
               
        //-- proxy listener for values posted thru proxy tunnel
        var rmeAuthProxyListener = function(response){
            switch(response.data.action){

                case "ping":
                    pong(response.data);
                    break;
                    
                case "menu":
                     navigation_menu(response.data.view);
                     break;
                
                case "login":
                    modal_login(response.data.type,response.data.view);
                    break;
                    
                case "register":
                    modal_register(response.data.type,response.data.view);
                    break;

                case "forgot":
                    modal_forgot_password(response.data.type,response.data.view);
                    break;

                case "facebook":
                    modal_facebook(response.data.type,response.data.view);
                    break;
                
                case "tnc":
                    modal_tnc(response.data.type,response.data.view);
                    break;  
                    
                case "_facebook_register":
                    _facebook_register(response.data.type,response.data.view);
                    break;   
                
                case "verify":
                    modal_verify(response.data.type,response.data.view);
                    break; 
                
                case "change_email":
                    modal_change_email(response.data.type,response.data.view);
                    break; 
                    
                case "_fb_unverified_email":
                    _fb_unverified_email(response.data.type,response.data.view);
                    break;                   
            }
            //-- hide loading
            loading("loading",false);
        }
        
        //-- prevent default
        var stopEvent = function(event){
                event.preventDefault();  
                event.stopPropagation();  
        }
        
        //-- loader
        var loading = function(msg,visible){
          $("#loader").html( "<div class='inner-text'>"+msg+"...</div>");
             if(visible){
                  $("#loader").fadeIn("slow");
             }else{
                  $("#loader").fadeOut("slow")
             }
         }
         
         
         //-- check if declared in memebers url
         var _is_home = function(){
            if(rmePlugin.config.origin =="home"){
                return true;
            }else{
                return false;
            }
         }
         
         //-- function that removes x on top
         var  _draw= function(data){
              loading("rendering",false)
             $("#"+rmePlugin.config.id).html(data); 
              
             if(_is_home()){
                 //-- remove slide effect
                 $("#"+rmePlugin.config.id).removeClass("fade")
                 //-- disable close on esc
                 $("#"+rmePlugin.config.id).attr("data-backdrop",false);
                 $("#"+rmePlugin.config.id).removeAttr("tabindex");
                 if($("#close_x").length>0){
                     $("#close_x").hide();
                 }
             }
            if(rmePlugin.config.backdrop){
                $("#"+rmePlugin.config.id).attr("data-backdrop",rmePlugin.config.backdrop);
            }

            $("#"+rmePlugin.config.id).modal("show");
            //-- remove the form action attribute
            $("form").removeAttr("action");
            $("form").removeAttr("method");
         }
        
        //--- function accessble outside
        rmePlugin.show = function(view,fn){
            //-- store if there is a call back funciton
            if(fn){rmePlugin.config.onSuccess =fn}
            
            switch(view){
                case "login":
                    //-- if its already login
                    if(rmePlugin.config.userId >0){
                        if(rmePlugin.config.onSuccess){
                            var data = {id:rmePlugin.config.userId}
                            _success(data);
                        }
                    }else{
                        modal_login("show");
                    }
                break;
                
                case "forgot":
                    modal_forgot_password("show");
                break;                
                
                case "signup":
                    modal_register("show");
                break;

                case "verify":
                    modal_verify("show");
                break;
            
                case "unverfied":
                    modal_verify("show");
                break; 
                
            }
            
            if(typeof(fn) !=="undefined"){
                 rmePlugin.config.onSuccess =fn;
            }
        }
        
        //-- toast message
        var modalAlert = function( msg, msgType,sticky,forceClose ){
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
                         stayTime : 10000,
                         close:forceClose
                     });
         }
        
       //-- call constructor
       rmePlugin.render();

    /**
     *validation function
     * 
     */

        var rme_form_validate =function (element_id){
            jQuery("#"+element_id).validate(
                        {
                                onfocusout: function(element) { jQuery(element).valid();},
                                errorElement: "div",
                                errorClass: "msg",
                                rules:
                                {
                                        password: 
                                        {
                                                maxlength: 100,
                                                required: true
                                        },
                                        captcha_answer:
                                        {
                                                maxlength: 20,
                                                required: true
                                        },
                                        email:
                                        {
                                                maxlength: 100,
                                                required: true
                                        }
                                },
                                highlight: function(element, errorClass) 
                                {
                                     jQuery(element).parent().addClass('has-error');
                                     jQuery(element).parent().removeClass('has-warning');
                                     jQuery(element).parent().removeClass('has-success');
                                     jQuery(element).parent().find("em").remove(); 
                                     jQuery(element).parent().append("<em></em>");
                                },
                                unhighlight: function(element, errorClass) 
                                {
                                     jQuery(element).parent().addClass('has-success');
                                     jQuery(element).parent().removeClass('has-error');
                                     jQuery(element).parent().removeClass('<has-></has->warning');
                                     jQuery(element).parent().find("em").remove(); 
                                }


                        }
                );
        }

        var rme_form_show_error =function (isvisible,msg,type,id){

            type = type == null?"error":type;
            id = id == null?"lblerr":id;

            if(isvisible){
                 jQuery('#'+id).parent('li').removeClass("has-success");
                jQuery('#'+id).parent('li').removeClass("success");
                jQuery('#'+id).parent('li').addClass(type);
                if(jQuery("#rme_modal_err"+id).length){
                        jQuery("#rme_modal_err"+id).html(msg);
                   }else{
                        jQuery('#'+id).after('<div id="rme_modal_err'+id+
                                '" class="msg" generated="true" for="'+id+'">'+msg+'</div>');
                   }
                  jQuery("#rme_modal_err"+id).show();
            }else{
               jQuery('#'+id).parent('li').removeClass(type);
                 jQuery('#'+id +" .msg").html("");
            }
        }


        var rme_login_manual_highlight = function (){
            jQuery('#password').parent('li').removeClass("has-success success");
            jQuery('#captcha_answer').parent('li').removeClass("has-success success");

            jQuery('#password').parent('li').addClass("has-error");
            jQuery('#captcha_answer').parent('li').addClass("has-error");
        }
        

    var rme_form_validate_signup = function (element_id,config,fn){	

            jQuery.validator.addMethod("minOneNumeric", function(value, element) 
            { 
              return /\d{1}/.test(value); 
            }, "1 character needs to be a number");


        jQuery("#"+element_id).validate(
        {  
		onfocusout: function(element) { jQuery(element).valid();},
		onkeyup: false,
                errorElement: "div",
		errorClass: "msg",
		rules:
        {
                first_name:
                {
                        maxlength: 30,
                        minlength: 1  
                },
                password:
                {
                        maxlength: 100,
                        minlength: 6,  
                        minOneNumeric: true,
                        required: true
                },
	            reenter_password:
	            {
	              equalTo: "#password"
	            },
	            email:
				{
					required: true,
					email: true
				}
        }, 
		highlight: function(element, errorClass) 
		{
		     jQuery(element).parent().addClass('error');
		     jQuery(element).parent().removeClass('warning');
		     jQuery(element).parent().removeClass('success');
		     jQuery(element).parent().find("em").remove(); 
		     jQuery(element).parent().append("<em></em>");
		},
		unhighlight: function(element, errorClass) 
		{
		     jQuery(element).parent().addClass('success');
		     jQuery(element).parent().removeClass('error');
		     jQuery(element).parent().removeClass('warning');
		     jQuery(element).parent().find("em").remove(); 
		     jQuery(element).parent().append("<em></em>");
		},

		showErrors: function(errorMap, errorList) 
		{
			var indx=0;
			
			this.defaultShowErrors();
			
			jQuery.each(errorMap, function(name, value) 
			{
			  
				if(name =='email')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
					{
						jQuery("#email").next().show();
					}
					else
					{
						jQuery("#email").parent().addClass('warning');
						jQuery("#email").parent().removeClass('error');
					}
					
				}
				
				if(name =='password')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
					{
						jQuery("#password").next().show();
					}
					else
					{
						jQuery("#password").parent().addClass('warning');
						jQuery("#password").parent().removeClass('error');
					}
					
				}
				
				if(name =='first_name')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
					{
						jQuery("#first_name").next().show();
					}
					else
					{
						jQuery("#first_name").parent().addClass('warning');
						jQuery("#first_name").parent().removeClass('error');
					}
					
				}
				if(name =='reenter_password')
				{
					var message = errorList[indx]['message'];

					if(message == "Something's missing here.")
					{
						jQuery("#reenter_password").next().show();
					}
					else
					{
						jQuery("#reenter_password").parent().addClass('warning');
						jQuery("#reenter_password").parent().removeClass('error');
					}
					
				}
				
				indx = indx + 1;
            });
		},
		messages:
        {
                reenter_password:
                {
                        equalTo: 'Passwords do not match. Please re-type.'
                }
        }
	});

	jQuery('#termsandcondition').on('change', function(e)
	{
		validateAgreeTermsCondition();
	});
	
        jQuery("#password").password_strength();   

};

    var validateAgreeTermsCondition=function()
	{
		var valid = true,
                    termConditionLabel = jQuery('.termsandcondition label');
                    terms = jQuery('#termsandcondition:checked').is(':checked');
                    jQuery('.termsandcondition .msg').remove();
		if(terms === false) 
		{
			termConditionLabel.addClass('required');
			termConditionLabel.parent('li').addClass('error');
		  jQuery('.termsandcondition').append('<div for="termsandcondition" \n\
                        generated="true" class="msg">Oops, you forgot to agree \n\
                                             with our Terms & Conditions</div>');
			valid = false;
		} 
		else
		{
			termConditionLabel.parent('li').removeClass('error');
			termConditionLabel.removeClass('required');
		}
		return valid;
	}
        
        
        //-- validation on focus on some element
       $(document).on('mousedown', function(event) { 
                 var  target = event.target; 
            if(target.id == "btnforgot" ||
                 target.id == "loginback" ||
                 target.id == "cancel_change_email" ||
                 target.id == "register" ||
                 target.id =="cancel_email_verify"
                    ){
                    stopEvent(event);
                   return true; 
             }
             
        });
       
    }//-- end of the plugin

   $.fn.rmeAuth = function(options) {
       return this.each(function() {
           if (undefined == $(this).data('rmeAuth')) {
               var plugin = new $.rmeAuth(this, options);
               $(this).data('rmeAuth', plugin);
           }
       });

   }
})(jQuery);

 window.fbAsyncInit = function() {
     var cur_domain = document.domain;
     var app_id = cur_domain.indexOf(".com.au") > -1? 1417467171804271:
             cur_domain.indexOf("local") > -1? 688690417835631:670310816339334;
  FB.init({
    appId      : app_id,
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
  };

  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));
  
