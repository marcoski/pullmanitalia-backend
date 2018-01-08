define(['underscore', 'backbone', 'Application'], function(_, Backbone, Application){
    return Backbone.Model.extend({
        defaults: {
            'table': '',
            'columns': []
        },

        url: function(){
            var id = this.get(this.idAttribute);
            return Application.static.Settings.baseUrl+'api/grids/' + encodeURIComponent(id);
        }
    });
});