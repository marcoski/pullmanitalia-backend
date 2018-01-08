define(['backgrid'], function(Backgrid){
    var TableHeaderCell = Backgrid.HeaderCell.extend({

        sortingDescEl: '<i class="fa fa-sort-desc"></i>',
        sortingAscEl: '<i class="fa fa-sort-asc"></i>',
        sortingEl: '<i class="fa fa-sort"></i>',

        render: function(){
            this.$el.empty();
            var column = this.column;
            var sortable = Backgrid.callByNeed(column.sortable(), column, this.collection);
            var label = document.createTextNode(column.get('label'));
            var direction = column.get('direction');
            this.$el.append(label);
            if(sortable){
                if(direction === "ascending"){
                    this.$el.addClass('sorting_asc').append($(this.sortingAscEl));
                }else if(direction === "descending"){
                    this.$el.addClass('sorting_desc').append($(this.sortingDescEl));
                }else{
                    this.$el.addClass('sorting').append($(this.sortingEl));
                }
            }

            this.$el.addClass(column.get("name"));
            this.delegateEvents();
            this.$el.on('click', $.proxy(this.onClick, this));
            return this;
        },

        removeCellDirection: function(){
            this.$el.removeClass('sorting_asc').removeClass('sorting_desc');
            this.$el.find('.fa').remove();
            this.$el.addClass('sorting');
            this.$el.append($(this.sortingEl));
        },

        setCellDirection: function(column, direction){
            this.$el.removeClass('sorting_asc').removeClass('sorting_desc');
            this.$el.find('.fa').remove();
            if(column.cid == this.column.cid){
                if(direction === "ascending"){
                    this.$el.addClass('sorting_asc').append($(this.sortingAscEl));
                }else if(direction === "descending"){
                    this.$el.addClass('sorting_desc').append($(this.sortingDescEl));
                }else{
                    this.$el.addClass('sorting').append($(this.sortingEl));
                }
            }
        }

    });

    var TableHeaderRow = Backgrid.HeaderRow.extend({

        makeCell: function(column, options){
            var headerCell = column.get("headerCell") || TableHeaderCell;
            return new headerCell({
                column: column,
                collection: this.collection
            });
        }

    });

    return Backgrid.Header.extend({

        initialize: function(options){
            Backgrid.Header.prototype.initialize.call(this, options);
            this.row = new TableHeaderRow({
                columns: this.columns,
                collection: this.collection
            });
        }

    });
});
