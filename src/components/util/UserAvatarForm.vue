<template>
    <div>
        <b-card header-tag="header">
            <div class="d-flex flex-row" slot="header">
                <div class="p-1">
                    <h4><i class="fa fa-image"></i> Avatar Utente</h4>
                </div>
            </div>
            <b-container fluid class="app-avatar-form">
                <b-row>
                    <b-col md="12">
                        <b-img :src="personalAvatar" width="210" height="210" thumbnail />
                        <input type="hidden" v-model="item.user.avatar" />
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="12">
                        <b-btn @click.native.stop @click="openSelectAvatarModal">
                            <i class="fa fa-image"></i> Seleziona un avatar
                        </b-btn>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        <avatar-modal ref="selectAvatarModal" :avatars="avatarLists"></avatar-modal>
    </div>
</template>
<script>
    import Avatars from '../../data/_avatars';
    import AvatarModal from "./AvatarModal.vue";

    export default {
        components: {AvatarModal},
        name: 'user-avatar-form',

        props: ['initialItem'],

        data: function(){
            return {
                item: this.initialItem,
                avatarLists: Avatars
            }
        },

        created: function(){
            this.$radio.$on('item:loaded', (item) => {
                this.item = item;
            })
        },

        mounted: function(){
            const _that = this;
            this.$radio.$on('avatar_modal:selected', function(avatar){
                _that.item.user.avatar = avatar;
            });
        },

        computed: {
            personalAvatar: function(){
                if(this.item.user.avatar === '' || this.item.user.avatar === null){
                    return this.$app.configs.default_avatar;
                }

                return this.item.user.avatar;
            }
        },

        methods: {
            openSelectAvatarModal: function(){
                this.$refs.selectAvatarModal.open();
            }
        }
    };
</script>