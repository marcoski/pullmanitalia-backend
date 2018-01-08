window.Settings={
    "date_format_model":"YYYY-MM-DD",
    "datetime_format_model": "YYYY-MM-DD HH:mm:ss",
    "date_format_front": "DD/MM/YYYY",
    "datetime_format_front": "DD/MM/YYYY HH:mm:ss",
    "pagination":10,
    "time_format":"G:i",
    "timezone":"UTC",
    "default_country":"IT",
    "locale":"en",
    "widgets":[],
    "baseUrl":"http:\/\/pullmanitalia.devserver.commonhelp.it\/",
    "baseApp": "app",
    "baseApi": "api",
    "apiKey":"NzUwNWNkYjAyNmUxYzgwYWQxZDk2NGViNjkxODViMTgxYTMwZDY4OQ"
};

window.translations = {
    "registry": {
        "title": "Anagrafica",
        "suppliers": "Lista Fornitori",
        "address_book": "Lista Clienti",
        "add_new_suppliers": "Aggiungi un nuovo fornitore",
        "add_new_address_book": "Aggiungi un nuovo cliente",
        "trash_suppliers": "Cestina i fornitori selezionati",
        "trash_address_book": "Cestina i clienti selezionati"
    },
    "messages": {
        "exit": "Esci",
        "save": "Salva",
        "title": "PullmanItalia",
        "app": "ADMIN",
        "delete_item": "Cancella elemento",
        "edit_item": "Modifica elemento",
        "view_item": "Visualizza elemento"
    }
};

require.config({
    paths: {
        'translator': 'util/Translator',
        'jquery': 'vendor/jquery/dist/jquery',
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'underscore': 'vendor/underscore/underscore',
        'moment': 'vendor/moment/min/moment.min',
        'backbone': 'vendor/backbone/backbone',
        'backbone.modal': 'vendor/backbone-modal/backbone.modal-min',
        'backgrid': 'vendor/backgrid/lib/backgrid',
        'backbone.backgrid.moment': 'vendor/backgrid-moment-cell/backgrid-moment-cell.min',
        'backbone.marionette': 'vendor/backbone.marionette/lib/backbone.marionette',
        'backbone.radio': 'vendor/backbone.radio/build/backbone.radio.min',
        'backbone.marionette.modals': 'vendor/backbone-modal/backbone.marionette.modals-min',
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
    'translator',
    'Application',
    'routers/MainRouter',
    'bootstrap',
    'admincommonhelp',
], function(Translator, Application, MainRouter, bootstrap, admincommonhelp){
    'use strict';
    Application.appRouter = new MainRouter();
    Application.start();
});