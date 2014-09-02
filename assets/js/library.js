var Library =
   {
   jQuery : $,

   libUrl : '/files/library/',
   libType : 'all',
   libFilter : 'user',
   libFilterId : '0',

   imgId:'',
   libControl : '',
   libSelect : -1,
   show_message : "",


   loadContent : false,
   contentMaxed : false,
   totalContent : 0,
   minContent : 16,
   scrollContent : 4,
   selectedContent : [],

   upload_box :
      '<li>'
         + '<div class="content undraggable">'
            + '<a href="#" class="delete-file" title="Remove">&times;</a>'
            + '<a class="itemTopBtnView" href="" data-toggle="modal" '
               + 'data-download="" title="" rel="lightbox">View</a>'
            + '<a class="itemTopBtnDownload" title="" href="#">Download</a>'
            + '<div class="file">'
            + '</div>'
            + '<div class="name"></div>'
            + '<div class="progress">'
               + '<div class="bar progress-bar"></div>'
            + '</div>'
         + '</div>'
      + '</li>',

   empty_box :
      '<li class="load-more-empty">'
         + '<i>No files found for the chosen filter.</i>'
      + '</li>',

   over_warning :
      '<a href="#" id="storage_memo" class="non-link text-error" rel="tooltip"'
      + ' data-original-title="Before you upload more files and images,'
      + ' delete some of your old or unwanted files to free up some more'
      + ' space">'
         + '<i>You have exceeded your alloted storage space!</i>'
      + '</a>',

   high_warning :
      '<a href="#" id="storage_memo" class="non-link text-warning"'
      + ' rel="tooltip" data-original-title="Before you upload more files and '
      + 'images, delete some of your old or unwanted files to free up some more'
      + ' space">'
         + '<i>You are running low on storage space...</i>'
      + '</a>',



   /*-------------------------------------------------------------------------*/
   alertMessage : function (message, alert_type)
      {
      alert_type = typeof alert_type !== 'undefined' ? alert_type : 'error';

      $().toastmessage('showToast',
         {
         text     : message,
         sticky   : true,
         position : 'top-center',
         type     : alert_type
         });
      },
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- IE8 BYPASS UPLOAD ----------------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- IE8_UPLOAD_BYPASS ----------------------------------------------------*/
   ie8_upload_bypass : function ()
      {
      var options =
        {
        async : false,
        type : 'POST',
        success : Library.ie8_bypass_success,
        error : Library.ie8_bypass_error
        };


      var filterAttrib = Library.libType + "/" + Library.libFilter
         + "/" + Library.libFilterId;
      if ($('#filterAttrib').length > 0)
         {
         $('#filterAttrib').attr('filterAttrib', filterAttrib);
         }
      else
         {
         $('<input>').attr(
            {
            type: 'hidden',
            id: 'filterAttrib',
            name: 'filterAttrib',
            value: filterAttrib
            }).appendTo('#upload_form');
         }

      $('#upload_form').ajaxSubmit(options);
      },
   /*-------------------------------------------------------------------------*/

   /*-- IE8_BYPASS_SUCCESS ---------------------------------------------------*/
   ie8_bypass_success: function (data)
      {
      Library.contentReset();
      },//end ie8_bypass_success
   /*-------------------------------------------------------------------------*/

   /*-- IE8_BYPASS_ERROR -----------------------------------------------------*/
   ie8_bypass_error: function (jqXHR, textStatus, err)
      {
      alert(jqXHR.responseText);
      },//end ie8_bypass_error
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- DRAG AND DROP SUBROUTINES --------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Pane Switching -------------------------------------------------------*/
   paneSwitch : function ()
      {
      /*-- Tab switching on drag and drop --*/
      $('#fileItemsPane').off('dragover dragenter');
      $('#fileItemsPane').on('dragover dragenter', function(e)
         {
         $('#fileItemsPane').hide();
         $('#dragAndDropPane').show();
         });
      /*-- This is necessary to specify a dropzone call --*/
      $('#dragAndDropPane').off('dragover dragenter');
      $('#dragAndDropPane').on('dragover dragenter', function(e)
         {
         e.preventDefault();
         });

      $('#dragAndDropPane').off('dragleave dragexit');
      $('#dragAndDropPane').on('dragleave dragexit', function(e)
         {
         e.preventDefault();

         $('#dragAndDropPane').hide();
         $('#fileItemsPane').show();
         });
      $('#dragAndDropPane').off('drop');
      $('#dragAndDropPane').on('drop', function(e)
         {
         e.preventDefault();

         $('#dragAndDropPane').hide();
         $('#fileItemsPane').show();
         });
      },
   /*-------------------------------------------------------------------------*/


   /*-- Initialize the dropzone ----------------------------------------------*/
   dropzoneInit : function()
      {
      var dropcount = 0;
      var successcount = 0;
      /*-- Filedrop for the dropzone ---------------------*/
      $('#dragAndDropPane').filedrop(
         {
         /*-- Set the file parameter for uploads --*/
         fallback_id : 'lib-upload-btn',
         paramname : 'library_file',

         maxfiles : 20,
         maxfilesize : 50,
         url : '/files/library/upload',
         allowedfiletypes :
            [
            /*-- BMP --*/
            'image/bmp',
            'image/x-bmp',
            'image/x-bitmap',
            'image/x-xbitmap',
            'image/x-win-bitmap',
            'image/x-windows-bmp',
            'image/ms-bmp',
            'image/x-ms-bmp',
            'application/bmp',
            'application/x-bmp',
            'application/x-win-bitmap',
            /*-- CSV --*/
            'application/csv',
            'application/excel',
            'application/vnd.msexcel',
            'text/anytext',
            'text/comma-separated-values',
            'text/csv',
            /*-- DOC --*/
            'appl/text',
            'application/doc',
            'application/msword',
            'application/vnd.msword',
            'application/vnd.ms-word',
            'application/winword',
            'application/word',
            'application/x-msw6',
            'application/x-msword',
            /*-- DOCX --*/
            'application/vnd.openxmlformats-officedocument.wordprocessingml.'
               + 'document',
            /*-- GIF --*/
            'image/gif',
            'image/gi_',
            /*-- JPG --*/
            'image/jpg',
            'image/jp_',
            'application/jpg',
            'application/x-jpg',
            'image/vnd.swiftview-jpeg',
            'image/x-xbitmap',
            /*-- JPEG --*/
            'image/jpeg',
            'image/jpe_',
            'image/pjpeg',
            'image/pipeg',
            /*-- NUMBERS --*/
            'application/vnd.apple.numbers',
            'application/x-iwork-numbers-sffnumbers',
            /*-- ODT --*/
            'application/vnd.oasis.opendocument.text',
            'application/x-vnd.oasis.opendocument.text',
            /*-- PAGES --*/
            'application/vnd.apple.pages',
            'application/x-iwork-pages-sffpages',
            /*-- PDF --*/
            'application/acrobat',
            'application/pdf',
            'applications/vnd.pdf',
            'application/x-pdf',
            'text/pdf',
            'text/x-pdf',
            /*-- PNG --*/
            'image/png',
            'image/x-png',
            'application/png',
            'application/x-png',
            /*-- PPT --*/
            'application/powerpoint',
            'application/vnd.ms-powerpoint',
            /*-- PSD --*/
            'application/x-photoshop',
            /*-- TIF --*/
            'image/tif',
            'image/x-tif',
            'application/tif',
            'application/x-tif',
            /*-- TIFF --*/
            'image/tiff',
            'image/x-tiff',
            'application/tiff',
            'application/x-tiff',
            /*-- TXT --*/
            'application/txt',
            'browser/internal',
            'text/plain',
            'widetext/paragraph',
            'widetext/plain',
            /*-- XLS --*/
            'application/msexcel',
            'application/vnd.ms-excel',
            'application/xls',
            'application/x-excel',
            'application/x-dos_ms_excel',
            'application/x-msexcel',
            'application/x-ms-excel',
            /*-- XLSX --*/
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ],

         data :
            {
            filterAttrib : ""
            },


         /*-- ERROR --------------------------------------*/
         error : function (err, file)
            {
            switch (err)
               {
               case 'BrowserNotSupported' :
                  Library.alertMessage('Your browser does not support HTML5'
                     + ' uploads!', 'error');
                  break;

               case 'TooManyFiles' :
                  Library.alertMessage('Too many files! Please select '
                     + this.maxfiles + ' at most!', 'error');
                  break;

               case 'FileTooLarge' :
                  Library.alertMessage('Uploaded file [' + file.name
                     + '] is too big!', 'error');
                  break;

               case 'FileTypeNotAllowed':
                  Library.alertMessage('Uploaded file type [' + file.name
                        + '] is not allowed here.', 'error');
                  break;

               default:
                  break;
               }

            /*-- Switch the panes --*/
            $('#dragAndDropPane').hide();
            $('#fileItemsPane').show();

            /*-- Remove the added uploadbox --*/
            $.data(file).remove();
            Library.contentEmpty(true);
            },
         /*-----------------------------------------------*/

         /*-- BEFORE UPLOADING ---------------------------*/
         beforeEach : function (file)
            {
            /*-- Make sure the file pane is showing --*/
            $('#dragAndDropPane').hide();
            $('#fileItemsPane').show();

            this.data.filterAttrib = Library.libType + "/" + Library.libFilter
               + "/" + Library.libFilterId;

            var newfile = this.checkResize(file);

            this.createPreview(newfile);
            },
         /*-----------------------------------------------*/

         /*-- UPLOADING STARTED --------------------------*/
         uploadStarted : function (i, file, len)
            {
            dropcount = dropcount + 1;
            $.data(file).addClass('uploading');
            Library.contentEmpty(false);
            },
         /*-----------------------------------------------*/

         /*-- UPLOADING PROGRESS -------------------------*/
         progressUpdated : function (i, file, progress)
            {
            $.data(file).find('.bar').width(progress);
            },
         /*-----------------------------------------------*/

         /*-- UPLOADING FINISHED -------------------------*/
         uploadFinished : function(i, file, response, time)
            {
            /*-- Check if response is json --*/
            try
               {
               var jsonobj = jQuery.parseJSON(response);
               if (typeof jsonobj == 'object')
                  {
                  /*-- Check if the response is an error --*/
                  if (response.status == "ERROR")
                     {
                     Library.alertMessage(response.message, 'error');
                     $.data(file).remove();
                     }
                  else if (response.status == "SUCCESS")
                     {
                     $.data(file).find('a.delete-file').attr('id',
                        "delete-" + response.id);
                     $.data(file).find('a.itemTopBtnView').attr('href',
                        response.path);
                     $.data(file).find('a.itemTopBtnView').attr('data-download',
                        response.download);
                     $.data(file).find('a.itemTopBtnView').attr('title',
                        response.name);
                     $.data(file).find('a.itemTopBtnDownload').attr('href',
                        response.download);
                     $.data(file).find('a.itemTopBtnDownload').attr('title',
                        response.name);

                     $.data(file).attr('data-id', response.id);
                     $.data(file).removeClass('uploading');
                     $.data(file).find('.name').text(response.name);

                     $('#fileItemsPane').jScrollPane({hideFocus: true});
                     Library.totalContent = Library.totalContent + 1;
                     successcount = successcount + 1;

                     var storage_box = null;
                     if (response.used_storage == "over")
                        storage_box = $(Library.over_warning);
                     else if (response.used_storage == "high")
                        storage_box = $(Library.high_warning);

                     $('.loadMore').empty();
                     if (storage_box)
                        {
                        storage_box.prependTo($('.loadMore'));
                        $('#storage_memo').tooltip();
                        }

                     $.data(file).find('.file').trigger('click');
                     }
                  else
                     {
                     Library.alertMessage("Upload server experienced an"
                        + " uncaught error. Please try again.", 'error');
                     $.data(file).remove();
                     }
                  }
               else
                  {
                  Library.alertMessage("Upload server busy at the moment. "
                     + "Please try again.", 'error');
                  $.data(file).remove();
                  }
               }
            catch (e)
               {
               Library.alertMessage("Upload server is confused at the moment. "
                  + "Please try again." + response, 'error');
               $.data(file).remove();
               }
            },
         /*-----------------------------------------------*/

         /*-- PREVIEW CREATION ---------------------------*/
         createPreview : function (file)
            {
            var preview = $(Library.upload_box),
               reader = new FileReader();

            reader.onload = function(e)
               {
               /*-- Prepare basic resizing for the preview image --*/
               if (file.type.match(/^image\//))
                  {
                  var thumb = Library.uploadThumb(e.target.result);
                  $('.file', preview).append(thumb);

                  /*-- Add standard class to the image --*/
                  $('.file', preview).addClass("file-type-img");

                  /*-- Manipulate download button to display view --*/
                  $('.itemTopBtnDownload', preview).attr("data-toggle",
                     "modal");
                  $('.itemTopBtnDownload', preview).attr("rel", "lightbox");
                  $('.itemTopBtnDownload', preview).text("View");
                  }
               else
                  {
                  if (file.type.match(/excel/) || file.type.match(/xls/))
                     {
                     $('.file', preview).addClass("file-type-xls");
                     }
                  else if (file.type.match(/pdf/) || file.type.match(/acrobat/))
                     {
                     $('.file', preview).addClass("file-type-pdf");
                     }
                  else if (file.type.match(/powerpoint/)
                     || file.type.match(/presentation/))
                     {
                     $('.file', preview).addClass("file-type-ppt");
                     }
                  else $('.file', preview).addClass("file-type-doc");

                  /*-- Manipulate view button to display download --*/
                  $('.itemTopBtnView', preview).removeAttr("data-toggle");
                  $('.itemTopBtnView', preview).removeAttr("rel");
                  $('.itemTopBtnView', preview).text("Download");
                  }
               };
            reader.readAsDataURL(file);

            /*-- Attach the preview box to the library --*/
            preview.prependTo($('#library_file_list'));

            /*-- Save the preview box in relation with the file --*/
            $.data(file, preview);
            },
         /*-----------------------------------------------*/

         /*-- RESIZE BEFORE UPLOADING --------------------*/
         checkResize : function (file)
         {
            /*-- Only resize those of type image --*/
            if (file.type.match(/^image\//))
            {
                /*-- Resizing image --*/
//                alert("IMAGE FILE");
                
/*                
                var filesToUpload = input.files;
var file = filesToUpload[0];
var img = document.createElement("img");
var reader = new FileReader();  
reader.onload = function(e) {img.src = e.target.result}
reader.readAsDataURL(file);

var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);

var MAX_WIDTH = 800;
var MAX_HEIGHT = 600;
var width = img.width;
var height = img.height;

if (width > height) {
  if (width > MAX_WIDTH) {
    height *= MAX_WIDTH / width;
    width = MAX_WIDTH;
  }
} else {
  if (height > MAX_HEIGHT) {
    width *= MAX_HEIGHT / height;
    height = MAX_HEIGHT;
  }
}
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, width, height);

// var dataurl = canvas.toDataURL("image/png");
var dataurl = canvas.toDataURL("image/jpeg", 0.5);
*/
               // if (!!window.FileReader)
               if( window.FormData !== undefined )
        {
//            alert('supported');
        }
        else
        {
//             alert('not supported');
        }
                
                
                return file;
            }
            else
            {
                /*-- Not an image. Return File --*/
                return file;
            }
         },
         /*-----------------------------------------------*/

         /*-- ALL FILES DEALT WITH -----------------------*/
         afterAll : function ()
            {
                /*
                 * if add-photo-btn exists, auto-close library_modal.  Pass
                 * files back
                 * else, do nothing by default
                 */
            if($('.add-photo-btn').length > 0)
                {
                if(dropcount <= successcount)
                    {
                    $(".add-photo-btn").trigger('click');
                    }
                }
            }
         /*-----------------------------------------------*/
         });
      /*--------------------------------------------------*/
      },
   /*-------------------------------------------------------------------------*/

   /*-- Create the thumbnail image for the upload ----------------------------*/
   uploadThumb : function (imgdata)
      {
      var image = new Image();
      image.src = imgdata;

      image.onload = function()
         {
         var w, h, mw = 120, mh = 89;

         w = $(this).width();
         h = $(this).height();

         if (h > w)
            {
            $(this).css('height', mh);
            $(this).css('width', 'auto');
            }
         else
            {
            $(this).css('width', mw);
            $(this).css('height', 'auto');
            }
         }

      var spanImg = $("<span class='hl valign-img'></span>");
      spanImg.append(image);

      return spanImg;
      },
   /*-------------------------------------------------------------------------*/





   /*-------------------------------------------------------------------------*/
   /*-- CONTENT MANIPULATION SUBROUTINES -------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- load an empty content in the file list -------------------------------*/
   contentEmpty : function (set)
      {
      /*-- remove the empty box --*/
      if (!set)
         {
         $('#library_file_list .load-more-empty').remove();
         }
      /*-- Add the empty box --*/
      else if (set && $('#library_file_list').is(':empty'))
         {
         $('#library_file_list').empty();
         var emptylib = $(Library.empty_box);

         $('#library_file_list .load-more-empty').remove();
         emptylib.prependTo($('#library_file_list'));
         }
      },
   /*-------------------------------------------------------------------------*/

   /*-- Load the content of the library via ajax -----------------------------*/
   contentLoad : function (offset, limit)
      {
      if (Library.contentMaxed) return false;
      if (Library.loadContent) return false;
      else Library.loadContent = true;

      var fullurl = Library.libUrl + "load_contents/" + offset + "/"
         + limit + "/" + Library.libType + "/" + Library.libFilter + "/"
         + Library.libFilterId;

      $.ajax(
         {
         url : fullurl,

         success : function(data)
            {
            $('#library_file_list').append($(data));

            if (data) Library.totalContent = Library.totalContent + limit;
            else Library.contentMaxed = true;
            Library.loadContent = false;

            $('#fileItemsPane').jScrollPane({hideFocus: true});

            if (!$('.load-more-empty').length) Library.show_add_message(true);
            else Library.show_add_message(false);
            },
         error : function (xhr, status)
            {
            Library.loadContent = false;
            }
         });

      return;
      },
   /*-------------------------------------------------------------------------*/

   /*-- Delete an item in the library ----------------------------------------*/
   contentDel : function (e)
      {
      e.preventDefault();
      var url = $(this).attr('id');
      var parentli = $(this).closest('li');

      /*-- Check current filter if no filter is selected --*/
      if ($('.current-filter .content .caption').text() == "No Filter")
         {
         Library.alertMessage("Cannot delete on the No Filter setting.",
            'error');
         return false;
         }

      /*-- Check if current dseleted item is selected --*/
      var selectId = parentli.attr('data-id');
      var idPosition = jQuery.inArray(selectId, Library.selectedContent);
      if(parentli.hasClass('select') && idPosition > -1)
         {
         Library.selectedContent.splice(idPosition, 1);
         }
      if(parentli.hasClass('select') && idPosition < 0)
         {
         if (Library.libSelect == 1) Library.selectedContent = [];
            Library.selectedContent.push(selectId);
         }

      /*-- Immidiately hide the parentli --*/
      parentli.hide();

      /*-- Ajax delete the content --*/
      var fullurl = Library.libUrl + "delete/" + url + "/"
         + Library.libType + "/" + Library.libFilter + "/"
         + Library.libFilterId;

      $.get(fullurl, function(data)
         {
         })
      .success(function(data)
         {
         try
            {
            var jsonobj = jQuery.parseJSON(data);
            if (jsonobj.status == "ERROR")
               {
               parentli.show();
               //alert(jsonobj.message);
               Library.alertMessage(jsonobj.message, 'error');
               }
            else
               {
               parentli.remove();

               /*-- Reduce the count of items in the library and load more --*/
               /*-- if it falls below the minimum content. --*/
               Library.totalContent = Library.totalContent - 1;
               if (Library.totalContent < Library.minContent)
                  Library.contentLoad(Library.totalContent,
                     Library.minContent - Library.totalContent);

               $('#fileItemsPane').jScrollPane({hideFocus: true});

               var storage_box = null;
               if (jsonobj.used_storage == "over")
                  storage_box = $(Library.over_warning);
               else if (jsonobj.used_storage == "high")
                  storage_box = $(Library.high_warning);

               $('.loadMore').empty();
               if (storage_box)
                  {
                  storage_box.prependTo($('.loadMore'));
                  $('#storage_memo').tooltip();
                  }
               }
            }
         catch (err)
            {
            parentli.show();
            Library.alertMessage("Unknown error encountered while deleting the"
               + " file. " + err.message, 'error');
            }

         Library.contentEmpty(true);
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Reset the contents of the library widget -----------------------------*/
   contentReset : function (urltag)
      {
      /*-- Clear the current content box --*/
      $('#library_file_list').empty();
      Library.urlTagSplit(urltag);

      Library.loadContent = false;
      Library.contentMaxed = false;
      Library.totalContent = 0;

      /*-- Reload the contents --*/
      this.contentLoad(0, Library.minContent);
      },
   /*-------------------------------------------------------------------------*/

   /*-- Scroll event to load more content ------------------------------------*/
   contentScroll : function ()
      {
      $('#library_modal').off("scroll", '#fileItemsPane');
      $('#library_modal').on("scroll" , '#fileItemsPane' , function()
         {
         var getHeightOfScrollContainer = $('.jspContainer').height();
         var getTopPositionOfjspPane = $('.jspPane').css('top');
         var getHeightOfjspPane = $('.jspPane').css('height');

         n = parseInt(getTopPositionOfjspPane.replace('px',''));
         m = parseInt(getHeightOfjspPane.replace('px',''));
         var getPosOfscrollPane = (n + m);

         if(getHeightOfScrollContainer === getPosOfscrollPane)
            {
            Library.contentLoad(Library.totalContent, Library.scrollContent);
            }
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- When hovering over an item in the content ----------------------------*/
   contentHover : function ()
      {
      $('.library-file-items').off('mouseenter', '.content');
      $('.library-file-items').on('mouseenter', '.content', function()
         {
         if(!$(this).parents('li').hasClass('uploading'))
            {
            $(this).parents('li').addClass("current");
            }
         });

      $('.library-file-items').off('mouseleave', '.content');
      $('.library-file-items').on('mouseleave', '.content', function()
         {
         $(this).parents('li').removeClass("current");
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- When Selecvting an item in the library -------------------------------*/
   contentSelect : function ()
      {
      $('.library-file-items').off("click", '.file')
      $('.library-file-items').on("click", '.file', function()
         {
         var selectedItem = $(this).parents('.library-file-items li');
         if(!selectedItem.hasClass('uploading'))
            {
            if (Library.libSelect == 0) return false;
            if (!selectedItem.hasClass('select') && Library.libSelect > 0)
               {
               if (Library.libSelect == 1)
                  $('.library-file-items>li.select').removeClass('select');
               else if (Library.selectedContent.length >= Library.libSelect)
                  {
                  Library.alertMessage("You can only select "
                     + Library.libSelect + " items.", 'warning');
                  return false;
                  }
               }

            selectedItem.toggleClass('select');

            var selectId = selectedItem.attr('data-id');
            var idPosition = jQuery.inArray(selectId, Library.selectedContent);
            if(!selectedItem.hasClass('select') && idPosition > -1)
               {
               Library.selectedContent.splice(idPosition, 1);
               }
            if(selectedItem.hasClass('select') && idPosition < 0)
               {
               if (Library.libSelect == 1) Library.selectedContent = [];
               Library.selectedContent.push(selectId);
               }
            }
         });

      $('.library-file-items').off("click", '.name')
      $('.library-file-items').on("click", '.name', function()
         {
         var selectedItem = $(this).parents('.library-file-items li');
         if(!selectedItem.hasClass('uploading'))
            {
            if (Library.libSelect == 0) return false;
            if (!selectedItem.hasClass('select') && Library.libSelect > 0)
               {
               if (Library.libSelect == 1)
                  $('.library-file-items>li.select').removeClass('select');
               else if (Library.selectedContent.length >= Library.libSelect)
                  {
                  Library.alertMessage("You can only select "
                     + Library.libSelect + " items.", 'warning');
                  return false;
                  }
               }

            selectedItem.toggleClass('select');

            var selectId = selectedItem.attr('data-id');
            var idPosition = jQuery.inArray(selectId, Library.selectedContent);
            if(!selectedItem.hasClass('select') && idPosition > -1)
               {
               Library.selectedContent.splice(idPosition, 1);
               }
            if(selectedItem.hasClass('select') && idPosition < 0)
               {
               if (Library.libSelect == 1) Library.selectedContent = [];
               Library.selectedContent.push(selectId);
               }
            }
         });

      },
   /*-------------------------------------------------------------------------*/

   /*-- Change the name of the content ---------------------------------------*/
   contentEdit : function ()
      {
      $('.library-file-items').off("dblclick", '.name');
      $('.library-file-items').on("dblclick", '.name', function()
         {
         var name = $(this).html(),
            parentli = $(this).parents('li');
         var dataId = parentli.attr("data-id");

         var editfield = $('<input type="text" id="editableField" data-id="'
            + dataId + '" data-original-name="' + name + '" value="' + name
            + '"">');
         $(this).replaceWith(editfield);
         editfield.focus();
         });

      $('.library-file-items').off("keypress", '#editableField');
      $('.library-file-items').on("keypress", '#editableField', function(e)
         {
         var el = $(this);
         if (e.keyCode == 13) el.trigger('blur');
         });

      $('.library-file-items').off("blur", '#editableField');
      $('.library-file-items').on("blur", '#editableField', function()
         {
         var el = $(this),
            newName = el.val(),
            parentli = $(this).parents('li');

         var dataId = el.attr("data-id");
         var dataName = el.attr("data-original-name");
         var dataView = $(this).siblings('a.itemTopBtnView').attr('href');
         var dataDown = $(this).siblings('a.itemTopBtnDownload').attr('href');

         if (newName)
            {
            if (newName != dataName)
               {
               $.ajax(
                  {
                  type : "POST",
                  url : "/files/library/rename",
                  data : { renId : dataId, renVal : newName },
                  async : false,

                  success : function(data)
                     {
                     var jsonobj = jQuery.parseJSON(data);
                     if (jsonobj.status == "ERROR")
                        //alert(jsonobj.message);
                        Library.alertMessage(jsonobj.message, 'error');
                     else
                        {
                        dataName = jsonobj.filename;
                        dataView = jsonobj.fileview;
                        dataDown = jsonobj.filedown;
                        }
                     },
                  error : function (xhr, status)
                     {
                     var jsonobj = jQuery.parseJSON(status);
                     //alert(jsonobj.message);
                     Library.alertMessage(jsonobj.message, 'error');
                     }
                  });
               }
            }
         else
            {
            //alert('Field is Required. Not renaming.');
            Library.alertMessage('Field is Required. Not renaming.', 'error');
            }

         var newfield = $('<div class="name">' + dataName + '</div>');
         $(this).replaceWith(newfield);

         parentli.children('a.itemTopBtnView').attr('href', dataView);
         parentli.children('a.itemTopBtnDownload').attr('href', dataDown);
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- SHOW_ADD_MESSAGE -----------------------------------------------------*/
   show_add_message: function (show)
      {
      if (!Library.show_message) return false;
      if (!show)
         {
         $('.msg-add-photo-ads').html("");
         return true;
         }

      switch (Library.show_message)
         {
         case 'advertisement' :
            $('.msg-add-photo-ads').html("Select the Photos to add to your "
               + "Advertisement");
            break;

         case 'property' :
            $('.msg-add-photo-ads').html("Select the Photo that best matches "
               + "your Property");
            break;

         case 'profile' :
            $('.msg-add-photo-ads').html("Select the Photo to use as your "
               + "Avatar");
            break;

         default :
            $('.msg-add-photo-ads').html("");
            break;
         }
      },//end show_add_message
   /*------------------------------------------------------------------------*/


   /*-------------------------------------------------------------------------*/
   /*-- EXTERNAL RELATED FUNCTIONS -------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Upload button click --------------------------------------------------*/
   uploadSelect : function(e)
      {
      e.preventDefault();
      $("#lib-upload-btn").trigger('click');
      },
   /*-------------------------------------------------------------------------*/

   /*-- Call any callback functions requested if it exists -------------------*/
   addLibCallback : function ()
      {
      if (typeof passFiles == 'function')
         {
            passFiles(Library.selectedContent, Library.imgId);
         }
      },
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- FILTER RELATED FUNCTIONS ---------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Enable dropdown of the filter selection ------------------------------*/
   dropFilter : function ()
      {
      $('.current-filter').off("click");

      $(document).on("click", function(e) {
         var mainFilter = $(".main-filter .content");
         if(mainFilter.hasClass("active")) {
            mainFilter.removeClass("active");
         }
      });

      $('.current-filter').on("click", function(event)
         {
         event.preventDefault();
         event.stopPropagation();
         var parentDiv = $(this).parents('.content');
         parentDiv.toggleClass('active');
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Enable filter selection on the filter buttons ------------------------*/
   selectFilter : function ()
      {
      $('.filter-items ul li a').off("click");
      $('.filter-items ul li a').on("click" ,function()
         {

         $(this).parents('.content').toggleClass('active');

         var filtertag = $(this).parent().attr("data-id");
         if (!filtertag) Library.urlTagSplit(filtertag);
         var i = $(this).find('img').attr('src');
         var s = $(this).children('.caption').html();
         $('.current-filter .content').empty();
         $('.current-filter .content').append("<span class='thm'><img src="
            + i + "></span><span class='caption'><em>" + s + "</em></span>");
         Library.contentReset(filtertag);

         return false;
         });

      },

   // End Updated : Bryan
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- LIBRARY INITIALIZATION -----------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Split the URL tag given into its applicable library elements ---------*/
   urlTagSplit : function (urlTag)
      {
      var url = '';

      if (!urlTag) return false;
      if (urlTag.match(/^http/))
         {
         var apos = urlTag.search("library/index");
         if (apos > -1) url = urlTag.substr(apos + 14);
         }
      else url = urlTag;
      if (!url) return false;

      var darray = url.split("/");

      if (darray[0]) Library.libType = darray[0];
      else Library.libType = "all";

      if (darray[1]) Library.libFilter = darray[1];
      else Library.libFilter = "user";

      if (darray[2]) Library.libFilterId = darray[2];
      else Library.libFilterId = "1";

      return false;
      },
   /*-------------------------------------------------------------------------*/

   /*-- Launch the library via ajax ------------------------------------------*/
   libraryLaunch : function(e)
      {
      var screenTop = parseInt($(document).scrollTop());
      var windowHeight = parseInt($(window).height());
      if(windowHeight > 739)
         {
         $('#library_modal').removeClass('smaller')
         }
      else if (windowHeight < 739)
         {
         $('#library_modal').addClass('smaller')
         }

      e.preventDefault();
      var url = $(this).attr('href');
      Library.urlTagSplit(url);

      var control = $(this).attr('data-img-id');
      if (control) Library.imgId = control;
      else Library.imgId = "";

      var control = $(this).attr('data-control');
      if (control) Library.libControl = control;
      else Library.libControl = "";

      var select = $(this).attr('data-select');
      if (select) Library.libSelect = select;
      else Library.libSelect = "multiple";

      var toolmsg = $(this).attr('data-toolmsg');
      if (toolmsg) Library.show_message = toolmsg;
      else Library.show_message = "";

      /*-- Call to open the library --*/
      if (url.indexOf('#') == 0)
         {
         $('#library_modal').modal('open');
         }
      else
         {
         var fullurl = Library.libUrl + "index/" + Library.libType + "/"
            + Library.libFilter + "/" + Library.libFilterId + "/"
            + Library.libControl;


         $.get(fullurl, function(data)
            {
            $('#library_modal').html(data);
            $('#library_modal').modal({backdrop: true});

            Library.libraryInit();
            })
         .success(function() {});
         }
      },
   /*-------------------------------------------------------------------------*/

   /*-- Initialize the elements inside the main library modal ----------------*/
   libraryInit : function()
      {
      this.paneSwitch();

      $('.upload-btn').off("click", Library.uploadSelect);
      $('.upload-btn').on("click", Library.uploadSelect);
      this.dropzoneInit();

      $('.add-photo-btn').off("click", Library.addLibCallback);
      $('.add-photo-btn').on("click", Library.addLibCallback);

      $('#library_file_list').off('click', 'a.delete-file', Library.contentDel);
      $('#library_file_list').on('click', 'a.delete-file', Library.contentDel);

      this.selectedContent = [];

      this.contentReset(false);
      this.contentScroll();

      this.dropFilter();
      this.selectFilter();
      this.contentHover();
      this.contentSelect();
      this.contentEdit();

      $('#storage_memo').tooltip();
      },
   /*-------------------------------------------------------------------------*/

   /*-- Initialization -------------------------------------------------------*/
   init : function()
      {
      $(document).off("click", "a.library_link");
      $(document).on("click", "a.library_link", Library.libraryLaunch);
      $(document).on("mousedown", ".undraggable", function(){return false;});
      }
   /*-------------------------------------------------------------------------*/
   };
Library.init();


