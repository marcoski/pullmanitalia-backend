define([
    'backbone.marionette',
    'fake'
], function(Marionette, Fake){
    Fake.init();
    var mainApp = new Marionette.Application();

    mainApp.navigate = function (route, options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    function isMobile() {
        var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
        return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    };

    mainApp.static = {};

    mainApp.static.mobile = isMobile();
    mainApp.static.Settings = window.Settings;

    mainApp.on('start', function() {
        if (Backbone.history) Backbone.history.start();
    });

    return mainApp;
});