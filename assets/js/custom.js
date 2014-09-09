var Custom = {

    jQuery : $,
 
    init : function () {
        this.userWidgetBox();
        this.customJs();
        this.datePickerEnable();
    },

    datePickerEnable : function(){
      $('.hasDatePicker').on('click', function(){
        $('.ui-datepicker-trigger').click();
      })
    },

    customJs : function() {
        $(document).ready(function(){
            // $('select').dropkick();

            var tooltipRight = $('body').kendoTooltip({
                filter: "a[rel='tooltip-right']",
                position: 'right'
            }).data("kendoTooltip");

        }); 
    },

    userWidgetBox : function () {
        var button = $('.user-top-utililty li a.button');
        var divBox = $('div.box'); 
        $('section').click(function(){ 
          if(divBox.hasClass('show')){
            divBox.removeClass('show');
          }            
        });
        $(button).click(function(){ 
            var box = $(this).parent().children('div.box');
            divBox.removeClass('show');  
              if(!box.hasClass('show')) {
                      box.addClass('show');
              } else {
                     divBox.removeClass('show');                     
              }   
        });
    }, 
      
};

Custom.init();