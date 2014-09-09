 var array_words =[];
 
 /*====================================
 *  Read model remote bind for contac person
 * ===================================
 */
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
 *  Adult json format
 * ===================================
 */

var newObj ={fileId:0,isAdult:false,isPrimary:"",first_name:"",gender:0,genderCap:"",yearBirth:0,workingStatus:[],workingCap:"",photoSrc:""};

/*====================================
 *  Read model remote bind for working status
 * ===================================
 */
var dtWorkingStatus = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"working-status"}
            }
        },
        schema: { 
                data:"data"
            }
    })

/*====================================
 *  Read model remote bind for year birth
 * ===================================
 */
var dtYearBirth = new kendo.data.DataSource({
        transport: {
            read: {
                url: window.location.protocol+'//'+window.location.host + "/api/lists",
                data:{type:"year-birth"}
            }
        },
        schema: { 
                data:"data"
            }
    })


 /*====================================
 * VIEW model local bind for Occupant page
 * ===================================
 */   
var modelOccupant = kendo.observable({
    captionOccupant:'Add some quick details about yourself.',
    id:0,
    dt_YearBirth:dtYearBirth,
    dt_WorkingStatus:dtWorkingStatus,
    workingStatus:[],
    addMode:true,
    isAdult:false,
    first_name:"",
    isPrimary:true,
    adultSection:false,
    childSection:false,
    profilePhoto:"",
    description:"",
    editmode:false,
    onChangeDescription:function(){
        custom_validate('comments');
    },
    year_birth:0,
    editedIndex:0,
    onChangeYearBirth:function(e){
       
      var current_Year =  new Date().getFullYear();
      var current_Age = current_Year - modelOccupant.get("year_birth");

      if(current_Age < 18){
          modelOccupant.set("isAdult",false);
      }else{
          modelOccupant.set("isAdult",true);
      }
      
    },
    isMale:1,
    
    setToDefualt:function(){
        modelOccupant.set("workingStatus",[]);
        modelOccupant.set("first_name","");
        modelOccupant.set("isAdult",false);
        modelOccupant.set("year_birth",0);
        modelOccupant.set("isMale",1);
        $('#ppi').attr('src','/assets/images/default-avatar-02.png');
        gFID=0;
        cleanControlFields($('#txtfname'));
        cleanControlFields($('#txtbirth'));
        cleanControlFields($('#editName'));
         removeMessage("w_stat");
         $("#opt_ppi").hide();
    },
            
    
    dt_adult:[],
    dt_child:[],
    addOccupant:function(){

        if(submitValidate('#formAdd')){ 
             //-- check first if insert in adult
                    var src = $('#ppi').attr('src');
                    if(src!=null){
                        if(src.search("default-avatar")>0){
                           src = null;
                        }
                    }
                    
            if(modelOccupant.get("isAdult")){

                    var dataVal = modelOccupant.get("workingStatus");
                    
                    if(dataVal.length <1){
                        addMessage(false,"w_stat","This field is required");
                        return false;
                    }
                    
                    var workingCaption ="";        
                    $.each(dataVal, function(i, item){                        
                        workingCaption += dataVal[i].value+",";  
                    });   


                newObj.workingCap         =   workingCaption.substring(0,workingCaption.length-1);
                newObj.workingStatus      =   modelOccupant.get("workingStatus");
                newObj.isPrimary          =   modelOccupant.get("isPrimary");
                newObj.first_name         =   strToUpper(modelOccupant.get("first_name"));
                newObj.yearBirth          =   modelOccupant.get("year_birth");
                newObj.photoSrc           = removedomain(src);
                newObj.pName           =      $('#v_ppi').attr('title');
                newObj.pView           =     $('#v_ppi').attr('src');
                newObj.fileId             = gFID;
                newObj.gender             =   modelOccupant.get("isMale");
                newObj.genderCap          =  modelOccupant.get("isMale")==1?"Male":"Female";
                newObj.isAdult            =  modelOccupant.get("isAdult");
                newObj.initial            =  createInitial(strToUpper(modelOccupant.get("first_name")));
                this.dt_adult.push(newObj);

                
                 modelOccupant.set("adultSection",true);
                 modelOccupant.set("captionOccupant",'Who is moving in with you?');
                 if(modelOccupant.get("isPrimary")){
                      uiAlertMsg("Great! Your profile has been updated","success");
                 }else{
                      uiAlertMsg("Looking good! "+modelOccupant.get("first_name")+" has been added.","success");
                 }

                 modelOccupant.set("isPrimary",false);
                
                 modelOccupant.setToDefualt();
            }else{
                
                var records = this.get("dt_adult");
                if(records.length <1){
                    uiAlertMsg("Primary occupant should be an adult.","error");
                    return;
                }
               
                newObj.workingCap         =   "";
                newObj.workingStatus      =   [];
                newObj.isPrimary          =   false;
                newObj.first_name         =   strToUpper(modelOccupant.get("first_name"));
                newObj.yearBirth          =   modelOccupant.get("year_birth");
                newObj.photoSrc           =   removedomain(src);
                newObj.pName           =      $('#v_ppi').attr('title');
                 newObj.pView           =     $('#v_ppi').attr('src');
                newObj.fileId             =   gFID;
                newObj.gender             =   modelOccupant.get("isMale");
                newObj.genderCap          =   modelOccupant.get("isMale")===1?"Male":"Female";
                newObj.isAdult            =   false;
                newObj.initial            =  createInitial(strToUpper(modelOccupant.get("first_name")));
                this.dt_child.push(newObj);
                
                modelOccupant.set("captionOccupant",'Who is moving in with you?');
                 modelOccupant.set("childSection",true);
                  uiAlertMsg("Looking good! "+modelOccupant.get("first_name")+" has been added.","success");
                 modelOccupant.setToDefualt();
            }
        }
    },
    updateOccupant:function(e){
        var records ="";
        var index = modelOccupant.get("editedIndex");
        var dataVal = modelOccupant.get("aPanelworkingStatus");
        var workingCaption ="";     

            var src = $('#editppi').attr('src');
            if(src!=null){
                if(src.search("default-avatar")>0){
                   src = null;
                }
            }
        
        $.each(dataVal, function(i, item){                        
            workingCaption += dataVal[i].value+",";  
        });  
        
        if(modelOccupant.get("aPanelIsAdult")){

            if(dataVal.length <1 || dataVal[0].value == "" ){
                addMessage(false,"w_editstat","This field is required");
                return false;
            }
        }
            if(modelOccupant.get("aPanelEditedIsAdult")){
                 records = this.get("dt_adult");
                 if(records[index].isPrimary && modelOccupant.get("aPanelIsAdult") ==false){
                     uiAlertMsg("Primary occupant can not be a child.","error");
                     return;
                 }
            }else{
                 records = this.get("dt_child");
            }
            
            
                newObj.workingCap         =  workingCaption.substring(0,workingCaption.length-1);
                newObj.workingStatus      =   modelOccupant.get("aPanelworkingStatus");
                newObj.isPrimary          =   modelOccupant.get("aPanelIsPrimary")==true?1:0;
                newObj.first_name         =   strToUpper(modelOccupant.get("aPanelfirst_name"));
                newObj.yearBirth          =   modelOccupant.get("aPanelYearBirth");
                newObj.photoSrc           =   removedomain(src);
                newObj.pName           =      $('#v_editppi').attr('title');
                newObj.pView           =     $('#v_editppi').attr('src');
                newObj.fileId             =   gFID;
                newObj.gender             =   modelOccupant.get("aPanelisMale");
                newObj.genderCap          =   modelOccupant.get("aPanelisMale")==1?"Male":"Female";
                newObj.isAdult            =   modelOccupant.get("aPanelIsAdult");
                newObj.initial            =  createInitial(strToUpper(modelOccupant.get("aPanelfirst_name")));
                
                
        if(modelOccupant.get("aPanelEditedIsAdult") != modelOccupant.get("aPanelIsAdult")){

            if(modelOccupant.get("aPanelIsAdult")){
               var   arecords = this.get("dt_adult");     
                if(arecords.length<1){
                    newObj.isPrimary = "true";
                    modelOccupant.set("isPrimary",false);
                }
                this.dt_adult.push(newObj);
                modelOccupant.set("adultSection",true);
            }else{
                 this.dt_child.push(newObj);
                 modelOccupant.set("childSection",true);
            }
            records.splice(index, 1);
            if(records.length==0){
                 if( modelOccupant.get("aPanelEditedIsAdult")){
                     modelOccupant.set("adultSection",false);
                 }else{
                     modelOccupant.set("childSection",false);
                 }
             }

        }else{
            records.splice(index, 1,newObj);
        }

        if(modelOccupant.get("aPanelTmpIsPrimary") !== modelOccupant.get("aPanelIsPrimary")){
            modelOccupant.indexPrimaryOccupant(index);
        }
        modelOccupant.cancelOccupant();

    },
    editOccupant:function(e,isAdult){
        var records ="";
        
            if(isAdult){
                 records = this.get("dt_adult");
            }else{
                 records = this.get("dt_child");
            }
            
            
        var index = records.indexOf(e.data);
            modelOccupant.set("editedIndex",index);
            modelOccupant.set("aPanelIsAdult",records[index].isAdult);
            modelOccupant.set("aPanelYearBirth",records[index].yearBirth);
            modelOccupant.set("aPanelworkingStatus",records[index].workingStatus);
            modelOccupant.set("aPanelfirst_name",records[index].first_name);
            modelOccupant.set("aPanelisMale",records[index].gender);
             setPPI("editppi",records[index].fileId,records[index].pView,records[index].pName,records[index].photoSrc,false,false,records[index].initial);
            modelOccupant.set("aPanelIsAdult",isAdult);

           if(records[index].isPrimary){
                modelOccupant.set("aPanelIsPrimary",true);
                 modelOccupant.set("aPanelTmpIsPrimary",true);
                 modelOccupant.set("aPanelCheckboxPrimary",false);
           }else{
                modelOccupant.set("aPanelIsPrimary",false);
                 modelOccupant.set("aPanelTmpIsPrimary",false);
                 modelOccupant.set("aPanelCheckboxPrimary",true);
           }
           return parseInt(records[index].isPrimary);
          
    },
   cancelOccupant:function(e){
           modelOccupant.set("editmode",false);
        modelOccupant.set("aPanelVisible",false);
        modelOccupant.set("addMode",true);
        
       //-- return the previouse to original size 
       if( modelOccupant.get("aPanelPrevious")!=""){
            $("#"+modelOccupant.get("aPanelPrevious")).height(modelOccupant.get("aPanelOriginalSize"));
        }
        cleanControlFields($('#editName'));
        setPPI('editppi',0,0,0,0,true,false);
        removeMessage("w_editstat");
        modelOccupant.set("aPanelEditedIsAdult",false);
        modelOccupant.set("aPanelPrevious","");
    },
   deleteOccupant:function(e,isAdult){
        var records ="";
            if(isAdult){
                 records = this.get("dt_adult");
            }else{
                 records = this.get("dt_child");
            }
        var index = modelOccupant.get("editedIndex")
        
        if(!records[index].isPrimary){
           var fnem = records[index].first_name;
            records.splice(index, 1);
            modelOccupant.cancelOccupant();
            //-- check if there are still adult/child items
            if(records.length==0){
                if(isAdult){
                    modelOccupant.set("adultSection",false);
                }else{
                    modelOccupant.set("childSection",false);
                }
                
            }
            uiAlertMsg("Occupant "+fnem+" has been removed.","success");
            modelOccupant.set("aPanelPrevious","");
            modelOccupant.set("aPanelEditedIsAdult",false);
        }else{
            uiAlertMsg("Sorry you can’t remove yourself","error")
        }
    },
    editAdult:function(e){
        if(!modelOccupant.get("editmode")){
            modelOccupant.set("editmode",true);
            //-- set selected item prepare for deletion
            modelOccupant.set("aPanelEditedIsAdult",true);


            //-- return the previouse to original size 
            if( modelOccupant.get("aPanelPrevious")!=""){
                $("#"+modelOccupant.get("aPanelPrevious")).height(modelOccupant.get("aPanelOriginalSize"));
            }

            //-- set Orignal size
            modelOccupant.set("aPanelOriginalSize",$("#viewAdult_"+e.data.uid).height());

            //-- current will be previous 
            modelOccupant.set("aPanelPrevious","viewAdult_"+e.data.uid);

            modelOccupant.set("aPanelVisible",true);
            modelOccupant.set("addMode",false);

            $("#aPanel").offset({ top:$("#viewAdult_"+e.data.uid).offset().top, left: $("#viewAdult_"+e.data.uid).offset().left});

            modelOccupant.editOccupant(e,true)
           $("#viewAdult_"+e.data.uid).height($("#aPanel").height());
        }
       
    },
    toPrimary:function(e){
        if(!modelOccupant.get("editmode")){
        var  records = this.get("dt_adult");
        var index = records.indexOf(e.data);
        modelOccupant.indexPrimaryOccupant(index);
        var r = records[index];
            r.isPrimary = true;
            records.splice(index, 1,r);
            uiAlertMsg(r.first_name+" is now a primary occupant","success")
        }
    },
    deleteAdult:function(e){
        if(!modelOccupant.get("editmode")){
         var  records = this.get("dt_adult");
         var index = records.indexOf(e.data);
         modelOccupant.set("editedIndex",index);
         modelOccupant.deleteOccupant(e,true);
        }
    },
            
    editChild:function(e){
        if(!modelOccupant.get("editmode")){
            modelOccupant.set("editmode",true);
        modelOccupant.set("aPanelEditedIsAdult",false);
        
        //-- return the previouse to original size 
        if( modelOccupant.get("aPanelPrevious")!=""){
            $("#"+modelOccupant.get("aPanelPrevious")).height(modelOccupant.get("aPanelOriginalSize"));
        }
        //-- current will be previous 
        modelOccupant.set("aPanelPrevious","viewChild_"+e.data.uid);
        
        
        //-- set Orignal size
        modelOccupant.set("aPanelOriginalSize",$("#viewChild_"+e.data.uid).height());
       
        modelOccupant.set("aPanelVisible",true);
        modelOccupant.set("addMode",false);
       

      
       
       $("#aPanel").offset({ top:$("#viewChild_"+e.data.uid).offset().top, left: $("#viewChild_"+e.data.uid).offset().left});
       
        $("#viewChild_"+e.data.uid).height($("#aPanel").height());
        
       modelOccupant.editOccupant(e,false);
       modelOccupant.set("aPanelCheckboxPrimary",false);
    }
    },   
    deleteChild:function(e){
        if(!modelOccupant.get("editmode")){
         var  records = this.get("dt_child");
         var index = records.indexOf(e.data);
         modelOccupant.set("editedIndex",index);
         modelOccupant.deleteOccupant(e,false);
        }
    },
       
            
   //--- edit panel         
   aPanelVisible:false,
   aPanelPrevious:"",
   aPanelOriginalSize:0,
   aPanelIsAdult:false,
   aPanelYearBirth:0,
   aPanelworkingStatus:[],
   aPanelprofilePhoto:"",
   aPanelfirst_name:"",
   aPanelisMale:1,
   aPanelEditedIsAdult:false,
   aPanelIsPrimary:false,
   aPanelTmpIsPrimary:false,
   aPanelCheckboxPrimary:false,
   aPanelOnChangeYearBirth:function(e){
      var current_Year =  new Date().getFullYear();
      var current_Age = current_Year - modelOccupant.get("aPanelYearBirth");

      if(current_Age < 18){
          modelOccupant.set("aPanelIsAdult",false);
          modelOccupant.set("aPanelCheckboxPrimary",false);
      }else{
          modelOccupant.set("aPanelIsAdult",true);
          if(!modelOccupant.get("aPanelIsPrimary")){
            modelOccupant.set("aPanelCheckboxPrimary",true);
          }
      }  
      $("#"+modelOccupant.get("aPanelPrevious")).height($("#aPanel").height())
   },
   aPanelDelete:function(e){
        modelOccupant.deleteOccupant(e,modelOccupant.get("aPanelEditedIsAdult"));
        modelOccupant.set("editmode",false);
        e.preventDefault();
    },
    aPanelUpdate:function(e){

        if(submitValidate('#editOccupantForm')){ 
                modelOccupant.set("editmode",false);
                modelOccupant.updateOccupant(e);
        }
    },
    validate:function(){
        var records = this.get("dt_adult");

            if(records.length <1){
                uiAlertMsg("Primary adult occupant is required.","error");
                return false;
            }else{
                for(var ctr=0;ctr < records.length;ctr++){
                    if(records[ctr].isPrimary){
                        this.setToDefualt();
                            if(trackerModel.get("currentTab")==0){
                                    return custom_validate('comments');
                            }else{
                                return true;
                            }
                    }
                }
                 uiAlertMsg("Primary adult occupant is required.","error");
            }

    },
    nextTab:function(e){
        trackerModel.nextTab(e);
    },
    indexPrimaryOccupant:function(ndx){
        var records = this.get("dt_adult");

            for(var ctr=0;ctr < records.length;ctr++){

                 var r = records[ctr];
                if(records[ctr].isPrimary){
                    if(ctr != ndx){
                        r.isPrimary = false;
                        records.splice(ctr, 1,r);
                        return;
                    }                          
                }

            }
    },
    onChangeCheck:function(e){

        if(modelOccupant.get("aPanelTmpIsPrimary")== true){
           modelOccupant.set("aPanelIsPrimary",true);

        }
    }
   
    
});




function addMessage(isVisible,element_id,msg){
        $('#'+element_id).closest('.controls').find('.msg').remove();
        $('#'+element_id).removeClass('error, success')
        .closest('.controls').removeClass('error, success');

    if(!isVisible){
          $('#'+element_id).addClass('error')
             .closest('.controls').addClass('error')
             .closest('.controls').append("<div class='msg'><div class='text'>"+msg+"</div><em></em></div>");
             return false;
    }else{
                $('#'+element_id).addClass('success')
                 .closest('.controls').addClass('success')
                 .closest('.controls').append( "<div class='msg'><em></em></div>");
        return true;
    }
}
function removeMessage(element_id){
            $('#'+element_id).closest('.controls').find('.msg').remove();
        $('#'+element_id).removeClass('error, success')
        .closest('.controls').removeClass('error, success');
}



function createInitial(v_name){
    var arr = v_name.split(" ");
    var initial = arr[0].substring(0,1);
    if(arr.length ==2){
        initial += arr[1].substring(0,1);
    }
    if(arr.length >2){
         initial += arr[2].substring(0,1);
    }
    return initial;
}


function checkFile(filepath){
    if(filepath != null && filepath!=""){
        return  window.location.protocol+'//'+window.location.host +"/" + filepath.replace(window.location.protocol+'//'+window.location.host +"/","");
    }else{
        return filepath;
    }
}

function removedomain(filepath){
    if(filepath != null && filepath!=""){
        return  filepath.replace(window.location.protocol+'//'+window.location.host +"/","");
    }else{
        return filepath;
    }
}