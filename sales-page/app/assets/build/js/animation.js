(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

$(function(){

var htmlBody = $('body')
  , htmlWindow = $(window)
  , htmlDocument = $(document);


 // SMooth scrolling link
$('[data-smth-scroll=true]').on('click', function(){
  var defGap = 0;

    $('html, body').animate({
        scrollTop: $( $(this).attr('data-href-target') ).offset().top - defGap
    }, 700);
   return false;
}); 

$(window).scroll(function(event) {
  
  $(".animate-me").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
    if ( $(this).scrollTop() > 120  ) 
      htmlBody.addClass('fixed-nav');
    else 
      htmlBody.removeClass('fixed-nav');

  
});



  $('.flexslider').flexslider({
    animation: "slide",
    directionNav: false, 
    controlNav: true,
    initDelay: 1000, 
  });

  $('.testimonials').flexslider({
    animation: "fade",
    directionNav: true, 
    controlNav: false,
  });
})
