import Vue from "vue";
import Router from "vue-router";

import Container from "../Container";
import CustomersContainer from "../container/CustomersContainer";
import SuppliersContainer from "../container/SuppliersContainer";
import BillsContainer from "../container/BillsContainer";
import Dashboard from "../components/Dashboard";
import Customers from "../components/Customers";
import CustomerForm from "../components/customers/CustomerForm";
import CustomersInvoices from "../components/customers/CustomersInvoices";
import Suppliers from "../components/Suppliers";
import SupplierForm from "../components/suppliers/SupplierForm";
import SuppliersInvoices from "../components/suppliers/SuppliersInvoices";
import Bills from "../components/bills/Bills";
import BillsForm from "../components/bills/BillsForm";

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
                    children: [
                        {
                            path: 'view',
                            name: 'view_all_suppliers',
                            meta: {
                                label: 'Tutti i fornitori'
                            },
                            component: Suppliers
                        },
                        {
                            path: 'new',
                            name: 'add_new_supplier',
                            meta: {
                                label: 'Aggiungi nuovo cliente'
                            },
                            component: SupplierForm
                        },
                        {
                            path: 'edit/:name/:id',
                            name: 'edit_supplier',
                            meta: {
                                label: 'Modifica %name%'
                            },
                            component: SupplierForm
                        },
                        {
                            path: 'invoices/:name/:id',
                            name: 'view_supplier_invoices',
                            meta: {
                                label: 'Fatture di %name%'
                            },
                            component: SuppliersInvoices
                        }
                    ]
                },
                {
                    path: 'customers',
                    name: 'customers',
                    meta: {
                        label: 'Clienti'
                    },
                    redirect: '/customers/view',
                    component: CustomersContainer,
                    children: [
                        {
                            path: 'view',
                            name: 'view_all_customers',
                            meta: {
                                label: 'Tutti i clienti'
                            },
                            component: Customers
                        },
                        {
                            path: 'new',
                            name: 'add_new_customer',
                            meta: {
                                label: 'Aggiungi nuovo cliente'
                            },
                            component: CustomerForm
                        },
                        {
                            path: 'edit/:name/:id',
                            name: 'edit_customer',
                            meta: {
                                label: 'Modifica %name%'
                            },
                            component: CustomerForm
                        },
                        {
                            path: 'invoices/:name/:id',
                            name: 'view_customer_invoices',
                            meta: {
                                label: 'Fatture di %name%'
                            },
                            component: CustomersInvoices
                        }
                    ]
                },
                {
                    path: 'bills',
                    name: 'bills',
                    meta: {
                        label: 'Fatturazione'
                    },
                    redirect: '/bills/view',
                    component: BillsContainer,
                    children: [
                        {
                            path: 'view',
                            name: 'view_all_bills',
                            meta: {
                                label: 'Visualizza fatture'
                            },
                            component: Bills
                        },
                        {
                            path: 'new',
                            name: 'add_new_invoice',
                            meta: {
                                label: 'Crea nuova fattura'
                            },
                            component: BillsForm
                        }
                    ]

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