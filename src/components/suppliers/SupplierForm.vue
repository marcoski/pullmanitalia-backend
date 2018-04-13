<template>
    <b-card header-tag="header" footer-tag="footer">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i :class="formTitleIcon"></i> {{ formTitle }}</h4>
            </div>
        </div>
        <div class="d-flew flex-row" slot="footer">
            <div class="ml-auto text-right">
                <b-btn class="mr-3" :to="{name: 'suppliers'}">
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
                        <supplier-user-information-form :initial-supplier="item"></supplier-user-information-form>
                        <user-avatar-form :initial-item="item"></user-avatar-form>
                    </b-col>
                    <b-col md="9">
                        <user-data-form :initial-item="item"></user-data-form>
                        <supplier-data-form :initial-supplier="item"></supplier-data-form>
                        <bank-acount-form :initial-item="item"></bank-acount-form>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </b-card>
</template>
<script>

    import EmptySupplier from "../../data/_empty-supplier";
    import BaseAccountForm from "../mixins/BaseAccountForm";
    import BreadcrumbModifier from "../mixins/BreadcrumbModifier";
    import SupplierUserInformationForm from "./SupplierUserInformationForm";
    import SupplierDataForm from "./SupplierDataForm";


    export default{
        name: 'supplier-form',

        mixins: [BaseAccountForm, BreadcrumbModifier],

        components: {
            SupplierDataForm,
            SupplierUserInformationForm
        },

        data: function(){
            return {
                item: EmptySupplier,
            }
        },

        created: function(){
            if(typeof this.$route.params.id !== "undefined"){
                let id = this.$route.params.id;
                
                let supplier = this.$store.getters.getSupplierById(id);
                if(supplier === undefined){
                    this.$store.dispatch('loadSuppliers', {msg: 'Carico fornitori...'}).then(() => {
                        let s = this.$store.getters.getSupplierById(id);
                        this.setData(s);
                        this.$radio.$emit('item:loaded', s);
                    });
                }else{
                    this.setData(supplier);
                }
            }
        },

        

        methods: {
            submit: function(){
                let dispatch = this.$route.params.id !== undefined ? 'updateSupplier' : 'addSupplier';
                this.$store.dispatch(dispatch, {msg: 'Salvo fornitore...', data: this.item}).then(() => {
                    this.$radio.$emit('item:changed', this.item);
                    this.$router.push({name: 'suppliers'});
                });
            }
        }
    }
</script>