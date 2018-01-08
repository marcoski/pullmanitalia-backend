define([
    'backbone',
    'backbone.marionette',
    'views/BoxToolsView',
    'text!templates/layouts/registry.html',
    'text!templates/box_tools_registry.html'
], function(Backbone, Marionette, BoxToolsView, LayoutTemplate, BoxToolsTemplate){
    'use strict';

    return Marionette.View.extend({
        el: '.content-wrapper',
        template: _.template(LayoutTemplate),
        regions: {
            table: ".box-body",
            tools: ".box-tools-container",
        },
        actions: null,

        initialize: function(options){
            if(_.isUndefined(options.action)){
                throw new Error('RegistryApplication action undefined');
            }

            this.action = options.action;
        },

        templateContext: function(){
            return {
                appTitle: Translator.trans("title", "messages"),
                appName: Translator.trans("app", "messages"),
                menuTitle: Translator.trans("title", "registry"),
                title: Translator.trans(this.action, "registry")
            }
        },

        onRender: function(){
            this.showChildView("table", this.getOption('listView'));
            this.showChildView("tools", new BoxToolsView({
                "template": BoxToolsTemplate,
                "action": this.action
            }));
        }
    });
});