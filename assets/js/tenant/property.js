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
    });
   
var dtSuburb = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"postcodes"}
            }
        },
        schema: { 
                data:"data"
            }
            ,
        serverFiltering: true
    });    


var modelProperty = kendo.observable({
    plusRent:"+",
    plusBath:"+",
    plusSpace:"+",
    plusBed:"+",
    is_first_load:true,
    dt_PropertyType:dtPropertyType,
    dt_Suburb:dtSuburb,
    anyProperty:true,
    onChangeanyProperty:function(e){
       
        if(this.get("anyProperty")){
            modelProperty.set("propertyType",[]);
        }else{
           modelProperty.set("anyProperty",true);

        }
    },
    propertyType:[],
    onChangePropertyType:function(){
        var records = modelProperty.get("propertyType");
        if(records.length>0 && records.length <= totalProperty){
            modelProperty.set("anyProperty",false);
        }else{
            modelProperty.set("anyProperty",true);
        }
    },
    rent:function(){
        return [this.get("minRent"),this.get("maxRent")]
    },
    rentOnChange:function(e){
        if(typeof e.values==="undefined"){
              if(!checkMaxMinValue(this.get("minRent"),this.get("maxRent"))){
                    this.set("minRent",this.get("maxRent"));
              }
            if(this.get("maxRent") ==""){
              this.set("maxRent",1000);
            }
            if(parseFloat(this.get("minRent")) ==0){
              this.set("minRent",1);
            }
            
              this.set("rent",[this.get("minRent"),this.get("maxRent")]);
        }else{
            var val = e.values;
            this.set("minRent",val[0]);
            this.set("maxRent",val[1]);
        }


    },
    minRent:0,
    maxRent:1000,
    
    bed:function(){
        return [this.get("minBed"),this.get("maxBed")]
    },
    bedOnChange:function(e){
        if(typeof e.values==="undefined"){
            if(!checkMaxMinValue(this.get("minBed"),this.get("maxBed"))){
                 this.set("minBed",this.get("maxBed"));
            }
            if(this.get("maxBed") ==""){
              this.set("maxBed",10);
            }
            if(this.get("minBed") ==""){
              this.set("minBed",1);
            }              
             this.set("bed",[this.get("minBed"),this.get("maxBed")]);
        }else{
            var val = e.values;
            this.set("minBed",val[0]);
            this.set("maxBed",val[1])
        }


    },
    minBed:1,
    maxBed:5,
    
    bath:function(){
        return [this.get("minBath"),this.get("maxBath")]
    },
    bathOnChange:function(e){
        if(typeof e.values==="undefined"){
            
             if(!checkMaxMinValue(this.get("minBath"),this.get("maxBath"))){
                   this.set("minBath",this.get("maxBath"));
             }
            if(this.get("maxBath") ==""){
              this.set("maxBath",10);
            }
            if(this.get("minBath") ==""){
              this.set("minBath",1);
            }              
             this.set("bath",[this.get("minBath"),this.get("maxBath")])
            
        }else{
            var val = e.values;
            this.set("minBath",val[0]);
            this.set("maxBath",val[1])
        }


    },    
    minBath:1,
    maxBath:5,
    
    space:function(){
        return [this.get("minSpace"),this.get("maxSpace")]
    },
    spaceOnChange:function(e){
        
        if(typeof e.values==="undefined"){
            if(!checkMaxMinValue(this.get("minSpace"),this.get("maxSpace"))){
                this.set("minSpace",this.get("maxSpace"));
            }
            if(this.get("maxSpace") ==""){
              this.set("maxSpace",10);
            }
            if(this.get("minSpace") ==""){
              this.set("minSpace",0);
            } 
            
            this.set("space",[this.get("minSpace"),this.get("maxSpace")])
        }else{
            var val = e.values;
            this.set("minSpace",val[0]);
            this.set("maxSpace",val[1])
        }


    },     
    minSpace:0,
    maxSpace:5,
    suburbSection:false,
    dt_sorrounding:[],
    sorrounding:"",
    addSorrounding:function(e){

        $.each(this.dt_Suburb.data(), function (field, value){
            if(value.full_locality == modelProperty.get("sorrounding")){
                var isNew=true;
                $.each(modelProperty.dt_sorrounding, function (col, val){
                    if(val.full_locality == value.full_locality){
                        isNew = false;
                        return;
                    }
                });
                if(isNew){
                    var item = {id:value.id,suburb:value.locality,postalcode:value.postcode,full_locality:modelProperty.get("sorrounding")};
                    modelProperty.dt_sorrounding.push(item);
                    modelProperty.set("suburbSection",true);
                    modelProperty.set("sorrounding","");
                }else{
                    uiAlertMsg(value.full_locality+" is already in the list.","error")
                }
                return;
            }
           
        });
    },
    deleteSorrounding:function(e){
        var records = this.get("dt_sorrounding");
        var index = records.indexOf(e.data);
        records.splice(index, 1);
         if(records.length==0){
             modelProperty.set("suburbSection",false);
         }
         e.preventDefault();
    },
    validate:function(){
        var records = modelProperty.get("dt_sorrounding");
            if(records.length<1){
                  uiAlertMsg("Add at least 1(one) suburb.")
                  return false
            }else{
                return true;
            }
    },
    nextTab:function(e){
        trackerModel.validateTab(3);
    },
    onKeyUp:function(e){
        var key = String.fromCharCode(e.keyCode);
        var regex = /[0-9]|\./;
        
        if(!regex.test(key) &&  e.keyCode != 8 && e.keyCode != 46  && e.keyCode != 110 && e.keyCode != 190) {
                e.preventDefault();
        }
    }
});


function checkMaxMinValue(minV,maxV){

    if(parseInt(minV) > parseInt(maxV) ){
        uiAlertMsg("Minimum value should not be greater than maximum value","error");
        return false;
    }else{
        return true;
    }
}

function rentOnSlide(e){
            if(e.values[1]==1000){
                modelProperty.set("plusRent","+");
            }else{
                modelProperty.set("plusRent","");
            }
      modelProperty.set("maxRent",e.values[1])
      modelProperty.set("minRent",e.values[0])
}

function bedOnSlide(e){
                if(e.values[1]==5){
                modelProperty.set("plusBed","+");
            }else{
                modelProperty.set("plusBed","");
            }
      modelProperty.set("maxBed",e.values[1])
      modelProperty.set("minBed",e.values[0])
}

function bathOnSlide(e){
                if(e.values[1]==5){
                modelProperty.set("plusBath","+");
            }else{
                modelProperty.set("plusBath","");
            }
      modelProperty.set("maxBath",e.values[1])
      modelProperty.set("minBath",e.values[0])
}

function spaceOnSlide(e){
                    if(e.values[1]==5){
                modelProperty.set("plusSpace","+");
            }else{
                modelProperty.set("plusSpace","");
            }
      modelProperty.set("maxSpace",e.values[1])
      modelProperty.set("minSpace",e.values[0])
}

