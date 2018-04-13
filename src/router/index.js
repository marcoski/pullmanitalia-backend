import Vue from "vue";
import Router from "vue-router";

import Container from "../Container.vue";
import CustomersContainer from "../container/CustomersContainer.vue";
import SuppliersContainer from "../container/SuppliersContainer.vue";
import BillsContainer from "../container/BillsContainer.vue";
import Dashboard from "../components/Dashboard.vue";

import suppliersRoutes from "./suppliers";
import customersRoutes from "./customers";
import billsRoutes from "./bills";

Vue.use(Router);

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'home',
            component: Container,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    meta: {
                        label: 'Dashboard'
                    },
                    component: Dashboard
                },
                {
                    path: 'suppliers',
                    name: 'suppliers',
                    meta: {
                        label: 'Fornitori'
                    },
                    redirect: 'suppliers/view',
                    component: SuppliersContainer,
                    children: suppliersRoutes
                },
                {
                    path: 'customers',
                    name: 'customers',
                    meta: {
                        label: 'Clienti'
                    },
                    redirect: '/customers/view',
                    component: CustomersContainer,
                    children: customersRoutes
                },
                {
                    path: 'bills',
                    name: 'bills',
                    meta: {
                        label: 'Fatturazione'
                    },
                    redirect: '/bills/view',
                    component: BillsContainer,
                    children: billsRoutes
                }
            ]
        },
        {
            path: '/user/:id/profile',
            name: 'user-profile'
        },
        {
            path: '/user/:id/settings',
            name: 'user-settings'
        }
    ]
});