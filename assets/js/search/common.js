var autocomplete;
var currentScrollPosition;
var currentCenter;
var currentPoint;
var currentAreaType;
var resultFound;
var initialDocHeight;
var dataSource;
var stillLoading;

var modelSearch = kendo.observable({
    record_perpage:10,
    current_page:0,
    get_the_latest:true,
    urlAPI:"",
    rentOnSlide:function(e){
      this.set("maxRent",e.values[1]);
      this.set("minRent",e.values[0]);

    },
    rentOnChange:function(e){
            var val = e.values;
            this.set("minRent",val[0]);
            this.set("maxRent",val[1]);
            setNewRequestValue()
            search(currentCenter,currentPoint,currentAreaType);            
    },
    minRent:0,
    maxRent:1000,
    bedOnChange:function(e){
            var val = e.values;
            this.set("minBed",val[0]);
            this.set("maxBed",val[1])
            setNewRequestValue()
            search(currentCenter,currentPoint,currentAreaType);
    },
    bedOnSlide:function(e){
      this.set("maxBed",e.values[1]);
      this.set("minBed",e.values[0]);
    },
    minBed:1,
    maxBed:5,
    property:false,
    tenant:false,
    tab:function(param){
        if(param =="property"){
            this.set("property",true);
            $('#navtenant').removeClass("active");
            $('#navproperty').addClass("active");
        }
        if(param =="tenant"){
            this.set("tenant",true);
            $('#navproperty').removeClass("active");
            $('#navtenant').addClass("active");
        }
    }
    
})


$(document).ready(function() {
    
    $('#weeklyRent').kendoRangeSlider({
               min: modelSearch.minRent,
               max: modelSearch.maxRent,
               smallStep: 10,
               largeStep: 10,
               tickPlacement: "both"
       });


       $('#bedRooms').kendoRangeSlider({
               min: modelSearch.minBed,
               max: modelSearch.maxBed,
               smallStep: 1,
               largeStep: 1,
               tickPlacement: "both"
       }); 
       
       
    initialDocHeight  =$(window).scrollTop() + $(window).height();
    currentScrollPosition =initialDocHeight * 0.75;

// with hard-coded LatLong coordinates
/*
    function geolocate() {
        var geolocation = new google.maps.LatLng(
            -25.274398, 133.775136);
        autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
            geolocation));
    }
*/

    //-- set the google autocomplte
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('ac'))); 
    
    //-- create listener onchange
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
        
        $("#div_loader").show();
        var url = "http://maps.googleapis.com/maps/api/geocode/json?";
        var params = {
                sensor:"false",
                address:$("#ac").val()
            };
            if($('#ac').val()==""){
                search(0,0);
            }else{
                $.get(url,params, function(data){
                    //-- get the result
                    if(data.status == "OK"){
                        //-- initialize page
                        setNewRequestValue()
                        modelSearch.set('get_the_latest',false);
                        currentCenter= data.results[0].geometry.location;
                        currentPoint = data.results[0].geometry.viewport.northeast;
                        currentAreaType = data.results[0].address_components[0].types[0];
                        search(data.results[0].geometry.location,data.results[0].geometry.viewport.northeast,data.results[0].address_components[0].types[0]);
                    }else{
                        $("#div_loader").hide();
                    }            
                });
            }
    });
    
    $(window).scroll(function() {
       
       if($(window).scrollTop() + $(window).height() > currentScrollPosition) {
               if(stillLoading != "true"){
                    currentScrollPosition =  $(document).height();          
                    modelSearch.current_page +=1;
                    if(resultFound >0){
                       search(currentCenter,currentPoint,currentAreaType);
                    }
               }
       }
    });    
    
    kendo.bind($("#slider_form"), modelSearch);
    
    $("#resultTable").kendoListView({
     template: kendo.template($("#row-template").html())
    });
    
    //-- query the latest record
    // search(0,0);
/* ---  Auto search when location is filled already */
    $("#div_loader").show();
    var url = "http://maps.googleapis.com/maps/api/geocode/json?";
    var search_params = {
        sensor:"false",
        address:$("#ac").val()
    };
    if($('#ac').val()==""){
        search(0,0);
    }else{
        $.get(url,search_params, function(data){
            //-- get the result
            if(data.status == "OK"){
                //-- initialize page
                setNewRequestValue()
                 modelSearch.set('get_the_latest',false);
                currentCenter= data.results[0].geometry.location;
                currentPoint = data.results[0].geometry.viewport.northeast;
                currentAreaType = data.results[0].address_components[0].types[0];
                search(data.results[0].geometry.location,data.results[0].geometry.viewport.northeast,data.results[0].address_components[0].types[0]);
            }else{
                $("#div_loader").hide();
            }            
        });
    }
});

function setNewRequestValue(){
    modelSearch.current_page =0;
    currentScrollPosition =initialDocHeight;
    $("#resultDiv").hide();
    $("#no_result").hide();
}

function geolocate() {
        var geolocation = new google.maps.LatLng(
            -25.274398, 133.775136);
        autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
            geolocation));
}

function search(_center,_point,_areaType){

    if($.trim($("#ac").val()).length < 1){
         modelSearch.get_the_latest = true;
         
        if(_center > 0){
            modelSearch.get_the_latest = true;
            modelSearch.current_page =0;
        }
    }

        stillLoading = "true";
        $("#div_loader").show();
         var  params = {
               bed:modelSearch.get("minBed")+"-"+modelSearch.get("maxBed"),
               rent:modelSearch.get("minRent")+"-"+modelSearch.get("maxRent"),
               point:_point,
               center:_center,
               records:modelSearch.record_perpage,
               page: modelSearch.current_page,
               latest: modelSearch.get_the_latest,
               areaType:_areaType
           };

           url=window.location.protocol+'//'+window.location.host + modelSearch.urlAPI;
           //-- search db
            $.get(url,params, function(api_result){
                 if(api_result.status =="success"){

                     resultFound =api_result.data.length;
                     //-- if page 0 this is a new request
                     if(modelSearch.current_page ==0){
                          dataSource = new kendo.data.DataSource({
                             data: api_result.data
                           });
                     }else{

                         for(var i=0;i<api_result.data.length;i++){
                              dataSource.add(api_result.data[i]);
                         }
                     }
                     if(resultFound >0){
                         $("#resultDiv").show();
                       
                         var listView = $("#resultTable").data("kendoListView");
                             listView.setDataSource(dataSource);
                               
                     }else{
                         if(modelSearch.current_page ==0){
                            $("#no_result").show();
                         };
                     }
                 }
                 $("#div_loader").hide();
                 stillLoading = "false";
            });   
}
function viewItem(url){
    window.location.href = url;
}

function addtenant(){
    rmeModal.redirect("/tenant/summary");
}


function isDefaultPPI(image_path){
    var src_lower = image_path.toLowerCase();
    if(src_lower.search('user_profile_photo.png')>0){
        return false;
    }else{
        return true;
    }
    
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