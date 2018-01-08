define(['underscore', 'backbone', 'models/Customer', 'Application'], function(_, Backbone, Customer, Application){
    'use strict';

    return Backbone.Collection.extend({
        model: Customer,

        url: function(){
            return Application.static.Settings.baseUrl+'api/customers';
        },
    });
});