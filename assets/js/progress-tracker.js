var progressTracker = {
    jQuery : $,
 
    init : function () {
        this.addBgOnIcons();        
    },

    addBgOnIcons : function() {
    
      $('.steps-icon').hover(      	      	
  			function () {    			  		
  				var e, el, elLeft;
  				parentElement = $(this).parent();
    			element = $(this).position();    
    			elLeft = element.left;  			
    			$(parentElement).prepend($("<div class='progress-tracker-icon-bg' style='left:" + elLeft + "px'></div>"));
  			},
  			function () {
    			$('.progress-tracker-icon-bg').remove();
  			}
		);
    },
   
};

progressTracker.init();