/**
* Eezy Image - A responsive background image solver
* Author: Eddy Salzmann
* Author URL: http://eddysalzmann.com
**/

(function () {
	
	"use strict"
	
	const eezyImage = function() {
		
		var eezy_wrappers = document.getElementsByClassName('eezy-img-wrapper');
		 
	  Array.prototype.forEach.call(eezy_wrappers, function(el, index, array){
		  
		  var wrap_r = el.offsetWidth / el.offsetHeight,
					image = el.querySelectorAll('.eezy-img');
		  
		  Array.prototype.forEach.call(image, function(ele, index, array){
		  	
				var image_r = ele.offsetWidth / ele.offsetHeight;
				if(wrap_r > image_r){
					ele.classList.remove("landscape");
					ele.classList.add("portait");
				}
				if(wrap_r < image_r){
					ele.classList.remove("portait");
					ele.classList.add("landscape");
				}
		  	
		  });
		});
		
	};
	
	
	//Load on window load
	window.onload = function () {
		eezyImage();
	}
	
	//Load on ajax
	const send = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function() { 
	  this.addEventListener('load', function() {
	      eezyImage();
	  })
	  return send.apply(this, arguments)
	}
	
	//Load on resize
	window.addEventListener("resize", function(){
	   eezyImage();
	});
	


}());