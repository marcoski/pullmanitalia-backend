<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-file-text"></i> Fatture (120)</h4>
            </div>
            <div class="ml-5 p-1">
                <b-button-group size="sm">
                    <b-button><i class="fa fa-sign-in"></i> In entrata</b-button>
                    <b-button><i class="fa fa-sign-out"></i> In uscita</b-button>
                </b-button-group>
            </div>
            <div class="ml-auto p-1">
                <b-input-group>
                    <b-input-group-addon>
                        <i class="fa fa-search"></i>
                    </b-input-group-addon>
                    <b-form-input size="sm" type="text" placeholder="Cerca fatture"></b-form-input>
                </b-input-group>
            </div>
        </div>
        <b-container fluid class="app-bills-body">
            <b-row class="app-card-body-header">
                <b-col md="4">
                    <b-btn class="mr-1" title="Nuova Fattura" v-b-tooltip.hover><i class="fa fa-plus-square-o"></i></b-btn>
                    <b-button class="mr-1" title="Modifica Fattura" v-b-tooltip.hover><i class="fa fa-edit"></i></b-button>
                    <b-button class="mr-1" title="Esporta Fattura" v-b-tooltip.hover><i class="fa fa-download"></i></b-button>
                    <b-button title="Stampa Fattura" v-b-tooltip.hover><i class="fa fa-print"></i></b-button>
                </b-col>
                <b-col md="2" offset-md="3">
                    <invoice-types></invoice-types>
                </b-col>
                <b-col md="2">
                    <invoice-date-range></invoice-date-range>
                </b-col>
                <b-col md="1" class="text-right">
                    <b-button class="mr-1" title="Vista lista" v-b-tooltip.hover><i class="fa fa-list"></i></b-button>
                    <b-button title="Vista tabella" v-b-tooltip.hover><i class="fa fa-table"></i></b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>
    import InvoiceTypes from "../util/InvoiceTypes";
    import InvoiceDateRange from "../util/InvoiceDateRange";

    export default {
        name: 'bills',
        components: {
            InvoiceTypes,
            InvoiceDateRange
        }
    }
</script>