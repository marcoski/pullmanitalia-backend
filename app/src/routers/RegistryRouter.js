define(['backbone.marionette', 'backbone.radio'], function(Marionette, Radio){

    var RegistryContoller = Marionette.Object.extend({

        channel: Radio.channel('registry'),

        initialize: function(){
            this.listenTo(this.channel, 'registry:list', this.list);
        },

        list: function(action){
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