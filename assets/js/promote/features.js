/*====================================
 *  Initialize drop down values
 * ===================================
 */
var modelFeatureIsDirty = false;

var dtmp = [];
var dtBed = [];
var dtBath =[];
var dtCar =[{text:0, value: 0}];
        for(var ctr =0;ctr <20;ctr++){
            dtmp ={ text: ctr+1, value: ctr+1 };
            dtBed.push(dtmp)
            
            if(ctr <10){
                dtBath.push(dtmp);
                dtCar.push(dtmp);
            }
        }
        
/*====================================
 *  Read model remote bind for property type
 * ===================================
 */
var dtPropertyType = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"property-type"}
            }
        },
        schema: { 
                data:"data"
            }
    })


 /*====================================
 * VIEW model local bind for feature page
 * ===================================
 */   
var modelFeature = kendo.observable({
    number_of_bedrooms:1,
    data_source_bed: dtBed,
    
    isFeatureChange:false,
    clickFeature: function(){
       modelFeature.set("isFeatureChange",true)
    },

            
    number_of_bathrooms:1,
    data_source_bathrooms: dtBath,

    number_of_car_spaces:0,
    data_source_car_spaces: dtCar,
    
    number_of_garages:0,
    data_source_garages: dtCar,
      

    property_type:0,
    data_source_property_type: dtPropertyType,

    features:[],
    next_page:function(e){
        trackerModel.nextClick(e);
    },
   submit_page:function(e){
        
        if( submitValidate('#featureForm') ) {   
            if(modelFeatureIsDirty){
                update_features(this,function(resp){
                    if(resp.result =="success"){
                        modelFeatureIsDirty = false;
                        modelFeature.navigate(e);
                       
                    }

                });
            }else{
                 modelFeature.navigate(e);
            }
        }else{
            if(e ==""){
              modelFeature.navigate(e);
            }
                    $("#loader").hide();
        }

    },
    navigate:function(e){
        if(parseInt(trackerModel.isComplete)< tabDescription.indexOf(e) && e != "summary"  && e != "preview"){
           if(trackerModel.isComplete == trackerModel.currentTab){
               e  =tabDescription[parseInt(trackerModel.isComplete)+1];
           }else{
            e  =tabDescription[parseInt(trackerModel.isComplete)];
           }
        }
         $("#loader").hide();
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



modelFeature.bind("change", function(e){
       modelFeatureIsDirty = true;
    
});

 /*====================================
 * Update feature page
 * ===================================
 */   

function update_features(model,succFunc){
    var params ={
        owner:promoteUId,
        promote:promoteAId,
        property: promoteId,
        number_of_bedrooms:model.number_of_bedrooms,
        number_of_bathrooms:model.number_of_bathrooms,
        number_of_car_spaces:model.number_of_car_spaces,
        number_of_garages:model.number_of_garages,
        property_type:model.property_type,
        features:model.features,
        isupdated:modelFeatureIsDirty

    }
    if(featuresHasChange()){
    $.ajax({
        type:"POST",
        url:window.location.protocol+'//'+window.location.host + "/api/promote_features",
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
          succFunc({result:"success"});
    }
}


function featuresHasChange(){
      var dtModel = modelPromote.data();

    
   if(modelFeature.get("number_of_bedrooms") != dtModel[0].number_of_bedrooms){
        return true;
    }
    
   if(modelFeature.get("number_of_bathrooms") != dtModel[0].number_of_bathrooms){
        return true;
    }
  if(modelFeature.get("number_of_car_spaces") != dtModel[0].number_of_carspaces){
        return true;
    }   
  if(modelFeature.get("number_of_garages") != dtModel[0].number_of_garage){
        return true;
    }   
    
  if(modelFeature.get("property_type") != dtModel[0].property_type_id){
        return true;
    }
    
    if(modelFeature.get("isFeatureChange")){
        return true;
    }

    return false;
}

