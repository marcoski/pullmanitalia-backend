<template>
    <b-card :class="[isVisible ? 'app-sheet visible' : 'app-sheet invisible']">
        <b-row>
            <b-col md="6">
                <h3><i :class="getFeedbackIcon(item)"></i> {{item.id}}# {{ item.name }}</h3>
                <dl class="row sheet-block">
                    <dt class="col-sm-4">Email:</dt>
                    <dd class="col-sm-8"><b-btn size="sm"><i class="fa fa-envelope"></i> {{ item.email }}</b-btn></dd>
                    <dt class="col-sm-4">Utente:</dt>
                    <dd class="col-sm-8"><b-btn size="sm"><i class="fa fa-user"></i> {{ username }}</b-btn></dd>
                    <dd class="col-sm-4">Telefono: </dd>
                    <dt class="col-sm-8">{{ item.phone }}</dt>
                    <dd class="col-sm-4">Cellulare</dd>
                    <dt class="col-sm-8">{{ item.mobile }}</dt>
                </dl>
                <dl class="row sheet-block">
                    <dt class="col-sm-4">C.F:</dt>
                    <dd class="col-sm-8">{{ item.user.fiscalCode }}</dd>
                    <dt v-if="item.vat" class="col-sm-4">P.IVA</dt>
                    <dd v-if="item.vat" class="col-sm-8">{{ item.vat }}</dd>
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
            <b-col md="6">
                <div class="text-right">
                    <b-btn :to="{name: 'edit_supplier', params: {id:item.id, name:urlName}}">
                        <i class="fa fa-edit"></i> Modifica
                    </b-btn>
                    <b-btn @click.native.stop @click="deleteModalOpen">
                        <i class="fa fa-trash"></i> Elimina
                    </b-btn>
                </div>
                <div class="text-warning text-right mt-3">
                    <span class="font-5xl" v-for="c in stars">
                        <i :class="c"></i>
                    </span>
                </div>
                <b-img thumbnail class="mt-3 mb-3" width="254" height="254" :src="personalAvatar" />
                <b-btn block class="mb-2" :to="{name: 'view_supplier_invoices', params:{id:item.id, name:urlName}}">
                    <i class="fa fa-file"></i> Visualizza fatture
                </b-btn>
                <b-btn block class="mb-2" :to="{name: 'view_supplier_bookings', params:{id:item.id, name:urlName}}">
                    <i class="fa fa-ticket"></i> Prenotazioni
                </b-btn>
                <b-btn block class="mb-2" :to="{name: 'view_supplier_pullmans', params:{id:item.id, name:urlName}}">
                    <i class="fa fa-bus"></i> Pullman
                </b-btn>
                <b-btn block class="mt-3">
                    <i class="fa fa-comments"></i> Feedback Utenti
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
    import EmptySupplier from "../../data/_empty-supplier";

    export default{
        name: 'suppliers-single-sheet',

        mixins: [BaseDataSheet],

        data: function (){
            return {
                item: EmptySupplier
            };
        },

        methods: {
            getFeedbackIcon: function(item){
                let feedBacks = item.feedBacks;
                let feedBackIcon;
                switch (feedBacks.strategy){
                    case "warning":
                        feedBackIcon = 'fa fa-exclamation-circle text-warning';
                        break;
                    case "error":
                        feedBackIcon = 'fa fa-times-circle text-danger';
                        break;
                    case "success":
                        feedBackIcon = 'fa fa-check-circle text-success';
                        break;
                }

                return feedBackIcon;
            }
        },

        computed: {
            stars: function(){
                let stars = ['fa fa-star-o', 'fa fa-star-o', 'fa fa-star-o', 'fa fa-star-o', 'fa fa-star-o'];
                let totalScore = (this.item.feedBacks.score * 5) / 100;
                let integerFloorScore = Math.floor(totalScore);

                for(let i = 0; i < integerFloorScore; i++){
                    stars[i] = 'fa fa-star';
                }

                if(totalScore > integerFloorScore && (totalScore >= (integerFloorScore+0.5))){
                    stars[integerFloorScore] = 'fa fa-star-half-o';
                }

                return stars;
            },

            urlName: function(){
                return this.$lodash.kebabCase(this.item.name);
            }
        }

    }
</script>