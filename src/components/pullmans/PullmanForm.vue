<template>
    <b-card header-tag="header" footer-tag="footer">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-bus"></i> {{ formTitle }}</h4>
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
                    <b-col md="9">
                        <b-card header-tag="header">
                            <div class="d-flex flex-row" slot="header">
                                <div class="p-1">
                                    <h4><i class="fa fa-file"></i> Dati del pullman</h4>
                                </div>
                            </div>
                            <b-container fluid>
                                <b-row>
                                    <b-col>
                                        <div class="form-group row">
                                            <label for="itemName" class="col-sm-2 col-form-label">Nome:</label>
                                            <div class="col-sm-10">
                                                <b-form-input type="text" size="lg" v-model="item.name" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="itemDescriptionEditor" class="col-sm-2 col-form-label">Note:</label>
                                            <div class="col-sm-10">
                                                <quill-editor ref="ietmDescriptionEditor" v-model="item.description" :options="editorOptions"></quill-editor>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="itemLoc" class="col-sm-2 col-form-label">Geolocazione:</label>
                                             <div class="col-sm-4">
                                                <b-input-group>
                                                    <b-input-group-addon>
                                                        <i class="fa fa-map-marker"></i> 
                                                    </b-input-group-addon>
                                                    <b-form-input disabled :value="item.loc.address" type="text"></b-form-input>
                                                </b-input-group>
                                            </div>
                                            <div class="col-sm-6">
                                                <google-maps-autocomplete
                                                    id="searchClientAddress"
                                                    class="form-control app-form-address-search"
                                                    country="it"
                                                    placeholder="Cerca indirizzo..."
                                                    ref="googleMapsAutocomplete"
                                                >
                                                </google-maps-autocomplete>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="itemSeats" class="col-sm-2 col-form-label">Posti:</label>
                                            <div class="col-sm-2">
                                                <b-form-input type="number" v-model="item.seats" min="20" max="60" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="itemReservedSeats" class="col-sm-2 col-form-label">Posti riservati:</label>
                                            <div class="col-sm-2">
                                                <b-form-input type="number" v-model="item.reservedSeats" min="0" max="5" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="itemDrivers" class="col-sm-2 col-form-label">Autisti:</label>
                                            <div class="col-sm-2">
                                                <b-form-input type="number" v-model="item.drivers" min="1" max="3" />
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card>
                        <b-card header-tag="header">
                            <div class="d-flex flex-row" slot="header">
                                <div class="p-1">
                                    <h4><i class="fa fa-money"></i> Costi</h4>
                                </div>
                            </div>
                            <b-container fluid>
                                <b-row>
                                    <b-col>
                                        <b-form-group horizontal label="Orario">
                                             <b-input-group :right="$app.configs.currency">
                                                <b-form-input v-model="item.costHour"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group horizontal label="Mezza giornata">
                                             <b-input-group :right="$app.configs.currency">
                                                <b-form-input v-model="item.costHalfDay"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group horizontal label="Intera giornata">
                                             <b-input-group :right="$app.configs.currency">
                                                <b-form-input v-model="item.costDay"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <b-form-group horizontal label="Per Km">
                                             <b-input-group :right="$app.configs.currency">
                                                <b-form-input v-model="item.costPerKm"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group horizontal label="Transfer per Km">
                                             <b-input-group :right="$app.configs.currency">
                                                <b-form-input v-model="item.costTransferPerKm"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <b-form-group horizontal label="Tour">
                                             <b-input-group :right="$app.configs.currency">
                                                <b-form-input v-model="item.costTour"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group horizontal label="Km Tour">
                                            <b-form-input v-model="item.kmTour"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card>
                        <b-card header-tag="header">
                            <div class="d-flex flex-row" slot="header">
                                <div class="p-1">
                                    <h4><i class="fa fa-bus"></i> Servizi</h4>
                                </div>
                            </div>
                            <b-container fluid>
                                <b-row>
                                    <b-col>
                                        <div class="form-group row">
                                            <div class="col-sm-12">
                                                <multi-select 
                                                    v-model="item.services"
                                                    :options="availableServices"
                                                    label="label"
                                                    track-by="label"
                                                    :multiple="true"
                                                    :taggable="true"
                                                    placeholder="Aggiungi un servizio"
                                                    tag-placeholder="Aggiungi questo servizio"
                                                    ></multi-select>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card>
                    </b-col>
                    <b-col md="3">
                         <b-card header-tag="header">
                            <div class="d-flex flex-row" slot="header">
                                <div class="p-1">
                                    <h4><i class="fa fa-picture-o"></i> Immagini</h4>
                                </div>
                            </div>
                            <b-container fluid>
                                <b-row>
                                    <b-col>
                                        <div class="operation-container" v-for="image in item.images">
                                            <b-img thumbnail class="mt-3 mb-3" :src="image" />
                                            <div class="operation" :data-image="image" @click.prevent="deleteImageModalOpen($event.target)">
                                                <i class="fa fa-trash"></i>
                                            </div>
                                        </div>
                                        <b-btn class="mr-3" @click.prevent="addImageModalOpen" >
                                            <i class="fa fa-plus"></i> Aggiungi immagine
                                        </b-btn>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
        <media-modal ref="mediaModal"></media-modal>
        <warning-modal-delete
                @ok="deleteImage"
                ref="warningModal"
                title="Rimuovi immagine"
                body="Sei sicuro di voler rimuovere questa immagine?"></warning-modal-delete>
    </b-card>
</template>

<script>
    import EmptyPullman from "../../data/_empty-pullman";
    import BreadcrumbModifier from "../mixins/BreadcrumbModifier";
    import BaseAccountForm from "../mixins/BaseAccountForm";
    import MediaModal from "../util/MediaModal";
    import WarningModalDelete from "../util/WarningModalDelete";
    import MultiSelect from 'vue-multiselect';
        
    export default {
        name: 'pullman-supplier-form',

        mixins: [BreadcrumbModifier, BaseAccountForm],

        components: {
            MediaModal,
            WarningModalDelete,
            MultiSelect
        },

        data: function(){
            return {
                item: EmptyPullman,
                editorOptions: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'align': []}],
                            ['link']
                        ]
                    }
                },
            }
        },

        computed: {
            supplierId: function(){
                return parseInt(this.$route.params.supplier_id);
            },

            availableServices: function(){
                return this.$app.configs.pullman_services;
            }
        },

        created: function(){
            if(typeof this.$route.params.id !== "undefined"){
                const id = this.$route.params.id;
                
                const pullman = this.$store.getters.getPullmanById(id);
                if(pullman === undefined){
                    this.$store.dispatch('loadPullmans', {msg: 'Carico pullmans...', data: this.supplierId}).then(() => {
                        let p = this.$store.getters.getPullmanById(id);
                        this.setData(p);
                        //this.$radio.$emit('item:loaded', p);
                        console.log(JSON.parse(JSON.stringify(p)));
                    });
                }else{
                    this.setData(pullman);
                }
            }else{
                this.item.supplier = this.supplierId;
            }
        },

         mounted: function(){
            this.$radio.$on('media_modal:ok', (img) => {
                this.item.images.push(img);
            });

            this.$refs.googleMapsAutocomplete.$on('gmaps:autocomplete:place-changed', (data, place, id) => {
                this.item.loc.address = this.setAddressFromData(data);
                this.item.loc.lat = data.latitude;
                this.item.loc.lng = data.longitude;

                this.$refs.googleMapsAutocomplete.clear();
            });
        },

        methods: {
            submit: function(){
                let dispatch = this.$route.params.id !== undefined ? 'updatePullman' : 'addPullman';
                this.$store.dispatch(dispatch, {msg: 'Salvo pullman...', data: this.item}).then(() => {
                    this.$router.push({name: 'view_supplier_pullmans', params: {id: this.supplierId, name: this.$route.params.name}});
                });
            },

            addImageModalOpen: function(){
                this.$refs.mediaModal.open();
            },

            deleteImageModalOpen: function(target){
                let el = target;
                if(!target.classList.contains('operation')){
                    el = target.parentNode;
                }
                this.$refs.warningModal.open(el.dataset.image);
            },

            deleteImage: function(image){
                this.item.images = this.item.images.filter((img) => img !== image);
            },

            setAddressFromData: function(data){
                let address = data.route;
                if(data.street_number !== undefined){
                    address += ", "+data.street_number;
                }
                address += ", "+data.locality;

                return address;
            },

            addService: function(newService){
                console.log(newService);
            }
        }
    }

</script>