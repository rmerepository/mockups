/*===========================================================
 *  Page Tracker Model
 * ==========================================================
 */
var timerId1= null,timerId2=null;

var tabDescription=["","features","description","photos","inspection"];
var trackerModel = kendo.observable({
    isComplete:0,
    currentTab:0,
    adStatus:"draft",
    informChanges:function(){
        if(this.get("adStatus")=="for approval"){
            uiAlertMsg('Your advertisement is awaiting approval, any changes you make will automatically update your advertisement for approval',"notice")
        }
    },
    leaseClass: "steps-icon lease-active",
    leaseArrow: "active",
    featureClass: "steps-icon features",
    featureArrow: "",
    featureLine: "progress-tracker-arrow",
    descriptionClass: "steps-icon description",
    descriptionArrow: "",
    descriptionLine: "progress-tracker-arrow",
    photosClass: "steps-icon photos",
    photosArrow: "",
    photosLine: "progress-tracker-arrow",
    inspectionClass: "steps-icon inspection",
    inspectionArrow: "",
    inspectionLine:"progress-tracker-arrow",
    arrowPrev:false,
    arrowNext:true,
    prevClick:function(e){
        switch(this.currentTab){
            case 0:
                break;
            case 1:
                this.leaseClick(e);
                break;
            case 2:
               this.featureClick(e);
                break;
            case 3:
                this.descriptionClick(e);
                break;
            case 4:
                this.photosClick(e);
                break;
        }

    },
    nextClick:function(e){
        switch(this.currentTab){
            case 0:
                this.featureClick(e);
                break;
            case 1:
                this.descriptionClick(e);
                break;
            case 2:
                this.photosClick(e);
                break;
            case 3:
                this.inspectionClick(e);
                break;
            case 4:
                this.summaryClick(e);
                break;

                
        }

    },
    leaseClick:function(e){
        this.navigate("");
        
        e.preventDefault();
    },
    featureClick:function(e){

        this.navigate("features");
        e.preventDefault();                
    },
    descriptionClick:function(e){

        this.navigate("description");
        e.preventDefault();
    },
    photosClick:function(e){

        this.navigate("photos");
        e.preventDefault();
    },
    inspectionClick:function(e){ 
        this.navigate("inspection");
        e.preventDefault();
    },
    summaryClick:function(e){
        this.navigate("summary");
        e.preventDefault();
    },
    previewClick:function(e){
        this.navigate("preview");
        e.preventDefault();
    },
   
    navigate:function(e){

        $("#loader").show();
            switch(this.currentTab){
                case 0:
                    modelLease.submit_page(e);
                    break;
                case 1:
                    modelFeature.submit_page(e);
                    break;
                case 2:
                    modelDescription.submit_page(e);
                    break;
                case 3:
                    modelPhotos.submit_page(e);
                    break;
                case 4:
                    modelInspection.submit_page(e);
                    break;
                default:
                    $("#loader").hide();
                    promoteRouter.navigate("/"+e);
            }
        
      },
    forceNavigate:function(e){
            switch(e){
                case 0:
                    promoteRouter.navigate("/");
                    break;
                case 1:
                    promoteRouter.navigate("/features");
                    break;
                case 2:
                    promoteRouter.navigate("/description");
                    break;
                case 3:
                    promoteRouter.navigate("/photos");
                    break;
                case 4:
                   promoteRouter.navigate("/inspection");
                    break;
                    
                case 5:
                   promoteRouter.navigate("/inspection");
                    break;

            }
        
      }

});

kendo.bind($("#progress-track-content"), trackerModel);


/*===========================================================
 *  Routes and views
 * ==========================================================
 */
var layout = new kendo.Layout("layout-template");
var leasePage = new kendo.View("lease-template" , { model: modelLease });
var featurePage = new kendo.View("features-template", { model: modelFeature } );
var descriptionPage = new kendo.View("description-template" , { model: modelDescription });
var photosPage = new kendo.View("photos-template", { model: modelPhotos });
var inspectionPage = new kendo.View("inspection-template", { model: modelInspection });

var promoteRouter = new kendo.Router({
    init: function() {
        layout.render("#promoteApp");
    }
});

promoteRouter.route("/", function() {
    layout.showIn("#content", leasePage);

        trackerModel.set("currentTab",0);
        setCompleted(0);
    
        trackerModel.set("leaseClass", "steps-icon lease-active");
        trackerModel.set("featureClass", "steps-icon features");
        trackerModel.set("descriptionClass", "steps-icon description");
        trackerModel.set("photosClass", "steps-icon photos");
        trackerModel.set("inspectionClass", "steps-icon inspection");
        
        trackerModel.set("featureLine", "progress-tracker-arrow");
        trackerModel.set("descriptionLine", "progress-tracker-arrow");
        trackerModel.set("photosLine", "progress-tracker-arrow");
        trackerModel.set("inspectionLine", "progress-tracker-arrow");

        
        trackerModel.set("arrowPrev",false);
        trackerModel.set("arrowNext",true);
        
        trackerModel.set("leaseArrow","active");
        trackerModel.set("featureArrow","");
        trackerModel.set("descriptionArrow","");
        trackerModel.set("photosArrow","");
        trackerModel.set("inspectionArrow","");

        
        uiDatePicker( '#date_available' );
        $(".pop-over-right").popover();
        $("#loader").hide();
        
         modelLeaseIsDirty = false;

});

promoteRouter.route("/features", function() {
    layout.showIn("#content", featurePage);

        trackerModel.set("currentTab",1);
        setCompleted(1);

        trackerModel.set("leaseClass", "steps-icon lease-done");
        trackerModel.set("featureClass", "steps-icon features-active");
        trackerModel.set("descriptionClass", "steps-icon description");
        trackerModel.set("photosClass", "steps-icon photos");
        trackerModel.set("inspectionClass", "steps-icon inspection");
        
        trackerModel.set("arrowPrev",true);
        trackerModel.set("arrowNext",true);
        
        trackerModel.set("featureLine", "progress-tracker-arrow active");
        trackerModel.set("descriptionLine", "progress-tracker-arrow");
        trackerModel.set("photosLine", "progress-tracker-arrow");
        trackerModel.set("inspectionLine", "progress-tracker-arrow");
        
        trackerModel.set("leaseArrow","active");
        trackerModel.set("featureArrow","active");
        trackerModel.set("descriptionArrow","");
        trackerModel.set("photosArrow","");
        trackerModel.set("inspectionArrow","");

        $("#loader").hide();
        

        modelFeatureIsDirty = false;


});

promoteRouter.route("/description", function() {
    layout.showIn("#content", descriptionPage);
        
        trackerModel.set("currentTab",2);
        setCompleted(2);
        
        trackerModel.set("leaseClass", "steps-icon lease-done");
        trackerModel.set("featureClass", "steps-icon features-done");
        trackerModel.set("descriptionClass", "steps-icon description-active");
        trackerModel.set("photosClass", "steps-icon photos");
        trackerModel.set("inspectionClass", "steps-icon inspection");
        
        trackerModel.set("arrowPrev",true);
        trackerModel.set("arrowNext",true);
        
        trackerModel.set("featureLine", "progress-tracker-arrow active");
        trackerModel.set("descriptionLine", "progress-tracker-arrow active");
        trackerModel.set("photosLine", "progress-tracker-arrow");
        trackerModel.set("inspectionLine", "progress-tracker-arrow");
        
        trackerModel.set("leaseArrow","active");
        trackerModel.set("featureArrow","active");
        trackerModel.set("descriptionArrow","active");
        trackerModel.set("photosArrow","");
        trackerModel.set("inspectionArrow","");
   
          


        $("#loader").hide();
        $(".pop-over-right").popover({ 
              delay: { show: 100, hide: 3000 }  
        });

        $('body').on('click', '.moreInfoMod', function(){
            $('#moreInfoMod').modal();    
        })
        
        //-- code to remove special character during paste
      $( "#description" ).bind( 'paste',function(){
       setTimeout(function()
       { 
          var data= $( '#description' ).val() ;
          var dataFull = data.replace(/[^\w\s\,\.\d\_\-\*\)\$\!\(\=\+\:\"\'\;\/\`\?\~]/gi, '');
          $( '#description' ).val(dataFull);
       });
    });
    //---------------------

        modelDescriptionIsDirty = false;
});

promoteRouter.route("/photos", function() {    
    layout.showIn("#content", photosPage);
        
        trackerModel.set("currentTab",3);
        setCompleted(3);
                
        trackerModel.set("leaseClass", "steps-icon lease-done");
        trackerModel.set("featureClass", "steps-icon features-done");
        trackerModel.set("descriptionClass", "steps-icon description-done");
        trackerModel.set("photosClass", "steps-icon photos-active");
        trackerModel.set("inspectionClass", "steps-icon inspection");
        
        trackerModel.set("arrowPrev",true);
        trackerModel.set("arrowNext",true);

        trackerModel.set("featureLine", "progress-tracker-arrow active");
        trackerModel.set("descriptionLine", "progress-tracker-arrow active");
        trackerModel.set("photosLine", "progress-tracker-arrow active");
        trackerModel.set("inspectionLine", "progress-tracker-arrow");
        
        trackerModel.set("leaseArrow","active");
        trackerModel.set("featureArrow","active");
        trackerModel.set("descriptionArrow","active");
        trackerModel.set("photosArrow","active");
        trackerModel.set("inspectionArrow","");
        
       //== include photo library function from promo/photos.js
            photos_js();
            $("#loader").hide();
            modelPhotosIsDirty = false;
});

promoteRouter.route("/inspection", function() {
    layout.showIn("#content", inspectionPage);
        
        trackerModel.set("currentTab",4);
        setCompleted(4);
        
        trackerModel.set("leaseClass", "steps-icon lease-done");
        trackerModel.set("featureClass", "steps-icon features-done");
        trackerModel.set("descriptionClass", "steps-icon description-done");
        trackerModel.set("photosClass", "steps-icon photos-done");
        trackerModel.set("inspectionClass", "steps-icon inspection-active");
        
        trackerModel.set("arrowPrev",true);
        trackerModel.set("arrowNext",false);
        
        trackerModel.set("featureLine", "progress-tracker-arrow active");
        trackerModel.set("descriptionLine", "progress-tracker-arrow active");
        trackerModel.set("photosLine", "progress-tracker-arrow active");
        trackerModel.set("inspectionLine", "progress-tracker-arrow active");
        
        trackerModel.set("leaseArrow","active");
        trackerModel.set("featureArrow","active");
        trackerModel.set("descriptionArrow","active");
        trackerModel.set("photosArrow","active");
        trackerModel.set("inspectionArrow","active");
        
        $(".pop-over-right").popover();
        uiDatePicker( '#start_at_date' );
        $("#loader").hide();

        modelInspectionIsDirty = false;
});

promoteRouter.route("/summary", function() {
    window.location.href = window.location.protocol+'//'+window.location.host+"/promote/promote/summary";
});

promoteRouter.route("/preview", function() {
    window.location.href = window.location.protocol+'//'+window.location.host+"/promote/promote/preview/"+trackerModel.currentTab;
});


$(function() { 
    promoteRouter.start();


});


function setCompleted(tab){
    var iscomplete = typeof(trackerModel.get("isComplete"))!=="undefined"?trackerModel.get("isComplete"):-1

    if(tab > iscomplete){
         trackerModel.set("isComplete",tab);
    }
    
            $('.k-dropdown').on("focus", function (e) {
            if($(this).find("#advertisingContactPerson").val()){
                $("#tenantContact").triggerHandler('mouseover');
                setTimeout(function(){
                       $("#tenantContact").triggerHandler('mouseout');
                },3000);
            }
        });
        
         // $("#bondToolTip1").mouseenter(function(){
         //    timerId1=    setTimeout(function(){
         //               $("#bondToolTip1").triggerHandler('mouseleave');
         //        },4000);
         // });
         //  $("#bondToolTip2").mouseenter(function(){
         //     timerId2=   setTimeout(function(){
         //               $("#bondToolTip2").triggerHandler('mouseleave');
         //        },4000);
         // });
}

