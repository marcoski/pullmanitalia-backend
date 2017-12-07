define([
    'backbone.marionette',
    'layouts/MainLayout',
    'routers/RegistryApplication'
], function(Marionette, MainLayout, RegistryApplication){
    'use strict';

    var MainController = Marionette.Object.extend({
        initialize: function(){
            var layout = new MainLayout();
            layout.render();
            this.options.layout = layout;
        },

        index: function(){
            var layout = this.getOption('layout');
            layout.triggerMethod('show:content');
        },

        proposal: function(){
            console.log('Proposal exec');
        },

        company: function(action){
            console.log('Company exec: '+action);
        },

        registry: function(action){
            var registryApplication = new RegistryApplication({'action': action});
            registryApplication.start();
        }
    });

    return Marionette.AppRouter.extend({
       controller: new MainController(),

       appRoutes: {
           "": "index",
           "proposal": "proposal",
           "company/:action": "company",
           "registry/:action": "registry"
       }
   });
});