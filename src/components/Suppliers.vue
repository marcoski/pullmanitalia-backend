<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-users"></i> Fornitori</h4>
            </div>
            <div class="ml-auto p-1">
                <datatable-dropdown-menu scope="suppliers"></datatable-dropdown-menu>
            </div>
        </div>
        <b-container fluid class="app-card-body">
            <b-row class="app-card-body-header">
                <b-col md="4">
                    <b-form-group horizontal label="Filtra fornitori" label-size="md" :label-cols="2">
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
                    <b-form-group horizontal label="Fornitori per pagina" label-size="md" :label-cols="4">
                        <b-form-select :options="perPageOptions" v-model="itemsPerPage"></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col md="2">
                    <b-button :to="{name: 'add_new_supplier'}">Nuovo Fornitore</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="8">
                    <suppliers-data-table ref="dataTable" :filter="filter" :per-page="itemsPerPage"></suppliers-data-table>
                </b-col>
                <b-col md="4">
                    <supplier-single-sheet ref="dataTableSheet"></supplier-single-sheet>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>

    import BaseTableUI from "./mixins/BaseTableUI";
    import SuppliersDataTable from "./suppliers/SuppliersDataTable";
    import SupplierSingleSheet from "./suppliers/SupplierSingleSheet";

    export default {
        components: {
            SuppliersDataTable,
            SupplierSingleSheet
        },
        name: 'suppliers',

        mixins: [BaseTableUI]

    }
</script>