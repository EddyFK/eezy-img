# Eezy Image - a responsive background image

## About
Responsive images are vital to fast website loading and SEO. Every millisecond counts. This is a typical example of responsive image:

```
<img	src="https://via.placeholder.com/500x900.jpg"
			srcset="https://via.placeholder.com/500x900.jpg  500w,
			        https://via.placeholder.com/1024x768.jpg 1024w,
			       	https://via.placeholder.com/1440x900.jpg 1440w,
			        https://via.placeholder.com/2400.jpg 2400w"
			alt="Image">
```

This works as expected, the browser will pick a good resolution. Done. Alternatively you can also use the picture method for more control. When it comes to background images we have less options:

```
<div style="height:80vh;width:100%;background-image:url(https://via.placeholder.com/1440x900.jpg);background-size:cover;background-repeat:none;"></div>
```

Wich works great but leaves us unable to get different files at different solutions. One solution would be to replace the urls via javascript but i found it quiet complicated to integrate that method with a CMS like Wordpress. An easy solutions would be to just use a regular responsive image and let it act as a cover background image. To make this happen we need to tell javascript what the container wrapper is that holds the image and what image has to be used.


```
<div class="eezy-img-wrapper">
	...
	<img class="eazy-img" src="..." srcset="..." alt="..."/>
	...
<div>
```

To make the wrapper act like a container for a cover background image we need to make it at least relative and hide overflows:


```
.eezy-img-wrapper{
	position:relative; //can be everything, but is needed
	overflow:hidden;
}
```

now we can position the image inside:

```
.eezy-img-wrapper .eezy-img {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
            transform: translate3d(-50%, -50%, 0); 
}
```

We centered the image now but we still have no controll over the size, it can be now just wider or smaller as the wrapper and doesn't change it's size respnsively. Typically we would set a image width of 100% to make it responsive:

```
.eezy-img-wrapper .eezy-img {
	...
	width:100%;
	height:auto;
}

```

That works great to the point when the ratio of the image is different to the ratio of the wrapper. That's the reason why we need Javascript to compare the ratios of both, the wrapper and the image to make a decision if the image needs to be as heigh as the wrapper or as wide as the wrapper without creating visual gaps:

```
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
```

Based on the results the function will add a "portrait" or "landscape" class to the image to fit it perfectly inside the wrapper:

```
.eezy-img-wrapper .portait {
    width: 100%;
    height: auto; 
}

.eezy-img-wrapper .landscape {
  width: auto;
  height: 100%;
}
```

Done. We just need to load the function at different points to make it work with different situations:

```
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
```