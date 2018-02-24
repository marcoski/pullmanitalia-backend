<template>
    <b-navbar-nav class="app-logged-user">
        <b-nav-item-dropdown right no-caret>
            <template slot="button-content">
                {{ email }} <i class="fa fa-caret-down"></i>
            </template>
            <b-dropdown-item :to="{name: 'user-profile', params: {id: id}}">
                <i class="fa fa-user"></i> Il tuo profilo
            </b-dropdown-item>
            <b-dropdown-item :to="{name: 'user-settings', params: {id: id}}">
                <i class="fa fa-sliders"></i> Impostazioni
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="/user/logout">
                <i class="fa fa-sign-out"></i> Esci
            </b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar-nav>
</template>

<script>
    export default {
        name: 'logged-user-nav',
        props: {
            email: {
                type: String,
                default: ''
            },
            id: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style lang="scss">
    .app-navbar{
        .app-logged-user{
            .nav-link{
                padding-left: 0;
            }
        }
    }
</style>