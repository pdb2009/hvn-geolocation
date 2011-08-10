/*!
 #####################################################################
 # 
 # Phenotype HTML5+Minimal Flash Boilerplate Template
 # JavaScript setup routines
 #
 # Hand-crafted by Phenotype (phenotype.net)
 #
 #####################################################################
 */
	
	/* =Assign setup routines
	------------------------------------------------------------------- */
	
		// Called when DOM is ready
		$(document).ready( domSetup );
		
		// Called when entire page is loaded
		$(window).load( pageSetup );
		
		// Called when DOM is unloaded
		$(window).unload( domUnload );
	
	/* =Global variables
	------------------------------------------------------------------- */
    
    var deadSlides = [];
    var running = false;
    
    
    /* =Declare setup routines
	------------------------------------------------------------------- */
	
	/**
	 * domSetup()
	 *
	 * All JavaScript requiring initialisation on DOM LOAD should be called
	 * from this routine.
	 */
	function domSetup() {

		/* =Enhancements
		------------------------------------------------------------------- */
		
		
		
		/* =Navigation
		------------------------------------------------------------------- */
			
			/*
			Setup external links (target attribute not allowed by XHTML 1.1)
			(see http://www.sitepoint.com/article/standards-compliant-world/)
			*/
			$('a[rel="external"]').attr('target','blank');
            
            
            // COUNTERS
            /*$("#counterCardiff").countdown({date:"October 2, 2011 10:00:00", onComplete:removeSlide});
            $("#counterNottingham").countdown({date:"October 8, 2011 10:00:00", onComplete:removeSlide});
            $("#counterEdinburgh").countdown({date:"October 16, 2011 10:00:00", onComplete:removeSlide});
            $("#counterLondon").countdown({date:"November 12, 2011 10:00:00", onComplete:removeSlide});*/
            $('#counterCardiff').countdown({until:$.countdown.UTCDate(-3, 2011,  10 - 1, 2, 10, 0, 0), format: 'DHMS', layout: 
				'<span class="image{d10}"></span><span class="image{d1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{h10}"></span><span class="image{h1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{m10}"></span><span class="image{m1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{s10}"></span><span class="image{s1}"></span>'
			});
			$('#counterNottingham').countdown({until:$.countdown.UTCDate(-3, 2011,  10 - 1, 8, 10, 0, 0), format: 'DHMS', layout: 
				'<span class="image{d10}"></span><span class="image{d1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{h10}"></span><span class="image{h1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{m10}"></span><span class="image{m1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{s10}"></span><span class="image{s1}"></span>'
			});
			$('#counterEdinburgh').countdown({until:$.countdown.UTCDate(-3, 2011,  10 - 1, 16, 10, 0, 0), format: 'DHMS', layout: 
				'<span class="image{d10}"></span><span class="image{d1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{h10}"></span><span class="image{h1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{m10}"></span><span class="image{m1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{s10}"></span><span class="image{s1}"></span>'
			});
			$('#counterLondon').countdown({until:$.countdown.UTCDate(-3, 2011,  11 - 1, 12, 10, 0, 0), format: 'DHMS', layout: 
				'<span class="image{d10}"></span><span class="image{d1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{h10}"></span><span class="image{h1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{m10}"></span><span class="image{m1}"></span>' + 
				'<span class="imageSpace"></span>' + 
				'<span class="image{s10}"></span><span class="image{s1}"></span>'
			});
            
            // SCROLL LEFT
            $('#slideshow').cycle({
                fx: 'scrollLeft',
                speed:    2000, 
                timeout:  5000,
                pause:    1,
                after:    onAfter  
            });
            
            running = true;
	}
	
	/**
	 * pageSetup()
	 *
	 * All JavaScript requiring initialisation on PAGE LOAD should be called
	 * from this routine (all images and elements should be loaded and ready to
	 * manipulate by this point)
	 */
	function pageSetup() {

	}
	
	/**
	 * domUnload()
	 *
	 * Called when page/DOM is unloaded
	 */
	function domUnload() {

	}
    
    
    /**
	 * removeSlide()
	 *
	 * Add slide to dead queue when it is no longer needed
     */
    function removeSlide() {
        if(running) 
            deadSlides.push( $(this).parent() );
        else
            $(this).parent().remove();
    }
    
    
    /**
	 * onAfter()
	 *
	 * After a slide has finished its display check if any need to be removed.
     */
    function onAfter() { 
        
    
        if(deadSlides.length){
            
            // Stop previous slide show
            $('#slideshow').cycle('stop');
            
            for(i=0; i < deadSlides.length; i++){
                
                var elem = deadSlides[i];
                deadSlides.splice(i, 1);
                elem.remove();
            }
            
            deadSlides = [];
        
            $('#slideshow').cycle({
                fx: 'scrollLeft',
                speed:    2000, 
                timeout:  5000,
                pause:    1,
                after:    onAfter  
            });
        }
    }