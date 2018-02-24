<template>
    <b-nav-item :to="{name: url}" :class="linkVariant">
        {{ name }}
        <i :class="icon"></i>
    </b-nav-item>
</template>

<script>
    export default {
        name: 'main-nav-item',
        props: {
            name: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: ''
            },
            icon: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            linkVariant: function(){
                return 'border-'+ this.url.toLowerCase();
            }
        }
    }
</script>