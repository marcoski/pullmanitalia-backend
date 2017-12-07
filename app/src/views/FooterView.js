define(['backbone.marionette', 'text!templates/footer.html'], function(Marionette, template){
    'use strict';

    return Marionette.View.extend({
        template: _.template(template),
        className: 'footer-container'
    });
});