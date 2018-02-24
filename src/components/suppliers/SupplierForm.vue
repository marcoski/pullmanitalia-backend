<template>
    <b-card header-tag="header" footer-tag="footer">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-user-plus"></i> Nuovo fornitore</h4>
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

    import Suppliers from "../../data/_suppliers";
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
                /**
                 * @TODO load customers from api with axios
                 */
                let supplier = this.$lodash.find(Suppliers.items, (o) => { return o.id == id});
                this.setData(supplier);
            }
        }
    }
</script>