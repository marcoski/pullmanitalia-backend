<template>
    <b-col class="mt-2 mb-2" v-if="index % 8 !== 0">
        <b-img thumbnail center width="50" height="50" @click="selectAvatar" :src="avatar" :class="[isSelected ? 'selected' : '']" />
    </b-col>
    <div class="w-100" v-else></div>
</template>
<script>
    export default {
        name: 'avatar',

        props: ['index', 'avatar'],

        data: function(){
            return {
                isSelected: false
            }
        },

        mounted: function(){
            const _that = this;
            this.$radio.$on('avatar:selected', function(avatar){
                if(avatar !== _that.avatar){
                    _that.unSelectAvatar(avatar);
                }
            });
        },

        methods: {
            selectAvatar: function(){
                this.isSelected = true;
                this.$radio.$emit('avatar:selected', this.avatar);
            },

            unSelectAvatar: function(avatar){
                this.isSelected = false;
                this.$emit('avatar:unselected', avatar);
            }
        }
    }
</script>