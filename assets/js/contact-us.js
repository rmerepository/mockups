$(document).ready(function () {
var tmp = $("#username").text().split("|");
  $("#contactUsGreetUser").html('<p>Hi <b>'+tmp[0]+'!</b>');
  $("#contactusloader").hide();
   $("#btnContactSend").click(function(){
        $("#contactusloader").show();
        var textarea  = $('#msgToUser'),
                        msgToUser = textarea.val();

                    if( msgToUser ) {
                          textarea.removeClass('error');
                               var postmodel = kendo.observable({
                                "subject":'',
                                "message": msgToUser ,
                                "imtype":''
                                 });

                        contact_SendMessage('',postmodel, function(response){
                          var msg ='';
                          var type='';
                            if(response.result=='success'){
                                 msg ="Message successfully sent.";
                                 type="success";
                            }else{  
                                 msg ="Error on sending message.";
                                 type="error";
                            }
                               $('#closeContactUs').trigger('click');
                                $().toastmessage('showToast', {
                                   text     : msg,
                                   sticky   : true,
                                   position : 'top-center',
                                   type     : type,
                               });
                               $('#msgToUser').val('');
                                $("#contactusloader").hide();
                        }, null);
                    }
   });



});