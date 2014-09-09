
$(document).ready(function () {
    admin_getAllUsers('', function(response){
             if(response.result == 'success'){
                ds = new kendo.data.DataSource({
                       data: response.users,
                       pageSize: 10,
                       change: function() { 
                             var jsTemplate = kendo.template($("#tmpWebsites").html());
                              $("#tblWebsite tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });
                ds.read();
                $("#admin_submit").click(function(){
                    searchData(ds);
                })
                
                $('#admin_search').keydown(function(event) {
                   if (event.which == 13) {
                       searchData();
                   }
               });
                
                $("#pager").kendoPager({
                    dataSource: ds,
                    messages: {
                        display: "{0} - {1} of {2} items",
                        empty: "No items to display",
                        page: "Page",
                        of: "of {0}",
                        itemsPerPage: "items per page",
                        first: "Go to the first page",
                        previous: "Go to the previous page",
                        next: "Go to the next page",
                        last: "Go to the last page",
                        refresh: "Refresh"
                    }
                });
             }
         }, null);
         
    
    

});



function set_to_active(code,el,email){
    $.get(window.location.protocol+'//'+window.location.host + 
            '/admin/useraccounts/set_to_active/'+code, 
            function(response){
                if(response != ''){
                    uiAlertMsg(response);
                }else{
                   uiAlertMsg(email + ' is now active','success');
                }
                
    });
}

function resend_activation(email,el){
  $.post(window.location.protocol+'//'+window.location.host + 
            '/admin/useraccounts/resend_activation/',$.extend({},g_form,{email:email}), 
            function(response){
                if(response != 1){
                    uiAlertMsg(response);
                }else{
                   uiAlertMsg('Activation sent to '+email,'success');
                }
                
    });    
}



function searchData(ds){
    var type = $('#admin_opt').val();
    var param = $('#admin_search').val()==''?'all':$('#admin_search').val();
    
    switch(type){
        case 'active':
            if(param =='all'){
                ds.filter( { field:'btn', 
                      operator: "neq", value:'contactUsr'});
            }else{
                ds.filter( { field:'email', 
                      operator: "contains", value:param});
            }
            break;
       
        case 'all':
            if(param =='all'){
                ds.filter([]);
            }else{
                ds.filter( { field:'email', 
                      operator: "contains", value:param});
            }
            break;
            
    }
}