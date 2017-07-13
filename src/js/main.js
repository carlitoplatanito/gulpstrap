$(window).load(function() {
    var $page = $('body');

    Component.Navigation.init($page, {});

    if ($page.attr('data-controller') && $page.attr('data-controller').length > 0) {
        var page_controller = $page.attr('data-controller');

        if (Controller[page_controller] !== undefined) {
            Controller[page_controller].init($page);
        }
    }
});
