var ds = new kendo.data.DataSource();
$(document).ready(function () {
    $("#imgloader").hide();
    
    $("#btnSearch").click(function(){
        searchKeyword();
    })
    
    $('#search').keydown(function(event) {
        if (event.which == 13) {
            searchKeyword();
        }
    });


    $("#btnSearchProperty").click(function(){
        searchProperty();
    })
    
    $('#searchProperty').keydown(function(event) {
        if (event.which == 13) {
            searchProperty();
        }
    });


});

function searchProperty(){
     $("#imgloader").show();
        admin_Search_Property('',$('#searchProperty').val(),function(response){
            if(response.result=='success'){
                
                 ds = new kendo.data.DataSource({
                        data: response.odata,
                        change: function() { 
                              var jsTemplate = kendo.template($("#jsTemplate").html());
                               $("#tblResult tbody").html(kendo.render(jsTemplate, this.view()));
                               
                        }
                    });
                 ds.read();
                 $("#imgloader").hide();
            }
        },null);
}


function searchKeyword(){

     $("#imgloader").show();
        admin_Search('',$('#search').val(),function(response){
            if(response.result=='success'){
                
                 ds = new kendo.data.DataSource({
                        data: response.odata,
                        change: function() { 
                              var jsTemplate = kendo.template($("#jsTemplate").html());
                               $("#tblResult tbody").html(kendo.render(jsTemplate, this.view()));
                               
                        }
                    });
                 ds.read();
                 $("#imgloader").hide();
            }
        },null,$("#category option:selected").val());
}



function phoneInquiry(uid){
  var dataRow = ds.getByUid(uid); 
     $('#mi').confirmModal({
                    heading : 'Phone Enquiry for [property address]',
                    confirmButton : 'Send',
                    body : '<p>&nbsp;</p>'
                           + '<p><label for="subject" class="m_d_label">Name:</label><input type="text" name="subject" id="subject" class="sm_d_admin"/></p>' 
                           + '<p><label for="phoneNumber" class="m_d_label">Phone Number:</label><input type="text" name="phoneNumber" id="phoneNumber" class="sm_d_admin"/></p>'                                               
                           + '<p><label for="msgToUser" class="m_d_label" >Comments:</label><textarea id="msgToUser" class="sm_d_admin"></textarea></p>'
                           + '<label class="m_d_label">Send via</label><label class="m_d_label" for="smsTenant"><input type="checkbox" name="smsTenant" id="smsTenant" checked /> SMS Tenant</label> '
                           + '<br/><label class="m_d_label"></label><label  class="m_d_label" for="emailTenant"><input type="checkbox" name="emailTenant" id="emailTenant" checked/> Email Tenant</label>',
                   callback : function() {
                    alert('asdas');     
                   }
                });
}


function getInfo(uid){
    
    var dataRow = ds.getByUid(uid); 
    var includelink ='';
    
    if(dataRow.module == 'advertisement' || dataRow.module == 'property'){
        includelink = '<label> <input type="checkbox" name="property" id="property" value="'+dataRow.id+'" /> Include advertisement link below the message.</label>'
    }
 
 
     $('#mi').confirmModal({
                    heading : 'Contact User',
                    confirmButton : 'Send',
                    body : '<ul class="ul-info-user">'
                           + '<li><b>Name</b>' + dataRow.first_name + ' '+dataRow.last_name + '</li>'
                           + '<li><b>Telephone No.</b>' + dataRow.work_number + '</li>'
                           + '<li><b>Email</b>' + dataRow.email + '</li>'
                           + '</ul><hr />'
                           + '<b>Enter Subject</b>'
                           + '<p><input type="text" name="subject" id="subject" class="m_d_admin"/></p>'                   
                           + '<b>Enter your Message</b>'
                           + '<p><textarea id="msgToUser" class="m_d_admin"></textarea></p>'
                           + includelink,
                    callback : function() {
                         var postmodel = kendo.observable({
                                    "subject":$('#subject').val(),
                                    "message":$('#msgToUser').val(),
                                    "toid":dataRow.user_id,
                                    "module":dataRow.module,
                                    "link_id":dataRow.id
                                     });
                                     
                          var propertyid ='';
                          //-- check if checkbox is writen in html by includelik variable --//
                          if(includelink !=''){
                              //-- check if checkbox is checked
                              if($('#property').attr('checked')){
                                  propertyid = $('#property').val();
                              }
                          }
                      
                        admin_SearchSendMessage('',postmodel,propertyid,function(response){
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
