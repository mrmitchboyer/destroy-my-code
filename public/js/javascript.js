$(document).ready(function() {
		
	// Generate the clips. In this case I'm using 5 (or 25 pieces)
	(genClips = function() {
		
		// For easy use
		$t = $('.exploading-code-box');
		
		// Like I said, we're using 5!
		var amount = 5;
		
		// Get the width of each clipped rectangle.
		var width = $t.height() / amount;
		var height = $t.height() / amount;
		var divWidth = $t.width()
		
		// The total is the square of the amount
		var totalSquares = Math.pow(amount, 2);
		
		// The HTML of the exploading-content
		var html = $t.find('.exploading-content').html();
		
		var y = 0;
		
		for(var z = 0; z <= (amount*width); z = z+width) { 
		
			$('<div class="clipped" style="clip: rect('+y+'px, '+(z+width)+'px, '+(y+height)+'px, '+z+'px)">'+html+'</div>').appendTo($t);
			
			if(z === (amount*width)-width) {
			
				y = y + height;
				z = -width;
			
			}
			
			if(y === (amount*height)) {
				z = 9999999;
			}
			
		}
		
	})();
	
	// A quick random function for selecting random numbers
	function rand(min, max) {
		
		return Math.floor(Math.random() * (max - min + 1)) + min;
		
	}
	
	// A variable check for when the animation is mostly over
	var first = false,
		clicked = false;
	
	// On click
		$('.blow-it-up a').on('click', function() {
		
		if(clicked === false) {
			
			clicked = true;
			
			$('.exploading-code-box .exploading-content').css({'display' : 'none'});	
	
			// Apply to each exploading-code-box div.
			$('.exploading-code-box div:not(.exploading-content)').each(function() {
				
				// So the speed is a random speed between 90m/s and 120m/s. I know that seems like a lot
				// But otherwise it seems too slow. That's due to how I handled the timeout.
				var v = rand(120, 90),
					angle = rand(80, 89), // The angle (the angle of projection) is a random number between 80 and 89 degrees.
					theta = (angle * Math.PI) / 180, // Theta is the angle in radians
					g = -9.8; // And gravity is -9.8. If you live on another planet feel free to change
					
				// $(this) as self
				var self = $(this);
				
				// time is initially zero, also set some random variables. It's higher than the total time for the projectile motion
				// because we want the squares to go off screen. 
				var t = 0,
					z, r, nx, ny,
					totalt =  15;
				
				// The direction can either be left (1), right (-1) or center (0). This is the horizontal direction.
				var negate = [1, -1, 0],
					direction = negate[ Math.floor(Math.random() * negate.length) ];
				
				// Some random numbers for altering the shapes position
				var randDeg = rand(-5, 10), 
					randScale = rand(0.9, 1.1),
					randDeg2 = rand(30, 5);
				 
				// Set an interval
				z = setInterval(function() { 	
					
					// Horizontal speed is constant (no wind resistance on the internet)
					var ux = ( Math.cos(theta) * v ) * direction;
					
					// Vertical speed decreases as time increases before reaching 0 at its peak
					var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
					
					// The horizontal position
					nx = (ux * t);
							
					// s = ut + 0.5at^2
					ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
					
					// Apply the positions	
					$(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
					
					// Increase the time by 0.10
					t = t + 0.10;
					
					// If the time is greater than the total time clear the interval
					if(t > totalt) {
						
						clicked = false;
						first = true;
						
						
						$('.exploading-code-box').css({'top' : '-1000px', 'transition' : 'none'});
						$(self).css({'left' : '0', 'bottom' : '0', 'opacity' : '1', 'transition' : 'none', 'transform' : 'none'});
					
								
						// Finally clear the interval
						clearInterval(z);
					
					}
					
				}, 10); // Run this interval every 10ms. Changing this will change the pace of the animation
		
			});
	
		}

	});
});
