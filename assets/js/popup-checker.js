     $(document).ready(function() {
            var msg_ie ="";
            var msg_adblock ="";
            var msg="";
            var ctr =0;

            $('body').append('<div id="ad_banner_div" style="display:none;"><img id="ad_banner_image" src="/assets/images/adbanner.gif"></div>');


            if(is_ie =="1"){
                ctr =1;
                msg_ie = 'Sorry, currently we don\'t fully support your browser.<br> Some functionalities might not take effect.<br> We advise you to use <br><a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank" > <img src="/assets/images/firefox_icon.png"  /> Mozilla Firefox </a>  or <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank" > <img src="/assets/images/Apps-google-chrome-icon.png"  /> Google Chrome.</a> <br /> <br />';
            }
/*
          setTimeout(function(){
                    if($('#ad_banner_div').html()=="" || typeof($('#ad_banner_image').attr("class")) !== "undefined"){
                            ctr =ctr+1;
                            msg_adblock += "You seem to have adblock installed on your browser. Kindly disable it for our domain (members.rentmyestate.com.au)  to continue full use of the system. <br /> <br />";
                    }

                     if(ctr>0){
                        msg =msg_ie!=""?msg_ie:msg_adblock;
                         if(ctr ==2){
                              msg =msg_ie;
                         }
                         if(msg!=""){
                             
                            $().toastmessage('showToast',{
                             text: msg,
                             sticky  : true,
                             position : 'top-center',
                             type  : "warning",
                             close: function(){
                                 if(ctr==2){
                                        $().toastmessage('showToast',{
                                             text: msg_adblock,
                                             sticky  : true,
                                             position : 'top-center',
                                             type  : "warning"
                                        });
                                 }
                             }
                             });
                         }
                     }
            },2000);

*/
     });