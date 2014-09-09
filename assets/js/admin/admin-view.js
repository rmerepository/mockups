$(document).ready(function () {

});

function viewAdDetails(ad_id){
        admin_getAdDetails("",ad_id, function(response){
           if(response.result=='success'){

                              var jsTemplate = kendo.template($("#infotemplate").html());
                               $("#advertisementInfo").html(jsTemplate(response));
                               

            }
       }, null);
}