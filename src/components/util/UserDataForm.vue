<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-id-card-o"></i> Anagrafica Utente</h4>
            </div>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Nome" label-for="userName">
                        <b-form-input id="userName" v-model="item.user.name" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Cognome" label-for="userLastName">
                        <b-form-input id="userLastName" v-model="item.user.surname" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Telefono" label-for="userPhone">
                        <b-form-input id="userPhone" v-model="item.user.phone" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Cellulare" label-for="userMobile">
                        <b-form-input id="userMobile" v-model="item.user.mobile" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-alert show variant="secondary">
                        <google-maps-autocomplete
                                id="searchUserAddress"
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
                    <b-form-group horizontal :label-cols="4" label="Indirizzo" label-for="userAddress">
                        <b-form-input id="userAddress" v-model="item.user.address" :disabled="isEmptyAddress" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Città" disabled label-for="userCity">
                        <b-form-input id="userCity" v-model="item.user.city" :disabled="isEmptyCity" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Provincia" label-for="userDistrict">
                        <b-form-input id="userDistrict" v-model="item.user.district" :disabled="isEmptyDistrict" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="CAP" label-for="userCap">
                        <b-form-input id="userCap" v-model="item.user.cap" :disabled="isEmptyCap" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Paese" label-for="userCountry">
                        <b-form-input id="userCountry" v-model="item.user.country" :disabled="isEmptyCountry" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>

    export default {
        name: 'user-data-form',

        props: ['initialItem'],

        data: function(){
            return {
                item: this.initialItem
            }
        },

        created: function(){
            this.$radio.$on('item:loaded', (item) => {
                this.item = item;
            })
        },

        mounted: function(){
            this.$refs.googleMapsAutocomplete.$on('gmaps:autocomplete:place-changed', (data, place, id) => {
                if(id === 'searchUserAddress'){
                    this.fillUserAddressFields(data);
                    this.$radio.$emit('address:fill', data);
                }

                this.$refs.googleMapsAutocomplete.clear();
            });
        },

        computed: {
            isEmptyAddress: function(){
                return this.item.user.address === null || this.item.user.address === '';
            },

            isEmptyCap: function(){
                return this.item.user.cap === null || this.item.user.cap === '';
            },

            isEmptyDistrict: function(){
                return this.item.user.district === null || this.item.user.district === '';
            },

            isEmptyCountry: function(){
                return this.item.user.country === null || this.item.user.country === '';
            },

            isEmptyCity: function(){
                return this.item.user.city === null || this.item.user.city === '';
            }
        },

        methods: {
            fillUserAddressFields: function(data){
                this.item.user.address = data.route;
                if(data.hasOwnProperty('street_number')){
                    this.item.user.address += `, ${data.street_number}`;
                }
                if(data.hasOwnProperty('postal_code')) {
                    this.item.user.cap = data.postal_code;
                }
                if(data.hasOwnProperty('administrative_area_level_2')){
                    this.item.user.district = data.administrative_area_level_2;
                }
                if(data.hasOwnProperty('country')){
                    this.item.user.country = data.country;
                }
                if(data.hasOwnProperty('locality')){
                    this.item.user.city = data.locality;
                }
            }
        }
    };
</script>