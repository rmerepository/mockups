/* 
 * @author Felix bacat - massquote
 * Copyright 2013 Rent My Estate
 */

(function($){
    
    /**
     * RME common Modal Start
     * @param {type} options
     * @returns {unresolved}
     */
    $.fn.rmeModal = function(options) {
            
        function addOnFocusOut(id){
              $('#'+id).focusout(function() {
                    $( "#"+element_id+id+"_err" ).remove();
                    $('#'+id).parent('div').removeClass("error");
                    $('#'+id).parent('div').removeClass("success");
                if($('#'+id).val()!=""){
                    $('#'+id).parent('div').addClass("success");
                }else{
                    $('#'+id).parent('div').addClass("error");
                    $('#'+id).after('<div id="'+element_id+id+'_err" class="msg" generated="true" for="remarks">Field is required.</div>');
                }
             });
        }
        
        function validateAllData(){
                //--- put focus out on required fields
            var validated = true;
                   $('#'+element_id+' input, #'+element_id+' select , #'+element_id+' textarea ').each(
                   function(index){  
                       var input = $(this);
                        if(typeof input.attr('id') !== "undefined"){
                            if(config.required.indexOf(input.attr('id').toString()) >-1){

                                if(input.val()==""){
                                    $( "#"+element_id+input.attr('id')+"_err" ).remove();
                                    $('#'+input.attr('id')).parent('div').removeClass("error");
                                    $('#'+input.attr('id')).parent('div').removeClass("success");
                                     $('#'+input.attr('id')).parent('div').addClass("error");
                                    $('#'+input.attr('id')).after('<div id="'+element_id+input.attr('id')+'_err" class="msg" generated="true" for="remarks">Field is required.</div>');
                                    validated =false;
                                }
                            }
                        }
                   }
               )
                   return validated;
        }
        
        var config = {};
	var defaults = {
                required:[],        //-- id of inputs that are required
                show:"onClick" ,        //-- load on click
                sectionClass:[],        //-- extra class for section
                headerClass:[],         //-- additional class for header
                close: true,            //-- with closs button
                backdrop:  null,      //-- do not hide when the backdrop is clicked
                title:      "Rent My Estate",    //-- title of modal
                overrideFooter:null,         //-- extra element after buttons
                body:       "",         //-- body of modal
                buttons:["cancel"],
                cancelText:"Cancel",    //-- show cancel button 
                nextText:"Next",         //-- primary button
                confirmText:"Confirm",   //-- success button
                onCancel:null,
                onNext:null,
                onConfirm:null,
                preventClose:false
            };
        //-- combine all options
           $.extend(config, defaults, options);  
        //-- create id of the modal   
        var element_id = "rmeModalPlugin_"+this.attr("id");
           
        $(document.body).append('<div id="'+element_id+'" class="modal fade"></div>');
        
        //-- neccessary attributes
        $("#"+element_id).attr({tabindex:"-1","aria-hidden":"true","aria-labelledby":element_id,role:"dialog"});
        if(config.backdrop!=null){
            $("#"+element_id).attr("data-backdrop",config.backdrop);
        }
        
        $("#"+element_id).html(renderRmeModal(element_id,config));
        
        //-- render if there are extra class for section
        for(var ctr =0;ctr<config.sectionClass.length;ctr++){
             $("#section"+element_id).addClass(config.sectionClass[ctr]);
        }
         //-- render if there are extra class for header
        for(var ctr =0;ctr<config.headerClass.length;ctr++){
             $("#header"+element_id).addClass(config.headerClass[ctr]);
        }
        
        //--- put focus out on required fields
        $('#'+element_id+' input, #'+element_id+' select , #'+element_id+' textarea ').each(
            function(index){  
                var input = $(this);
                if(typeof input.attr('id') !== "undefined"){
                    if(config.required.indexOf(input.attr('id').toString()) >-1){
                        addOnFocusOut(input.attr('id'));
                    }
                }
            }
        )
        
        //-- on click of the declared element
        if(config.show =="onClick"){
            this.click(function(){
                   //-- check dependency
                    if(typeof($.fn.modal) === 'undefined'){
                            console.log("bootstrap.js dependency not loaded.");
                            return false;
                     }
                    $("#"+element_id).modal("show");
            });
        }
        //-- on click cancel
         $('#btnCancel').click(function(e) {
            if (config.onCancel != null){
               config.onCancel($("#"+element_id+"form").serialize(),e);
                $("#"+element_id).modal("hide");
            }else{
                $("#"+element_id).modal("hide");
            }
          });
          
        //-- on click cancel
         $('#btnNext').click(function(e) {
             if(validateAllData()){
                if (config.onNext != null){
                   config.onNext($("#"+element_id+"form").serialize(),e);
                   if(!config.preventClose){
                        $("#"+element_id).modal("hide");
                   }
                }
             }
          });
          
        //-- on click cancel
         $('#btnConfirm').click(function(e) {
              if(validateAllData()){
                if (config.onConfirm != null){
                   config.onConfirm($("#"+element_id+"form").serialize(),e);
                   if(!config.preventClose){
                        $("#"+element_id).modal("hide");
                   }
                }
              }
          });
          
         //-- show function 
         var show = function(){
             $("#"+element_id).modal("show");
         };
        
        //-- hide function
        var hide =function(){
             $("#"+element_id).modal("hide");
        }
        
        
        var setTitle = function(title){
            $("#rmeT").text(title);
        }
        var setValue = function(id,value){
            $("#"+id).val(value);
        }
        
        var setHtml = function(id,value){
             $("#"+id).html(value);
        }
        
        
        return {
            show: show,
            hide: hide,
            setTitle:setTitle,
            setValue:setValue,
            setHtml:setHtml
        };
        
    }   
   //-----------------------------------------------------------------

    
})(jQuery);



/**
 * @desc partial html content of the modal
 * @param {type} config
 * @returns {html}
 */
function renderRmeModal(element_id,config){
     //-- start rendering the modal
        var section,close,header,body,footer,next,cancel,confirm,sectionFooter;
           cancel   = config.buttons.indexOf("cancel")>-1?'<a href="#" id="btnCancel" class="btnc cancel-payment">'+config.cancelText+'</a> &nbsp;&nbsp;&nbsp;':"";
           next     = config.buttons.indexOf("next")>-1?'<button id="btnNext" class="btn btn-primary">'+config.nextText+'</button>':"";
           confirm  = config.buttons.indexOf("confirm")>-1?'<button id="btnConfirm" class="btn btn-success">'+config.confirmText+'</button>':"";
           sectionFooter = config.overrideFooter!=null?config.overrideFooter:cancel+next+confirm;
           close    = config.close?'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>':"";
          
          
           header = '<div id="header'+element_id+'" class="modal-header">'+close+' <h2 id="rmeT">'+config.title+'</h2></div>'
           footer = '<div class="modal-footer text-left">'+sectionFooter+'</div>';
           body = '<div class="modal-body"><form id="'+element_id+'form">'+config.body+'</form></div>';
           section = '<section id="section'+element_id+'"  class="modal-dialog"><div class="modal-content">'+header+body+footer+'</div></section>';
           
       return section;
    
}

