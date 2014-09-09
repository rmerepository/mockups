var DropDownTopWidget = {

    init : function () {
        this.dropDownWidget();
    },

    dropDownWidget : function () {
        var button = $('.user-top-utililty li a.button');
        var divBox = $('div.box');

        $('section, .promote-true').click(function(){
          if(divBox.hasClass('show')){
            divBox.removeClass('show');
          }            
        });

        $('section, .mid-section').click(function(){ 
          if(divBox.hasClass('show')){
            divBox.removeClass('show');
          }            
        });

        $(button).click(function(e){
            var addressValue = $(this).attr("href");
            if (addressValue != '#') return true;
            var box = $(this).parent().children('div.box');
              divBox.removeClass('show');
              if(!box.hasClass('show')) {
                box.addClass('show');
              } else {
                divBox.removeClass('show');                     
              }   
           e.preventDefault();
        });
    },
};

DropDownTopWidget.init();