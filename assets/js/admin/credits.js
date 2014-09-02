var credit_history;

var modelCredits = kendo.observable({
   data_source_user:[],
   userid:null
   
});

$(document).ready(function () {
    $.get( "/api/lists?type=users", function( data ) {
            modelCredits.set('data_source_user',data.data)
        });
        
        
            kendo.bind($("#frmCredit"), modelCredits);
            
    $('#applyCredit').click(function(){
        if(validate()){
            var autoVal = modelCredits.get('userid');
            var data = {
                     userid:             autoVal.id,
                     credit:              modelCredits.get('credit') 

                };
            $.ajax({
                    type:"POST",
                    url:'/admin/discount/save_credit',
                    data:$.extend({},pobj,data),
                    dataType: "json",
                    success:function (data) {
                            uiAlertMsg('Credit Applied','success')
                            getHistory();
                    },
                    error:function (jqXHR, status) {
                        uiAlertMsg('Internal error','error');
                    }
                });                
        }
    })
getHistory()
    
    });

function validate(){
    
    return true;
}


function getHistory(){
    
    
        $.ajax({ url: "/admin/discount/credit_history"
        ,type:"GET"
        ,success: function(response){
               var    ds_pending = new kendo.data.DataSource({
                           data: response,
                           //pageSize: 10,
                           change: function() { 
                                 var jsTemplate = kendo.template($("#tmpHistory").html());
                                  $("#tblHistory tbody").html(kendo.render(jsTemplate, this.view()));

                           }
                       });
                    ds_pending.read();
                    
    }, dataType: "json"})    
}


function viewSingleHistory(id){
     $.ajax({ url: "/admin/discount/single_history/"+id
        ,type:"GET"
        ,success: function(response){
        
        var rows ='';
        for(var ctr =0;ctr < response.length; ctr++){
            if(response[ctr].action !=0){
                 rows +='<tr><td>'+response[ctr].date_updated+'</td>\n\
                               <td>'+response[ctr].details+'</td>\n\
                               <td>'+response[ctr].action+'</td>\n\
                               <td>'+response[ctr].referrer+'</td>\n\
                           </tr>'    
                }
        }
        
        
        var tbl = '<table cellpadding="5px">\n\
                               <th>Date</th>\n\
                               <th>Status</th>\n\
                               <th>Credits</th>\n\
                               <th>Source</th>\n\
                              '+rows+'</table>'            


              var xmlfile =$("#history").rmeModal({
                               title:"Credit History", 
                               body:tbl,
                               buttons:["cancel"],  
                               confirmText:"Ok",  
                               backdrop:"static"
                                       });

               xmlfile.show();
                    
    }, dataType: "json"})  
}


function unlockWallet(user_id){
      $.ajax({ url: "/admin/discount/unlock_wallet"
        ,type:"POST"
        ,data:$.extend({},pobj,{user:user_id})
        ,success: function(response){
                uiAlertMsg('Wallet successfully unlock','success')
                getHistory();
    }, dataType: "json"})   
}