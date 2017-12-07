window.Settings={
    "date_format":"Y-m-d",
    "pagination":10,
    "time_format":"G:i",
    "timezone":"UTC",
    "default_country":"IT",
    "locale":"en",
    "widgets":[],
    "baseUrl":"http:\/\/integrati.devserver.commonhelp.it\/",
    "baseApp": "app",
    "baseApi": "api",
    "apiKey":"NzUwNWNkYjAyNmUxYzgwYWQxZDk2NGViNjkxODViMTgxYTMwZDY4OQ"
}

require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'backbone.marionette': 'vendor/backbone.marionette/lib/backbone.marionette',
        'backbone.radio': 'vendor/backbone.radio/build/backbone.radio.min',
        'text': 'vendor/text/text',
        'fakerest': 'vendor/fakerest/dist/FakeRest.min',
        'sinon': 'vendor/sinon-1.12.2/index',
        'admincommonhelp': 'AdminCommonhelp'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        marionette: {
            exports: 'Marionette',
            deps: ['backbone']
        },
        bootstrap: {
            exports: 'Bootstrap',
            deps: ['jquery']
        },
        sinon: {
            exports: 'sinon'
        },
        admincommonhelp: {
            deps: ['jquery']
        }

    },
    deps: ['jquery', 'underscore']
});

require([
    'Application',
    'routers/MainRouter',
    'bootstrap',
    'admincommonhelp'
], function(Application, MainRouter, bootstrap, admincommonhelp){
    'use strict';
    Application.appRouter = new MainRouter();
    Application.start();
});