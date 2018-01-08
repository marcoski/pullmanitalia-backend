define([
    'backbone',
    'backbone.marionette',
    'underscore',
    'views/HeaderView',
    'views/FooterView',
    'views/SidebarView',
    'backbone.modal',
    'backbone.marionette.modals'
], function(Backbone, Marionette, _, HeaderView, FooterView, SidebarView){
    'use strict';
    
    return Marionette.View.extend({
        template: _.noop,
        el: 'body',

        regions: {
            header: ".main-header",
            sidebar: ".main-sidebar",
            content: ".content-wrapper",
            footer: ".main-footer",
            modals: {
                selector: '.modal-container',
                regionClass: Backbone.Marionette.Modals
            }
        },

        onRender: function(){
            console.log('Render Header');
            this.showChildView('header', new HeaderView());
            console.log('Render Sidebar');
            this.showChildView('sidebar', new SidebarView());
            console.log('Render Footer');
            this.showChildView('footer', new FooterView());

        },

        onShowContent: function(){
            console.log('Render Content');
        }
    });
});