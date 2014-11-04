(function ($, toggle) {

  var mainNav = {
    mainNavToggle: {},

    header: {},

    // mainNav setup.
    init: function() {
      mainNav.header = $('#header');

      // Initialize the menu toggle.
      mainNavToggle = toggle({
        button: $('<button class="header-toggle">Menu <span class="header-toggle-icon"></span></button>'),
        container: $('.header-toolbar-inner'),
        on_target: mainNav.header,
        update_button: false,
        insert_method: 'append',
        on_click: function() {
          // The menu will expand on hover, so after clicking, we want to force
          //  collapse it for a couple seconds.
          mainNav.header.addClass('is-forced');
          setTimeout(function() {
              mainNav.header.removeClass('is-forced');
            },
            3000
          );
        }
      });

      mainNav.bindUI();

      mainNav.header.attr('data-show', false);

      if ($(window).width() < 960) {
        mainNavToggle.collapse();
      }
    },

    bindUI: function() {
      var $window = $(window);
      // Bind Window events.
      $window.on({
        // Generic Scroll handler.
        scroll: $.debounce( 250, true, function() {
          var $this = $(this);
            st = $this.scrollTop();

          // Trigger a scolling up or down event.
          setTimeout(function() {
              if (st < $this.scrollTop() + 20){
                $this.trigger('scrollDown');
              } else {
                $this.trigger('scrollUp');
              }
            },
            250
          );
        }),

        // Scroll Up Handler
        scrollUp: function(){
          // If we're at the top of the page and on a large screen, expand the nav.
          if ($window.scrollTop() < 50 && $window.width() > 960) {
            mainNavToggle.expand();
          }
        },

        // Scroll Down Handler
        scrollDown: function(){
          mainNavToggle.collapse();
        }
      });

      // // Bind header event
      mainNav.header.on('mouseenter', function(){
        mainNavToggle.expand();
      });
    },

    /**
     * Give the menu an opague background if the window is scrolled down.
     *   See page.inc.
     */
    menuBackground: function() {
      var $menu = $('.header-menu'),
          $window = $(window);

      $window.on('scroll', $.throttle(250, true, function(){
        if ($window.scrollTop() > 10) {
          $menu.addClass('is-opaque');
        } else {
          $menu.removeClass('is-opaque');
        }
      }));
    }
  };

  this.mainNav = mainNav;
})(jQuery, toggle);
