export default{

    mounted: function(){
        this.$radio.$emit(
            'breadcrumb:last-label',
            this.$lodash.replace(this.$route.meta.label, '%name%', this.nameParam)
        );
    },

    computed: {
        nameParam: function(){
            return this.$lodash.startCase(this.$route.params.name);
        }
    }

}