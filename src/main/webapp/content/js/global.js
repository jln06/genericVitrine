$(window).on('scroll', function () {
  var window_scrollY = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;

  if (window_scrollY > 0) {
    $('header').addClass('is-sticky');
  } else {
    $('header').removeClass('is-sticky');
  }
});

$(document).ready(function () {
  var elms = document.getElementsByClassName('splideSlider');
  for (var i = 0; i < elms.length; i++) {
    slider_init(elms[i]);
  }
});

/* Splide init */
function slider_init(splideElem) {
  if (typeof splideElem != 'undefined') {
    var splide_slider_selector = $(splideElem);
  } else {
    var splide_slider_selector = $('.splideSlider');
  }

  var slide_dtp = typeof splide_slider_selector.attr('data-slide_dtp') != 'undefined' ? splide_slider_selector.attr('data-slide_dtp') : 1;
  (slide_tab = typeof splide_slider_selector.attr('data-slide_tab') != 'undefined' ? splide_slider_selector.attr('data-slide_tab') : 1),
    (slide_mob = typeof splide_slider_selector.attr('data-slide_mob') != 'undefined' ? splide_slider_selector.attr('data-slide_mob') : 1),
    (slide_nav =
      typeof splide_slider_selector.attr('data-slide_nav') != 'undefined' ? splide_slider_selector.attr('data-slide_nav') : true),
    (slide_pagination =
      typeof splide_slider_selector.attr('data-slide_pagination') != 'undefined'
        ? splide_slider_selector.attr('data-slide_pagination')
        : false),
    (slide_rewind =
      typeof splide_slider_selector.attr('data-slide_rewind') != 'undefined' ? splide_slider_selector.attr('data-slide_rewind') : false);

  console.log('je suis executé');
  splide_slider_selector.each(function () {
    var splide = new Splide(this, {
      lazyLoad: 'nearby',
      preloadPages: 1,
      pauseOnHover: true, // Determines whether to pause autoplay on mouseover or not
      resetProgress: false,
      type: 'slide', // The type of the slider. 'slide' / 'loop' / 'fade'
      arrows: JSON.parse(slide_nav), // Determines whether to create/find arrows or not
      pagination: JSON.parse(slide_pagination), // Determines whether to create pagination (indicator dots) or not
      rewind: JSON.parse(slide_rewind), // Determines whether to rewind the slider or not. This does not work in the loop mode.
      autoplay: false, // Determines whether to enable autoplay or not.
      gap: 15,
      breakpoints: {
        768: {
          perPage: parseInt(slide_mob),
          perMove: parseInt(slide_mob),
          padding: { left: 0, right: '20%' },
        },
        992: {
          perPage: parseInt(slide_tab),
          perMove: parseInt(slide_tab),
          padding: { left: 0, right: '20%' },
        },
        4000: {
          perPage: parseInt(slide_dtp),
          perMove: parseInt(slide_dtp),
          padding: { left: 0, right: 0 },
        },
      },
    });
    splide.mount();

    if ($(window).width() <= 991) {
      if ($('.splide__slide:visible', this).length <= slide_mob) {
        $('.splide__arrows', this).hide();
        $(this).removeClass('hasNav');
      } else {
        $('.splide__arrows', this).show();
        $(this).addClass('hasNav');
      }
    } else if ($(window).width() <= 1200) {
      if ($('.splide__slide:visible', this).length <= slide_tab) {
        $('.splide__arrows', this).hide();
        $(this).removeClass('hasNav');
      } else {
        $('.splide__arrows', this).show();
        $(this).addClass('hasNav');
      }
    } else {
      if ($('.splide__slide:visible', this).length <= slide_dtp) {
        $('.splide__arrows', this).hide();
        $(this).removeClass('hasNav');
      } else {
        $('.splide__arrows', this).show();
        $(this).addClass('hasNav');
      }
    }
  });
}

function gallery_init(galleryElem) {
  if (typeof galleryElem != 'undefined') {
    var gallery_selector = $(galleryElem);
  } else {
    var gallery_selector = $('.splideGallery');
  }

  gallery_selector.each(function () {
    var splideGallery = new Splide(this, {
      pagination: false,
    });

    var parent = $(this).parent('.Gallery');

    var thumbnails = $('.thumbnail', parent);
    var current;

    for (var i = 0; i < thumbnails.length; i++) {
      initThumbnail(thumbnails[i], i);
    }

    function initThumbnail(thumbnail, index) {
      thumbnail.addEventListener('click', function () {
        splideGallery.go(index);
      });
    }

    splideGallery.on('mounted move', function () {
      var thumbnail = thumbnails[splideGallery.index];
      if (thumbnail) {
        if (current) {
          current.classList.remove('is-active');
        }
        thumbnail.classList.add('is-active');
        current = thumbnail;
      }
    });

    splideGallery.mount();
  });
}
