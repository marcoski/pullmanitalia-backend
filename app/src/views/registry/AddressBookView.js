define([
    'backbone.marionette',
    'util/Grid',
    'util/GridModel',
    'collections/Customers',
], function(Marionette, Grid, GridModel, Customers){
    return Marionette.View.extend({
        template: _.noop,
        className: 'table-container address_book',

        grid: null,

        initialize: function(){
            this.collection = new Customers();
            this.model = new GridModel({id: 1});
            this.grid = new Grid({
                model: this.model,
                collection: this.collection
            });
            this.model.fetch();
            this.listenTo(this.model, "change", this.renderGrid);
        },

        renderGrid: function(){
            this.$el.append(this.grid.render().el);
            return this;
        },

        onRender: function(){
            this.collection.fetch();
        }
    });
});