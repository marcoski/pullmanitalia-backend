<template>
    <b-modal lazy class="modal-info app-modal-avatar" ref="avatarModal" @ok="ok" @cancel="cancel" ok-variant="info">
        <div slot="modal-title">
            <h5 class="modal-title"><i class="fa fa-image"></i> Scegli un avatar</h5>
        </div>
        <b-container fluid>
            <b-row>
                <avatar v-for="(avatar, index) in avatarLists" :key="index" :index="index" :avatar="avatar"></avatar>
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
    import Avatar from "./Avatar";

    export default {
        components: {
            Avatar
        },

        name: 'avatar-modal',

        props: {
            avatars: {
                type: Object,
                required: true
            }
        },

        data: function(){
            return {
                selected: null
            }
        },

        computed: {
            avatarLists: {
                get: function(){
                    let _that = this;
                    let lists = [];
                    let iterator = function(fsObj){
                        if(_that.$lodash.has(fsObj, "children")){
                            for(const item of fsObj.children){
                                iterator(item);
                            }
                        }else{
                            lists.push(fsObj.path);
                        }
                    }

                    iterator(this.avatars);
                    return lists;
                }
            }
        },

        mounted: function(){
            const _that = this;
            this.$radio.$on('avatar:selected', function(avatar){
                _that.selected = avatar;
            });
        },

        methods: {
            open: function(){
                this.$refs.avatarModal.show();
            },

            ok: function(){
                if(!this.$lodash.isNull(this.selected)){
                    this.$radio.$emit('avatar_modal:selected', this.selected);
                }
            },

            cancel: function(){
                this.selected = null;
            }
        }
    }
</script>