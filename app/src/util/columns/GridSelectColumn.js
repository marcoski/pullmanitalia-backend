define([
    'backgrid',
    'util/cells/GridSelect',
    'util/cells/GridSelectAll'
], function(Backgrid, GridSelect, GridSelectAll){

    return Backgrid.Column.extend({
        initialize: function(){
            this.set('name', 'select-column');
            this.set('label', '');
            this.set('cell', GridSelect);
            this.set('headerCell', GridSelectAll);
            this.set('sortable', false);
            this.set('editable', false);
            Backgrid.Column.prototype.initialize.call(this);
        }
    });
});