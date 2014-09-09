$(function () 
{

	'use strict';

	// Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({autoUpload:true, maxNumberOfFiles:1});
    

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload('option', 
    {
    		singleFileUploads: true,
    		maxNumberOfFiles: 1,
    		limitMultiFileUploads: 1,
    		limitConcurrentUploads: 1,
			url: 'upload_profile_image',
            maxFileSize: 10000000,
            acceptFileTypes: /(\.|\/)(tiff|gif|jpeg|jpg|png)$/i,
            process: [
                {
                    action: 'load',
                    fileTypes: /^image\/(tiff|gif|jpeg|jpg|png)$/,
                    maxFileSize: 10000000 // 10MB
                },
                {
                    action: 'resize',
                    maxWidth: 60,
                    maxHeight: 60
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
	        if ($.ajaxSettings.xhr().withCredentials !== undefined) 
	        {
	            $.ajax({
	                url: 'get_profile_picture',
	                dataType: 'json', 
	                
	                success : function(data) 
	                {  
						
	                    var fu = $('#fileupload').data('fileupload'),template;
	                    fu._adjustMaxNumberOfFiles(-data.length);
	                    template = fu._renderDownload(data).appendTo($('#fileupload .files'));
	                    
	                    // Force reflow:
	                    fu._reflow = fu._transition && template.length && template[0].offsetWidth;
	                    template.addClass('in');

	                    $('#loading').remove();
	                    
	                    // hide the upload form if there is one image selected already
	                    if(!jQuery.isEmptyObject(data))
	                    	$("#dropzone").hide();
	                }  
	         
	                
	            }).fail(function () 
	            {
	                $('<span class="alert alert-error"/>')
	                .text('Upload server currently unavailable - ' +
	                    new Date())
	                .appendTo('#fileupload');
	            });
	        }
	    }
	    
	    // hide the DRAG HERE //
	    $('#fileupload').bind('fileuploadstart', function (e, data) {jQuery("#dropzone").hide()})
	    $('#fileupload').bind('fileuploaddestroyed', function (e, data) {jQuery("#dropzone").show()})
	    $('#fileupload').bind('fileuploadcompleted', function (e, data) 
	    {
	    	jQuery("#dropzone").hide();
	    	
		    if (data.jqXHR.responseText || data.result) 
		    {
		        var JSONjQueryObject = (data.jqXHR.responseText) ? jQuery.parseJSON(data.jqXHR.responseText) : data.result;
		
		        $.each(JSONjQueryObject, function (index) 
		        {
		        	if(JSONjQueryObject[index].error)
		        	{
		        		jQuery("#dropzone").show();
		        	}
		        });
		    }
		});


});
