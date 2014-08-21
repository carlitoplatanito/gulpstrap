/**
 * Selects the right link in the navigation
 *
 * @class Navigation
 * @namespace Component
 */
 Component.Navigation = function($) {

    var config = {
        page: ""
    };

    // PUBLIC..................................................................
    var init = function(page, options) {
        config.page = page;
        config = Component.Utils.extend(options, config);

        config.page.find('.nav.navbar-nav > li').each(function(){
            var $link = $(this);

            if ( current().indexOf( $link.find('a').attr('href') ) > -1) {
                $link.addClass('active');
            } else {
                $link.removeClass('active');
            }
        });
    };

    /*
     * Returns the current URL
     *
     * @return string
     */
    var current = function() {
        var currentUrl = new String(document.location);
        if (currentUrl.indexOf('.html') <= -1) {
            currentUrl += '/index.html';
        }

        return currentUrl;
    }

    // PRIVATE.................................................................

    var dbug = function(enabled) {};

    // PUBLIC INTERFACE........................................................
    return {
        init: init,
        current: current
    };

}(jQuery);
