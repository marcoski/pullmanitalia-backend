<template>
    <b-card :class="[isVisible ? 'app-sheet visible' : 'app-sheet invisible']">
        <b-row>
            <b-col md="6">
                <h3>{{item.id}}# {{ item.name }}</h3>
                <dl class="row sheet-block">
                    <dt class="col-sm-4">Posti:</dt>
                    <dd class="col-sm-8">
                        {{ item.seats }} + {{ item.reservedSeats }}
                        <i class="fa fa-info-circle" v-b-tooltip.hover title="Posti riservati a guide o accompagnatori turistici"></i>
                    </dd>
                    <dt class="col-sm-4">Autisti:</dt>
                    <dd class="col-sm-8">{{ item.drivers }}</dd>
                </dl>
                <dl class="row sheet-block sheet-pullman-service">
                    <template v-for="service in item.services">
                        <dt class="col-sm-4"><i :class="service.icon"></i></dt>
                        <dd class="col-sm-8">{{ service.label }}</dd>
                    </template>
                </dl>
            </b-col>
            <b-col md="6">
                <div class="text-right">
                    <b-btn :to="{name: 'edit_supplier_pullman', params:{
                        id: item.id, 
                        name: supplierName, 
                        supplier_id: supplierId,
                        pullman_name: urlName
                    }}">
                        <i class="fa fa-edit"></i> Modifica
                    </b-btn>
                    <b-btn @click.native.stop @click="deleteModalOpen">
                        <i class="fa fa-trash"></i> Elimina
                    </b-btn>
                </div>
                <b-img thumbnail class="mt-3 mb-3" width="254" height="254" :src="pullmanImage" />
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

    import EmptyPullman from "../../data/_empty-pullman";
    import WarningModalDelete from "../util/WarningModalDelete";

    export default{
        name: 'pullman-single-sheet',

        data: function (){
            return {
                item: EmptyPullman,
                isVisible: false
            };
        },

        components: {
            WarningModalDelete
        },

        methods: {
            show: function(item){
                this.item = item;
                this.isVisible = true;
                this.$emit('sheet:shown');
            },

            deleteModalOpen: function(){
                this.$refs.warningModal.open(this.item);
            },

            doDelete: function(item){
                this.$radio.$emit('delete:single', item);
            }
        },

        computed: {
            pullmanImage: function(){
                if(this.item.images.length == 0){
                    return this.$app.configs.default_avatar;
                }

                return this.item.images[0];
            },

            deleteTitle: function(){
                return 'Cencella: '+ this.item.name;
            },
            deleteBody: function(){
                return 'Sei sicuro di voler cancellare: '+this.item.name+'? Clicca OK per proseguire...';
            },

            urlName: function(){
                return this.$lodash.kebabCase(this.item.name);
            },

            supplierName: function(){
                return this.$route.params.name;
            },

            supplierId: function(){
                return this.$route.params.id;
            }
        }

    }
</script>