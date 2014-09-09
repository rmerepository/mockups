function updateDropkickDDL(id, value) {

    //Get the select element and dropkick container
    var select = $(id);
    var dk = select.prev('.dk_container');

    //Set the value of the select
    select.val(value);        

    //Loop through the dropkick options
    dk.find('.dk_options_inner').children("li").each(function () {

        var li = $(this);
        var link = li.children('a');

        //Remove the 'current' class if it has it
        li.removeClass('dk_option_current');

        //If the option has the value we passed in
        if (link.data('dk-dropdown-value') == value) {

            //Set the 'current' class on the option
            li.addClass('dk_option_current');

            //Set the text of the dropkick element
            dk.find('.dk_label').text(link.text());

        }

    });

}
