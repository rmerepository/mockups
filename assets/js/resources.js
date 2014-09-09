var Resources =
   {
   /*-------------------------------------------------------------------------*/
   /*-- ACCORDION FUNCTIONS --------------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Hide the accordion panels --------------------------------------------*/
   hideAccordion : function ()
      {
       // $('ul.accordion > li > .content').hide();
      },
   /*-------------------------------------------------------------------------*/

   /*-- Set the accordion function on the arrow ------------------------------*/
   setAccordion : function ()
      {
      Resources.hideAccordion();

      $('ul.accordion').on('click', '.arrow', function()
         {
         var el = $(this),
             target = el.closest('.item'),
             content = target.children('.content');

          target.toggleClass('acc-active');
          content.slideToggle();

          return false;
          });
      },
   /*-------------------------------------------------------------------------*/





   /*-------------------------------------------------------------------------*/
   /*-- NAVIGATION CLICK EVENTS ----------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Top Navigation Click -------------------------------------------------*/
   setHeading : function ()
      {
      $('#s').on('click', 'a', function (e)
         {
         e.preventDefault();

         var getID = $(this).attr('data-id'),
            secLink = $(this).attr('href');

         $('.tabs > li.active').removeClass('active');
         $(this).parents('li').addClass('active');

         $('#timeline-top-icon, .nav-timeline-footer i').removeClass();

         if (getID === "startOfTenancy")
            {
            $('#timeline-top-icon').addClass('resources-icons-house-lease');
            $('.nav-timeline-footer i')
               .addClass('resources-icons-house-keychain');
            }
         else if (getID === "duringTenancy")
            {
            $('#timeline-top-icon').addClass('resources-icons-house-keychain');
            $('.nav-timeline-footer i').addClass('resources-icons-house-none');
            }
         else if (getID === "endOfTenancy")
            {
            $('#timeline-top-icon').addClass('resources-icons-house-none');
            $('.nav-timeline-footer i').addClass('resources-icons-house-lease');
            }

         Resources.loadSection(secLink);
         Resources.loadContent(secLink);
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Left Navigatiopn Click -----------------------------------------------*/
   setTimeline : function ()
      {
      $('.nav-timeline').on('click', 'a', function (e)
         {
         e.preventDefault();

         $('.nav-timeline > ul > li.active').removeClass('active');
         $(this).parents('li').addClass('active');

         var c = $(this).html();
         $('.subpage-header h1').html(c);

         Resources.loadContent($(this).attr('href'));
         });
      },
   /*-------------------------------------------------------------------------*/

   /*-- Double Click download on icons ---------------------------------------*/
   setIconClick : function ()
      {
      $('ul.accordion').on('dblclick', '.file-thumbnail', function(e)
         {
         e.preventDefault();

         var target = $(this).children('a.download').attr('href');
         window.location.href = target;
         });
      },
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- CONTENT POPULATION AJAX CALLS ----------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-- Load the Left navigation depending on the clicked header -------------*/
   loadSection : function (content_anchor)
      {
      if (!content_anchor) return;

      var sharpIdx = content_anchor.indexOf('#');
      if (sharpIdx < 0) return;
      var fullurl = '/resources/listing/load_section/'
         + content_anchor.substr(sharpIdx + 1);
      $.ajax(
         {
         url : fullurl,
         // async : false,

         success : function(data)
            {
            $('.nav-timeline>ul').empty();
            $('.subpage-header h1').empty();
            if (data)
               {
               $('.nav-timeline>ul').append($(data));

               var c = $('.nav-timeline>ul li:first > a').html();
               $('.subpage-header h1').html(c);

               Resources.setOverlay();
               }
            }
         });

      },
   /*-------------------------------------------------------------------------*/

   /*-- Load the contents of selected timeline -------------------------------*/
   loadContent : function (content_anchor)
      {
      if (!content_anchor) return;

      var sharpIdx = content_anchor.indexOf('#');
      if (sharpIdx < 0) return;
      var fullurl = '/resources/listing/load_content/'
         + content_anchor.substr(sharpIdx + 1);

      $('#presource_loader').show();
      $.ajax(
         {
         url : fullurl,
         // async : false,

         success : function(data)
            {
            $('#presource_loader').hide();
            $('ul.accordion').empty();
            if (data)
               {
               $('ul.accordion').append($(data));
               }

            Resources.hideAccordion();
            }
         });
      },
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- LOOK AND FEEL --------------------------------------------------------*/
   /*-------------------------------------------------------------------------*/

   /*-------------------------------------------------------------------------*/
   setOverlay :  function ()
      {
      var h = $('.nav-timeline>ul').height();
      $('.nav-blue-overlay').css('height',h);
      },
   /*-------------------------------------------------------------------------*/




   /*-------------------------------------------------------------------------*/
   /*-- INITIALIZATION FUNCTION ----------------------------------------------*/
   /*-------------------------------------------------------------------------*/
   init : function ()
      {
      this.setAccordion();
      this.setIconClick();
      this.setHeading();
      this.setTimeline();
      this.setOverlay();
      }
   }
Resources.init();
