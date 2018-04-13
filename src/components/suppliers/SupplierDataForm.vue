<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-file"></i> Dati di fatturazione</h4>
            </div>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Codice Fiscale" label-for="userFiscalCode">
                        <b-form-input id="userFiscalCode" v-model="item.fiscalCode" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Partita IVA" label-for="supplierVat">
                        <b-form-input id="supplierVat" v-model="item.vat" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Codice Univoco" label-for="supplierCuu">
                        <b-form-input id="supplierCuu" v-model="item.cuu" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="PEC" label-for="customerPecMail">
                        <b-form-input id="supplierPecMail" v-model="item.pecMail" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Nome fornitore" label-for="supplierName">
                        <b-form-input id="supplierName" v-model="item.name" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Email fornitore" label-for="supplierEmail">
                        <b-form-input id="supplierEmail" v-model="item.email" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3">
                    <b-alert show variant="secondary">
                        <b-btn :disabled="disabledCopyBtn == true" @click="copyAddressData">
                            <i class="fa fa-copy"> Copia indirizzo utente</i>
                        </b-btn>
                    </b-alert>
                </b-col>
                <b-col md="9">
                    <b-alert show variant="secondary">
                        <google-maps-autocomplete
                                id="searchClientAddress"
                                class="form-control app-form-address-search"
                                country="it"
                                placeholder="Cerca indirizzo..."
                                ref="googleMapsAutocomplete"
                        >
                        </google-maps-autocomplete>
                    </b-alert>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Indirizzo" label-for="supplierAddress">
                        <b-form-input id="supplierAddress" v-model="item.address" :disabled="isEmptyAddress" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Città" disabled label-for="supplierCity">
                        <b-form-input id="supplierCity" v-model="item.city" :disabled="isEmptyCity" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Provincia" label-for="supplierDistrict">
                        <b-form-input id="supplierDistrict" v-model="item.district" :disabled="isEmptyDistrict" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="CAP" label-for="supplierCap">
                        <b-form-input id="supplierCap" v-model="item.cap" :disabled="isEmptyCap" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Paese" label-for="supplierCountry">
                        <b-form-input id="supplierCountry" v-model="item.country" :disabled="isEmptyCountry" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>
    import AddressMixin from "../mixins/AddressMixin"

    export default{
        name: 'supplier-data-form',

        mixins: [AddressMixin],

        props: ['initialSupplier'],

        data: function(){
            return {
                item: this.initialSupplier,
            }
        },

        created: function(){
            this.$radio.$on('item:loaded', (item) => {
                this.item = item;
            })
        }
    }
</script>