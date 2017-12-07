define(['underscore', 'backbone'], function(_, Backbone){
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            'title': '',
            'route': null,
            'icon': '',
            'active': false
        }
    });
});