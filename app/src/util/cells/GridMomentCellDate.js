define([
    'underscore',
    'backbone',
    'backgrid',
    'backbone.backgrid.moment',
    'Application'
], function(_, Backbone, Backgrid, BackgridMoment, Application){

    return Backgrid.Extension.MomentCell.extend({
        modelFormat: Application.static.Settings.date_format_model,
        displayFormat: Application.static.Settings.date_format_front,
    });
});