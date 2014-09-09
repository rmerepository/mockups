var unsent_dt;
var sent_dt;

var modelEnquiry= kendo.observable({  
    subject:'',
    from:'',
    body:'',
    website:'',
    date_save:'',
    search:'',
    eid:0,
    onDelete:function(e){
        deletemail(this.get('eid'));
        e.preventDefault();
    },
    onSearch:function(e){
        if($.trim($('#search').val()) != ""){
            searchProperty();
        }
    },
    onReply:function(e){
       var rec= searchRec(this.get('eid'))
        composeMail(rec);
        e.preventDefault();
    }
});

var layout = new kendo.Layout("layout-template");
var unsentPage = new kendo.View("unsent-template");
var openPage = new kendo.View("open-template", { model: modelEnquiry });



var enquiryRouter = new kendo.Router({
    init: function() {
        layout.render("#enquiryApp");

    }
});


enquiryRouter.route("/unsent", function() {
     layout.showIn("#content", unsentPage);
    $("#tabstrip").kendoTabStrip({
            animation:  {
                    open: {
                            effects: "fadeIn"
                    }
            }
    });
    
    getUnsent();
    getSent();
});

enquiryRouter.route("/open", function() {
     layout.showIn("#content", openPage);
    $("#searchResult").hide();

});





$(function() {
   
        enquiryRouter.start();
        enquiryRouter.navigate('/unsent');
});



function getUnsent(){
    
      $.ajax({
            url: '/admin/enquiries/email',
            type: "POST",
            dataType: "json",
            success: function (data){
                unsent_dt = new kendo.data.DataSource({
                       data: data,
                       pageSize: 20,
                       change: function() { 
                             var jsTemplate = kendo.template($("#unsentTempate").html());
                              $("#adsTable tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });     
                   unsent_dt.read();
                   
                   $("#pagerunsent").kendoPager({
                        autoBind: false,
                        dataSource: unsent_dt
                      });
            }
         }) 

}


function getSent(){
    
      $.ajax({
            url: '/admin/enquiries/email_sent',
            type: "POST",
            dataType: "json",
            success: function (data){
                sent_dt = new kendo.data.DataSource({
                       data: data,
                     //  pageSize: 10,
                       change: function() { 
                             var jsTemplate = kendo.template($("#sentTempate").html());
                              $("#tableEmailSent tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });     
                   sent_dt.read();
            }
         }) 

}

function searchProperty(){
    
        var params ={
            action:'admin_search_property',
           searchProperty:modelEnquiry.get('search'),
           website:modelEnquiry.get('website')};
           
      $.ajax({
            url: '/api/search',
            type: "POST",
            dataType: "json",
            data:$.extend({},pobj,params),
            success: function (data){
               var result= new kendo.data.DataSource({
                       data: data.odata,
                     //  pageSize: 10,
                       change: function() { 
                             var jsTemplate = kendo.template($("#searchResultTemplate").html());
                              $("#tblResult tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });     
                   result.read();
                $("#searchResult").fadeIn('slow');
            }
         }) 
}


function searchRec(enquiry_id){
       for (var i = 0; i < unsent_dt.data().length; i++) {
            if(unsent_dt.data()[i].enquiry_id ==enquiry_id){
                return unsent_dt.data()[i];
                break;
            }
        }
}

function openmail(enquiry_id){
     var rec = searchRec(enquiry_id);
     
     modelEnquiry.set('body',rec.email_content);
      modelEnquiry.set('date_save',rec.date_saved);
       modelEnquiry.set('website',rec.website);
        modelEnquiry.set('from',rec.email_from);
         modelEnquiry.set('subject',rec.subject);
          modelEnquiry.set('eid',rec.enquiry_id);
            modelEnquiry.set('search','');

     
    enquiryRouter.navigate('/open');
}

function deletemail(id_list,multi){
        
      $.ajax({
            url: '/admin/enquiries/delete',
            type: "POST",
            dataType: "json",
            data:{id:id_list},
            success: function (data){
                if(multi){
                    for(var ctr=0;ctr<data.length;ctr++){
                        $("#tr_"+data[ctr]).fadeOut("slow");
                    }
                }
                uiAlertMsg('Mail successfully deleted','success');
                enquiryRouter.navigate('/unsent');
            }
         }) 
}

function composeMail(rec){
    var tmp_ad =rec.subject;
    
    if(tmp_ad.length >50){
        tmp_ad = tmp_ad.substring(0,50)+"...";
    }
    
       replyForm.set('subject',rec.subject);
     replyForm.set('title',tmp_ad);
    replyForm.set('website',rec.website);
    replyForm.set('to',rec.email_from);
    replyForm.set('display',true);
     replyForm.set('footer_display',true);
    replyForm.set('old_body', rec.email_content);
    replyForm.set('isResize',false);
    $('#replyMin').height(450);
    
}


function forwardEnquiry(propertyId,address){
    var tmp_ad =address;
    
    if(address.length >50){
        tmp_ad = address.substring(0,50)+"...";
    }
    
    enquiryForm.reset();
    enquiryForm.set('title',tmp_ad);
    enquiryForm.set('property',propertyId);
    enquiryForm.set('display',true);
     enquiryForm.set('footer_display',true);
    enquiryForm.set('website', modelEnquiry.get('website'));
    enquiryForm.set('enquiry',modelEnquiry.get('eid'));
    enquiryForm.set('isResize',false);
    $('#frmMin').height(450);
}


function toggleCheckbox(source) {
  checkboxes = document.getElementsByName('eRec');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}


function deleteMulti(){
    var enquiry_id ="0";
  checkboxes = document.getElementsByName('eRec');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    if(checkboxes[i].checked){
        enquiry_id +=","+checkboxes[i].value;
    }
  }
  if(enquiry_id=="0"){
        uiAlertMsg('No record checked','error') 
  }else{
    deletemail(enquiry_id,true)
  }
}

/**
 * =============================================================================
 * below here is for compose modal
 * =============================================================================
 */

   var enquiryForm = kendo.observable({
       isResize:false,
       display:false,
       footer_display:false,
       title:'',
       property:0,
       enquiry:0,
       website:'',
       email:'',
       phone:'',
       comments:'',
       name:'',
       iwouldliketo:'',
       from:'RealEstate.com.au',
       reset:function(){
            this.set('comments','');
            this.set('name','');
            this.set('phone','');
            this.set('email','');
            this.set('iwouldliketo','');
            this.set('title','');
            this.set('property',0);
            this.set('website',''); 
            this.set('enquiry',0);
            this.set('display',false);
            this.set('footer_display',false);
            this.set('isResize',false);
            $('#frmMin').height(450);
       },
       onSend: function(e){
           
        var params ={
            website:this.get('website'),
            enquiry_id:this.get('enquiry'),
            name:this.get('name'),
            phone:this.get('phone'),
            email:this.get('email'),
            comments:this.get('comments'),
            from:this.get('from'),
            iwouldliketo:this.get('iwouldliketo'),
            property_id:this.get('property')};
           
                   
        $.ajax({
              url: '/admin/enquiries/forward',
              type: "POST",
              dataType: "json",
              data:$.extend({},pobj,params),
              success: function (data){
                  if(data.status=='success'){
                      uiAlertMsg(data.status,'success');
                       enquiryForm.onClose(null);
                       enquiryRouter.navigate('/unsent');
                  }else{
                      uiAlertMsg('Problem on sending enquiry','error');
                  }
              }
           }) 

           
            e.preventDefault();
       },
       onResize:function(e){
           if(!this.get('isResize')){
                $('#frmMin').height(30);
                this.set('footer_display',false);
                this.set('isResize',true);
           }else{
                $('#frmMin').height(450);
                this.set('footer_display',true);
                this.set('isResize',false);
           }
           
            e.preventDefault();
       },
       onClose:function(e){
       this.reset();
        if(e){ e.preventDefault();}
       }
       
   })
   
   
      var replyForm = kendo.observable({
            website:"",
            subject:"",
            title:"",
            comments:"",
            to:"",
            from:"enquiries",
            isResize:false,
            display:false,
            footer_display:false,
            onResize:function(e){
                if(!this.get('isResize')){
                     $('#replyMin').height(30);
                     this.set('footer_display',false);
                     this.set('isResize',true);
                }else{
                     $('#replyMin').height(450);
                     this.set('footer_display',true);
                     this.set('isResize',false);
                }

                 e.preventDefault();
            },
           onSend: function(e){
           
        var params ={
            sender:this.get('website'),
            to:this.get('to'),
            from:this.get('from'),
            subject:this.get('subject'),
            old_body:this.get('old_body'),
            comments:this.get('comments')};
           
                   
        $.ajax({
              url: '/admin/enquiries/reply',
              type: "POST",
              dataType: "json",
              data:$.extend({},pobj,params),
              success: function (data){
                    if(data[0].status=='sent'){
                        uiAlertMsg('Email successfuly sent.','success');
                        replyForm.onClose(null);
                    }else{
                        uiAlertMsg(data[0].reject_reason,'error');
                    }
              }
           }) 

           
            e.preventDefault();
       },
            onClose:function(e){
                this.set('title',"");
                 this.set('comments',"");
             this.set('display',false);
             this.set('footer_display',false);
             this.set('isResize',false);
             $('#replyMin').height(450);
             if(e){ e.preventDefault();}
            }            
      })
   
   
    kendo.bind($("#frmEnquiry"), enquiryForm);
    kendo.bind($("#frmReply"), replyForm);