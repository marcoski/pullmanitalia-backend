define(['fakerest', 'sinon'], function(FakeRest, sinon){
    'use strict';

    var data = {
        'menu': [
            {
                "title": "Appalti Integrati",
                "icon": "fa-desktop",
                "children": [
                    {
                        "title": "Bilancio",
                        "icon": "fa-balance-scale",
                        "route": "company/balance"
                    },
                    {
                        "title": "Fatture",
                        "icon": "fa-file-text",
                        "route": "company/invoice"
                    }
                ]
            },
            {
                "title": "Anagrafica",
                "icon": "fa-address-book-o",
                "children": [
                    {
                        "title": "Fornitori",
                        "icon": "fa-building",
                        "route": "registry/suppliers"
                    },
                    {
                        "title": "Clienti",
                        "icon": "fa-address-card-o",
                        "route": "registry/address_book"
                    }
                ]
            },
            {
                "title": "Preventivi",
                "icon": "fa-tasks",
                "route": "proposal"
            }
        ]
    };

    return {
        urlRoot: window.Settings.baseUrl+window.Settings.baseApi,

        init: function(){
            var _that = this;
            var restServer = new FakeRest.Server(this.urlRoot);
            restServer.toggleLogging();
            restServer.init(data);


            var server = sinon.fakeServer.create();
            server.xhr.useFilters = true;
            server.xhr.addFilter(function(method, url, async, username, password){
                return !(new RegExp(_that.urlRoot).test(url));
            });

            server.autoRespond = true;
            server.respondWith(restServer.getHandler());
            console.log('fake server init');
        }
    }
});