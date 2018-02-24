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
                        <b-form-input id="userFiscalCode" v-model="item.user.fiscalCode" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Partita IVA" label-for="customerVat">
                        <b-form-input id="customerVat" v-model="item.vat" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="2" label="Codice Univoco" label-for="customerCuu">
                        <b-form-input id="customerCuu" v-model="item.cuu" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Nome cliente" label-for="customerName">
                        <b-form-input id="customerName" v-model="item.name" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Email cliente" label-for="customerEmail">
                        <b-form-input id="customerEmail" v-model="item.email" type="text"></b-form-input>
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
                    <b-form-group horizontal :label-cols="4" label="Indirizzo" label-for="customerAddress">
                        <b-form-input id="customerAddress" v-model="item.address" :disabled="isEmptyAddress" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Città" disabled label-for="customerCity">
                        <b-form-input id="customerCity" v-model="item.city" :disabled="isEmptyCity" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Provincia" label-for="customerDistrict">
                        <b-form-input id="customerDistrict" v-model="item.district" :disabled="isEmptyDistrict" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="CAP" label-for="customerCap">
                        <b-form-input id="customerCap" v-model="item.cap" :disabled="isEmptyCap" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Paese" label-for="customerCountry">
                        <b-form-input id="customerCountry" v-model="item.country" :disabled="isEmptyCountry" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>

    import AddressMixin from "../mixins/AddressMixin";

    export default {
        name: 'customer-data-form',

        mixins: [AddressMixin],

        props: ['initialCustomer'],

        data: function(){
            return {
                item: this.initialCustomer,
            }
        }
    };
</script>