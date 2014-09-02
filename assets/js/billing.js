var Billing =
   {
   /*----- to save the initial template of the modal ---------*/
   processing: ''
    ,
    /*--------- compute subtotal-------*/
    original_total:0,
    promo_discount:0,
    credit_discount:0,
    showGeneralTotal: function(){
        if( parseFloat(Billing.promo_discount) + 
            parseFloat(Billing.credit_discount)==0){
            $('#grandTotal-ds').addClass('hide');
        }else{
            var total = parseFloat(Billing.original_total) + 
                    parseFloat(Billing.promo_discount) + parseFloat(Billing.credit_discount);
            $('#grand_total').text(total);
            $('#grandTotal-ds').removeClass('hide');
        }
    },
   
    /*----- Process promocode ---------*/
    cancelPromocode:function(){
      var el = $('#validatePromoCode'), promocodeInp = $('#promocodeInp');
      $.ajax({
               type : "POST", 
               url : "/billing/discount/cancel_promo",
               dataType :"json", 
               data:$('#frmPromoCode').serialize(),
               async : false,
               success : function (response){
                        if(response.status!="success"){
                            Billing.alertMessage(response.description, 'error',false);
                         }else{
                            Billing.promo_discount = 0;
                            promocodeInp.val('');
                            $('#promocode-ds').addClass('hide');     
                            $('#pc_section_default').removeClass('hide');
                            $('#pc_section_valid').addClass('hide');
                         }
               },
               error: function(xhr, status, error) {
                 Billing.alertMessage('Sorry, currently unable to process the code. (Internal Error)', 'error',false);
                        el.attr('disabled',false);
                       $('#verfyLoader').addClass('hide');
                }
            })
     Billing.showGeneralTotal();
    },
    usePromocode:function(){
       var el = $('#validatePromoCode'), promocodeInp = $('#promocodeInp');
        
        el.attr('disabled',true);
        $("#pc_section_default").removeClass('has-error');
        $('#verfyLoader').removeClass('hide');
         $("#pc_err_msg").text('');
         

            $.ajax({
               type : "POST", 
               url : "/billing/discount/use_promo",
               dataType :"json", 
               data:$('#frmPromoCode').serialize(),
               async : false,
               success : function (response){
                   
                       // Display ajax loader / hide once verification if done
                       
                    if(response.status!='success'){
                        $("#pc_section_default").addClass('has-error');
                        $("#pc_err_msg").text(response.description);

                    }else{
                        
                        //-- loop all promo return
                        var total_promo_discount = 0;
                        //-- erase the content of the promo items
                         $('#promocode-ds').empty();
                        $.each(response.promo_items, function(index, element) {
                            if(Math.abs(element.value) >0){
                                var view = '<span id="promocode_item">'+
                                                element.description+'</span>'+
                                            '<span class="inline-amount"><b>-$'+
                                            Math.abs(element.value)+'</b></span><br/>';
                                    $('#promocode-ds').append(view);

                                total_promo_discount += parseFloat(element.value);
                            }
                            if($('#promocode-ds').hasClass('hide')){
                                $('#promocode-ds').removeClass('hide');
                            }
                        });

                        var total = parseFloat(Billing.original_total) + 
                          parseFloat(total_promo_discount) + parseFloat(Billing.credit_discount);
                       // if final total <0, display error/warning message
                       if(total<0){
                        Billing.clearSession('promo')
                        $("#pc_section_default").addClass('has-error');
                        $('#promocode-ds').empty();
                        $('#promocode-ds').addClass('hide');
                        $("#pc_err_msg").text("That's more than total purchase amount. Try again");
                       }else{
                        Billing.promo_discount = total_promo_discount;
                        $('#pc_section_default').addClass('hide');
                        $('#pc_section_valid').removeClass('hide');
                        $('#promo_code').html($('#promocodeInp').val());
                          uiAlertMsg('Great. Your promo code has been accepted. Your saving $'+
                                    Math.abs(total_promo_discount),'success');
                       }                        
                    } 
                       el.attr('disabled',false);
                       $('#verfyLoader').addClass('hide');
 
               },
               error: function(xhr, status, error) {
                 Billing.alertMessage('Sorry, currently unable to process the code. (Internal Error)', 'error',false);
                        el.attr('disabled',false);
                       $('#verfyLoader').addClass('hide');
                }
           })
                              
           Billing.showGeneralTotal();
    },
       
      /*----- Process credits ---------*/
    cancelCredits:function(){
        var el = $('#applyCredit'), creditsInp = $('#creditsInp');
        $.ajax({
               type : "POST", 
               url : "/billing/discount/cancel_credits",
               dataType :"json", 
               data:$('#frmCredits').serialize(),
               async : false,
               success : function (response){
                   if(response.status!="success"){
                      Billing.alertMessage(response.description, 'error',false);
                   }else{
                        Billing.credit_discount = 0;
                        creditsInp.val('');
                        el.attr('disabled',false);
                        $('#credit-ds').addClass('hide');
                       $('#cs_section_default').removeClass('hide');
                       $('#cs_section_valid').addClass('hide')
                   }

               },
               error: function(xhr, status, error) {
                 Billing.alertMessage('Sorry, currently unable to process the credits. (Internal Error)', 'error',false);
                        el.attr('disabled',false);
                       $('#verfyLoader-1').addClass('hide');
                }
           })
             Billing.showGeneralTotal();
    },  
    useCredits:function(){
       var el = $('#applyCredit'), creditsInp = $('#creditsInp');
       var valueInput = parseFloat(creditsInp.val())||0;
                if(valueInput <1){
                   return false;
              }   
              
        el.attr('disabled',true);
        $('#verfyLoader-1').removeClass('hide');
        $("#credits_msg").addClass('hide')
          $("#cs_section_default").removeClass('has-error');
        
            $.ajax({
               type : "POST", 
               url : "/billing/discount/use_credits",
               dataType :"json", 
               data:$('#frmCredits').serialize(),
               async : false,
               success : function (response){

                   if(response.status!='success'){
                       $("#cs_section_default").addClass('has-error');
                       $("#credits_msg").removeClass('hide');
                        $("#credits_msg").text(response.description);

                   }else{
                       // BACE: quickie patch to show error message when total becomes less than 0
                       var total = parseFloat(Billing.original_total) + 
                          parseFloat(Billing.promo_discount) + parseFloat(response.discount);
                       // if final total <0, display error/warning message
                       if(total<0){
                        Billing.clearSession('credit')
                        $("#cs_section_default").addClass('has-error');
                        $("#credits_msg").removeClass('hide');
                        $("#credits_msg").text("That's more than total purchase amount. Try again");
                       }else{
                         Billing.credit_discount =response.discount;
                         $('#credits_price').text(Math.abs(Billing.credit_discount));
                         $('#credits_item').text(response.item);
                       
                       $('#credit-ds').removeClass('hide');
                       
                       $('#credits').html('$' +creditsInp.val()+ ' credit used');
                       
                         $('#cs_section_default').addClass('hide');
                         $('#cs_section_valid').removeClass('hide');
                       }
                   }

                       // Display ajax loader / hide once verification if done
                       el.attr('disabled',false);
                       $('#verfyLoader-1').addClass('hide');
 
               },
               error: function(xhr, status, error) {
                    Billing.alertMessage('Sorry, currently unable to process the credits. (Internal Error)', 'error',false);
                    el.attr('disabled',false);
                    $('#verfyLoader-1').addClass('hide');
                }
           })
       
         Billing.showGeneralTotal();
    },
    clearSession:function(type){
        var url ='';
        var data;
        if(type == 'promo'){
            url = "/billing/discount/cancel_promo";
            data = $('#frmPromoCode').serialize();
        
        }else if(type =='credit'){
            url =  "/billing/discount/cancel_credits";
            data = $('#frmCredits').serialize();
        }
        if(url != ''){
            $.ajax({
               type : "POST", 
               url : url,
               dataType :"json", 
               data:data
            })
        }
    },
    
   /*-------------------------------------------------------------------------*/
   alertMessage : function (message, alert_type,sticky)
      {
      alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';

      $().toastmessage('showToast',
         {
         text     : message,
         sticky   : typeof sticky!='undefined'?sticky:true,
         position : 'top-center',
         type     : alert_type
         });
      },
   /*-------------------------------------------------------------------------*/


   /*-- LOAD THE DIALOG FOR BILLING ------------------------------------------*/
   loadDialog : function ()
      {
      // alert('test');
      /*-- Call to open the library --*/
      $.ajax(
         {
         type : "GET", 
         url : "/billing/manage/billing_dialog",
         dataType :"json", 
         async : false,

         success : function (response)
            {
            try
               {
               var jsonobj = jQuery.parseJSON(response);
               if (typeof jsonobj == 'object')
                  {
                  if (response.status == "REDIRECT")
                     {
                     window.location.href = response.redirect;
                     }
                  else if (response.status == "CANCEL")
                     {
                     $('#billing_modal').modal('hide');
                     }
                  else if (response.status == "SUCCESS")
                     {
                     $('#billing_modal').empty();
                     $('#billing_modal').append($(response.dialog));
                     Billing.original_total =  $('#general_total').text();
                     Billing.promo_discount = 0;
                     Billing.credit_discount =0;

                     $('#billing_modal').on('click', '.confirm-payment', 
                        function (e)
                           {
                           e.preventDefault();
                           window.location.href = "/billing/manage/process";
                           });
                     $('#billing_modal').on('click', '.cancel-payment', 
                        function (e)
                           {
                           $('#billing_modal').modal('hide');
                           });
                           
                        $('#promocodeInp').keydown( function(e) {
                            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                            if(key == 13) {
                                 Billing.usePromocode();
                            }
                        });
                        $('#creditsInp').keydown( function(e) {
                            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                            if(key == 13) {
                                 Billing.useCredits()
                            }
                        });                         
                     }
                  }
               else
                  {
                  Billing.alertMessage("Error response from billing system. "
                     + "Please try again.", 'error');
                  $('#billing_modal').modal('hide');
                  }
               }
            catch (e)
               {
               Billing.alertMessage("Billing system failure. Please try again.",
                  'error');
               $('#billing_modal').modal('hide');
               }
            },
         });
      },
   /*-------------------------------------------------------------------------*/


    init:function(){
        Billing.processing = $('#billing_modal').html();
    },


   /*-- LAUNCH ---------------------------------------------------------------*/
   launch : function ()
      {
      $('#billing_modal').html(Billing.processing);
      $('#billing_modal').modal('show');

      Billing.loadDialog();
      
      }
   /*-------------------------------------------------------------------------*/
   };
