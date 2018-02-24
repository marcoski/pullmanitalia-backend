import WarningModalDelete from "../util/WarningModalDelete";

export default{
    components: {
        WarningModalDelete
    },

    props: {
        filter: {
            required: true,
            default: ''
        },
        perPage: {
            required: true
        }
    },

    data: function(){
        return {
            defaultFields: {
                '#': {
                    label: '#',
                    class: 'text-center'
                }
            },
            currentPage: 1,
            selected: [],
        }
    },

    mounted: function(){
        let _that = this;
        this.$refs.datatable.$on('refreshed', function(){
            _that.$emit('load:sheet', this.localItems[0]);
        });
        this.$radio.$on('delete:single', function(item){
            _that.doDelete([item.id]);
        });
    },

    methods: {
        deleteSelected: function(){
            if(this.selected.length > 0){
                this.$refs.warningModal.open(this.selected);
            }
        },

        showItemDetails: function(item){
            this.$emit('load:sheet', item);
        },

        getCity: function(data){
            let item = data.item;
            return item.city + ' ('
                + item.district + ') '
                + item.country;
        }
    },

    computed: {
        selectAll: {
            get: function(){
                return this.items ? this.selected.length === this.items.length : false
            },

            set: function(value){
                let selected = [];

                let indexStart = (this.currentPage-1) * this.perPage;
                let indexEnd = (this.currentPage * this.perPage);

                if(value){
                    for(let i=indexStart; i<indexEnd; i++){
                        selected.push(this.items[i].id);
                    }
                }

                this.selected = selected;
            }
        }
    }
}