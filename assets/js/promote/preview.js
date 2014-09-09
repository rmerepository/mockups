 /*====================================
 * Initialize inspection
 * ===================================
 */          
var dtInspection = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/inspection",
                data:{promote:promoteAId}
            }
        },
        schema: { 
                data: "data",
                model:{id:"id"}
            }
    })      

 
 /*====================================
 *  Read model remote bind for contac person
 * ===================================
 */
 var array_words =[];
var dtRestricted = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"x-words"}
            }
        },
        schema: { 
                data: "data"
            }
    })

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
 *  Read model remote bind CRUD
 * ===================================
 */
var modelPreview = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/promote",
                data:{property:promoteId,owner:promoteUId}
            },           
            update:{
                url: window.location.protocol+'//'+window.location.host + "/api/promote",
                type: "post",
                data:$.extend({},pobj,{promote:promoteAId,owner:promoteUId,property:promoteId})
            }
        },
        batch: true,
        schema: { 
                data: "data",
                model:{id:"id"}
            }
    }) 
    
    
    
    
 var viewModel = kendo.observable({
    isEdit:false,
    isPreview:true,
    showContact:false,
    editClick:function(e){
      this.set("isPreview",false);
      this.set("isEdit",true); 
      $('body').addClass('edit-mode');
      if(this.get("last_name") !=""){
          this.set("showContact",true);
      }
    },
    previewClick:function(e){
        if(textValidate(this.get("headline"))){
                 if(textValidate(this.get("description"))){
                    this.set("isPreview",true);
                    this.set("isEdit",false); 
                    visibleFeature(this.get("features"));
                    this.updateRemote();
                     this.set("showContact",false);
                 }
        }
    },
            
    weekly_rent_amount:"",
    cap_weekly_rent_amount:function(){
        var x =this.get("weekly_rent_amount");
        return "$"+ x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    },
    bondLimit:0,
    bond_amount: "",  
    cap_bond_amount:function(){
       var x =this.get("bond_amount");
        return "$"+ x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    },
    bondCompute: function(e) {
        var amount = this.get("weekly_rent_amount"); 
        if(!isNaN(amount)){
            if(this.get("bondRule.renttype")=="month"){
                 amount = compute_month(this.get("weekly_rent_amount"));
            }

            if(parseInt(this.get("bondRule.amount")) == 0){  
                    this.set("bond_amount",amount * this.get("bondRule.abovelimit"));
                    this.set("bondLimit",amount * this.get("bondRule.abovelimit"));
            }else{

                if(this.get("weekly_rent_amount") > this.get("bondRule.amount")){
                    this.set("bond_amount",amount * this.get("bondRule.abovelimit"));
                    this.set("bondLimit",amount * this.get("bondRule.abovelimit"));

                }else{
                    this.set("bond_amount",amount * this.get("bondRule.belowlimit"));
                    this.set("bondLimit",amount * this.get("bondRule.belowlimit"));

                }
            }
        }
   },
    date_available:"",
    cap_date_available:function(){
         var x =this.get("date_available");
         return x.replace("-"," ").replace("-"," ");
    },
    consider_pets: 0,
    
    prefer_short_term_tenants:0,
    cap_prefer_short_term_tenants:function(){
        if(this.get("prefer_short_term_tenants")==1){
            return "short term rental"
        }else{
            return "";
        }
    },
    
    bondLimit:0,
    bondRule:{},
    
    number_of_bedrooms:1,
    data_source_bed: dtBed,
    
    number_of_bathrooms:1,
    data_source_bathrooms: dtBath,
    
    number_of_car_spaces:0,
    data_source_car_spaces: dtCar,
    
    carSpace:function(){
        return this.get("number_of_car_spaces") + this.get("number_of_garages")
    },
    
    number_of_garages:0,
    data_source_garages: dtCar,
    
    property_type:"",
    data_source_property_type: dtPropertyType,
    cap_property_type:"",
    onChangeProperty:function(){
        var property_type_value = this.get("property_type");
        return $.map(dtPropertyType.data().toJSON(),function(key,val){
            if(key.id ==property_type_value){
             viewModel.set("cap_property_type",key.type_name);
            }
        })
        
    },
    

    features:[],    
    headline:"",
    description:"",
    descriptionCap:function(){
        var text = this.get("description");
        if(this.get("description")){
            return text.replace(/\r?\n/g, '<br />');
        }else{
            return "";
        }
    },
    onChangeHeadline:function(){
       // textValidate(this.get("headline"));
    },
    onChangeDescription:function(){
       // textValidate(this.get("description"));
    },

    address:function(){
        
    },
    full_name:"",
    last_name:"",
    mobile:"",
    email:"",
    formated_address:"",       
    contactPerson:"",
    onChangeContactDescription:function(){
        var contactPerson = this.get("contactPerson");
        return $.map(dtContactPerson.data().toJSON(),function(key,val){
            if(key.id ==contactPerson){
                viewModel.set("mobile",key.mobile);
                viewModel.set("email",key.email);
                viewModel.set("full_name",key.name);
                return;
            }
        })
    },
    data_source_ContactPerson: dtContactPerson,
    data_source_inspection:dtInspection,
    
    photos:[],
    user_photo:"",
    
    alert: function(message,alert_type){
    uiAlertMsg(message,alert_type);
    },
            
    updateRemote:function(){
     var preview = modelPreview.at(0);
        if(textValidate(this.get("headline"))){
            if(textValidate(this.get("description"))){
                preview.set("headline",this.headline);
                preview.set("description",this.description);

                preview.set("week_rent_amount",this.weekly_rent_amount);
                preview.set("bond_amount",this.bond_amount);
                preview.set("date_available",this.date_available);
                preview.set("prefer_short_term_tenants",this.short_term);


                preview.set("number_of_bedrooms",this.number_of_bedrooms);
                preview.set("number_of_bathrooms",this.number_of_bathrooms);
                preview.set("property_type",this.property_type);

                preview.set("contact_users_id",this.contactPerson);
                $('body').removeClass('edit-mode');
                modelPreview.sync();
            }
        }

    }
});




$(function() { 
 
   
   dtRestricted.fetch(function() {
       array_words = dtRestricted.data();
   });
   
  modelPreview.fetch(function() {
      
       var dtModel = modelPreview.data();
       
       set_lease_model(dtModel[0]);
       set_description(dtModel[0]);
       set_features(dtModel[0]);
       set_inspection(dtModel[0]);
       positionPhoto(viewModel.photos)
       visibleFeature(viewModel.features);

       uiDatePicker('#date_available');

        
   });
   

   kendo.bind($("#previewMainContainer"), viewModel);


});



/*=================================
* Initialize values models
*==================================
*/

function set_description(parentModel){
    viewModel.set("headline",parentModel.headline);
    viewModel.set("description",parentModel.description);
}

function set_lease_model(parentModel){
    viewModel.set("id",parentModel.lease_id);
    viewModel.set("weekly_rent_amount",parentModel.week_rent_amount);
    viewModel.set("bond_amount",parentModel.bond_amount);
    viewModel.set("date_available",parentModel.date_available);
    viewModel.set("prefer_short_term_tenants",parentModel.short_term);
    viewModel.set("photos",parentModel.photos);
    viewModel.set("user_photo",parentModel.contact_photo);
    
    var rent_rule = {amount:parentModel.rent_limit, 
                      abovelimit:parentModel.above_limit,
                      belowlimit:parentModel.below_limit,
                      belowmsg:parentModel.below_limit_msg,
                      abovemsg:parentModel.above_limit_msg,
                      renttype:parentModel.rent_type,
                      checklimit:parentModel.check_limit}
    
    viewModel.set("bondRule",rent_rule);

}

function set_features(parentModel){
    viewModel.set("number_of_bedrooms",parentModel.number_of_bedrooms);
    viewModel.set("number_of_bathrooms",parentModel.number_of_bathrooms);
    viewModel.set("number_of_car_spaces",parentModel.number_of_carspaces);
    viewModel.set("number_of_garages",parentModel.number_of_garage);
    viewModel.set("property_type",parentModel.property_type_id);
     viewModel.set("cap_property_type",parentModel.property_type);
    viewModel.set("features",parentModel.features_id);
}

function set_inspection(parentModel){
    
    var lastname = parentModel.contact_last_name == null?"":parentModel.contact_last_name;
    var contactmobile =parentModel.contact_mobile == null?"":parentModel.contact_mobile;
    var email =parentModel.contact_email == null?"":parentModel.contact_email;
    
    viewModel.set("contactPerson",parentModel.contact_users_id);
    viewModel.set("last_name",parentModel.contact_last_name);
    viewModel.set("formated_address",parentModel.formated_address);
    viewModel.set("full_name",parentModel.contact_first_name +" " +lastname );
    viewModel.set("mobile",contactmobile);
    viewModel.set("email",email);
    
}

/*=================================
* preview functions
*==================================
*/
function visibleFeature(checkedFeatures){
    $.grep(checkedFeatures, function(kword,val) {
            $("#f-ul-id-"+kword).show();
        });
}


function textValidate(textValue){
    if(textValue){
            var words = textValue.toLowerCase().split(/\b[\s,\.-:;]*/);
            var foundWords =[];
            var foundCharacters =[];

               foundWords = searchWord(words,array_words);
               foundCharacters = checkCharacter(textValue);

          if(foundWords.length >0){
               msg ="The following words are not allowed <br/> <b>"+foundWords.toString()+"</b>";
               viewModel.alert(msg,"error");
               return false;

          }else{

            if(foundCharacters.length >0){
               msg = "The following characters are not allowed <br/> <b>"+foundCharacters.toString()+"</b>";
               viewModel.alert(msg,"error");
               return false;
            }else{
                return true;
            }
          }
    }
    msg = "Headline and Description are required.";
    viewModel.alert(msg,"error");
    return false;
}

function positionPhoto(arr){
    var imgs ="";
    
    $.each(arr,function(key,val){
        if($("#photolist").html() !=""){
            imgs +='<img height="100px"  src="/../../'+val.path+'">';
        }
            switch(val.rank ){
                case 1:
                    $("#primaryPhoto").html('<img width="620px" height="425px" src="/../../'+val.path+'">')
                    break;
                
                case 2:
                     $("#secondPhoto").html('<img width="270px" height="203px" src="/../../'+val.path+'">')
                    break;
                
                case 3:
                     $("#thirdPhoto").html('<img width="270px" height="203px" src="/../../'+val.path+'">')
                    break;
            }
        })
        
        $("#photolist").html(imgs)
}