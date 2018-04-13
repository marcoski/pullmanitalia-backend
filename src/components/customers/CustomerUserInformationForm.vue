<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-sign-in"></i> Informazioni Utente</h4>
            </div>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="10">
                        <label slot="label" label-for="trustedUser"><strong>Utente trusted</strong></label>
                        <b-form-checkbox id="trustedUser" v-model="customer.trusted"></b-form-checkbox>
                    </b-form-group>
                    <b-form-group horizontal :label-cols="4" label="Email" label-for="userEmail">
                        <b-form-input id="userEmail" v-model="customer.user.email" type="text"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Password" label-for="userPassword">
                        <b-form-input id="userPassword" type="password"></b-form-input>
                        <b-form-input type="password" placeholder="Conferma password" class="mt-2"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>
    export default {
        name: 'customer-user-information-form',

        props: ['initialCustomer'],

        data: function(){
            return {
                customer: this.initialCustomer,
            }
        },

        created: function(){
            this.$radio.$on('item:loaded', (item) => {
                this.customer = item;
            })
        }
    };
</script>