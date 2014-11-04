(function ($, toggle) {

  var sessions = {

    // sessions setup.
    init: function() {
      // Initialize the session description toggle.
      $('.session-description').each(function (){
        var $container = $(this);
        toggle({
          button: $('<button class="session-toggle">Session description</button>'),
          container: $container,
          update_button: false,
          insert_method: 'before',
        });
      });

      // Initialize the speaker bio toggle.
      $('.session-speaker-bios').each(function (){
        var $container = $(this);
        toggle({
          button: $('<button class="session-toggle">Speaker Bio</button>'),
          container: $container,
          update_button: false,
          insert_method: 'before',
        });
      });
    },
  };

  this.sessions = sessions;
})(jQuery, toggle);
