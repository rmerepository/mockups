var HideMsg = {
    jQuery : $,
 
    init : function () {
        this.hideFormMsgs();        
    },

    hideFormMsgs : function() {
      $('a.closebtn').click(function(){
        $(this).parent('div').fadeOut('medium');
        return false;
      });
    },
   
};

HideMsg.init();