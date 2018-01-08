define([
    'backgrid',
    'util/GridHeader',
    'util/cells/GridMomentCellDatetime',
    'util/cells/GridMomentCellDate',
    'util/columns/GridActionColumn',
    'util/columns/GridSelectColumn'
], function(Backgrid, Header, GridMomentCellDatetime, GridMomentCellDate, GridActionColumn, GridSelectColumn){
    return Backgrid.Grid.extend({
        className: 'table table-bordered table-striped',
        actionCellTemplate: null,

        initialize: function(options){
            this.model = options.model;
            this.actionCellTemplate = options.actionCellTemplate;
            options.header = Header;
            Backgrid.Grid.prototype.initialize.call(this, options);
        },

        createColumns: function () {
            this.insertColumn(new GridSelectColumn());
            this.insertColumn(new GridActionColumn());
            _.each(this.model.get('columns'), function (field) {
                if(field.cell === "moment" || field.cell === "datetime"){
                    field.cell = GridMomentCellDatetime;
                }
                if(field.cell === "date"){
                    field.cell = GridMomentCellDate;
                }
                this.insertColumn(field);
            }, this);
        },

        render: function () {
            this.createColumns();
            this.$el.empty();
            Backgrid.Grid.prototype.render.call(this);
            this.$el.removeClass('backgrid');
            this.$el.addClass(this.className);

            return this;
        },
    });
});