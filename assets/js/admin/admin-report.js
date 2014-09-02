
   var modal_Report;
function modalReport(title,property,userid){
    
       //-- just to remove the value in session
       ajaxPost('advertisement/reset_file_report');
      modal_Report =$("#mi").rmeModal({
                            preventClose:true,
                            required:[],
                            title:"Send Value Report", 
                            body:modalReportForm,
                            buttons:["confirm","cancel"],   
                            backdrop:"static",
                            onConfirm:function(data,rec){
                                send_report(data,rec,title);
                            }
                                    });
    
     modal_Report.show();
     
         
     $('#property_address').html(title);
     $('#property').val(property);
     
          $("#files").kendoUpload({
                        async: {
                            saveUrl: "advertisement/upload_report?p="+property+"&u="+userid,
                            removeUrl: "advertisement/remove_report?p="+property+"&u="+userid,
                            removeVerb: "GET",
                            autoUpload: true
                        }
                    });
                    
       $('#cma_report').on('click',function(){
            if($('#cma_report').is( ":checked" )){
                  $('#value_report').prop('checked',false);
            }else{
                $('#value_report').prop('checked',true);
            }
        });
        
        $('#value_report').on('click',function(){
            if($('#value_report').is( ":checked" )){
                  $('#cma_report').prop('checked',false);
            }else{
                $('#cma_report').prop('checked',true);

            }
        });         
        
        
}

function send_report(data,rec,title){
    var tmpl = $('#cma_report').is( ":checked" )?'420':'419';
    var params = {
    "tmpl": tmpl,
     "property":$('#property').val()};
    var postVal = $.extend({},pobj,params);
      $.ajax({
            url:  "advertisement/send_report",
            type: "POST",
            dataType: "json",
            data:postVal,
            success: function (data){
                if(data.status =='success'){
                    uiAlertMsg('Report successfuly sent to '+title+' property contact person.','success');
                    modal_Report.hide();
                }else{
                    uiAlertMsg(data.description,'error');
                }
            }
         }) 


}