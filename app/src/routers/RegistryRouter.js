define([
    'backbone.marionette',
    'backbone.radio',
    'layouts/RegistryLayout',
    'views/registry/AddressBookView',
    'views/registry/SuppliersView'
], function(Marionette, Radio, RegistryLayout, AddressBookView, SuppliersView){
    'use strict';

    var RegistryContoller = Marionette.Object.extend({

        channel: Radio.channel('registry'),

        initialize: function(){
            this.listenTo(this.channel, 'registry:list', this.list);
        },

        list: function(action){
            var listView;
            switch (action){
                case 'suppliers':
                    listView = new SuppliersView();
                    break;
                case 'address_book':
                    listView = new AddressBookView();
                    break;
            }
            var layout = new RegistryLayout({action: action, listView: listView});
            layout.render();
            console.log('List all contacts for: '+action);
        }
    });

    return Marionette.AppRouter.extend({
        controller: new RegistryContoller(),

        appRoutes: {
            'registry/:action/list': "list"
        }
    });

});