define(['backgrid', 'util/cells/GridActionCell'], function(Backgrid, GridActionCell){
    return Backgrid.Column.extend({
        initialize: function(options){
            options || (options= {});
            var action = GridActionCell;
            if(!_.isUndefined(options.action)){
                action = options.action;
            }
            this.set('name', 'action_column');
            this.set('label', '');
            this.set('cell', action);
            this.set('sortable', false);
            this.set('editable', false);
            Backgrid.Column.prototype.initialize.call(this);
        }

    });
});