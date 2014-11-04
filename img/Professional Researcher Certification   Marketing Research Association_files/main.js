(function ($, mainNav, sessions) {
  $(document).ready(function() {
    // Initialize the mainNav functionality.  See js/mainNav.js
    mainNav.init();
    // Initialize the session functionality.  See js/sessions.js
    sessions.init();
  });
})(jQuery, mainNav, sessions);
