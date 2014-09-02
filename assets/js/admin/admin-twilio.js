
    $(document).ready(function() {
        $("#tabstrip").kendoTabStrip({
                        animation:  {
                            open: {
                                effects: "fadeIn"
                            }
                        }
                    });

                    loadMessage();


                    $("#msgToUser").keydown(function(event) {
                        var lng = $("#msgToUser").val();

                        $("#lblcounter").html("("+lng.length+") No. of characters.");
                    });


   });

   function loadMessage(){
         admin_sms('', function(response){
             if(response.result == 'success'){
                var inbox =[];
                var outbox = [];

                 for(var ctr =0;ctr <response.SMSMessages.SMSMessage.length;ctr++){
                    if(response.SMSMessages.SMSMessage[ctr].Status =="sent"){
                        outbox.push(response.SMSMessages.SMSMessage[ctr]);
                    }else{
                        inbox.push(response.SMSMessages.SMSMessage[ctr]);
                    }
                 }

                  ds = new kendo.data.DataSource({
                       data: inbox,
                       change: function() {
                             var jsTemplate = kendo.template($("#tmpInbox").html());
                              $("#tbInbox tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });
                    ds.read();

                  dsOut = new kendo.data.DataSource({
                       data: outbox,
                       change: function() {
                             var jsTemplate = kendo.template($("#tmpOutbox").html());
                              $("#tbOutbox tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });
                    dsOut.read();

             }
         }, null);
   }


   function replySms(tonumber,msg){
       $("#lblcounter").html("(0) No. of characters.");
      $("#smsLoader").hide();
      $('#phoneNumber').attr('disabled', 'disabled');
      $("#phoneNumber").val(tonumber);

      $("#replycontent").show();

      $("#lblphoneNumber").html("From Phone:");
       $("#lblmsgToUser").html("<strong>Reply:</strong>");

      $("#msg").html(msg);
      $("#confirmContainer").modal(); // USE MODAL FUNCTION TO INITIATE MODAL

}

   function newSms(){   
      $("#lblcounter").html("(0) No. of characters.");
      $("#smsLoader").hide();
      $('#phoneNumber').removeAttr('disabled');
      $("#lblphoneNumber").html("<strong>To Phone:</strong>");
      $("#lblmsgToUser").html("<strong>Message:</strong>");
      $("#phoneNumber").val("");
      $("#msgToUser").val("");
      $("#replycontent").hide();
      $("#confirmContainer").modal(); // USE MODAL FUNCTION TO INITIATE MODAL
	}

  function closeSms(){
   	$('#confirmContainer').modal('hide')   
	}

function sendReply(){
    var validator = $("#content_info").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
      $("#smsLoader").show();
     admin_sendSMS("",$("#phoneNumber").val(),$("#msgToUser").val(), function(respns){

           $("#smsLoader").hide();
           closeSms();
           var msg="Successfully sent.";
           var type="success";
           if(respns.result != "success"){
               msg = respns.result;
               type ="error";
           }


            $().toastmessage('showToast',{
                  text: msg,
                  sticky  : false,
                  position : 'top-center',
                  type  : type,
                  stayTime : 5000
             });
             loadMessage();
     }, null);
    }

}