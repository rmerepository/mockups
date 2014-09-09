 var modelDescriptionIsDirty = false;


 /*====================================
 * VIEW model local bind for description page
 * ===================================
 */
var modelDescription = kendo.observable({
    headline:"",
    description:"",
    characterCount:3500,
    onKeydownCount:function(e){
       var desc = $("#description").val()?$("#description").val():"";
       if(typeof(e) != "object"){
            desc = e;
       }

       var cnt =3500;
       if(desc.length < cnt){
           this.set("characterCount",cnt - desc.length);
       }else{
           this.set("characterCount",0);
       }
    },
    next_page:function(e){
        trackerModel.nextClick(e);
    },
    onChangeHeadline:function(){
        custom_validate('headline');
    },
    onChangeDescription:function(){
        custom_validate('description');
    },

   submit_page:function(e){
       comparePaste();
       
       var result =custom_validate('headline') +custom_validate('description');

        if(result >1){
            if(modelDescriptionIsDirty){
                update_description(this,function(resp){
                    if(resp.result =="success"){
                        modelDescriptionIsDirty = false;
                        modelDescription.navigate(e);
                    }

                });
            }else{
                modelDescription.navigate(e);
            }
        }else{
           if(e =="" || e=="features"){
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


modelDescription.bind("change", function(e){
       modelDescriptionIsDirty = true;

});


 /*====================================
 * Update feature page
 * ===================================
 */

function update_description(model,succFunc){    
    var params ={
        owner:promoteUId,
        promote:promoteAId,
        property: promoteId,
        description:model.description,
        headline:model.headline,
        isupdated:modelDescriptionIsDirty
    }

    $.ajax({
        type:"put",
        url:window.location.protocol+'//'+window.location.host + "/api/description",
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
}


$(function() {
   dtRestricted.fetch(function() {
       array_words = dtRestricted.data();
   });

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



function comparePaste(){
    if($('#description').val() != modelDescription.description){
        modelDescription.description = $('#description').val();
    }
    
     if($('#headline').val() != modelDescription.headline){
        modelDescription.description = $('#headline').val();
    }
    
}