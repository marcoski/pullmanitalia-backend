import WarningModalDelete from "../util/WarningModalDelete";

export default{
    components: {
        WarningModalDelete
    },

    data: function (){
        return {
            isVisible: false
        };
    },

    computed: {
        username: function(){
            return this.item.user.name + ' ' + this.item.user.surname;
        },
        fullAddress: function(){
            return this.item.address + ' - '
                + this.item.cap + ' '
                + this.item.city + ' '
                + this.item.district + ' '
                + this.item.country;
        },
        deleteTitle: function(){
            return 'Cencella: '+ this.item.name;
        },
        deleteBody: function(){
            return 'Sei sicuro di voler cancellare: '+this.item.name+'? Clicca OK per proseguire...';
        },
        personalAvatar: function(){
            if(this.item.user.avatar === '' || this.item.user.avatar === null){
                return this.$app.configs.default_avatar;
            }

            return this.item.user.avatar;
        }
    },

    methods: {
        show: function(item){
            this.item = item;
            this.isVisible = true;
            this.$emit('sheet:shown');
        },

        deleteModalOpen: function(){
            this.$refs.warningModal.open(this.item);
        },

        doDelete: function(item){
            this.$radio.$emit('delete:single', item);
        }
    }
}