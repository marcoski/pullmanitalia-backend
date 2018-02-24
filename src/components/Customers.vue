<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-users"></i> Clienti</h4>
            </div>
            <div class="ml-auto p-1">
                <datatable-dropdown-menu scope="customers"></datatable-dropdown-menu>
            </div>
        </div>
        <b-container fluid class="app-card-body">
            <b-row class="app-card-body-header">
                <b-col md="4">
                    <b-form-group horizontal label="Filtra clienti" label-size="md" :label-cols="2">
                        <b-input-group>
                            <b-input-group-addon>
                                <i class="fa fa-search"></i>
                            </b-input-group-addon>
                            <b-form-input type="text" v-model="filter"></b-form-input>
                            <b-input-group-button>
                                <b-btn :disabled="!filter" @click="filter=''">Cancella</b-btn>
                            </b-input-group-button>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="3">
                    <b-form-group horizontal label="Clienti per pagina" label-size="md" :label-cols="4">
                        <b-form-select :options="perPageOptions" v-model="itemsPerPage"></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col md="2">
                    <b-button :to="{name: 'add_new_customer'}">Nuovo Cliente</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="8">
                    <customers-data-table ref="dataTable" :filter="filter" :per-page="itemsPerPage"></customers-data-table>
                </b-col>
                <b-col md="4">
                    <customer-single-sheet ref="dataTableSheet"></customer-single-sheet>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>

    import CustomersDataTable from "./customers/CustomersDataTable";
    import CustomerSingleSheet from "./customers/CustomerSingleSheet";
    import BaseTableUI from "./mixins/BaseTableUI";

    export default {
        name: 'customers',

        mixins: [BaseTableUI],

        components: {
            CustomerSingleSheet,
            CustomersDataTable,
        }
    }
</script>