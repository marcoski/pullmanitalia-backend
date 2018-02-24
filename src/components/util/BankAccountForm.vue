<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-bank"></i> Dati banca</h4>
            </div>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Banca" label-for="bankName">
                        <b-form-input id="bankName" v-model="bank_name" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Beneficiario" label-for="bankBeneficiary">
                        <b-form-input id="bankBeneficiary" v-model="beneficary" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="Iban" label-for="bankIban">
                        <b-form-input id="bankIban" v-model="iban" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group horizontal :label-cols="4" label="BIC/SWIFT" label-for="bankBicSwiftCode">
                        <b-form-input id="bankBicSwiftCode" v-model="bic_swift_code" type="text"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>
    export default {
        name: 'bank-acount-form',

        props: ['initialItem'],

        data: function(){
            return {
                item: this.initialItem
            }
        },

        computed: {
            beneficary: function(){
                if(this.item.bank_account === null){
                    return '';
                }

                return this.item.bank_account.beneficiary;
            },

            bank_name: function(){
                if(this.item.bank_account === null){
                    return '';
                }

                return this.item.bank_account.bank_name;
            },

            bic_swift_code: function(){
                if(this.item.bank_account === null){
                    return '';
                }

                return this.item.bank_account.bic_swift_code;
            },

            iban: function(){
                if(this.item.bank_account === null){
                    return '';
                }

                return this.item.bank_account.iban;
            }
        }
    };
</script>