/*function isMobileSize() {
	if(window.innerWidth < 768) {
		return true;
	} else {
		return false;
	}
}*/
let scroll;
$(document).ready(function(){
  //set viewport height in css
  document.documentElement.style.setProperty('--viewport-height', window.innerHeight + "px");
  /*momentum scrolling*/
  scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    getDirection: true,
  });
  /*projects slider*/ 
  $('.projects-slider').slick({
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    autoplaySpeed: 3000,
    dots: true,
    customPaging : function(slider, i) {
      return '<a><img src="images/slider-dot.svg"/><img src="images/slider-dot-active.svg" /></a>';
    }
  });
  //header mobile-only links carousel
  $(".header-links-mobile").slick({
    autoplay: false,
    arrows: false,
    slidesToShow: 3,
    variableWidth: true,
    swipeToSlide: true
  });
  //turn everything black when nav toggler is clicked on mobile screens
  $(".navbar-toggler").click(() => {
    $(".nav").toggleClass("nav-active");
    $("body").toggleClass("nav-open");
  })
  //infinite scroll carousel
  let slides = document.querySelectorAll(".slide-container");
  let slideTrack = document.querySelector(".slide-track");
  let numOfSlides = slides.length;
  document.documentElement.style.setProperty('--slide-num', numOfSlides);
  for(i=0; i<numOfSlides; i++)
  {
    let clone = slides[i].cloneNode(true);
    slideTrack.append(clone);
  }
  $(".slide-track").toggleClass("animate");
  $(".slide-container").hover(() => {
    $(".slide-container").toggleClass("blur");
  })
  /*animate progress circles when scrolled to*/
  scroll.on('call', (action, event, container) => {
    if(action == "animate" && !container.el.hasAttribute("data-animated")){
      let progress = container.el.getAttribute("data-progress"),
          strokeColour = container.el.getAttribute("data-strokeColor"),
          trailColour = container.el.getAttribute("data-trailColor");
      //fade in text, then animate
      $(container.el.firstElementChild).fadeIn(1000).css("display","flex");;
      var progressCircle = new ProgressBar.Circle(container.el, {
        strokeWidth: 9,
        easing: 'easeInOut',
        duration: 2500,
        color: strokeColour,
        trailColor: trailColour,
        svgStyle: {
          strokeLinecap: 'round'
        }
      });
      setTimeout(function() {
        progressCircle.animate(progress);
      }, 300);
      //avoid rendering progress circle again
      container.el.setAttribute("data-animated", "true");
    }
    else if(action == "header-update")
    {
      if(window.innerWidth >= 768)
      {
        $(".header-update li span:first-of-type").fadeIn(500);
        setTimeout(function() {
          $(".header-update li span:last-of-type").fadeIn(400);
        }, 600);
      }
    }
  });
  //show nav only when scrolling down
  scroll.on('scroll', (obj) => {
    var scrolly = obj.scroll.y;
    if(scrolly >= 50 && obj.direction == "down")
    {
      if(window.innerWidth >= 768)
        $('nav').fadeIn(300);
        $("nav").addClass("scroll");
    }
    else if(scrolly < 50 && obj.direction == "up")
    {
      if(window.innerWidth >= 768)
        $('nav').fadeOut(100);
      else
        $("nav").removeAttr("style");
        $("nav").removeClass("scroll");
    }
    
  });
  scroll.update();
  $(window).resize(function(){
    document.documentElement.style.setProperty('--viewport-height', window.innerHeight + "px");
    //throttle window maximize and restore button otherwise function will be fired before window has finished resizing
    setTimeout(function() {
      if($("nav").hasClass("nav-active"))
      {
        $(".navbar-toggler").trigger("click");
      }
      scroll.update();
    }, 150);
  });
});
$(window).on("load", function(){
  scroll.update();
});
