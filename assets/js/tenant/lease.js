var dtLeaseLength = [{id:3,value:"3 months"},{id:6,value:"6 months"},{id:12,value:"12 months or more"}];
var dtPet = [{id:3,value:"3 Months"},{id:6,value:"6 Months"},{id:12,value:"12++ Months"}];
var dtNumberPet = [{id:1,value:"1"},{id:2,value:"2"},{id:3,value:"3"},{id:4,value:"4"},{id:5,value:"5"}];

var petObj ={fileId:0,petType:"",petNumber:"",petName:"",photoSrc:""};
/*====================================
 *  Read model remote bind for working status
 * ===================================
 */
var dtPetType = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"pet-type"}
            }
        },
        schema: { 
                data:"data"
            }
    })
    
/*====================================
 * VIEW model local bind for Lease page
 * ===================================
 */   
var modelLease = kendo.observable({
    dt_LeaseLength:dtLeaseLength,
    leaseLength:12,
    withPet:false,
    onchangePet:function(e){
        var cnt = this.get("dt_pet");
        //if(!this.get("withPet") && cnt.length >0 ){
           // uiAlertMsg("Action not allowed. Please remove pet information." ,"error")
           // this.set("withPet",true);
           
       // }else{

            this.set("petSection",0);
            this.set("dt_pet",[]);
             modelLease.setToDefault();
             
       // }  
    },
    dt_petType:dtPetType,
    onChangePet:function(e){
        if(modelLease.get("petType")==3){
            modelLease.set("isOther",true);
            modelLease.set("petName","");
        }else{
             modelLease.set("isOther",false);
        }
    },
    editedIndex:0,
    moveInDate:currentDate,
    dt_numPet:dtNumberPet,
    numberPet:1,
    petType:0,
    isOther:false,
    petName:"",
    petSection:false,
    previousSelected:"",
    previousSize:0,
    addMode:true,
    editMode:false,
    dt_pet:[],
    setToDefault:function(){
        modelLease.set("petName","");
        modelLease.set("numberPet",1);
        modelLease.set("petType",0);
         modelLease.set("isOther",false);
         $('#petppi').attr('src','/assets/images/default-pets-02.png');
        cleanControlFields($('#addPet'));
        cleanControlFields($('#petName'));
        cleanControlFields($('#numPet'));
         $("#opt_petppi").hide();
         $("#btnPhoto").text('Upload Photo');
    },
    addPet:function(){
           
            if(modelLease.get("petType")!=0){
                var tmp = dtPetType.get(modelLease.get("petType"));
                var tmpName = tmp.value =="Other"?modelLease.get("petName"):tmp.value;
                modelLease.set("petName",strToUpper(tmpName));
            }
           if(submitValidate('#petForm')){ 
               
                petObj.fileId = gFID;
                petObj.petName = modelLease.get("petName");
                petObj.petNumber= modelLease.get("numberPet");
                petObj.petType= modelLease.get("petType");
                petObj.photoSrc = $('#petppi').attr('src');
                petObj.pName           =      $('#v_petppi').attr('title');
                petObj.pView           =     $('#v_petppi').attr('src');
            this.dt_pet.push(petObj);
            modelLease.set("petSection",true);
            
            var plural = modelLease.get("numberPet")> 1?"s":"";
             var has = plural==''?'has':'have';
            
            uiAlertMsg(modelLease.get("numberPet")+' '+modelLease.get("petName")+plural+" "+has+" been saved to your profile. Any other pets?","success");
            modelLease.setToDefault();
           }
    },
    deletePet:function(){
        var records = this.get("dt_pet");
        var index = modelLease.get("editedIndex");
         var pn = records[index].petName;
         var plural = records[index].petNumber > 1?"s":"";
         var has = plural==''?'has':'have';
         var numberofPet = records[index].petNumber;
        
        records.splice(index, 1);
        
        uiAlertMsg("Okay, "+numberofPet +" "+pn+plural+" "+has+" been removed.","success");
         if(records.length==0){
             modelLease.set("petSection",false);
         }
    },
    removePet:function(e){
         var  records = this.get("dt_pet");
         var index = records.indexOf(e.data);
         modelLease.set("editedIndex",index);
         modelLease.deletePet();
    },
    editPet:function(e){
         var  records = this.get("dt_pet");
         var index = records.indexOf(e.data);
         modelLease.set("editedIndex",index);
         
                 //-- return the previouse to original size 
        if( modelOccupant.get("previousSelected")!=""){
            $("#"+modelLease.get("previousSelected")).height(modelLease.get("previousSize"));
        }
        //-- set Orignal size
        modelLease.set("previousSize",$("#viewPet_"+e.data.uid).height());
        
        modelLease.set("previousSelected","viewPet_"+e.data.uid);
        
        modelLease.set("editMode",true);
        modelLease.set("addMode",false);
        

        $("#editPet").offset({ top:$("#viewPet_"+e.data.uid).offset().top, left: $("#viewPet_"+e.data.uid).offset().left});

        
            if(records[index].petType ==3){
                 modelLease.set("editIsoOther",true);
              //   $("#"+modelLease.get("previousSelected")).height($("#editPet").height()-34)
            }else{
                 modelLease.set("editIsoOther",false);
            }
           
        $("#viewPet_"+e.data.uid).height($("#editPet").height());

            modelLease.set("editPetName",strToUpper(records[index].petName));
            modelLease.set("editPetNumber",records[index].petNumber);
            modelLease.set("editPetType",records[index].petType);
         //   $('#editpetppi').attr('src',records[index].photoSrc);
            setPPI("editpetppi",records[index].fileId,records[index].pView,records[index].pName,records[index].photoSrc,false,true);
            gFID = records[index].fileId;
    },
    cancelEdit:function(e){
         modelLease.set("editMode",false);
         modelLease.set("addMode",true);
          modelLease.set("editIsoOther",false);
        //-- return the previouse to original size 
        if( modelLease.get("previousSelected")!=""){
             $("#"+modelLease.get("previousSelected")).height(modelLease.get("previousSize"));
         }
         setPPI('editpetppi',0,0,0,0,true,true);
     },
     editPetName:"",
     editPetNumber:0,
     editPetType:0,
     editIsoOther:false,
     onChangeEditPet:function(e){
        if(modelLease.get("editPetType")==3){
            modelLease.set("editIsoOther",true);
            modelLease.set("editPetName","");
            $("#"+modelLease.get("previousSelected")).height($("#editPet").height()-34)
        }else{
              modelLease.set("editIsoOther",false);
               $("#"+modelLease.get("previousSelected")).height(196);
        }
         $("#"+modelLease.get("previousSelected")).height($("#editPet").height());
    },
    editRemovePet:function(e){
        modelLease.deletePet();
        modelLease.cancelEdit();
        e.preventDefault();
    },
    updatePet:function(){
           var tmp = dtPetType.get(modelLease.get("editPetType"));
            var tmpName = tmp.value =="Other"?modelLease.get("editPetName"):tmp.value;
            modelLease.set("editPetName",tmpName);
            
           if(submitValidate('#editPetForm')){ 
               
                petObj.fileId = gFID;
                petObj.petName = modelLease.get("editPetName");
                petObj.petNumber= modelLease.get("editPetNumber");
                petObj.petType= modelLease.get("editPetType");
                petObj.photoSrc = $('#editpetppi').attr('src');
                petObj.pName           =      $('#v_editpetppi').attr('title');
                petObj.pView           =     $('#v_peditpetppi').attr('src');

            var records = this.get("dt_pet");
            var index = modelLease.get("editedIndex");
            records.splice(index, 1,petObj);
            
            modelLease.set("petSection",true);
            modelLease.cancelEdit();
        }
    },
    validate:function(){
        if(submitValidate('#formDate') && this.get("moveInDate") != ""){
            if(this.get("withPet")){
                var records = this.get("dt_pet");
                if(records.length <1){
                    uiAlertMsg("Pet information is required.","error");
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    },
    nextTab:function(e){
        trackerModel.nextTab(e);
    }
});
