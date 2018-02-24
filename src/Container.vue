<template>
    <div class="app">
        <app-header :mainNavItems="mainNav" :admin="admin" />
        <div class="main">
            <breadcrumb :list="list" />
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
        <app-footer />
    </div>
</template>

<script>
    import MainNav from './data/_main-nav';
    import Admin from './data/_user-admin';
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    import Breadcrumb from "./components/Breadcrumb";

    export default {
        name: 'container',

        components: {
            'breadcrumb': Breadcrumb,
            'app-header': Header,
            'app-footer': Footer
        },

        data: function() {
            return {
                mainNav: MainNav.items,
                admin: Admin
            };
        },

        computed: {
            name: function() {
                return this.$route.name;
            },
            list: function() {
                return this.$route.matched;
            }
        }
    }
</script>