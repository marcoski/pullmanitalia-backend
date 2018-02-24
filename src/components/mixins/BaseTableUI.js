import DatatableDropdownMenu from "../util/DatatableDropdownMenu"

export default {
    components: {
        DatatableDropdownMenu
    },

    data: function(){
        return {
            filter: null,
            itemsPerPage: this.$app.configs.pagination.items_per_page,
            perPageOptions: this.$app.configs.pagination.per_page_options
        }
    },

    mounted: function(){
        let _that = this;
        this.$refs.dataTable.$on('load:sheet', function(item){
            _that.$refs.dataTableSheet.show(item);
        });
    }
}