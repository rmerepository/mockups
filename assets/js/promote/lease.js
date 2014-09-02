 /*====================================
 * VIEW model local bind for lease page
 * ===================================
 */
var modelLeaseIsDirty = false;
var modelLease = kendo.observable({
    id:0,
    weekly_rent_amount:"",
    bond_amount: "",            
    date_available:"",
    consider_pets: 0,            
    prefer_short_term_tenants:0,
    toolTipBelowMsg: "",
    tooltipAboveMsg:"",
    belowVisible : false,
    aboveVisible:false,
    bondLimit:0,
    bondRule:{},
    next_page:function(e){
        trackerModel.nextClick(e);
    },
   submit_page:function(e){
        
        if(  submitValidate('#leaseForm') ) {
            if(this.get("weekly_rent_amount") >99999){
                 $("#loader").hide();
                 forceValidate('weekly_rent_amount','Amount should not be more than 99,999.99.')
                 
            }else{
                if(modelLeaseIsDirty){                    
                    update_lease(this,function(resp){
                        $("#bondToolTip1").trigger('mouseout');
                        $("#bondToolTip2").trigger('mouseout');
                        
                        if(resp.result =="success"){
                            modelLease.set("id",resp.uid);
                            modelLeaseIsDirty =false;
                            modelLease.navigate(e);
                        }
                    });
                }else{
                     modelLease.navigate(e);
                }
            }
        }else{
             $("#loader").hide();
        }
    },
    navigate:function(e){

        if(parseInt(trackerModel.isComplete) < tabDescription.indexOf(e) && e !="summary" && e != "preview"){
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
        uiAlertMsg(message,alert_type);
	},

    bondCompute: function(e) {

        this.set('aboveVisible', false);
        this.set('belowVisible', false);
        $("#bondToolTip1").triggerHandler('mouseleave');
        $("#bondToolTip2").triggerHandler('mouseleave');
        clearTimeout(timerId1);
        clearTimeout(timerId2);
        
        
        var amount = this.get("weekly_rent_amount"); 
        if(parseInt(amount) < 99999){
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
                this.bondCheck(e);
            }
        }else{
            setTimeout( function(){forceValidate('weekly_rent_amount','Amount should not be more than 99,999.99.')}, 300);
        }
   },
    
    bondCheck: function (e) {
        var  toolTipMsg ="";

   
        if(!isNaN(this.get('bond_amount'))){
            
             this.set('toolTipAboveMsg', this.get("bondRule.abovemsg"));
             this.set('toolTipBelowMsg', this.get("bondRule.belowmsg"));
            
             if(parseInt(this.get("bondRule.amount")) == 0){  
                if(parseInt(this.get('bondLimit')) < parseInt(this.get('bond_amount'))){
                        if(this.get("bondRule.abovemsg")!= null){                           
                            this.set('aboveVisible', true);
                            $("#bondToolTip2").triggerHandler('mouseenter');
                        }else{
                            this.set('aboveVisible', false);
                             $("#bondToolTip2").triggerHandler('mouseleave');
                        }
                }
             }else{
                 if(parseInt(this.get('bond_amount'))>parseInt(this.get('bondLimit')) ){
                    if(parseInt(this.get('weekly_rent_amount')) > parseInt(this.get('bondRule.amount'))){
                        if(this.get("bondRule.abovemsg")!= null){
                         this.set('aboveVisible', true);
                         $("#bondToolTip2").triggerHandler('mouseenter');
                        }else{
                            this.set('aboveVisible', false);
                             $("#bondToolTip2").triggerHandler('mouseleave');
                        }
                    }else{
                        if(this.get("bondRule.belowmsg")!=null && parseInt(this.get('bond_amount'))>parseInt(this.get('bondRule.amount'))){
                         this.set('belowVisible', true);
                         $("#bondToolTip1").triggerHandler('mouseenter');
                        }else{
                            this.set('belowVisible', false);
                             $("#bondToolTip1").triggerHandler('mouseleave');
                        }
                    }
                 }
             }

        }
    }
});


modelLease.bind("change", function(e){
       modelLeaseIsDirty = true;
    
});

 /*====================================
 * Update feature page
 * ===================================
 */   

function update_lease(model,succFunc){
    if(leaseHasChange()){
        var params ={
            owner:promoteUId,
            promote:promoteAId,
            property: promoteId,
            id:model.id,
            weekly_rent_amount:model.weekly_rent_amount,
            bond_amount: model.bond_amount,            
            date_available:model.date_available,
            consider_pets: model.consider_pets,            
            prefer_short_term_tenants:model.prefer_short_term_tenants,
            isupdated:modelLeaseIsDirty
        }
        var method = model.id ==0?"post":"put";

        $.ajax({
            type:method,
            url:window.location.protocol+'//'+window.location.host + "/api/lease",
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
         succFunc({result:"success",uid:model.id});
    }
}


function leaseHasChange(){
      var dtModel = modelPromote.data();

    if(removeSpaces(modelLease.get("weekly_rent_amount")) != removeSpaces(dtModel[0].week_rent_amount)){
        return true;
    }
    
    if(removeSpaces(modelLease.get("bond_amount")) != removeSpaces(dtModel[0].bond_amount)){
        return true;
    }
    
   if(modelLease.get("date_available") != dtModel[0].date_available){
        return true;
    }
    
   if(modelLease.get("prefer_short_term_tenants") != dtModel[0].short_term){
        return true;
    }        
    return false;
}

