define([
    'backbone.marionette'
], function(Marionette){
    return Marionette.View.extend({

        action: null,

        initialize: function(options){
            if(_.isUndefined(options.template)){
                throw new Error("No template options set");
            }

            this.template = _.template(options.template);
            var action = options.action || "";
        }
    });
});