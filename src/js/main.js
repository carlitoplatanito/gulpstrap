$(function() {
    var currentUrl = new String(document.location);
    $('.nav.navbar-nav > li').each(function(){
        var link = $(this);
        if ( currentUrl.indexOf(link.find('a').attr('href')) > -1) {
            link.addClass('active');
        } else {
            link.removeClass('active');
        }
    });
})();
