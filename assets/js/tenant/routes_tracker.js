/*===========================================================
 *  Page Tracker Model
 * ==========================================================
 */

var trackerModel = kendo.observable({
    finished:false,
    style:"steps-icon",
    occupants:"steps-icon occupants",
    lease:"steps-icon lease",
    property:"steps-icon property",
    lineoccupants:"progress-tracker-arrow",
    linelease:"progress-tracker-arrow",
    lineproperty:"progress-tracker-arrow",
    isSeeking:0,
    currentTab:0,
    nextArrow:true,
    previousArrow:false,
    defaultClass:["occupants","lease","property"],
    doneClass:["occupants-done","lease-done","property-done"],
    activeClass:["occupants-active","lease-active","property-active"],
    lineDefaultClass:"progress-tracker-arrow",
    lineActiveClass:"progress-tracker-arrow active",
    trackerStyle:function(e){
        var ndx = this.get("defaultClass");
        var initClass = this.get("style");
        var activeClass = this.get("activeClass");
        var doneClass =this.get("doneClass");
        for(var ctr=0;ctr<3;ctr++){
            if(ctr<e){
                this.set("line"+ndx[ctr],this.get("lineActiveClass"));
                this.set(ndx[ctr],initClass +" " +doneClass[ctr]);
            }else{
                 this.set("line"+ndx[ctr],this.get("lineDefaultClass"));
                this.set(ndx[ctr],initClass +" " +ndx[ctr]);
            }
            if(e>0){
                this.set("previousArrow",true);
            }else{
                this.set("previousArrow",false);
            }
        }
        this.set(ndx[e],initClass +" " +activeClass[e]);
        this.set("currentTab",e);
        return ndx[e];
    },
    activeTab:function(e){
        var ndex = this.trackerStyle(e);
        
        
        tenantRouter.navigate("/"+ndex);
    },
    nextTab:function(e){
        var curTab = this.get("currentTab");
        if(this.validateTab(curTab)){
            this.activeTab(curTab+1);
        }
        if(e !=null){
            e.preventDefault();
        }
    },
    previousTab:function(e){
         var curTab = this.get("currentTab");
         this.activeTab(curTab-1);
         e.preventDefault();
     },
    validateTab:function(e){

        switch(e){
            case 0:
                return modelOccupant.validate()
                break;
            case 1:
                return modelLease.validate();
                break;
            case 2:
                return modelProperty.validate();
                break;
            
            case 3:
                   if(this.validateTab(2)){
                        this.set("finished",true);
                        this.finish();
                   }else{
                        this.activeTab(2);
                   }
                break;
        }       
    },
    occupantsTab:function(e){
        this.activeTab(0);
        e.preventDefault();
    },            
    leaseTab:function(e){
        if(this.validateTab(0)){
            this.activeTab(1);
        }else{
            this.activeTab(0);
        }
        e.preventDefault();
    },
    propertyTab:function(e){
        if(this.validateTab(0)){
           
           if(this.validateTab(1)){
                this.activeTab(2);
           }else{
                this.activeTab(1)
           }
        }else{
            this.activeTab(0);
        }
        e.preventDefault();       
    },
    finish:function(){
        if(this.get("currentTab") ==0){
            if(!modelOccupant.validate()){
                $("#comments").focus();
                return;
            }
        }
        $("#loader_"+this.get("currentTab")).show();
        updateCurrentTab("",false);
        
    },
    preview:function(){

        if(this.get("currentTab") ==0){
            if(!modelOccupant.validate()){
                $("#comments").focus();
                return;
            }
        }
        $("#loader_"+this.get("currentTab")).show();
       updateCurrentTab(this.get("currentTab"),true);
    }
         
             
         
});



/*===========================================================
 *  Routes and views
 * ==========================================================
 */
var layout = new kendo.Layout("layout-template");
var occupantPage = new kendo.View("occupant-template"  , { model: modelOccupant });
var leasePage = new kendo.View("lease-template", { model: modelLease });
var propertyPage = new kendo.View("property-template", { model: modelProperty });
var loadingPage = new kendo.View("loading-template");

var tenantRouter = new kendo.Router({
    init: function() {
        layout.render("#tenantApp");
        kendo.bind($("#progress-track-content"), trackerModel);
    }
});


tenantRouter.route("/occupants", function() {
     layout.showIn("#content", occupantPage);
     trackerModel.trackerStyle(0);
     $('[rel="tooltip"]').tooltip({
        delay: { show: 100, hide: 3000 }
     });
     if(modelProperty.is_first_load){
        $(".popover-with-delay").popover({
            delay: { show: 100, hide: 3000 }
        });
        $(".pop-over-right").popover();
            $('#w_editstat').data().kendoMultiSelect.input.on('keydown',function(e){
               e.preventDefault();
            });
            
            $('#w_stat').data().kendoMultiSelect.input.on('keydown',function(e){
               e.preventDefault();
            });
        }
        var defphoto = $("#ppi").attr('src');
        if(defphoto.indexOf('default')){
            $("#opt_ppi").hide();
        }else{
           $("#opt_ppi").show();
                    
        }
        
});

tenantRouter.route("/lease", function() {
     layout.showIn("#content", leasePage);
     $('[rel="tooltip"]').tooltip();
     $(".pop-over-right").popover();
     if(modelProperty.is_first_load){
        uiDatePicker( '#date_available' );
     }
     trackerModel.trackerStyle(1);
});


tenantRouter.route("/property", function() {
     layout.showIn("#content", propertyPage);
     trackerModel.trackerStyle(2);
     $(".pop-over-right").popover();
         // Init tooltip
    if( $('[data-toggle=tooltip]').length )
        $('[data-toggle=tooltip]').tooltip();
    
     if(modelProperty.is_first_load){
         
     $("#propertyType").dropdownchecklist( { firstItemChecksAll: true, icon: {},
         emptyText: "Please select ...", width: 460, maxDropHeight: 200,
        onComplete: function(selector) {
          var values = [];
          for( i=0; i < selector.options.length; i++ ) {
              if (selector.options[i].selected && (selector.options[i].value != "")) {
                  values.push(selector.options[i].value)
              }
          }
          modelProperty.set('propertyType',values);
          
      } 
    });

        

    // Multi Select Drop down 
    $('[data-toggle="multi-select-dropdown"]').on('click',function(e){
        var el = $(this),
            parentEl = el.closest('[data-ui-parent="msd"]');
            parentEl.toggleClass('open');
            e.preventDefault();
    });

        $('#weeklyRentAmount').kendoRangeSlider({
                   min: 0,
                   max: 1000,
                   smallStep: 10,
                   largeStep: 10,
                   tickPlacement: "both",
                   slide: rentOnSlide,
           });

           $('#numberOfBedrooms').kendoRangeSlider({
                   min: 1,
                   max: 5,
                   smallStep: 1,
                   largeStep: 1,
                   tickPlacement: "both",
                    slide: bedOnSlide,
           });

           $('#numberOfBathrooms').kendoRangeSlider({
                   min: 1,
                   max: 5,
                   smallStep: 1,
                   largeStep: 1,
                   tickPlacement: "both",
                     slide: bathOnSlide,
           });

           $('#numberOfSpaces').kendoRangeSlider({
                   min: 0,
                   max: 5,
                   smallStep: 1,
                   largeStep: 1,
                   tickPlacement: "both",
                    slide: spaceOnSlide,
           });
           modelProperty.set("is_first_load",false);
           
     }

});

/*
$(function() { 
    tenantRouter.start();

});
*/


function updateCurrentTab(currentTab,ispreview){
        var params = {
         "action":"update_current_tab",
         "module":"tenant",
        "current-tab":currentTab
        };
    
        var url = "/common/tenant";
        ajaxPost(url, params,function(){
            tenantJsBatchUpdate(ispreview);
        });
}