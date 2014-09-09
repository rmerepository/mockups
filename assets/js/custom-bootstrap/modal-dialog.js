(function ($) {
    $.fn.extend({
        //pass the options variable to the function
        confirmModal: function (options) {
            var html = '<div class="modal" id="confirmContainer"><div class="modal-header"><a class="close" data-dismiss="modal">×</a>' +
            '<h3>#Heading#</h3></div><div class="modal-body">' +
            '#Body#</div><div class="modal-footer">' +
            '<a href="#" data-dismiss="modal">Close</a>' +
            '&nbsp;&nbsp;&nbsp;<a href="#" class="btnc btn-primary" id="confirmYesBtn">#ConfirmButton#</a></div></div>';

            var defaults = {
                heading: 'Please confirm',
                body:'Body contents',
                callback : null,
                confirmButton : 'Confirm'
            };
            
            var options = $.extend(defaults, options);
            html = html.replace('#Heading#',options.heading).replace('#Body#',options.body).replace('#ConfirmButton#',options.confirmButton);
            $(this).html(html);
            $(this).modal('show');
            var context = $(this); 
            $('#confirmYesBtn',this).click(function(){
                if(options.callback!=null) {
                   if ( options.callback() )
                        $(context).modal('hide');
                }
            });
        }
    });

})(jQuery);