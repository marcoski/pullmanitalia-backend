define(['backbone.marionette', 'text!templates/header.html'], function(Marionette, template){
    'use strict';

    return Marionette.View.extend({
        template: _.template(template),
        className: 'header-container',

        templateContext: function(){
            return {
                appTitle: Translator.trans("title", "messages"),
                appName: Translator.trans("app", "messages"),
                exit: Translator.trans("exit", "messages")
            };
        }
    });
});