
var modelPromote = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/promote",
                data:{property:promoteId,owner:promoteUId}
            }
        },
        schema: { 
                data: "data",
                model:{id:"id"}
            }
    }) 


$(function() {
   modelPromote.fetch(function() {
       var dtModel = modelPromote.data();
       var comp = dtModel[0].is_complete ?dtModel[0].is_complete:0;
       trackerModel.set("isComplete",comp);
       
       set_lease_model(dtModel[0]);
       set_description(dtModel[0]);
       set_features(dtModel[0]);
       set_inspection(dtModel[0]);
       
       trackerModel.set("adStatus",dtModel[0].status);
        trackerModel.forceNavigate(curTab);
          trackerModel.informChanges();


   });
});

function set_lease_model(parentModel){
    modelLease.set("id",parentModel.lease_id);
    modelLease.set("weekly_rent_amount",parentModel.week_rent_amount);
    modelLease.set("bond_amount",parentModel.bond_amount);
    modelLease.set("date_available",parentModel.date_available);
    modelLease.set("prefer_short_term_tenants",parentModel.short_term);
    
    var rent_rule = {amount:parentModel.rent_limit, 
                      abovelimit:parentModel.above_limit,
                      belowlimit:parentModel.below_limit,
                      belowmsg:parentModel.below_limit_msg,
                      abovemsg:parentModel.above_limit_msg,
                      renttype:parentModel.rent_type,
                      checklimit:parentModel.check_limit}
    
    modelLease.set("bondRule",rent_rule);

}

function set_inspection(parentModel){
    
    modelInspection.set("contactPerson",parentModel.contact_users_id);
    modelInspection.set("display_address",parentModel.display_address);
    modelInspection.set("last_name",parentModel.contact_last_name);
    modelInspection.set("mobile",parentModel.contact_mobile);

    if($.trim(parentModel.contact_mobile)=="" ||
        $.trim(parentModel.contact_last_name)==""){
        modelInspection.set("person_info",true);
    }
    
}

function set_features(parentModel){
    modelFeature.set("number_of_bedrooms",parentModel.number_of_bedrooms);
    modelFeature.set("number_of_bathrooms",parentModel.number_of_bathrooms);
    modelFeature.set("number_of_car_spaces",parentModel.number_of_carspaces);
    modelFeature.set("number_of_garages",parentModel.number_of_garage);
    modelFeature.set("property_type",parentModel.property_type_id);
    modelFeature.set("features",parentModel.features_id);
}

function set_description(parentModel){
    modelDescription.set("headline",parentModel.headline);
    modelDescription.set("description",parentModel.description);
    modelDescription.onKeydownCount(parentModel.description);
}

function removeSpaces(e){
 
    return e.toString().replace(/ /g,'');
}