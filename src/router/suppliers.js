import Suppliers from "../components/Suppliers.vue";
import SupplierForm from "../components/suppliers/SupplierForm.vue";
import SuppliersInvoices from "../components/suppliers/SuppliersInvoices.vue";
import SupplierBookings from "../components/suppliers/SupplierBookings.vue";
import SupplierPullmans from "../components/suppliers/SupplierPullmans.vue";
import PullmanForm from "../components/pullmans/PullmanForm";

export default [
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
    },
    {
        name: "view_supplier_bookings",
        path: "bookings/:name/:id",
        meta: {
            label: "Prenotazioni di %name%"
        },
        component: SupplierBookings
    },
    {
        name: "view_supplier_pullmans",
        path: "pullmans/:name/:id",
        meta: {
            label: "Pullmans di %name%"
        },
        component: SupplierPullmans
    },
    {
        name: "add_new_supplier_pullman",
        path: "pullmans/add/:name/:supplier_id",
        meta: {
            label: "Aggiungi nuovo pullman (%name%)"
        },
        component: PullmanForm
    },
    {
        name: "edit_supplier_pullman",
        path: "pullmans/edit/:name/:supplier_id/:pullman_name/:id",
        meta: {
            label: "Modifica %pullman_name% (%name%)"
        },
        component: PullmanForm
    }

];