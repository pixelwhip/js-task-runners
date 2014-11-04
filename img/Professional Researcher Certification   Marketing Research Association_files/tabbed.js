(function($){

  tabbed = {
    /**
     * Cache
     */
    cache: {},

    /**
     * Settings
     */
    settings: {
      tabs: [],
      currentTab: 0
    },

    /**
     * Debug flag
     */
    debug: false,

    /**
     * Bind events to the UI.
     */
    bindUI: function() {
      $('.page-tabs-list').click(function(e){
        console.log('clicking');
        tabbed.activateTab($(e.target).data('index'));
      });

      $(window).on("debouncedresize.constrainTab", function(event) {
        tabbed.growContainer();
      });
    },

    /**
     * Makes sure the container is as tall as the nav.
     */
    growContainer: function() {
      var cache = this.cache,
          $tab_container = cache.tab_container,
          $tab_nav = cache.tab_nav;

      if (tabbed.isStacked()) {
        // Remove the min-height
        $tab_container.css( 'min-height', 'none');
      } else {
        // Set the container min-height to the height of the nav.
        $tab_container.css( 'min-height', $tab_nav.css('height'));
      }
    },

    /**
     * Check if the container is below the nav.
     */
    isStacked: function() {
      var cache = this.cache;

      return cache.tab_container.offset().top > cache.tab_nav.offset().top;
    },

    /**
     * Populates the tab cache.
     */
    populateTabs: function(tabs) {
      var self = tabbed,
          settings = self.settings;

      self.log('Populating tabs');

      tabs.each(function(index, element) {
        var $element = $(element).data('index', index);
            hash = element.hash;

        settings.tabs[index] = {
          tab: $element,
          hash: hash,
          // Get the target from link hash.
          container: $(hash)
        };
      });
    },

    /**
     * Returns the index of the hash, otherwise returns the currentTab.
     */
    getIndexOfHash: function(hash) {
      var self = tabbed,
          settings = self.settings;
          tabs = settings.tabs;

      for (var i = tabs.length - 1; i >= 0; i--) {
        if (tabs[i].hash === hash) {
          index = tabs.length - i;
          self.log('Index of ' + hash + ' is ' + index);
          return tabs.length - index;
        }
      }

      self.log(hash + ' not found');
      return settings.currentTab;
    },

    /**
     * Sets the current tab.
     */
    activateTab: function(tab) {
      var self = tabbed,
          settings = self.settings,
          currentTab = settings.tabs[tab];

      self.deactivateTabs();

      self.log('Activating tab ' + tab);
      currentTab.tab.attr('active', true);
      currentTab.container.attr('active', true);

      if (!tabbed.isStacked()) {
        event.preventDefault();
      }
    },

    /**
     * Deactivates the current tab.
     */
    deactivateTab: function(tab) {
      var self = tabbed,
          settings = self.settings;
          currentTab = settings.tabs[tab];

      self.log('Deactivating tab ' + tab);

      currentTab.tab.attr('active', false);
      currentTab.container.attr('active', false);
      settings.currentTab = tab;
    },

    /**
     * Deactivate all tabs.
     */
    deactivateTabs: function() {
      var self = tabbed,
          tabs = self.settings.tabs;

      self.log('Deactivating all tabs');

      for (var i = tabs.length - 1; i >= 0; i--) {
        self.deactivateTab(i);
      }
    },

    /**
     * Perform setup.
     */
    init: function(tabSelector) {
      var self = tabbed,
          settings = self.settings,
          tabs = $(tabSelector),
          hash = window.location.hash,
          cache = self.cache;


      // Abort if there are no tabs.
      if (tabs.length < 1) { return; }

      self.log('Initialize tabbed.js');

      self.populateTabs(tabs);

      // Cache the tab elements.
      cache.tab_container = $('.page-tab-container');
      cache.tab_nav = $('.page-tabs');

      self.bindUI();

      // Override the current tab if the hash is set.
      if (hash.length > 0) {
        settings.currentTab = self.getIndexOfHash(hash);
      }
      // Activate the current tab.
      self.activateTab(settings.currentTab);

      // Initialize tab container min-height.
      self.growContainer();
    },

    /**
     * Debug aware logging.
     */
    log: function() {
      // only if we are in debug mode
      if (!this.debug) { return; }

      // only if we have console.log
      if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
        console.log.apply(console, arguments);
      }
    }
  };
})(jQuery);
