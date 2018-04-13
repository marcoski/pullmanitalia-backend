<template>
    <b-card header-tag="header" footer-tag="footer">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-user-plus"></i> {{ formTitle }}</h4>
            </div>
        </div>
        <div class="d-flew flex-row" slot="footer">
            <div class="ml-auto text-right">
                <b-btn class="mr-3" :to="{name: 'customers'}">
                    <i class="fa fa-times"></i> Cancella
                </b-btn>
                <b-btn type="submit" @click.native.stop @click="submit">
                    <i :class="formBtnIcon"></i> {{ formBtnLabel }}
                </b-btn>
            </div>
        </div>
        <b-container fluid class="app-card-body">
            <b-form>
                <b-row>
                    <b-col md="3">
                        <customer-user-information-form :initial-customer="item"></customer-user-information-form>
                        <user-avatar-form :initial-item="item"></user-avatar-form>
                    </b-col>
                    <b-col md="9">
                        <user-data-form :initial-item="item"></user-data-form>
                        <customer-data-form :initial-customer="item"></customer-data-form>
                        <bank-acount-form :initial-item="item"></bank-acount-form>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </b-card>
</template>
<script>
    import BaseAccountForm from "../mixins/BaseAccountForm";
    import BreadcrumbModifier from "../mixins/BreadcrumbModifier";
    import EmptyCustomer from "../../data/_empty-customer";
    import CustomerUserInformationForm from "./CustomerUserInformationForm";
    import CustomerDataForm from "./CustomerDataForm";

    export default {
        name: 'customers-form',

        components: {
            CustomerDataForm,
            CustomerUserInformationForm
        },

        mixins: [BaseAccountForm, BreadcrumbModifier],

        data: function(){
            return {
                item: EmptyCustomer,
            }
        },

        created: function(){
            if(typeof this.$route.params.id !== "undefined"){
                let id = this.$route.params.id;
                
                let customer = this.$store.getters.getCustomerById(id);
                if(customer === undefined){
                    this.$store.dispatch('loadCustomers', {msg: 'Carico clienti...'}).then(() => {
                        let c = this.$store.getters.getCustomerById(id);
                        this.setData(c);
                        this.$radio.$emit('item:loaded', c);
                    });
                }else{
                    this.setData(customer);
                }
            }
        },

        methods: {
            submit: function(){
                let dispatch = this.$route.params.id !== undefined ? 'updateCustomer' : 'addCustomer';
                this.$store.dispatch(dispatch, {msg: 'Salvo cliente', data: this.item}).then(() => {
                    this.$radio.$emit('item:changed', this.item);
                    this.$route.push({name: 'customers'});
                });
                
            }
        }
    }
</script>