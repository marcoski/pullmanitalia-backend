<template>
    <header class="app-header header">
        <b-navbar toggleable="md" class="app-navbar" type="dark" variant="info">
            <div class="d-flex flex-column">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand class="font-3xl" :to="{name: 'home'}">Pullman Italia Admin <small>v 1.0</small></b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav class="app-mainnav">
                        <main-nav-item v-for="(item, index) in mainNavItems" :key="index"
                                :url="item.url"
                                :name="item.name"
                                :icon="item.icon" />
                    </b-navbar-nav>
                </b-collapse>
            </div>
            <!-- right menu -->
            <div class="ml-auto app-right-nav">
                <search-form></search-form>
                <logged-user-nav :email="admin.email" :id="admin.id"></logged-user-nav>
            </div>
        </b-navbar>
    </header>
</template>

<script>
    import MainNavItem from './header/MainNavItem';
    import LoggedUserNav from './header/LoggedUserNav';
    import SearchForm from './header/SearchForm';

    export default {
        name: 'Header',
        components: {
            SearchForm,
            LoggedUserNav,
            'main-nav-item': MainNavItem,
            'logged-user-nav': LoggedUserNav,
            'search-form': SearchForm
        },
        props: {
            mainNavItems: {
                type: Array,
                required: true,
                default: () => []
            },
            admin: {
                type: Object,
                required: true,
                default: () => {}
            }
        }
    }
</script>