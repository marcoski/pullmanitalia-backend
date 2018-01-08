define(['underscore', 'backbone', 'backgrid'], function(_, Backbone, Backgrid){
    return Backbone.View.extend({

        /** @property */
        className: "select-row-cell",

        /** @property */
        tagName: "td",

        /** @property */
        events: {
            "keydown input[type=checkbox]": "onKeydown",
            "change input[type=checkbox]": "onChange",
            "click input[type=checkbox]": "enterEditMode"
        },

        /**
         Initializer. If the underlying model triggers a `select` event, this cell
         will change its checked value according to the event's `selected` value.
         @param {Object} options
         @param {Backgrid.Column} options.column
         @param {Backbone.Model} options.model
         */
        initialize: function (options) {

            this.column = options.column;
            if (!(this.column instanceof Backgrid.Column)) {
                this.column = new Backgrid.Column(this.column);
            }

            var column = this.column, model = this.model, $el = this.$el;
            this.listenTo(column, "change:renderable", function (column, renderable) {
                $el.toggleClass("renderable", renderable);
            });

            if (Backgrid.callByNeed(column.renderable(), column, model)) $el.addClass("renderable");

            this.listenTo(model, "backgrid:select", function (model, selected) {
                if(selected){
                    //this.checkbox().iCheck('check');
                }else{
                    //this.checkbox().iCheck('uncheck');
                }
            });
        },

        /**
         Returns the checkbox.
         */
        checkbox: function () {
            return this.$el.find("input[type=checkbox]");
        },

        /**
         Focuses the checkbox.
         */
        enterEditMode: function () {
            this.checkbox().focus();
        },

        /**
         Unfocuses the checkbox.
         */
        exitEditMode: function () {
            this.checkbox().blur();
        },

        /**
         Process keyboard navigation.
         */
        onKeydown: function (e) {
            var command = new Backgrid.Command(e);
            if (command.passThru()) return true; // skip ahead to `change`
            if (command.cancel()) {
                e.stopPropagation();
                this.checkbox().blur();
            }
            else if (command.save() || command.moveLeft() || command.moveRight() ||
                command.moveUp() || command.moveDown()) {
                e.preventDefault();
                e.stopPropagation();
                this.model.trigger("backgrid:edited", this.model, this.column, command);
            }
        },

        /**
         When the checkbox's value changes, this method will trigger a Backbone
         `backgrid:selected` event with a reference of the model and the
         checkbox's `checked` value.
         */
        onChange: function () {
            var checked = this.checkbox().prop("checked");
            this.$el.parent().toggleClass("selected", checked);
            this.model.trigger("backgrid:selected", this.model, checked);
        },

        /**
         Renders a checkbox in a table cell.
         */
        render: function () {
            this.$el.empty().append('<input tabindex="-1" type="checkbox" />');
            this.delegateEvents();
            return this;
        }
    });
});