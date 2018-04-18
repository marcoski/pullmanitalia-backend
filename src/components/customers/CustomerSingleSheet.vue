<template>
    <b-card :class="[isVisible ? 'app-sheet visible' : 'app-sheet invisible']">
        <b-row>
            <b-col md="8">
                <h3><i :class="{'fa': true, 'fa-star': true, 'text-warning': item.trusted }"></i> {{ item.name }}</h3>
            </b-col>
            <b-col md="4">
                <div class="text-right">
                    <b-btn :to="{name: 'edit_customer', params: {id:item.id, name:urlName}}">
                        <i class="fa fa-edit"></i>
                    </b-btn>
                    <b-btn @click.native.stop @click="deleteModalOpen">
                        <i class="fa fa-trash"></i>
                    </b-btn>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <dl class="row sheet-block">
                    <dt class="col-sm-4">Email:</dt>
                    <dd class="col-sm-8"><b-btn size="sm"><i class="fa fa-envelope"></i> {{ item.email }}</b-btn></dd>
                    <dt class="col-sm-4">Utente:</dt>
                    <dd class="col-sm-8"><b-btn size="sm"><i class="fa fa-user"></i> {{ username }}</b-btn></dd>
                </dl>
                <dl class="row sheet-block">
                    <template v-if="item.trusted">
                        <dt class="col-sm-4">Codice univoco:</dt>
                        <dd class="col-sm-8">{{ item.cuu }}</dd>
                    </template>
                    <template v-else>
                        <dt class="col-sm-4">C.F:</dt>
                        <dd class="col-sm-8">{{ item.user.fiscalCode }}</dd>
                        <dt v-if="item.vat" class="col-sm-4">P.IVA</dt>
                        <dd v-if="item.vat" class="col-sm-8">{{ item.vat }}</dd>
                    </template>
                    <dt class="col-sm-4">Indirizzo:</dt>
                    <dd class="col-sm-8">{{ fullAddress }}</dd>
                </dl>
                <template v-if="item.bank_account">
                    <dl class="row sheet-block">
                        <dt class="col-sm-4">Banca:</dt>
                        <dd class="col-sm-8">{{ item.bank_account.bank_name }}</dd>
                        <dt class="col-sm-4">Beneficiario:</dt>
                        <dd class="col-sm-8">{{ item.bank_account.beneficiary }}</dd>
                        <dt class="col-sm-4">IBAN:</dt>
                        <dd class="col-sm-8">{{ item.bank_account.iban }}</dd>
                        <dt class="col-sm-4">BIC/SWIFT:</dt>
                        <dd class="col-sm-8">{{ item.bank_account.bic_swift_code }}</dd>
                    </dl>
                </template>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-btn :to="{name: 'view_customer_invoices', params: {id:item.id, name:urlName}}">
                    <i class="fa fa-file"></i> Fatture
                </b-btn>
                <b-btn>
                    <i class="fa fa-ticket"></i> Prenotazioni
                </b-btn>
                <b-btn>
                    <i class="fa fa-comments"></i> Feedback
                </b-btn>
            </b-col>
        </b-row>
        <warning-modal-delete
                @ok="doDelete"
                ref="warningModal"
                :title="deleteTitle"
                :body="deleteBody"></warning-modal-delete>
    </b-card>
</template>
<script>
    import BaseDataSheet from "../mixins/BaseDataSheet";
    import EmptyCustomer from "../../data/_empty-customer";

    export default {
        name: 'customer-single-sheet',

        mixins: [BaseDataSheet],

        data: function (){
            return {
                item: EmptyCustomer
            };
        },

        computed: {
            urlName: function(){
                return this.$lodash.kebabCase(this.item.name);
            }
        }
    }
</script>