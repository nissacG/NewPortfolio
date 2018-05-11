$(document).on("scroll", onScroll);
// Add smooth scrolling to all links
$('a[href^="#"]').on('click', function(event) {
  // Prevent default anchor click behavior
  event.preventDefault();
  $(document).off("scroll");
// Make sure this.hash has a value before overriding default behavior
  $('a').each(function () {
    $(this).removeClass('active');
  });
  $(this).addClass('active');
  
  var target = this.hash,
      menu = target;
  $target = $(target);
  // Using jQuery's animate method to scroll 1000 milliseconds
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 1000, 'swing', function(){
      // Add hash (#) to URL when done
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
});
//Add active class to navbar item on scroll
function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('#menu a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('#menu ul li a').removeClass("active");
        currLink.addClass("active");
      }
      else{
        currLink.removeClass("active");
      }
    });
}
// Close responsive menu when a scroll trigger link is clicked
$('.js-scroll-trigger').click(function() {
  $('.navbar-collapse').collapse('hide');
});

// Collapse Navbar
var navbarCollapse = function() {
  if ($("#mainNav").offset().top > 100) {
    $("#mainNav").addClass("navbar-shrink");
  } else {
    $("#mainNav").removeClass("navbar-shrink");
  }
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);
// Hide navbar when modals trigger
$('.portfolio-modal').on('show.bs.modal', function(e) {
  $(".navbar").addClass("d-none");
});
$('.portfolio-modal').on('hidden.bs.modal', function(e) {
  $(".navbar").removeClass("d-none");
});


//Animation on scroll
var $animation_elements = $("section");
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');