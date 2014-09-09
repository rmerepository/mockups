/*-- DASHBOARD ---------------------------------------------------------------*/
var Dashboard =
   {
   jQuery : $,

   settings :
      {
      columns : '.column',
      widgetSelector: '.widget',
      handleSelector: '.ui-drag',
      contentSelector: '.widget-content',
      widgetWithCollapisbleNote: $('.collapsible'),
      widgetDefault :
         {
         movable: true,
         removable: true,
         collapsible: true,
         editable: true,
         },
      widgetIndividual: {}
      },


   /*-------------------------------------------------------------------------*/
   /*-- WIDGET ADD LISTING AND SAVING ----------------------------------------*/
   /*-------------------------------------------------------------------------*/

   // ADDED HOVER CLASS FOR COLLAPSIBE AREA
   widgetCollapsible : function () 
      {
         settings = this.settings;
         
         settings.widgetWithCollapisbleNote.mouseenter(function() {
           $(this).addClass('widget-hover')        ;
         }).mouseleave(function() {
            $(this).removeClass('widget-hover');
         });
      },
   

   /*-- Widget list settings -------------------------------------------------*/
   widgetSettings : function ()
      {
      $(document).on('click', function(e)
         {
         if($('#widgetSettings').hasClass('active'))
            {
            $('#widgetSettings').toggleClass('active');
            $('#widgetSettingsList').toggleClass('show');
            }
         });

      $('#widgetSettings').click(function(e)
         {
         e.preventDefault();
         e.stopPropagation();
         $(this).toggleClass('active');
         $('#widgetSettingsList').toggleClass('show');
         });

      $('#widgetSettingsList-menu a').click(function()
         {
         var checkBox = $(this).children('em');
         var active = checkBox.hasClass('active');
         var widgId = $(this).attr('id');
         $(this).addClass('active');
         if(active)
            {
            $(this).removeClass('active');
            $('#' + widgId + '_widget').remove();
            checkBox.removeClass('active');
            }
         else
            {
            Dashboard.add_widget(widgId);
            checkBox.addClass('active');
            }

         Dashboard.save_widgets();
         widgetName = $(this).attr('href').slice(1);
         return false;
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Add a widget via ajax ------------------------------------------------*/
   add_widget : function (widget)
      {
      jQuery.ajax(
         {
         url: '/dashboard/add_widget',
         type: 'POST',
         data: 'dash_id=' + dash_id + '&widget=' + widget,
         async: false,
         success: function(data)
            {
            var newdata =
               $('<li class="widget" id="' + widget + '_widget" />').html(data);

            /*-- Build the column list to determine position --*/
            var column1 = 0;
            var column2 = 0;
            var column3 = 0;

            $('.widget', $('.column')).each(function (i)
               {
               if (this.parentNode.id == "column1") column1 = column1 + 1;
               else if (this.parentNode.id == "column2") column2 = column2 + 1;
               else if (this.parentNode.id == "column3") column3 = column3 + 1;
               });

            /*-- Attach the new data to the shortest of the 2 columns --*/
            if ((column1 <= column2) && (column1 <= column3))
               $('#column1').append(newdata);
            else if ((column2 <= column1) && (column2 <= column3))
               $('#column2').append(newdata);
            else $('#column3').append(newdata);

            Dashboard.makeSortable();
            },
         error: function (xhr, status) {}
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Save the position of the dashboard widgets to the server -------------*/
   save_widgets : function ()
      {
      var column1 = new Array();
      var column2 = new Array();
      var column3 = new Array();

      $('.widget', $('.column')).each(function (i)
         {
         if (this.parentNode.id == "column1") column1.push(this.id);
         else if (this.parentNode.id == "column2") column2.push(this.id);
         else if (this.parentNode.id == "column3") column3.push(this.id);
         });

      jQuery.ajax(
         {
         url: '/dashboard/save',
         type: 'POST',
         data: 'dash_id=' + dash_id
            + '&column1=' + column1.join('/')
            + '&column2=' + column2.join('/')
            + '&column3=' + column3.join('/'),

         success: function(data) {},
         error: function (xhr, status) {}
         });
      },
   /*-------------------------------------------------------------------------*/


   /*-------------------------------------------------------------------------*/
   /*-- WIDGET BEHAVIOUR CONTROLS --------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Make the widgets collapsible -----------------------------------------*/
   collapsibleWidget : function ()
      {
      $('.column').on('click', '.close-widget', function()
         {
         var widgetli = $(this).parent();

         var liid = widgetli.attr('id');
         liid = liid.substring(0, liid.length - 7);

         $('a#' + liid).removeClass("active");
         var checkBox = $('a#' + liid).children('em');
         checkBox.removeClass('active');

         widgetli.remove();
         Dashboard.save_widgets();

         return false;
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Combine default and per widget settings ------------------------------*/
   getWidgetSettings : function (id)
      {
      var $ = this.jQuery,
      settings = this.settings;
      return (id&&settings.widgetIndividual[id]) ?
         $.extend({},settings.widgetDefault,settings.widgetIndividual[id])
         : settings.widgetDefault;
      },
   /*-------------------------------------------------------------------------*/

   /*-- Make the items in the columns draggable and sortable -----------------*/
   makeSortable : function ()
      {
      var Draggable = this,
      $ = this.jQuery,
      settings = this.settings,
      $sortableItems = (function ()
         {
         var notSortable = '';
         $(settings.widgetSelector, $(settings.columns)).each(function (i)
            {
            if (!Draggable.getWidgetSettings(this.id).movable)
               {
               if(!this.id)
                  {
                  this.id = 'widget-no-id-' + i;
                  }
               notSortable += '#' + this.id + ',';
               }
            });

         if (notSortable.length > 0)
            {
            return $('> li:not(' + notSortable + ')', settings.columns);
            }
         else
            {
            return $('> li', settings.columns);
            }
         })();

      $sortableItems.find(settings.handleSelector).css({cursor: 'move'})
         .mousedown(function (e)
            {
            $sortableItems.css({width:''});
            $(this).parent().css(
               {
               width: $(this).parent().width() + 'px'
               });
            })
         .mouseup(function ()
            {
            if(!$(this).parent().hasClass('dragging'))
               {
               $(this).parent().css({width:''});
               }
            else
               {
               $(settings.columns).sortable('disable');
               }
            });

      $(settings.columns).sortable(
         {
         items: $sortableItems,
         connectWith: $(settings.columns),
         handle: settings.handleSelector,
         placeholder: 'widget-placeholder',
         forcePlaceholderSize: true,
         revert: 300,
         delay: 100,
         opacity: 0.8,
         containment: 'document',
         start: function (e,ui)
            {
            $(ui.helper).addClass('dragging');
            },
         stop: function (e,ui)
            {
            $(ui.item).css({width:''}).removeClass('dragging');
            $(settings.columns).sortable('enable');

            Dashboard.save_widgets();
            }
         });
      },
   /*-------------------------------------------------------------------------*/


   /*-------------------------------------------------------------------------*/
   /*-- WIDGETS SUBROUTINES ACTIONS ------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Initialize special widget subroutines --------------------------------*/
   widgetActions : function ()
      {
      this.adwidget();
      },
   /*-------------------------------------------------------------------------*/

   /*-- Advertisement Widget Subroutines -------------------------------------*/
   adwidget : function ()
      {
      $('.adwidget_lease').on('click', function(e)
         {
         e.stopPropagation();

         var ad_id = $(this).attr('id');
         var reaAction = ad_id.substr(3);
         var reaActionMessage = 'Are you sure you want to remove your ad from'
            + ' all the real estate websites?';

         $('#reaActionModal').val(reaAction);
         $('#reaActionMessage').html(reaActionMessage);
         $('#confirmedReaAction').html('Remove Ad');
         $('#reaConfirmation').modal();
         });

      $('#confirmedReaAction').on('click', function()
         {
         var ad_action = "leased";
         var ad_idval = $('#reaActionModal').val();

         $.ajax(
            {
            type : "POST",
            url : '/promote/summary/ajax_set_status',
            data : 'advertisement_id=' + ad_idval + '&summary_event='
              + ad_action,
            async : false,
            dataType: 'JSON',

            success : function (data)
               {
               if (data.status == 'success')
                  {
                  uiAlertMsg("Thanks! Your ad will be removed within 2 hours"
                     + " and set to 'Leased'", 'success');
                  $('.sub-ads-status').hide();
                  $('.ads-status').text('Leased');
                  $('.widget-note').text('Your ad is no longer live. '
                    + 'You can re-advertise anytime');
                  }
               else
                  {
                  uiAlertMsg('Cannot change the status of your '
                    + 'advertisement at the current time. Please try again '
                    + 'later or contact us');
                  }
                  //-- check if survey is needed
                    survey_modal();
               },

            error : function ()
               {
               uiAlertMsg('Error communicating with the system to '
                  + 'change the status of your advertisement. Please try again '
                  + 'later or contact us', 'error');
               }
            });
         });

      },
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- DASHBOARD INITIALIZATION FUNCTION ------------------------------------*/
   /*-------------------------------------------------------------------------*/
   init : function ()
      {
      /*-- Basic dashboard controls --*/
      this.widgetCollapsible();
      this.makeSortable();
      this.collapsibleWidget();
      this.widgetSettings();
      this.widgetActions();
      }
   };
Dashboard.init();
/*----------------------------------------------------------------------------*/
