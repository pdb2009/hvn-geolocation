/*! 
* jQuery Countdown Timer 1.2 Plugin
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk
* Licensed under MIT License
* See http://www.webmuse.co.uk/license/
*/
(function($) {
   
	$.fn.countdown = function( options ) {  
	
		var defaults = {
				date: new Date(),
				updateTime: 1000,
				onChange: null,
				onComplete: null,
                numFrames: 5
			},
			opts = {},
			rDate = /(%\{d\}|%\{h\}|%\{m\}|%\{s\})/g,
			rDays = /%\{d\}/,
			rHours = /%\{h\}/,
			rMins = /%\{m\}/,
			rSecs = /%\{s\}/,
			complete = false,
			floor = Math.floor,
			onChange = null,
			onComplete = null;
		   
		$.extend( opts, defaults, options );
		
        return this.each(function() {
		
			var $this = $(this),
        
                timer,
				TodaysDate,
				CountdownDate = new Date( opts.date ),
				msPerDay = 864E5, //24 * 60 * 60 * 1000
				timeLeft,
				e_daysLeft,
				daysLeft,
				e_hrsLeft,
				hrsLeft,
				minsLeft,					
				e_minsleft,
                secLeft,
                prevDays, 
                prevHrs,
                prevMins,
                prevSecs, 
                frameTimer,
                frameIndex=0,
                digitTrans = [];

			if( opts.onChange){
				$this.bind("change", opts.onChange);
			}
			
			if( opts.onComplete ){
                $this.bind("complete", opts.onComplete);
			}
           
            
                        
            // Setup elements
            var id = $this.attr('id');

            $this.html($('<div id="cnt_days'+id+'" class="cnt_days"/><div id="cnt_hours'+id+'" class="cnt_hours"/><div id="cnt_mins'+id+'" class="cnt_mins"/><div id="cnt_secs'+id+'" class="cnt_secs" />'));
            
            
            
            /**
            * Sets elements to display digits graphics.
            */
            $this.setDigits = function( parent, value, prevValue){
                 
                 parent.empty();
                
                                                  
                 if(value < 10){
                    value = '0' + value;
                 }else{
                    value +='';
                 }
                 
                if(prevValue < 10){
                    prevValue = '0' + prevValue;
                 }else{
                    prevValue +='';
                 }
               
               
               var container = $('<div><div>');
                parent.append(container);
                
                container.css({'width': value.length*18 + 'px', 
                                'display':'block',
                                'position':'absolute',
                                'left': '50%',
                                'margin-left': -value.length*18*0.5 + 'px'
                });
                                                 
                                                
                // Split value into digits
                for(var i=0; i < value.length; i++){
                
                    var digitValue = value.charAt(i);
                
                    var elem = $('<div class="cntDigit" />');
                       
                        if(daysLeft < 100){
                         
                           elem.css({
                            height: 28, 
                            float: 'left', background: 'url("../../media/cm/menshealthuk/site_images/countDown/numbers.png")',
                            width: 22});
                            
                        }else{
                            
                            elem.css({
                            height: '23', 
                            float: 'left', background: 'url("../../media/cm/menshealthuk/site_images/countDown/numbersSmall.png")',
                            width: '18'});
                        }
                        
                        elem.css({
                            height: '23', 
                            float: 'left', background: 'url("../../media/cm/menshealthuk/site_images/countDown/numbersSmall.png")',
                            width: '18'});
                        
                        var w = elem.width();
                        var h = elem.height();
                        
                        
                        
                        if(digitValue != prevValue.charAt(i)){
                        
                            // Select correct digit and start at first frame
                            elem.css('background-position', -digitValue*w + 'px 0px');
                            digitTrans.push({elem:elem, frameStart:0, frameEnd:opts.numFrames, posX:-value.charAt(i)*w});
                            
                        }else{
                            // Select correct digit and start at last frame
                            elem.css('background-position', -digitValue*w + 'px ' + -h*(opts.numFrames-1) + 'px');

                        }
                        
                        container.append(elem);
                }
            }
            
            
            
            /**
            * Update the display on interval tick.
            */
            $this.tick = function(){
				
				TodaysDate = new Date(),
				timeLeft = CountdownDate.getTime() - TodaysDate.getTime(),
				e_daysLeft = timeLeft / msPerDay,
				daysLeft = floor(e_daysLeft),
				e_hrsLeft = (e_daysLeft - daysLeft)*24, //Gets remainder and * 24
				hrsLeft = floor(e_hrsLeft),
				minsLeft = floor((e_hrsLeft - hrsLeft)*60),					
				e_minsleft = (e_hrsLeft - hrsLeft)*60, //Gets remainder and * 60
				secLeft = floor((e_minsleft - minsLeft)*60);
                
                
                if(timeLeft <= 0){
                    
                    // Stop at 0
                    daysLeft = 0;
                    hrsLeft = 0;
                    minsLeft = 0;
                    secLeft = 0;
                    
                    complete = true;
                    
                }else{
                    
                     // Make sure nothing is less than 0
                    if(daysLeft < 0) daysLeft = 0;
                    if(hrsLeft < 0) hrsLeft = 0;
                    if(minsLeft < 0) minsLeft = 0;
                    if(secLeft < 0) secLeft = 0;
                }
                
                            
                if(daysLeft < 100){
                    //$this.addClass('counter');
                    $this.addClass('counterSmall');
                }else{
                    $this.addClass('counterSmall');
                }
                
               var id = $this.attr('id');
               
               if(prevDays != daysLeft) $this.setDigits($('#cnt_days'+id), daysLeft, prevDays);
               if(prevHrs != hrsLeft) $this.setDigits($('#cnt_hours'+id), hrsLeft, prevHrs);
               if(prevMins != minsLeft) $this.setDigits($('#cnt_mins'+id), minsLeft, prevMins);
               if(prevSecs != secLeft) $this.setDigits($('#cnt_secs'+id), secLeft, prevSecs);
  
              				                
				$this.trigger('change', [timer] );
			    
                // Check if countdown is complete
				if ( complete ){

					$this.trigger('complete');
					clearInterval( timer );
				}
                
                prevDays = daysLeft;
                prevHrs = hrsLeft;
                prevMins = minsLeft;
                prevSecs = secLeft;     		
			
			}

			timer = window.setInterval($this.tick, opts.updateTime);
            $this.tick();
            
            
            // Frame based animation
            $this.updateFrame = function(elem, posX){
            
                for(var i=0; i < digitTrans.length; i++){
                    
                    var obj = digitTrans[i];
                    obj.elem.css('background-position', obj.posX + 'px ' + -obj.elem.height()*obj.frameStart + 'px');
                    obj.frameStart++;
                    if(obj.frameStart == obj.frameEnd) digitTrans.splice(i, 1);
                }
            }
            
            frameTimer = window.setInterval($this.updateFrame, 1000/25);
            
            
		});
	};
       
})(jQuery);