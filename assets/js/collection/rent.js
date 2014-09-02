var historyRec
/**
 * On page load
 * @param {type} param
 */
$(document).ready(function() {
    var host = window.location.protocol+'//'+window.location.host;
     $('#frmPayment').meUIHelper();

     uiDatePicker( '.ui-date-received','01-Jan-2010' );
     
     //-- on confirm delete
     $('#confirmDelete').click(function(e){
         
         var data = $.extend({},
                    $('#frmPayment').data('meUIHelper').getToken(),
                    {lease:$('#remove_lease').val(),
                    collection:$('#remove_collection').val()});
       
         $.ajax({
            url: host+ '/collection/rent/delete_payment',
            type: "POST",
            data: data,
            success: function (resp){
                 refreshHistory();
                  $('#frmPayment').data('meUIHelper').toast('Payment successful​ly removed','success');
            }
        })
     });
     
     //-- on click add payment
     $('#confirmPayment').click(function(e){
         
          $('#frmPayment').data('meUIHelper').validate(
                       e,this,
                       function(data,el){
                           $('#confirmPayment').prop('disabled', true);
                           
                            $.ajax({
                              url: host+ '/collection/rent/post_payment',
                              type: "POST",
                              data: data,
                              success: function (resp){
                                  if(resp.status){
                                      refreshHistory();
                                      
                                    $('.paymentMsg').show();
                                   
                                   if(parseInt($('#collection').val()) >0){
                                        $('.paymentMsg').hide();
                                        $('#addPayment').modal('hide');
                                    }else{
                                         setTimeout(function(){$('.paymentMsg').fadeOut()}, 3000);
                                    }
                                     setInputValue('','','');
                                     
                                      $('#frmPayment').data('meUIHelper').toast('Payment has been saved','success');
                                      $('#addPayment').modal('hide');
                                  }else{
                                     uiAlertMsg(resp.message);
                                  }
                                  
                                  
                              }
                            });
                       }
                );
         
         
                    
			

      })
      refreshHistory();
});


function setInputValue(collection,payment_date,amount){
    $('#collection').val(collection);
    $('#dateRecieved').val(payment_date);
    $('#amount').val(amount);
    
}


function refreshHistory(){
      var host = window.location.protocol+'//'+window.location.host;
      $.get( host+
              '/collection/rent/get_payment?lease='+
              $('#lease').val(), function(resp) {
                
                var template = kendo.template($("#template").html());  
                var dataSource = new kendo.data.DataSource({
                      data: resp.history,
                      change: function() { 
                          $("#recHistory tbody").html(kendo.render(template, this.view()));
                      }
                  });

                  dataSource.read();
                  
                  historyRec = resp.history;
                  
                  //-- change the caption
                  if(parseFloat(resp.outstanding.replace(',',0)) >0){
                      $('#caption_balance').text('$'+resp.outstanding +' owing');
                      $('#caption_due_date').html('Rent Due');
                  }else{
                      $('#caption_balance').text('Up to date');
                      $('#caption_due_date').html('Next payment due '+resp.due_date);
                  }
  
        });
}

/**
 * function to call modal and set default values
 * @param {type} lease
 * @returns {undefined}
 */
function edit(lease){
    $('.paymentMsg').hide();
    $.each(historyRec,function(index) {
        if(historyRec[index].id == lease){
             $('#confirmPayment').prop('disabled', false);
            var amount = historyRec[index].amount
            setInputValue(lease,
            historyRec[index].date_cap,
            parseFloat(amount.replace(',','')));
            $('#captionPayment').html('Update Payment');
           $('#addPayment').modal('show');
            return;
        }
    })
    
}

function payNow(){
     $('#confirmPayment').prop('disabled', false);
    $('#dateRecieved').val(cur_date);
    $('.paymentMsg').hide()
    $('#captionPayment').html('Add New Payment');
    $('#addPayment').modal('show');
}


function remove(lease){
        $.each(historyRec,function(index) {
        if(historyRec[index].id == lease){
            $('#remove_lease').val(historyRec[index].lease);
            $('#remove_collection').val(historyRec[index].id);
            $('#confirm_desc').html('Payment of $'+historyRec[index].amount +' on ' + historyRec[index].date);
           $('#Remove_confirm').modal('show');
            return;
        }
    })
}