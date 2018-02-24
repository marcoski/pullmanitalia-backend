<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col md="8">
                <last-booking></last-booking>
                <last-invoices></last-invoices>
            </b-col>
            <b-col md="4">
                <new-customers></new-customers>
                <new-suppliers></new-suppliers>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import LastBooking from './dashboard/LastBookings';
    import LastInvoices from './dashboard/LastInvoices';
    import NewCustomers from './dashboard/NewCustomers';
    import NewSuppliers from './dashboard/NewSuppliers';

    export default {
        name: 'dashboard',
        components: {
            'last-booking': LastBooking,
            'last-invoices': LastInvoices,
            'new-customers': NewCustomers,
            'new-suppliers': NewSuppliers
        }
    }
</script>