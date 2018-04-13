import Bills from "../components/bills/Bills.vue";
import BillsForm from "../components/bills/BillsForm.vue";

export default  [
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