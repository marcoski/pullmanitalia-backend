define([
    'underscore',
    'backbone',
    'backgrid',
    'util/cells/GridSelect'
], function(_, Backbone, Backgrid, GridSelect){

    var GridSelectAll = GridSelect.extend({

        /** @property */
        className: "select-all-header-cell",

        /** @property */
        tagName: "th",

        /**
         Initializer. When this cell's checkbox is checked, a Backbone
         `backgrid:select` event will be triggered for each model for the current
         page in the underlying collection. If a `SelectRowCell` instance exists
         for the rows representing the models, they will check themselves. If any
         of the SelectRowCell instances trigger a Backbone `backgrid:selected`
         event with a `false` value, this cell will uncheck its checkbox. In the
         event of a Backbone `backgrid:refresh` event, which is triggered when the
         body refreshes its rows, which can happen under a number of conditions
         such as paging or the columns were reset, this cell will still remember
         the previously selected models and trigger a Backbone `backgrid:select`
         event on them such that the SelectRowCells can recheck themselves upon
         refreshing.
         @param {Object} options
         @param {Backgrid.Column} options.column
         @param {Backbone.Collection} options.collection
         */
        initialize: function (options) {

            this.column = options.column;
            if (!(this.column instanceof Backgrid.Column)) {
                this.column = new Backgrid.Column(this.column);
            }

            var collection = this.collection;
            var selectedModels = this.selectedModels = {};
            this.listenTo(collection.fullCollection || collection,
                "backgrid:selected", function (model, selected) {
                    if (selected) selectedModels[model.id || model.cid] = 1;
                    else {
                        delete selectedModels[model.id || model.cid];
                        this.checkbox().prop("checked", false);
                    }
                    if (_.keys(selectedModels).length === (collection.fullCollection|| collection).length) {
                        this.checkbox().prop("checked", true);
                    }
                });

            this.listenTo(collection.fullCollection || collection, "remove", function (model) {
                delete selectedModels[model.id || model.cid];
                if ((collection.fullCollection || collection).length === 0) {
                    this.checkbox().prop("checked", false);
                }
            });

            this.listenTo(collection, "backgrid:refresh", function () {
                if ((collection.fullCollection || collection).length === 0) {
                    this.checkbox().prop("checked", false);
                }
                else {
                    var checked = this.checkbox().prop("checked");
                    for (var i = 0; i < collection.length; i++) {
                        var model = collection.at(i);
                        if (checked || selectedModels[model.id || model.cid]) {
                            model.trigger("backgrid:select", model, true);
                        }
                    }
                }
            });

            var column = this.column, $el = this.$el;
            this.listenTo(column, "change:renderable", function (column, renderable) {
                $el.toggleClass("renderable", renderable);
            });

            if (Backgrid.callByNeed(column.renderable(), column, collection)) $el.addClass("renderable");
        },

        /**
         Propagates the checked value of this checkbox to all the models of the
         underlying collection by triggering a Backbone `backgrid:select` event on
         the models on the current page, passing each model and the current
         `checked` value of the checkbox in each event.
         A `backgrid:selected` event will also be triggered with the current
         `checked` value on all the models regardless of whether they are on the
         current page.
         This method triggers a 'backgrid:select-all' event on the collection
         afterwards.
         */
        onChange: function () {
            var checked = this.checkbox().prop("checked");

            var collection = this.collection;
            collection.each(function (model) {
                model.trigger("backgrid:select", model, checked);
            });

            if (collection.fullCollection) {
                collection.fullCollection.each(function (model) {
                    if (!collection.get(model.cid)) {
                        model.trigger("backgrid:selected", model, checked);
                    }
                });
            }

            this.collection.trigger("backgrid:select-all", this.collection, checked);
        }

    });

    /**
     Convenient method to retrieve a list of selected models. This method only
     exists when the `SelectAll` extension has been included. Selected models
     are retained across pagination.
     @member Backgrid.Grid
     @return {Array.<Backbone.Model>}
     */
    Backgrid.Grid.prototype.getSelectedModels = function () {
        var selectAllHeaderCell;
        var headerCells = this.header.row.cells;
        for (var i = 0, l = headerCells.length; i < l; i++) {
            var headerCell = headerCells[i];
            if (headerCell instanceof GridSelectAll) {
                selectAllHeaderCell = headerCell;
                break;
            }
        }

        var result = [];
        if (selectAllHeaderCell) {
            var selectedModels = selectAllHeaderCell.selectedModels;
            var collection = this.model.items;
            for (var modelId in selectedModels) {
                result.push(collection.get(modelId));
            }
        }

        return result;
    };

    /**
     Convenient method to deselect the selected models. This method is only
     available when the `SelectAll` extension has been included.
     @member Backgrid.Grid
     */
    Backgrid.Grid.prototype.clearSelectedModels = function () {
        var selectedModels = this.getSelectedModels();
        for (var i = 0, l = selectedModels.length; i < l; i++) {
            var model = selectedModels[i];
            model.trigger("backgrid:select", model, false);
        }
    };


    return GridSelectAll;
});