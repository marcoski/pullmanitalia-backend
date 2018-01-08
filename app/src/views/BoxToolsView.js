define([
    'backbone.marionette'
], function(Marionette){
    'use strict';

    return Marionette.View.extend({

        labels: {
            'action': '',
            'addLabel': '',
            'trashLabel': ''
        },

        action: null,

        initialize: function(options){
            if(_.isUndefined(options.template)){
                throw new Error("No template options set");
            }

            this.template = _.template(options.template);
            var action = options.action || "";
            this.labels = {
                'action': Translator.trans(action, "registry"),
                'addLabel': Translator.trans('add_new_' + action, "registry"),
                'trashLabel': Translator.trans('trash_' + action, "registry")
            }
        },

        templateContext: function(){
            return this.labels;
        }

    });
});