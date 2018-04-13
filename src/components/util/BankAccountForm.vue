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

        created: function(){
            this.$radio.$on('item:loaded', (item) => {
                this.item = item;
            })
        },

        computed: {
            beneficary: {
                get: function(){
                    if(this.item.bank_account === null){
                        return '';
                    }

                    return this.item.bank_account.beneficiary;
                },

                set: function(beneficary){
                    this.item.bank_account.beneficary = beneficary;
                }
            },

            bank_name: {
                get: function(){
                    if(this.item.bank_account === null){
                        return '';
                    }

                    return this.item.bank_account.bank_name;
                },

                set: function(bankName){
                    this.item.bank_account.bank_name = bankName;
                }
            },

            bic_swift_code: {
                get: function(){
                    if(this.item.bank_account === null){
                        return '';
                    }

                    return this.item.bank_account.bic_swift_code;
                },

                set: function(bicSwift){
                    this.item.bank_account.bic_swift_code = bicSwift;
                }
            },
            iban: {
                get: function(){
                    if(this.item.bank_account === null){
                        return '';
                    }

                    return this.item.bank_account.iban;
                },

                set: function(iban){
                    this.item.bank_account.iban;
                }
            }
        }
    };
</script>