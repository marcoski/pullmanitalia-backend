<template>
    <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="(item, index) in list">
            <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
            <router-link :to="item" v-else>{{ showName(item) }}</router-link>
        </li>
    </ol>
</template>

<script>

    export default {
        name: 'breadcrumb',
        props: {
            list: {
                type: Array,
                required: true,
                default: () => []
            }
        },

        mounted: function(){
            var self = this;
            this.$radio.$on('breadcrumb:last-label', function(label){
                self.$el.querySelector("span.active").innerHTML = label
            });
        },

        methods: {
            isLast: function(index){
                return index === this.list.length - 1;
            },

            showName: function(item){
                if(item.meta && item.meta.label){
                    item = item.meta && item.meta.label;
                }

                if(item.name){
                    item = item.name;
                }

                return this.$lodash.capitalize(item);
            }
        }
    }
</script>