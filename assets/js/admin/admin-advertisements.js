  //--- ON LOAD
  jQuery(document).ready(function()
	{

              var msg_adblock ="";
            $('body').append('<div id="ad_banner_div" style="display:none;"><img id="ad_banner_image" src="/assets/images/adbanner.gif"></div>');

            setTimeout(function(){
                    if($('#ad_banner_div').html()=="" || typeof($('#ad_banner_image').attr("class")) !== "undefined"){
                            msg_adblock += "Adblock is enabled. Unable to load required files.";
                    }


                         if(msg_adblock!=""){
                            $().toastmessage('showToast',{
                             text: msg_adblock,
                             sticky  : true,
                             position : 'top-center',
                             type  : "warning"
                             });
                         }

            },2000);
            
            get_publish_ads();
            get_history();
            

	});
  
  
  
  
  
  function preview(userid,propertyid,advertiseid,host){

                if ($("#window").data("kendoWindow")) {
                    $("#window").data("kendoWindow").content("Please wait while loading...");

                        $("#window").data("kendoWindow").refresh(host+propertyid+"/"+advertiseid);
                    $("#window").data("kendoWindow").open();

                }else{
                   var kendoWindow =      $("#window").kendoWindow({
                    width: "1050px",
                    height:"400px",
                    title: "Preview",
                    modal:true,
                    content: "<?php echo base_url('promote/preview/'); ?>/"+propertyid+"/"+advertiseid
                });
                }
             var kendoWindow = $("#window").data("kendoWindow");
            kendoWindow.center();
    }


 function approveAd(ad_id){
                
                      var rec;
                      $.each(Approval_RecordSet, function(i, obj) {
                            if(obj.id ==ad_id){
                                rec = obj;
                                return;
                            }
                        });

                         
                         
                           var modalApprove =$("#mi").rmeModal({
                            title:"Approve Advertisement", 
                            body:modalForm,
                            buttons:["cancel","continue","confirm"],  
                            confirmText:"Confirm",  
                            backdrop:"static", 
                            onConfirm:function(data,e){
                                  postApproveAd(data,rec)
                            }
                                    });
                           modalApprove.setValue("ads_from",rec.website);
                           modalApprove.setValue("id",ad_id);
                           modalApprove.setValue("display_address",rec.display);
                           modalApprove.setValue("contact_name",rec.users);
                           modalApprove.setValue("email",rec.email);
                           modalApprove.setValue("contact_number",rec.number);
                           modalApprove.setHtml("property_address",rec.address);
                           modalApprove.show();
                            $('#to_agentpoint').click(function () {
                                $("#status").prop('disabled',!this.checked);
                            });
                            
                            $('#to_fb').click(function () {
                                $("#to_wall").prop('disabled',!this.checked);
                            });
 }
 

 function loginFacebook(){           
       FB.login(function(response){

       }, {scope: 'manage_pages publish_stream'});
 }
  
 function facebookAlreadyLogin(){
   FB.api('/me', function(resp) {
       login_in_fb = true;
        $("#facebook-admin").html("<b>You are login as "+resp.first_name+" in FB</b>");
        $("#facebook-admin").show();
   });
 }
 
 function postToFacebookWall(message,pageID,ad_id){
    if(login_in_fb){
        FB.api('/me/accounts', function(response) {
            var access_t;
            $.each(response.data, function(i, obj) {
                if(obj.id == pageID){
                    access_t = obj.access_token;
                    return;
                }
            });

            FB.api('/'+pageID+'/feed/', 'post',$.extend({},message,{"access_token":access_t}), function(resp) {
               if(!resp.error){
                   updateFBPosted(ad_id)
               }else{
                                uiAlertMsg("Error on posting facebook wall.\n\
                    Please review the app permission.");
               }
            });

         });
    }else{
        uiAlertMsg("Error on posting facebook wall.\n\
        Please review the app permission.");
    }
 }
 
 function updateFBPosted(data){
     urlPost = "/admin/advertisement/update_fb_status";
        var callback = AdminApps.ajaxPost( urlPost ,$.extend({},pobj,{id:data}));
        callback.done(function (response, textStatus, jqXHR ) {

        });
 }
 
 function postApproveAd(data,rec){
     urlPost = "/admin/advertisement/approve_ads";
     var callback = AdminApps.ajaxPost( urlPost ,data);
        callback.done(function (response, textStatus, jqXHR ) {
             get_publish_ads();
            if(response.in_fb =="1" && response.with_fb =="0"){
                 postToFacebookWall(response.fb_message,response.fb_page_id,response.advertisement_id)
            }
            
            uiAlertMsg(rec.address+" advertisement has been approved.","success")
            setTimeout(function(){$("#tr_"+rec.id).fadeOut("slow")},1000);
        });
 }
 
 function denyAd(ad_id){
        var rec;
        $.each(Approval_RecordSet, function(i, obj) {
              if(obj.id ==ad_id){
                  rec = obj;
                  return;
              }
          });


             var modalDeny =$("#mi").rmeModal({
              title:"Deny Advertisement", 
              body:modaldenyForm,
              buttons:["cancel","continue","confirm"],  
              confirmText:"Confirm",  
              backdrop:"static", 
              required:["remarks"],
              onConfirm:function(data,e){
                    postDenyAd(data,rec)
              }
                      });
             modalDeny.show();  
             modalDeny.setValue("ads_from",rec.website);
             modalDeny.setValue("id",ad_id);
             modalDeny.setHtml("property_address",rec.address);
 }
 
 
 function postDenyAd(data,rec){
          urlPost = "/admin/advertisement/deny_ads";
     var callback = AdminApps.ajaxPost( urlPost ,data);
        callback.done(function (response, textStatus, jqXHR ) {
            
            uiAlertMsg(rec.address+" advertisement has been denied.","success")
            setTimeout(function(){$("#tr_"+rec.id).fadeOut("slow")},1000);
        });
     
 }
 
 function get_history(){
     urlPost = "/admin/advertisement/live";
      var callback = AdminApps.ajaxPost( urlPost,$.extend(pobj,{},{status:'renew,published'} ));
      callback.done(function (response, textStatus, jqXHR ) {
            if(response.result == 'success'){
                ds_pub_only = new kendo.data.DataSource({
                       data: response.data,
                     //  pageSize: 10,
                       change: function() { 
                             var jsTemplate = kendo.template($("#tmpPublish").html());
                              $("#tblPublish tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });     
                   ds_pub_only.read();
                   /*
                $("#pager2").kendoPager({
                                   dataSource: ds_pub_only,
                                                           pageSizes: true,
                                   messages: {
                               
                                       display: "{0} - {1} of {2} items",
                                       empty: "No items to display",
                                       page: "Page",
                                       of: "of {0}",
                                       itemsPerPage: "items per page",
                                       first: "Go to the first page",
                                       previous: "Go to the previous page",
                                       next: "Go to the next page",
                                       last: "Go to the last page",
                                       refresh: "Refresh"
                                   }
                               });      
                               */
                              
                   $("#admin_submit").click(function(e){
                        if($("#admin_search").val() ==""){
                                ds_pub_only.filter([]);
                          }else{
                             ds_pub_only.filter( { field: $("#admin_opt").val(), operator: "contains", value:   $("#admin_search").val()});
                          }
                    });
            }
      });
 }
 
 
 function get_publish_ads(){
     
     urlPost = "/admin/advertisement/live";
     var callback = AdminApps.ajaxPost( urlPost,$.extend(pobj,{},{status:'renew,published,expired,withdrawn,leased,sold'} ) );
      callback.done(function (response, textStatus, jqXHR ) {
                       if(response.result == 'success'){
                ds_pub = new kendo.data.DataSource({
                       data: response.data,
                       pageSize: 10,
                       change: function() { 
                             var jsTemplate = kendo.template($("#tmpWebsites").html());
                              $("#tblWebsite tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });
                ds_pub.read();
                
                $("#pager").kendoPager({
                    dataSource: ds_pub,
                    messages: {
                        display: "{0} - {1} of {2} items",
                        empty: "No items to display",
                        page: "Page",
                        of: "of {0}",
                        itemsPerPage: "items per page",
                        first: "Go to the first page",
                        previous: "Go to the previous page",
                        next: "Go to the next page",
                        last: "Go to the last page",
                        refresh: "Refresh"
                    }
                });
                
                 $("#tech_submit").click(function(e){
                        if($("#tech_search").val() ==""){
                                ds_pub.filter([]);
                          }else{
                             ds_pub.filter( { field: $("#tech_opt").val(), operator: "contains", value:   $("#tech_search").val()});
                          }
                    });
             }
      });

 }
 

 function viewXML(ad_id){
      var rec;
       for (var i = 0; i < ds_pub.data().length; i++) {
            if(ds_pub.data()[i].advertisement_id ==ad_id){
                rec = ds_pub.data()[i];
                break;
            }
        }
     
      var details ="";
     if(rec.xml_history!=""){
         details = rec.xml_history.split(";");
        if(details.length >1){
           var tmp = rec.xml_history+";";
           details = tmp.split(";");
        }
        details.reverse();
     }
     var recDetails,filename;

     filename = rec.xml_path.split("/");
     print_rec='<tr><td>'+rec.xml_date+'</td>\n\
                            <td>\n\
                                <a href="/assets/uploads/xml/'+filename[filename.length-1]+'" target="_blank">'+filename[filename.length-1]+'</a>\n\
                            </td>\n\
                            <td>'+rec.approved_by+'</td>\n\
                        </tr>';

     for(var ctr =0;ctr < details.length;ctr++){
         if(details[ctr] !=''){
            recDetails = details[ctr].split("|");
            filename = recDetails[1].split("/");

                 print_rec +='<tr><td>'+recDetails[0]+'</td>\n\
                               <td>\n\
                                   <a href="/assets/uploads/xml/'+filename[filename.length-1]+'" target="_blank">'+filename[filename.length-1]+'</a>\n\
                               </td>\n\
                               <td>'+recDetails[3]+'</td>\n\
                           </tr>'
         }
        ctr+=1;
     }
     
     var tbl = '<table cellpadding="5px"><th>Date Generated</th>\n\
                            <th>File</th>\n\
                            <th>By</th>\n\
                           '+print_rec+'</table>'
     
     var xmlfile =$("#mi").rmeModal({
                            title:"Xml Generated", 
                            body:tbl,
                            buttons:["cancel"],  
                            confirmText:"Ok",  
                            backdrop:"static"
                                    });
    
     xmlfile.show();
 }
 
 function inform_owner(ad_id){
      var rec;
       for (var i = 0; i < ds_pub.data().length; i++) {
            if(ds_pub.data()[i].advertisement_id ==ad_id){
                rec = ds_pub.data()[i];
                break;
            }
        }


             var modalPhone =$("#mi").rmeModal({
              title:"Phone Enquiry", 
              body:modalPhoneForm,
              required:["t_name","phoneNumber"],
              buttons:["cancel","continue","confirm"],  
              confirmText:"Confirm",  
              backdrop:"static", 
              onConfirm:function(data,e){
                    send_phone_enquiry(data,rec)
              }
                      });
             modalPhone.show();  
             modalPhone.setValue("property_id",rec.property_id);
              modalPhone.setValue("site",rec.ads_from);
             modalPhone.setHtml("property_address",rec.address);
 }
 
 function send_phone_enquiry(data,rec){

        var json_data =  JSON.parse('{"' + data.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
                 function(key, value) { return key===""?value:decodeURIComponent(value) });
                 
        var params = {
       "action":"phone_enquiry",
      "property":json_data.property_id,
      "tenant":json_data.t_name,
      "phone":json_data.phoneNumber,
      "remarks":json_data.msgToUser,
      "sms":json_data.smsTenant =="on"?1:0,
      "smsOwner":json_data.smsOwner =="on"?1:0,
      "mail":json_data.emailTenant =="on"?1:0,
      "site":json_data.site
      };
      if(params.mail ==1 || params.sms ==1 || params.smsOwner ==1){
            var url = "/api/messaging";
                ajaxPost(url,$.extend({},pobj,params),
                        function(data){
                            var msg = "Successfully Sent";
                            $("#smsLoader").hide();

                            if(data.sms !="" && data.sms !="success"){
                                msg = "Error sending sms."
                            }
                            if(data.result != "success"){
                                msg ="Error on processing the message.";
                            }

                            uiAlertMsg(msg,"success");
                        }, null);
      }else{
          uiAlertMsg("Nothing to do.")
      }

}

function post_fb_wall(ad_id,site){
    
    
    FB.login(function(response){
          if (response.status === 'connected'){
            urlPost = "/admin/advertisement/get_fb_wall_message";
            var callback = AdminApps.ajaxPost( urlPost,$.extend({},pobj,{id:ad_id,to_wall:site}));
             callback.done(function (response, textStatus, jqXHR ) {
                    postToFacebookWall(response.fb_message,response.fb_page_id,response.advertisement_id)
                      $("#"+ad_id).html(site+" wall");
             });
          }
    }, {scope: 'manage_pages publish_stream'});
}



function editPropertAd(site,property,loguser){
    if(site != currentLogSite){
        uiAlertMsg('Sorry, editing ad from other site is not yet available in this version');
    }else{
            window.location.href = window.location.protocol+'//'+window.location.host + 
                    '/admin/advertisement/edit_ad?id='+property+'&uid='+loguser;
    }
}