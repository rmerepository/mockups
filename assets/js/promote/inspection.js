var modelInspectionIsDirty = false;

/*====================================
 *  Initialize drop down values
 * ===================================
 */
var dtmp = [];
var dtHour = [];
var dtMin = [];
var dtAMPM =[{ text: "AM", value: "AM" },{ text: "PM", value: "PM" }];
var dtDuration = [];
var cap="";

    for(var ctr =0;ctr <13;ctr++){
        cap = ctr+1;
       if(ctr <12){
     //       dtmp ={ text:"0"+cap, value: ctr+1 };
     //   }else{
            dtmp ={ text:cap, value: ctr+1 };
            dtHour.push(dtmp);
         }
       
        
        if(ctr<4){  
            if(ctr ==0){
              cap =  ctr*15;
                dtmp ={ text:"0"+cap, value: ctr*15 };
            }else{
                dtmp ={ text: ctr*15, value: ctr*15 };
             
            }
             dtMin.push(dtmp);
        }
        if(ctr>0){  
        //    if(ctr ==0){
        //         cap =  ctr*5+5;
        //          dtmp ={ text: "0"+cap, value: ctr*5+5 };
        //    }else{
             dtmp ={ text: ctr*15, value: ctr*15};
             
        //    }
             dtDuration.push(dtmp);
        }
    }


/*====================================
 *  function to check sched conflict
 * ===================================
 */
function check_sched_conflict(dt,hr,mn,duration){
    //--- assume all is valid
    modelInspection.set("isvalid",true);
    var idx_date = {Jan:"0",Feb:"1",Mar:"2",Apr:"3",May:"4",Jun:"5",Jul:"6",Aug:"7",Sep:"8",Oct:"9",Nov:"10",Dec:"11"};
    var arr = dt.split("-");
    var new_sdate = new Date(arr[2],idx_date[arr[1]],arr[0],hr,mn,0,0);
    var new_edate = new Date(new_sdate.getTime() +duration*60000 );
    
                        var cur_Date = new Date();
                        if( new_sdate < cur_Date){
                             modelInspection.set("isvalid",false);
                            return false;
                        }

              $.each(modelInspection.data_source_inspection.data(), function (field, value) {                        
                        var tmparr = value.date_start.split(" ");
                        var tmpampm = value.start_time.split(" ");
                        var tmptime = tmpampm[0].split(":");
                        var plushour = tmpampm[1] == "PM" && parseInt(tmptime[0]) < 12 ?12:0;
                            plushour = tmpampm[1] == "AM" && parseInt(tmptime[0]) == 12 ?-12:plushour;

                        var cur_sdate = new Date(tmparr[2],idx_date[tmparr[1]],tmparr[0],parseInt(tmptime[0])+plushour,tmptime[1],0,0);
                        var cur_edate = new Date(cur_sdate.getTime() +value.duration*60000);
                        


                           if(new_sdate >= cur_sdate && new_sdate < cur_edate ){
                               modelInspection.set("isvalid",false);
                           }
                           
                           if(new_sdate == cur_sdate){
                               modelInspection.set("isvalid",false);
                           }                           

                           if(new_edate > cur_sdate && new_edate <= cur_edate ){
                               modelInspection.set("isvalid",false);
                           }
                           if(new_sdate <= cur_sdate && new_edate >= cur_edate ){
                               modelInspection.set("isvalid",false);
                           }

                    });

       var startdate = kendo.parseDate(new_sdate);
       var enddate = kendo.parseDate(new_edate);
        return  {date_start:kendo.toString(startdate, "dd MMM yyyy"),start_time:kendo.toString(startdate, "hh:mm tt"),end_time:kendo.toString(enddate, "hh:mm tt"),duration:duration};
  
}    

/*====================================
 *  Read model remote bind for contac person
 * ===================================
 */
var dtContactPerson = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"contact-person",owner:promoteUId, property:promoteId}
            }
        },
        schema: { 
                data: "data"
            }
    })

/*====================================
 * CRUD model remote bind for inspection sched
 * ===================================
 */          
var dtInspection = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/inspection",
                data:{promote:promoteAId}
            },           
            create:{
                url: window.location.protocol+'//'+window.location.host + "/api/inspection",
                type: "post",
                data:$.extend({},pobj,{promote:promoteAId,owner:promoteUId,property:promoteId})
            },           
            destroy:{
                url: window.location.protocol+'//'+window.location.host + "/api/inspection",
                type: "delete",
                data:$.extend({},pobj,{promote:promoteAId,owner:promoteUId,property:promoteId})
                }
        },
        schema: { 
                data: "data",
                model:{id:"id"}
            },
        change: function(e) {
          var data = this.data();
            if(data.length >0){
                    modelInspection.set("with_inspection",true);
                     modelInspection.set("no_inspection",false);
            }else{
                 modelInspection.set("with_inspection",false);
                     modelInspection.set("no_inspection",true);
            }
        }
    })      

 /*====================================
 * VIEW model local bind for inspection page
 * ===================================
 */            
var modelInspection = kendo.observable({
    with_inspection:false,
    no_inspection:true,
    person_info:false,
    last_name:"",
    mobile:"",
    isvalid:false,
    display_address:"full",
    
    start_at_date:"",
    startAtHour:"",
    data_source_startAtHour: dtHour,

    
    startAtMinute:"",
    data_source_startAtMinute: dtMin,

            
    startAtAmPm:"",
    data_source_startAtAmPm: dtAMPM,

            
    duration:"",
    data_source_duration: dtDuration,
 
    contactPerson:"",
    data_source_ContactPerson: dtContactPerson,

    onchange_contactPerson:function(e){
        //-- loop in data source and get other info
        if(e.data.contactPerson == ""){
             modelInspection.set("person_info", false);
        }else{
            $.each(modelInspection.data_source_ContactPerson.data(), function (field, value) {
                if(value.id == e.data.contactPerson){
                    var c_person = value;
                       if(c_person.type == "user"){

                           if(c_person.mobile =="" || c_person.lastname==""){ 
                               modelInspection.set("person_info",true); 
                           }else{ 
                               modelInspection.set("person_info", false);
                           }
                          modelInspection.set("mobile", c_person.mobile);
                          modelInspection.set("last_name",c_person.lastname); 
                      }else{
                           modelInspection.set("person_info", false);
                      }
                }
            });
        }
        
    },

     data_source_inspection:dtInspection,
    removeInspection:function(e){
         this.data_source_inspection.remove(e.data);
         this.data_source_inspection.sync();
        e.preventDefault(); 
    },
    
    add_inspection:function(){

            if(  submitValidate('#inspectionForm') ) {      
                 var plushour = this.get("startAtAmPm") == "PM" && parseInt(this.get("startAtHour")) < 12 ?12:0;
                     plushour = this.get("startAtAmPm") == "AM" && parseInt(this.get("startAtHour")) == 12 ?-12:plushour;

                    var dtAdd = check_sched_conflict(this.get("start_at_date"),
                                      this.get("startAtHour") + plushour ,
                                      this.get("startAtMinute"),
                                      this.get("duration"));
                                      
                if(this.get("isvalid")){
                      this.data_source_inspection.add(dtAdd);
                      this.data_source_inspection.sync();
                      this.data_source_inspection.sort({ field: "rec_order", dir: "asc" });
                }else{
                    if(dtAdd == false){
                        modelInspection.alert("Schedule should not be earlier than this moment.","error");
                    }else{
                         modelInspection.alert("Inspection Time Conflict","error");
                    }
                }
              
      }
    },
    
    submit_page:function(e){
        

        $("#tenantContact").triggerHandler('mouseout');
        //-- Since inpection is already saved via remote async only contact person will be saved
         if(  submitValidate('#contactForm') ) {
              if(submitValidate('#additionalForm')){
                  trackerModel.set("currentTab",5);
                  
                  analytics(function(e,params){
                    if(modelInspectionIsDirty){
                        params.analytics=0;
                        update_inspection(params,function(resp){
                            if(resp.result =="success"){
                                modelInspectionIsDirty = false
                                 if(typeof e === 'object'){
                                     e ="summary";
                                 }
                                 trackerModel.navigate(e);
                            }

                        });
                    }else{
                        if(typeof e === 'object'){
                                       e ="summary";
                                   }
                        trackerModel.navigate(e);
                    }                      
                      
                      
                  },e,this);
                  
              }else{
                   $("#loader").hide();
                 if(parseInt(trackerModel.isComplete)> tabDescription.indexOf(e) && e != "summary"){
                       checkContactForm();
                 }else{
                       promoteRouter.navigate("/"+e);
                 }
              }
         }else{
             $("#loader").hide();
                if(parseInt(trackerModel.isComplete)> tabDescription.indexOf(e) && e != "summary"){
                        promoteRouter.navigate("/"+e);
                 }
        }
    },
     back_page:function(e){
        $("#tenantContact").triggerHandler('mouseout');
         promoteRouter.navigate("/"+e);
     },
    alert: function(message,alert_type){
		alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';

	    $().toastmessage('showToast', {
	        text     : message,
	        sticky   : true,
	        position : 'top-center',
	        type     : alert_type
	    });
	}

});

modelInspection.bind("change", function(e){
       modelInspectionIsDirty = true;
    
});


 /*====================================
 * Update inspection page
 * ===================================
 */   

function update_inspection(params,succFunc){
    /*
    var params ={
        display_address:model.display_address,
        owner:promoteUId,
        isupdate:model.person_info,
        last_name:model.last_name,
        mobile: model.mobile,
        promote:promoteAId,
        contact:model.contactPerson,
        property: promoteId
    
    } 
    */
    if(inspectionHasChange()){
        $.ajax({
            type:"PUT",
            url:window.location.protocol+'//'+window.location.host + "/api/inspection",
            data:JSON.stringify($.extend({},pobj,params)),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache:false,
            success:function (data) {
                     succFunc(data);
            },
            error:function (jqXHR, status) {
                 alert(status+":("+jqXHR.status +") \n"+jqXHR.statusText)
            }
        });
    }else{
        data={result:"success"};
        succFunc(data);
    }
}

function checkContactForm(){
    if(modelInspection.get("last_name") !="" || modelInspection.get("mobile") !=""){
        modelInspection.set("person_info", true);
    }
}



function inspectionHasChange(){
      var dtModel = modelPromote.data();

    if(modelInspection.get("display_address") != dtModel[0].display_address){
        return true;
    }
    
    if(modelInspection.get("last_name") != dtModel[0].contact_last_name){
        return true;
    }
    
   if(modelInspection.get("mobile") != dtModel[0].contact_mobile){
        return true;
    }
    
   if(modelInspection.get("contactPerson") != dtModel[0].contact_users_id){
        return true;
    }        
    return false;
}

function analytics(fn,e,model){
  var params ={
        display_address:model.display_address,
        owner:promoteUId,
        isupdate:model.person_info,
        last_name:model.last_name,
        mobile: model.mobile,
        promote:promoteAId,
        contact:model.contactPerson,
        property: promoteId,
        analytics:1
    } 
    
    
        $.ajax({
            type:"PUT",
            url:window.location.protocol+'//'+window.location.host + "/api/inspection",
            data:JSON.stringify($.extend({},pobj,params)),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache:false,
            success:function (data) {
                fn(e,params);
            }
        });    
}