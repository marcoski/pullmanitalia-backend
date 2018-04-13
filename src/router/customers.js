import Customers from "../components/Customers.vue";
import CustomerForm from "../components/customers/CustomerForm.vue";
import CustomersInvoices from "../components/customers/CustomersInvoices.vue";

export default [
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