define(['underscore', 'backbone', 'models/MenuItem', 'Application'], function(_, Backbone, MenuItem, Application){
    'use strict';

    return Backbone.Collection.extend({
        model: MenuItem,

        url: function(){
            return Application.static.Settings.baseUrl+'api/menu';
        },
    });
});