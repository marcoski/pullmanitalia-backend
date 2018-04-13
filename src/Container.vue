<template>
    <div class="app">
        <div v-show="loadingScreenShow === true" :style="loadingScreenOpacity" class="loading-page">
            <div class="loader">Loading: {{ loadingMsg }}</div>
        </div>
        <app-header :mainNavItems="mainNav" :admin="admin" />
        <div class="main" v-cloak>
            <breadcrumb :list="list" />
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
        <app-footer />
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainNav from './data/_main-nav';
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
                mainNav: [],
                admin: {},
            };
        },

        created: function(){
            this.$store.dispatch('loadMainNav', {msg: 'Carico menu...'}).then(() => {
                this.mainNav = this.$store.getters.navigation;
            }).then(() => {
                return this.$store.dispatch('loadLoggedUser', {msg: 'Carico informazioni utente...'}).then(() => {
                    this.admin = this.$store.getters.logged;
                });
            });
        },

        computed: {
            loadingBarWidth: function(){
                return {
                    'width': 100 - (100 / (this.$store.getters.total / this.$store.getters.pendingCalls)) + 'vw'
                }
            },

            loadingScreenOpacity: function(){
                return {
                    'opacity': this.$store.getters.pendingCalls > 0 ? '1' : '0',
                    'trnsition': 'opacity 1s'
                }
            },

            loadingScreenShow: function(){
                return this.$store.getters.pendingCalls > 0;
            },

            loadingMsg: function(){
                return this.$store.getters.callMsg;
            },

            name: function() {
                return this.$route.name;
            },
            
            list: function() {
                return this.$route.matched;
            },

            configs: function(){
                return this.$store.getters.configs
            }
        }
    }
</script>