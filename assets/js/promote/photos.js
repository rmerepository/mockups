var modelPhotosIsDirty = false;
var deletePhotoId =0;

var modelPhotos = kendo.observable({
    nextPage:function(e){
         
        trackerModel.nextClick(e);
    },
    submit_page:function(e){
        if( $('#photocount').val() >1){
             promoteRouter.navigate("/"+e);            
             $("#loader").hide();
        }else{
             $("#loader").hide();
            if(parseInt(trackerModel.isComplete)> tabDescription.indexOf(e)){
               promoteRouter.navigate("/"+e);
            }else{
                if(e != "inspection"){
                     promoteRouter.navigate("/"+e);
                }else{
                    uiAlertMsg("Main photo is required","error");
                }
            }
        }
    }
});

	function passFiles(file_array)
	{
		var photo = file_array;
		$('.photo-preloader').addClass('show');
		//-- Loop through the file array --//

			for(var i = 0; i < photo.length; i++)
			{
				jQuery.ajax(
				{
					url: '/promote/photo_service/ajax_add_image',
					type: 'GET',
					data: {file_id: photo[i]},
					dataType: 'JSON',
					success: function(data)
					{
	                    modelPhotosIsDirty = true;
						if(data.result == 'success')
						{
							jQuery("#sortable").html(data.data);
						}
						else
						{
							var emsg = "Cannot load photo to advertisement [" +	data.details + "]";
							uiAlertMsg(emsg,"error");
						}
					},
					error : function(jqXHR, textStatus, errorThrown)
					{
						var emsg = "Error [" + textStatus + "] " + errorThrown;
						uiAlertMsg(emsg,"error");			
					}
				});
			}
	}

 function photos_js(){

    
		jQuery('#sortable li .content').live({
			mouseenter: function(){
				if(jQuery(this).parent('li').hasClass('has-image'))
				{
					jQuery(this).parent('li').addClass("hover");
				}
			},
			mouseleave: function(){
				jQuery(this).parent('li').removeClass("hover");
			}
		});

		jQuery('#sortable li .remove-photo').live('click', function(){
			var id 		= jQuery(this).attr("id");
			var element = jQuery(this).parents('li');
                        if(deletePhotoId != id){
                            deletePhotoId = id;
                            jQuery.ajax({
                                    url: '/promote/photo_service/ajax_delete_image',
                                    type: 'GET',
                                    data: {id: id},
                                    dataType: 'JSON',
                                    async: false,
                                    success: function(data){
                                        modelPhotosIsDirty = true;
                                            if(data.result == 'success')
                                            {
                                                    jQuery("#sortable").html(data.data);
                                            }
                                            else
                                            {
                                                    var emsg = "Cannot remove photo from advertisement [" +
                                                            data.details + "]";
                                                    $().toastmessage('showToast', {
                                                    text     : emsg,
                                                    sticky   : true,
                                                    position : 'top-center',
                                                    type     : "error",
                                                });
                                            }
                                    }
                            });
                        }
			return false;
		});


		jQuery( "#sortable" ).sortable({
			items: ".is_draggable",
			update: function(event, ui){
				var x 			= 1;
				var ordering_array = [];
                                modelPhotosIsDirty = true;
				jQuery('#sortable').find('li').each(function(){
					var ordering 	= {};
					var ind = x++;

					if(ind == 1)
					{
						jQuery(this).find('#numbering').html('1 - Main');
					}
					else
					{
						jQuery(this).find('#numbering').html(ind);
					}

					ordering['order'] = ind;
					ordering['file_id'] = $(this).attr("id");

					ordering_array.push(ordering);
				});
                                
				//---- submit the new ordering ----//
				jQuery.ajax({
				  type: 'POST',
				  url: '/promote/photo_service/reorder',
				  data: 'data='+JSON.stringify(ordering_array)+"&"+pid,
				  dataType: 'json'
				});
             }

		});

		jQuery( "#sortable" ).disableSelection();
                
                jQuery.ajaxSetup(
		{
		  beforeSend: function() 
		  {
		     $('#loader').show();
		  },
		  complete: function()
		  {
		     $('#loader').hide();
		  },
		});
 }
 
