//this is the application.js file from the example code//
$(function () {
    'use strict';

	// Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({autoUpload:true, maxNumberOfFiles:20});
    

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload('option', {
            maxFileSize: 10000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png|tiff|bmp)$/i,
            process: [
                {
                    action: 'load',
                    fileTypes: /^image\/(tiff|gif|jpeg|jpg|png|bmp)$/,
                    maxFileSize: 10000000 // 20MB
                },
                {
                    action: 'resize',
                    maxWidth: 1440,
                    maxHeight: 900
                },
                {
                    action: 'save'
                }
            ]
        });

    if (window.location.hostname === 'rme.local' || window.location.hostname === 'dev.rentmyestate.com') 
    {
        //Load files
        // Upload server status check for browsers with CORS support:
        if ($.ajaxSettings.xhr().withCredentials !== undefined) {
            $.ajax({
                url: 'photo/get_files',
                dataType: 'json', 
                
                success : function(data) {  

                    var fu = $('#fileupload').data('fileupload'), 
                    template;
                    fu._adjustMaxNumberOfFiles(-data.length);
                    template = fu._renderDownload(data)
                    .appendTo($('#fileupload .files'));
                    
                    // Force reflow:
                    fu._reflow = fu._transition && template.length &&
                    template[0].offsetWidth;
                    template.addClass('in');
                    jQuery('#loading').remove();
                }  
         
                
            }).fail(function () {
                $('<span class="alert alert-error"/>')
                .text('Upload server currently unavailable - ' +
                    new Date())
                .appendTo('#fileupload');
            });
        }
    } 
    else 
    {
        // Load existing files:
        $('#fileupload').each(function () {
            var that = this;
            $.getJSON(this.action, function (result) {
                if (result && result.length) {
                    $(that).fileupload('option', 'done')
                    .call(that, null, {
                        result: result
                    });
                }
            });
        });
    }


    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>')
        .prop('src', this.href)
        .appendTo('body');
    });
    
    // fix the numbering //
	$('#fileupload').bind('fileuploadcompleted',
	function (e, data)
	{
		var x = 1;
		jQuery('#sortable').find('li').each(function(event, li)
		{
			if(x == 1)
			{
				jQuery(this).find('#numbering').html('Main');
			}
			else
			{
				jQuery(this).find('#numbering').html(x);
			}
			
			x++;
			
		})
	}
	);

});


$(document).bind('dragover', function (e) 
{
    var dropZone = $('.dropzone'),
        timeout = window.dropZoneTimeout;
    
    if (!timeout) 
    {
        dropZone.addClass('in');
    } 
    else 
    {
        clearTimeout(timeout);
    }
    if (e.target === dropZone[0]) 
    {
        dropZone.addClass('hover');
    } 
    else 
    {
        dropZone.removeClass('hover');
    }
    
    window.dropZoneTimeout = setTimeout(function () 
    {
        window.dropZoneTimeout = null;
        dropZone.removeClass('in hover');
    }, 1500);
});