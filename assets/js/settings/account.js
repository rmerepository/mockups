    $(function(){
        
    if(window.location.hash) {
        var hash = window.location.hash.substring(1); 
        $( "a[href$='#"+hash+"']" ).click();
    }
        
        
    var plist = $('[data-pd-list=slide]')
                    , plistHide = $('data-hide-pd=me')
                    , piShow = $('[data-pd-item=show]')
                    ,	d = -Math.abs(plist.width())
                    , ds = $('a[data-show-pd=list]')
                    , _html = $('html');
                    
                    $('.ui-popover').popover();
                    
                    ds.on('click', function(e){					
                            var sl = $(this).parent();					
                            $('.nav-tabs li').removeClass('active');														
                            sl.toggleClass('active');	
                            $('.with-slide-content, .listing-slide').toggleClass('slide');	
                                    _html.addClass('slide-listing-open');
                            return false;	
                    });

                    _html.on('click',function(){
                            var el = $(this);
                            if( el.hasClass('slide-listing-open') ) {
                                            $('.nav-tabs li').removeClass('active');		
                                            el.removeClass('slide-listing-open');
                                            $('.with-slide-content').removeClass('slide');
                                            $('.listing-slide').removeClass('slide');	
                            }
                    });

                    piShow.click(function(){
                            $('.tab-content .tab-pane').removeClass('active');
                            $('.listing-items li').removeClass('active');					
                            $(this).parent().addClass('active');
                            var prop_id = $(this).attr('href');
                            var address = $(this).find('div').html();
                        var param  = {
                                type: "prop", 
                                sub_id:prop_id,
                                notify:"sms" }
                            $("#sub_id").val(prop_id);
                        $.get('/settings/account/get_property_setting',param,
                              function(response){
                                  if(response =="1"){
                                      $("#alert5").attr("checked", true);
                                  }else{
                                      $("#alert5").attr("checked", false);
                                  }
                                  
                                   $('#frmChangeEmail').data('meUIHelper').remNotification('propSwitchMsg'); 
                                          
                                    $(".addy").text(address);
                                    $("#cap_address").text(address);
                                    $('#propertySetting').addClass('active');
                                    $('.with-slide-content').removeClass('slide');
                                    $('.listing-slide').removeClass('slide');
                                });
	
                            return false;	
                    })	
                    
                    
         $('#frmChangeEmail').meUIHelper();
         $('#frmChangePassword').meUIHelper();
         
        $('#btnSavePassword').click(function(e){
            $('#frmChangePassword').data('meUIHelper').validate(
            e,this,
            function(data,el){
                $.ajax({
                      url: 'account/change_password',
                      type: "POST",
                      data: data,
                      success: function (e){
                          if(e =="success"){
                           $('#frmChangePassword').data('meUIHelper').notification(el
                                          ,"Good one. Your new password is saved.","success");
                          }else{
                           $('#frmChangePassword').data('meUIHelper').notification(el
                                          ,"Oops, something's wrong","error");                        
                          }
                      }
                  })

            })
        }); 
        
       $('#btnSaveEmail').click(function(e){
         $('#frmChangeEmail').data('meUIHelper').validate(
                e,this,
                function(data,el){
                $.ajax({
                      url: 'account/change_email',
                      type: "POST",
                      data: data,
                      success: function (e){
                          if(e =="success"){
                             window.location.href = window.location.protocol+'//'+
                                                window.location.host+
                                                "/unverified";
                          }else{
                           $('#frmChangeEmail').data('meUIHelper').notification(el
                                          ,"Oops, something's wrong","error");                        
                          }
                      }
                  })
            }
          ); 
       });
          
          
          $('#alert1').click(function(){
              $("#allow").val($( "#alert1:checked" ).length);
              $('#popLabel').attr('data-content',tooltipInfo[$( "#alert1:checked" ).length]);
              
                $.ajax({
                      url: 'account/set_site_setting',
                      type: "POST",
                      data: $('#frmUserSetting').serialize(),
                      success: function (e){
                          if($.trim(e)=='success'){
                              if($("#alert1:checked").length){
                                  //-- disable property switch
                                  $("#alert5").removeAttr('disabled');
                                   $("#offPropSwitch").hide();
                                  
                                $('#frmChangeEmail').data('meUIHelper').notification($('#switchMsg')
                                          ,"You can now go to Property Settings to turn your individual SMS Alerts ON or OFF","success");                                     
                              }else{
                                  //-- disable property switch
                                  $("#alert5").attr('disabled','disabled');
                                  $("#offPropSwitch").show();
                                  
                                $('#frmChangeEmail').data('meUIHelper').notification($('#switchMsg')
                                          ,"All your SMS Alerts have been turned off","success");   
                              }
                          }else{
                              $('#frmChangeEmail').data('meUIHelper').notification($('#switchMsg')
                             ,"Oops, something's wrong","error");   
                          }
                      }
                  })              
          });
          
          $('#alert5').click(function(){
              $("#allowp").val($( "#alert5:checked" ).length);                
                $.ajax({
                      url: 'account/set_property_setting',
                      type: "POST",
                      data: $('#frmUserPropertySetting').serialize(),
                      success: function (e){
                        if($.trim(e)=='success'){
                              if($("#alert5:checked").length){
                                $('#frmChangeEmail').data('meUIHelper').notification($('#propSwitchMsg')
                                          ,"Your SMS Alert is on. We will SMS you when a tenant makes an enquiry.","success");                                     
                              }else{
                                $('#frmChangeEmail').data('meUIHelper').notification($('#propSwitchMsg')
                                          ,"Your SMS Alert is off. Check your email for tenant enquiries.","success");   
                              }
                          }else{
                              $('#frmChangeEmail').data('meUIHelper').notification($('#propSwitchMsg')
                             ,"Oops, something's wrong","error");   
                          }                          
                      }
                  })              
          });          
    });
    
    
    