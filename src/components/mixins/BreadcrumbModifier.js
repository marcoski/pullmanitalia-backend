export default{

    mounted: function(){
        let label = this.$lodash.replace(this.$route.meta.label, '%name%', this.nameParam);
        label = this.$lodash.replace(label, '%pullman_name%', this.pullmanName);
        this.$radio.$emit('breadcrumb:last-label', label);
    },

    computed: {
        nameParam: function(){
            return this.$lodash.startCase(this.$route.params.name);
        },
        pullmanName: function(){
            return this.$lodash.startCase(this.$route.params.pullman_name);
        }
    }

}