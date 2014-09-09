//-- setup the proxy
//-- used for rme auth
//- mainRMEProxyDomain from view
var windowRmeProxy;

window.onload=function(){ 
        windowRmeProxy = new Porthole.WindowProxy(mainRMEProxyDomain+"proxy.html"); 
        windowRmeProxy.addEventListener(rmeClientAuthListener);
        windowRmeProxy.post({action:"ping",access:rmeUserModalIsLogin,id:rmeUserModalId});
}


function rmeClientAuthListener(msg) {
   var data = msg.data;

   switch(data.action){
       case "get":
           rmeClientAuthActionGet(data);
           break;
           
       case "post":
           rmeClientAuthActionPost(data);
           break;           
       
   }   
}

function rmeClientAuthActionGet(param){
   //-- fiil in the form
     var url = param.url;
     var action = param.modal;
    $.get(window.location.protocol+'//'+window.location.host + param.url, 
            function(response){
       windowRmeProxy.post({type:"view",action:action,view:response});
    });
}

function rmeClientAuthActionPost(param){
        var url = param.url;
        var action = param.modal;
        
        var form_values = $("#rme_submit_form").serializeArray();

        //-- include the csrf token
        var values = {};
        $.each(form_values,
            function(i, v) {
                param.values[v.name] = v.value;
            });
         var values = param.values;
            
         jQuery.ajax({
            url: window.location.protocol+'//'+window.location.host +url,
            type: 'POST',
            data: values,
            success: function(response){
                  windowRmeProxy.post({type:response.action,action:action,view:response});
            }
    });
}
