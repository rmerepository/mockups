var ds = new kendo.data.DataSource();

$(document).ready(function() {
        $("#tabstrip").kendoTabStrip({
                        animation:  {
                            open: {
                                effects: "fadeIn"
                            }
                        }
                    });


         admin_getProfile('',user_id, function(response){
             if(response.result == 'success'){
                 $("#photo").attr("src", "../"+response.profilphoto);
                 $("#name").html(response.first_name + " "+ response.last_name);
                 $("#address").html(response.address);
                 $("#mobile").html(response.mobile);
                 $("#work").html(response.work);
                 $("#postal").html(response.postal);
                 $("#phone").html(response.home);
                 $("#email").html(response.email);
                 
             }
         }, null);
         
         
          admin_getAdvertisement('',user_id, function(response){
                    if(response.result=='success'){
                                     ds = new kendo.data.DataSource({
                                            data: response.odata,
                                            change: function() { 
                                                  var jsTemplate = kendo.template($("#tmpWebsites").html());
                                                   $("#tblWebsite tbody").html(kendo.render(jsTemplate, this.view()));

                                            }
                                        });
                                     ds.read();
                                     
                                     
                                    $("#dpProperty").data("kendoDropDownList").setDataSource(ds);
                                    $("#dpProperty").data("kendoDropDownList").select(0);

                                }
                            
         }, null);
         
         
         $("#btnBack").click(function(){
               window.history.back()
         });
         
             $('#enquiry-from').change(function() {
                $('#pIwouldliketo').css('display', 'inline');
            });

   });
   
   
   
   function getInfoAds(uid){
       
   var dataRow = ds.getByUid(uid); 
       
       admin_getAdDetails("",dataRow.id, function(response){
           if(response.result=='success'){

                              var jsTemplate = kendo.template($("#infotemplate").html());
                               $("#advertisementInfo").html(jsTemplate(response));

            if (!$("#window").data("kendoWindow")) {
                  $("#window").kendoWindow({
                                     width: "500px",
                                     actions: ["Close"],
                                     title: dataRow.address
                                 });
                }
             $("#window").data("kendoWindow").open();
                $("#window").data("kendoWindow").maximize();

                     }
                }, null);

       
   }



function contactInfo(uid){
     
    var full_name = $("#name").html();
    var work_number = $("#work").html();
    var email =$("#email").html();
     $('#mi').confirmModal({
                    heading : 'Contact User',
                    confirmButton : 'Send',
                    body : '<ul class="ul-info-user">'
                           + '<li><b>Name</b>' + full_name +'<b>Telephone No.</b>' + work_number + '<b>Email</b>' + email + '</li>'
                           + '</ul><hr />'
                           + '<b>Enter Subject</b>'
                           + '<input type="text" name="subject" id="subject" class="m_d_admin"/>'                   
                           + '<b>Enter your Message</b>'
                           + '<textarea id="msgToUser" class="m_d_admin"></textarea>'
                           + '<label> <input  onchange="useTemplate(this)" type="checkbox"  name="property" id="property" />Use Email Template</label>',
                    callback : function() {
                         var postmodel = kendo.observable({
                                    "subject":$('#subject').val(),
                                    "message":$('#msgToUser').val(),
                                    "toid":uid,
                                    "module":"property",
                                    "link_id":""
                                     });
                                     
                        admin_SearchSendMessage('',postmodel,"",function(response){
                            var msg ='';
                          if(response.result=='success'){
                                     msg ="Message successfully sent.";
                                     type="success";
                                }else{
                                     msg ="Error on sending message.";
                                     type="error";
                                }
                                    $().toastmessage('showToast', {
                                       text     : msg,
                                       sticky   : true,
                                       position : 'top-center',
                                       type     : type,
                                   });
                          
                        })
                        

                    }
                });
}


function useTemplate(obj){
    if(obj.checked){
        var msg = 'We transferred a call to you regarding your property:'+
                    '\n'+
                    '(name of tenant) '+'\n'+
                    '(number)'+
                    '\n'+
                    '\n'+
                    'If you were unable to answer the call, please call them back at your earliest convenience.'+
                    '\n'+
                    '\n'+
                    'Thank you and Have a good day.';
        $('#msgToUser').val(msg);
    }else{
        $('#msgToUser').val("")
    }
}


    
function getAudits(adid,address){
     $("#imgloader").show();
        admin_audits('',adid,function(response){
            if(response.result=='success'){
                
                 ds = new kendo.data.DataSource({
                        data: response.odata,
                        change: function() { 
                              var jsTemplate = kendo.template($("#auditTemplate").html());
                               $("#tblResultAudit tbody").html(kendo.render(jsTemplate, this.view()));
                               
                        }
                    });
                 ds.read();
                 $("#imgloader").hide();
                  $("#address").html(address);
                     $("#audits").show();
            }
        },null);
   
}

function closeAudits(){
     $("#audits").hide();
}

   
      
      
function emailInquiry(uid){
  var dataRow = ds.getByUid(uid); 
     $('#mi').confirmModal({
                    heading : 'Email Enquiry for ' + dataRow.address,
                    confirmButton : 'Send',
                    body : '<p>&nbsp;</p>'
                           + '<p><label for="enquiry-from" class="m_d_label">Email From:</label><select id="enquiry-from" name="enquiry-from" tabindex="-1"><option> Select </option><option value="realestatecomau">Realestate.com.au</option><option value="rentcomau">Rent.com.au</option></select></p>' 
                           + '<p><label for="enquiry-name" class="m_d_label">Name:</label><input type="text" name="enquiry-name" id="enquiry-name" class="sm_d_admin"/></p>' 
                           + '<p><label for="phoneNumber" class="m_d_label">Phone Number:</label><input type="text" name="phoneNumber" id="phoneNumber" class="sm_d_admin"/></p>'                                               
                           + '<p><label for="emailAddress" class="m_d_label">E-mail:</label><input type="text" name="emailAddress" id="emailAddress" class="sm_d_admin"/></p>'                                               
                           + '<p id="pIwouldliketo" style="display:none;"><label for="iwouldliketo" class="m_d_label" >I Would Like To:</label><textarea id="iwouldliketo" class="sm_d_admin"></textarea></p>'
                           + '<p><label for="msgToUser" class="m_d_label" >Comments:</label><textarea id="msgToUser" class="sm_d_admin"></textarea></p>'
                           ,
                   callback : function() {
                            jQuery.ajax(
                            {
                                url: 'enquiries/sendEmailToAdvertisingContactPerson',
                                type: 'POST',
                                data:   {   enquiry_name: $("#enquiry-name").val()
                                            ,enquiry_phone: $("#phoneNumber").val()
                                            ,enquiry_email: $("#emailAddress").val()
                                            ,enquiry_comments: $("#msgToUser").val()
                                            ,property_id: dataRow.propertyid
                                        },
                                async: false,
                                success: function(data)
                                {
                                    result = true;
                                }
                            });
                        return result;



                   }
                });
}

 
