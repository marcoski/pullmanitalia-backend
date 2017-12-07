define(['backbone.marionette', 'text!templates/header.html'], function(Marionette, template){
    'use strict';

    return Marionette.View.extend({
        template: _.template(template),
        className: 'header-container'
    });
});