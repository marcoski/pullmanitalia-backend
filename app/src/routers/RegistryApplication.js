define(['backbone.marionette', 'backbone.radio', 'routers/RegistryRouter'], function(Marionette, Radio, RegistryRouter){
    return Marionette.Application.extend({

        action: null,
        channel: Radio.channel('registry'),

        initialize: function(options){
            if(_.isUndefined(options.action)){
                throw new Error('RegistryApplication action undefined');
            }
            this.action = options.action;
        },

        navigate: function (route, options){
            options || (options = {});
            Backbone.history.navigate(route, options);
        },

        onStart: function(){
            var router = new RegistryRouter();
            console.log('Start Registry Application');
            this.channel.trigger('registry:list', this.action);
        }
    });
});