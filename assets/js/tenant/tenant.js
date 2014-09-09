var no_tenant=true;
$(function() {
   
   dtRestricted.fetch(function() {
       array_words = dtRestricted.data();
   });
  //  dtSuburb.fetch(function(){


       if(gUID > 0){
            var url = "/common/tenant";
            $.get(url,{uid:gUID}, function(data) {
                if(data.status =="success"){
                         setOccupant(data.data);
                         setLease(data.data);
                         setProperty(data.data);
                    trackerModel.set("currentTab",data.data.currenttab);
                    trackerModel.set("finished",data.data.finished);
                     trackerModel.set("isSeeking",data.data.is_seeking);
                    trackerModel.activeTab(trackerModel.get("currentTab"));
                    loadPage();
                    tenantRouter.start();
               }
               
                if(gfPhoto!=""){
                     $('#ppi').attr('src',"/"+gfPhoto);
                }
            });

        }else{
            modelOccupant.set("first_name",gfName);
            trackerModel.activeTab(trackerModel.get("currentTab"));
            loadPage();
            tenantRouter.start();
        }
  //  });

});

function loadPage(){
    $("#pageLoads").hide();
     $("#progTracker").show();
}


function setOccupant(data){
    var adultSection = data.adults.length >0?true:false;
    var chidlSection = data.child.length >0?true:false;
     
    if(!adultSection){
        modelOccupant.set("first_name",gfName);

    }else{
        no_tenant = false;
        modelOccupant.set("captionOccupant",'Who is moving in with you?');
        modelOccupant.set("isPrimary",false);
        modelOccupant.set("dt_adult",data.adults);
        modelOccupant.set("adultSection",adultSection);
    }
    if(chidlSection){
        no_tenant = false;
        modelOccupant.set("captionOccupant",'Who is moving in with you?');
        modelOccupant.set("dt_child",data.child);
        modelOccupant.set("childSection",chidlSection);
    }
    modelOccupant.set("description",data.description);
}

function setLease(data){
    var withPets = data.with_pets=="1"?true:false;
    modelLease.set("leaseLength",data.leaselength);
    modelLease.set("withPet",withPets);
    modelLease.set("moveInDate",data.moveindate);
    modelLease.set("dt_pet",data.pets);
    modelLease.set("petSection",withPets);
  
}

function setProperty(data){
    var anyproperty = data.anyproperty=="1"?true:false;
     var suburbSection = data.suburb.length >0?true:false;
      
      if(data.maxrent <1000){  modelProperty.set("plusRent","");}
       if(data.maxbed <5){  modelProperty.set("plusBed","");}
        if(data.maxbath <5){  modelProperty.set("plusBath","");}
         if(data.maxspace <5){  modelProperty.set("plusSpace","");}

      
      modelProperty.set("anyProperty",anyproperty);
      modelProperty.set("propertyType",data.property);
      modelProperty.set("maxRent",data.maxrent);
      modelProperty.set("minRent",data.minrent);
      modelProperty.set("maxBed",data.maxbed);
      modelProperty.set("minBed",data.minbed);
      modelProperty.set("maxBath",data.maxbath);
      modelProperty.set("minBath",data.minbath);
      modelProperty.set("maxSpace",data.maxspace);
      modelProperty.set("minSpace",data.minspace);
      modelProperty.set("dt_sorrounding",data.suburb);
      modelProperty.set("suburbSection",suburbSection);
      
}


function tenantJsBatchUpdate(isPreview){
    
    var params = {
        "uid":gUID,
        "id": modelOccupant.id,
        "description":modelOccupant.description,
        "adults":modelOccupant.dt_adult,
        "child":modelOccupant.dt_child,
        "leaselength":modelLease.leaseLength,
        "moveindate":modelLease.moveInDate,
        "pets":modelLease.dt_pet,
        "property":modelProperty.propertyType,
        "maxrent":modelProperty.maxRent,
        "minrent":modelProperty.minRent,
        "maxbed":modelProperty.maxBed,
        "minbed":modelProperty.minBed,
        "maxbath":modelProperty.maxBath,
        "minbath":modelProperty.minBath,
        "maxspace":modelProperty.maxSpace,
        "minspace":modelProperty.minSpace,
        "suburb":modelProperty.dt_sorrounding,
        "anyproperty":modelProperty.anyProperty,
        "currenttab":trackerModel.currentTab,
        "finished":trackerModel.finished,
        "is_seeking":trackerModel.isSeeking
    };
    var url = "/common/tenant";
    ajaxPost(url, params, function(response){
        if(response.status =="success"){
            if(isPreview){
               window.location.href =  window.location.protocol+'//'+window.location.host + "/tenant/preview/profile"
            }else{
                window.location.href = response.url;
            }
        }else{
            uiAlertMsg(response.description,"error")
        }
        $("#loader_0").hide();
        $("#loader_1").hide();
        $("#loader_2").hide();
    },null);
}





function passFiles(file_array,imgId)
	{
		var photo = file_array;
		$('.photo-preloader').addClass('show');
		//-- Loop through the file array --//

			for(var i = 0; i < photo.length; i++)
			{
				jQuery.ajax(
				{
					url: '/tenant/photo_service/ajax_add_image',
					type: 'GET',
					data: {file_id: photo[i]},
					dataType: 'JSON',
					success: function(data)
					{
						if(data.result == 'success')
						{
							if(imgId !=""){

                                                           setPPI(imgId,data.data.id,data.data.view,data.data.name,data.data.thumb_file,false)
                                                        }
						}
						else
						{
                                                    alert(data.toSource())
						}
					},
					error : function(jqXHR, textStatus, errorThrown)
					{
						var emsg = "Error [" + textStatus + "] " + errorThrown;
						uiAlertMsg(emsg,"error");			
					}
				});
			}
	}
        
function setPPI(imgId,id,view,name,thumbfile,reset,isPet,initialname){
    var defaultPPI = thumbfile;
    
     if(reset){
         if(isPet){
             defaultPPI = "/assets/images/default-pets-02.png"
               view = "/assets/images/default-pets-02.png";
                $("#btnPhoto").text('Upload Photo');
         }else{
            defaultPPI = "assets/images/default-avatar-02.png";
              view = "/assets/images/default-avatar-02.png";
         }
        $("#m_"+imgId).removeClass("user-ine _rirAp has-image").addClass("user-ine _rirAp");
        $("#opt_"+imgId).removeClass("_rirOp clearfix").addClass("clearfix");
        $("#opt_"+imgId).hide();
         name="Default";
         id=0;
     }else{
         if(id !=0){
             if(imgId == 'petppi'){
                 $("#btnPhoto").text('Change Photo');
             }  
             $("#opt_"+imgId).show();
            $("#opt_"+imgId).removeClass("clearfix").addClass("_rirOp clearfix");
             $("#m_"+imgId).removeClass("user-ine _rirAp").addClass("user-ine _rirAp has-image");
         }
     }
     
      var src = defaultPPI;
      


        if(!isPet){
              if(src != null && src.search("default-avatar")>0){
                 src = null;
              }
              if(src==null || src=="null"){
                  if(imgId!='ppi'){
                    $('#'+imgId).parent('div').hide();
                  }
                   $('#initial').parent('div').show();
                   $('#initial').html(createInitial($("#initial_hid").val()));
              }else{
                  $('#'+imgId).parent('div').show();
                   $('#initial').parent('div').hide();
              }
        }
            
        $("#v_"+imgId).attr("href",window.location.protocol+'//'+window.location.host +"/" + view);
        $("#v_"+imgId).attr("title",name);
        $('#'+imgId).attr('src',checkFile(defaultPPI));
        

       gFID = id;
     
}