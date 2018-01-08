define([
    'backbone',
    'backgrid',
    'text!templates/grid_action_cell.html',
    'backbone.modal',
    'backbone.marionette.modals'
], function(Backbone, Backgrid, GridActionCellTemplate){
    return Backgrid.Cell.extend({

        tableItemActions: null,

        events: {
            'click .table-row-delete': 'delete',
            'click .table-row-edit': 'edit',
            'click .sheet-view': 'view'
        },

        alert: null,
        modal: null,

        initialize: function(options){
            Backgrid.Cell.prototype.initialize.call(this, options);
            this.tableItemActions = _.template(this.getTemplate());
        },

        getTemplate: function(){
            return GridActionCellTemplate;
        },

        getMessages: function(){
            return {
                deleteTooltip: Translator.trans('delete_item', 'messages'),
                editTooltip: Translator.trans('edit_item', 'messages'),
                viewTooltip: Translator.trans('view_item', 'messages')
            }
        },

        render: function(){
            this.$el.empty();
            this.$el.append(this.tableItemActions(this.getMessages()));
            this.$el.addClass(this.column.get('name'));
            this.delegateEvents();
            return this;
        },

        delete: function(e){
            e.preventDefault();
            e.stopPropagation();

        },

        trash: function(){

        },

        edit: function(e){
            e.preventDefault();
            e.stopPropagation();
        },

        title: function(){
        }

    });
});