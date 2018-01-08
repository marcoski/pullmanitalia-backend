define(['fakerest', 'sinon'], function(FakeRest, sinon){
    'use strict';

    var data = {
        'grids': [
            {
                "id": 1,
                "table": "address_book",
                "columns": [
                    {"name": "name", "label": "Nome", "cell": "string"},
                    {"name": "surname", "label": "Cognome", "cell": "string"},
                    {"name": "email", "label": "Email", "cell": "email"},
                    {"name": "phone", "label": "Phone", "cell": "string"},
                    {"name": "registrationDate", "label": "Data di registrazione", "cell": "datetime"}
                ]
            }
        ],
        'menu': [
            {
                "title": "Pullman Italia",
                "icon": "fa-desktop",
                "children": [
                    {"title": "Bilancio", "icon": "fa-balance-scale", "route": "company/balance"},
                    {"title": "Fatture", "icon": "fa-file-text", "route": "company/invoice"}
                ]
            },
            {
                "title": "Anagrafica",
                "icon": "fa-address-book-o",
                "children": [
                    {"title": "Fornitori", "icon": "fa-building", "route": "registry/suppliers"},
                    {"title": "Clienti", "icon": "fa-address-card-o", "route": "registry/address_book"}
                ]
            },
            {
                "title": "Preventivi",
                "icon": "fa-tasks",
                "route": "proposal"
            }
        ],
        'customers': [
            {
                "name": "Marco",
                "surname": "Trognoni",
                "phone": "3286115551",
                "email": "mtrognon@gmail.com",
                "registrationDate": "2017-12-13 18:13:00"
            },
            {
                "name": "Giuliana",
                "surname": "Visco",
                "phone": "3286115551",
                "email": "giuliana.visco@gmail.com",
                "registrationDate": "2017-12-14 11:11:00"
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

            /*restServer.addRequestInterceptor(function(req){
                console.log(req);
                return req;
            });

            restServer.addResponseInterceptor(function(res){
                console.log(res);
                return res;
            })*/

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