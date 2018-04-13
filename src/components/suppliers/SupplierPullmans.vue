<template>
<b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-bus"></i> Pullman di {{ nameParam }} </h4>
            </div>
            <div class="ml-auto p-1">
                <datatable-dropdown-menu scope="pullmans"></datatable-dropdown-menu>
            </div>
        </div>
        <b-container fluid class="app-card-body">
            <b-row class="app-card-body-header">
                <b-col md="4">
                    <b-form-group horizontal label="Filtra" label-size="md" :label-cols="2">
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
                    <b-form-group horizontal label="Pullman per pagina" label-size="md" :label-cols="4">
                        <b-form-select :options="perPageOptions" v-model="itemsPerPage"></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col md="2">
                    <b-button :to="{name: 'add_new_supplier_pullman', params: {supplier_id: supplierId}}">Nuovo Pullman</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="8">
                    <pullmans-data-table ref="dataTable" :filter="filter" :per-page="itemsPerPage"></pullmans-data-table>
                </b-col>
                <b-col md="4">
                    <pullman-single-sheet ref="dataTableSheet"></pullman-single-sheet>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>
    import BreadcrumbModifier from "../mixins/BreadcrumbModifier";
    import BaseTableUI from "../mixins/BaseTableUI";
    import PullmansDataTable from "../pullmans/PullmansDataTable";
    import PullmanSingleSheet from "../pullmans/PullmanSingleSheet";

    export default{
        name: "supplier-pullmans",

        components: {
            PullmansDataTable,
            PullmanSingleSheet
        },

        computed: {
            supplierId: function(){
                return this.$route.params.id;
            }
        },

        mixins: [BreadcrumbModifier, BaseTableUI]
    }
</script>