var error_sent=0;
var add_property_loaded=false;

//--- address modal

$(document).ready(function() {
    
     //-- check if survey is needed
    survey_modal();
    

    // Init tooltip
    if( $('[data-toggle=tooltip]').length )
        $('[data-toggle=tooltip]').tooltip();
 
    //-- check add property
    var config ={host:window.location.protocol+'//'+window.location.host + "/",access:1}
    if($('#add_property_link').length >0){
        add_property_needed_script()
        $.rmeAddressModal($('#add_property_link'),config);
    }

     if($('#bc_add_property').length >0){
         add_property_needed_script()
        $.rmeAddressModal($('#bc_add_property'),config);
    }

    jQuery.ajaxSetup(
    {
      beforeSend: function()
      {
         $('#loader').show();
      },
      complete: function()
      {
         $('#loader').hide();
      },
    });

    // MIMIC href
    // check if the widget is in drag state / on Mouse down
    if ( $('[data-sref=true]').length ) {
        $('[data-sref=true]').on('click', function(event) {                     
            var el = $(this)
                , sref = el.attr('data-sref-location')
                , isInDragMode = el.closest('li.widget').hasClass('dragging');
            
            if(!isInDragMode)
                window.location.href=sref;
        });
    }

    // Multi Select Drop down
    $('[data-toggle="multi-select-dropdown"]').on('click',function(e){
        var el = $(this),
            parentEl = el.closest('[data-ui-parent="msd"]');
            parentEl.toggleClass('open');
            e.preventDefault();
    });

    // sticky effect

    var sticky = $('.sticky');
    if ( sticky.length != 0 ) {
        var stickyPos = sticky.position()
            , stickyTopOffset =  sticky.offset().top
            , stickyH = sticky.height();

            $(window).scroll(function(){

                var windowPos = $(window).scrollTop();

                if( windowPos >= stickyTopOffset )
                    sticky.addClass('ui-sticky');
                else
                    sticky.removeClass('ui-sticky');
            });
    }

    // Responisve Vertical Height
    function divMaxHeightRes(el){
        var el = $(this);        
        if( el.height() > 600 ) {
            if( $('[data-div-maxheight=true]').length )                 
                $('[data-div-maxheight=true]').css({'height': el.height() - 300 });
        }     
    }

    divMaxHeightRes( window );

    $(window).resize(function(){
        var el = $(this);
        divMaxHeightRes(el)
    })

    //pingServer();

});

function add_property_needed_script(){
    if(!add_property_loaded){
    $(document.body).append('<script src="'+window.location.protocol+'//'+window.location.host +'/assets/js/modals/rme.modals.address.js" type="text/javascript"></script>');
    $(document.body).append('<script src="'+window.location.protocol+'//'+window.location.host +'/assets/js/modals/porthole.min.js" type="text/javascript"></script>');
    add_property_loaded = true;
    }
}


function pingServer(){
       $('body').append('<div id="errPopUp" style="display:none"> '+
        '<div class="modal fade" id="confirmContainer" style="display: block" tabindex="-1" role="dialog" aria-labelledby="confirmContainer" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a href="javascript:closeErrorMsg()" class="close">&times;</a> '+
                '<h3 id="errHeader"></h3> '+
                '<div id=""></div></div> '+
            '<div id="errBody"> '+
            '</div> '+
            '<div class="modal-footer"> '+               '</div></div></div></div></div>');

    //-- this will check if the user logs in but exclude module with login and user
    var cnt = window.location.href.indexOf("login") + window.location.href.indexOf("user")+ window.location.href.indexOf("forgot")+ window.location.href.indexOf("search")+ window.location.href.indexOf("profile");
    if(cnt <0){
        $.get( window.location.protocol+'//'+window.location.host + "/membership/ping", function(data){
            if(data.access != "1"){
                window.location.href = window.location.protocol+'//'+window.location.host + "/login";
            }
        });
    }
}

function sendError(url,statuscode,status,err){
    if(error_sent==0){
        txt= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
        txt+= "<p>Platform: " + navigator.platform + "</p>";
        txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
        txt+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";
        txt+= "<h3>Error Info</h3>";
        txt+= "<p>Current Page: " +  location.href + "</p>";
        txt+= "<p>Error in Url: " + url + "</p>";
        txt+= "<p>Status Code: " + statuscode + "</p>";
        txt+= "<p>Status: " + status + "</p>";
        txt+= "<p>Details: " + err + "</p>";
        txt+= "<p>Time: " +  Date() + "</p>";
        error_sent =1;

     var params = {
        "action":"error_message",
        "session-key":"",
        "error":txt
         };
    var url = "/api/messaging";
        ajaxPost(url, params, function(resp){
        }, null);
    }else{
        uiAlertMsg("Error occured while processing request. Please try to reload the page.","warning")
    }



}


function closeErrorMsg(){
    $("#errPopUp").hide();
}


function errorMessage(header,msg){
$("#errHeader").html(header);
$("#errBody").html(msg);
  $("#errPopUp").show();
}

function ajax(url, params, succFunc, failFunc, method, extra) {
    $.ajax({
        type:method,
        url:url,
        data:JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache:false,
        success:function (data) {
            if (succFunc != null) {
                succFunc(data, extra);
            }
        },
        error:function (jqXHR, status) {
            //uiAlertMsg("Unable to contact server. Please contact our support. Sorry for the inconvenience caused.","error")
           // errorMessage(url+": "+jqXHR.status+" "+status,jqXHR.responseText)

            sendError(url,jqXHR.status,status,jqXHR.responseText);
           // document.write(status+":("+jqXHR.status+") \n"+jqXHR.responseText);
        }
    });
}

function ajaxPost(url, params, succFunc, failFunc, extra) {
    ajax(url, params, succFunc, failFunc, 'POST', extra);
}

function ajaxGet(url, params, succFunc, failFunc, extra) {
    ajax(url, params, succFunc, failFunc, 'GET', extra);
}

function admin_Search(sessionKey,keyword, onSuccess, onFailure,category) {
    var params = {
        "action":"admin_search",
        "category":category,
        "search":keyword,
        "session-key":sessionKey
    };
    var url = "/api/search";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_Search_Property(sessionKey,keyword, onSuccess, onFailure) {
    var params = {
        "action":"admin_search_property",
        "searchProperty":keyword,
        "session-key":sessionKey
    };
    var url = "/api/search";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_audits(sessionKey,keyword, onSuccess, onFailure) {
    var params = {
        "action":"admin_audits",
        "ad_id":keyword,
        "session-key":sessionKey
    };
    var url = "/api/search";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_audits_property(sessionKey,keyword, onSuccess, onFailure) {
    var params = {
        "action":"admin_audits_property",
        "property_id":keyword,
        "session-key":sessionKey
    };
    var url = "/api/search";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_SearchSendMessage(sessionKey,params, propertyid, onSuccess, onFailure) {
    var params = {
        "action":"admin_search",
        "session-key":sessionKey,
        "subject":params.subject,
        "message":params.message,
        "toid":params.toid,
        "module":params.module,
        "link_id":params.link_id,
        "propertyid":propertyid
    };
    var url = "/api/messaging";
    ajaxPost(url, params, onSuccess, onFailure);
}

function contact_SendMessage(sessionKey,params, onSuccess, onFailure) {
    var params = {
        "action":"contact_us",
        "session-key":sessionKey,
        "subject":params.subject,
        "message":params.message,
        "imtype":params.imtype
    };
    var url = "/api/messaging";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_getAdDetails(sessionKey,param, onSuccess, onFailure) {
    var params = {
        "action":"get_all",
        "session-key":sessionKey,
        "ad-id":param
    };
    var url = "/api/advertisement";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_getProfile(sessionKey,param, onSuccess, onFailure) {
    var params = {
        "action":"get_all",
        "session-key":sessionKey,
        "user-id":param
    };
    var url = "/api/profile";
    ajaxPost(url, params, onSuccess, onFailure);
}

function admin_getAdvertisement(sessionKey,param, onSuccess, onFailure) {
    var params = {
        "action":"get_records",
        "session-key":sessionKey,
        "user-id":param
    };
    var url = "/api/advertisement";
    ajaxPost(url, params, onSuccess, onFailure);
}


function admin_getAllUsers(sessionKey, onSuccess, onFailure) {
    var params = {
        "action":"get_all_user_accounts",
        "session-key":sessionKey
    };
    var url = "/api/profile";
    ajaxPost(url, params, onSuccess, onFailure);
}


function admin_sms(sessionKey, onSuccess, onFailure){
    var url = "/comm/smsgateway";

    ajaxGet(url, [], onSuccess, onFailure);


}

function admin_sendSMS(sessionKey,to,message, onSuccess, onFailure) {
    var params = {
        "to":to,
        "message":message,
        "from":"+12077473447"
    };
    var url = "/comm/smsgateway";
    ajaxPost(url, $.extend({},pobj,params), onSuccess, onFailure);
}



function survey_modal(){
    var url = window.location.protocol+'//'+window.location.host + 
             "/survey/survey/modal"
     $.getJSON(url, function(data) {
         if(data.show =='1'){
             //--- draw the elements
             $(document.body).append(
              '<div class="modal fade" \n\
                    id="uiSurvey" tabindex="-1" \n\
                        role="dialog" aria-labelledby="uiSurvey" \n\
                            aria-hidden="true" >'       
                 +    data.ui + '</div>');
                $("#uiSurvey").modal({
                    keyboard:false,
                    show:true
                });
            
            
            var track_url = window.location.protocol+'//'+window.location.host + 
             "/survey/survey/track"
            //-- on click
            $('#submit_survey').click(function(){
                
                $('#survey_respond').val('yes');
                $.ajax({ url:track_url
                        ,type:"POST"
                        ,data:$("#surveyForm").serialize()
                });
                $("#uiSurvey").modal('hide');
                if(data.after_yes !='' && data.after_yes !=null){
                    uiAlertMsg(data.after_yes,'success');
                }
             })
                
            
            //-- if close
            $('#uiSurvey').on('hide.bs.modal', function (e) {
                if($('#survey_respond').val() !='yes'){
                    $.ajax({ url:track_url
                        ,type:"POST"
                        ,data:$("#surveyForm").serialize()
                     })
                }
            })

             
         }
     });
}


/**
 * this will handle the household modal widget
 * @returns {undefined}
 */
function household_widget(){
    var host = window.location.protocol+'//'+window.location.host;
     
     //-- if view already writted no need to request
     if($('#addHouseHold').length){
        $('#addHouseHold').modal('show');
        
     //-- request the view
     }else{ 
        $.get(host + "/collection/rent/modal" , function(view){
        $(document.body).append(view);

        //-- call popover
        $(".pop-over-right").popover();  
            
		uiDatePicker( '.ui-date-payday','01-Jan-2010' );
		uiDatePicker( '.ui-date-moved-in','01-Jan-2010' );
                
                //-- get frequency list
                 $.get(host + "/api/lists?type=rent-frequency" , function(modePayment){
                        uiDropDown('#modePayment', modePayment, 'value', 'id');  
                 });
		
                
                 $('#frmHousehold').meUIHelper();
             
            //-- prepare all validation. dependent in me.ui.helper.js
            $('#saveHousehold').click(function(e){
                $('#frmHousehold').data('meUIHelper').validate(
                       e,this,
                       function(data,el){
                           
                            $.ajax({
                              url: host+ '/collection/rent/post_household',
                              type: "POST",
                              data: data,
                              success: function (resp){
                                  if(resp.status){
                                       window.location.href = host + 
                                               '/collection/rent/payments/'+resp.lease
                                  }else{
                                     uiAlertMsg(resp.message);
                                  }
                              }
                            });
                       }
                );
            });
             
             
             $('#addHouseHold').modal('show'); 
        });
     }

}