<template>
    <b-modal lazy class="modal-info app-modal-booking" ref="rentalModal" ok-variant="info">
        <div slot="modal-title">
            <h5 class="modal-title"><i class="fa fa-ticket-o"></i> Prenotazione: {{ event.rental.code }} </h5>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>
                   <b-card no-body>
                       <b-tabs pills card>
                           <b-tab title="Dettagli" active>
                               <form>
                                   <div class="form-group row">
                                       <label for="noteEditor" class="col-sm-2 col-form-label">Note:</label>
                                        <div class="col-sm-10">
                                            <quill-editor ref="noteEditor" v-model="event.note" :options="editorOptions"></quill-editor>
                                        </div>
                                   </div>
                                   <div class="form-group row">
                                       <label for="colorPicker" class="col-sm-2 col-form-label">Color: </label>
                                       <div class="col-sm-10">
                                           <color-picker :color="event.color"></color-picker>
                                       </div>
                                   </div>
                               </form>
                           </b-tab>
                           <b-tab title="Itinerario">
                               <google-maps-map ref="routesMap" class="map" :zoom.sync="mapZoom" :center="center" :bounds="bounds">
                                   <!--<template v-for="route in routes">
                                       <google-maps-marker :title="route.title" :position="route.position"></google-maps-marker>
                                   </template>
                                   <google-maps-directions 
                                        :origin="origin" 
                                        :destination="destination" 
                                        :waypoints="waypoints"
                                        @complete="onDirectionsComplete"
                                    />-->
                               </google-maps-map>
                           </b-tab>
                       </b-tabs>
                   </b-card>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>

    import EmptyRoute from "../../data/_empty-routes.js";
    import DateTimeFormat from "../mixins/DateTimeFormat";
    import ColorPicker from "../util/ColorPicker";

    export default {
        name: 'rental-modal',

        mixins: [DateTimeFormat],

        components: {
            ColorPicker
        },

        //props: ['booking', 'center'],

        data: function(){
            return {
                event: EmptyRoute,
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
                mapZoom: 12
            };
        },

        computed: {
            center: function(){
                if(this.event.pullman.loc === null){
                    return {
                        lat: 0,
                        lng: 0
                    }
                }
                return {
                    lat: parseFloat(this.event.pullman.loc.lat),
                    lng: parseFloat(this.event.pullman.loc.lng)
                }
            },

            routes: function(){
                
            },

            origin: function(){
                
            },

            destination: function(){
                
            },

            waypoints: function(){
                
            },

            bounds: function(){
                if(this.event.loc === null){
                    return [];
                }

                return [
                    {
                        lat: parseFloat(this.event.loc.lat),
                        lng: parseFloat(this.event.loc.lng)
                    },
                    {
                        lat: parseFloat(this.event.pullman.loc.lat),
                        lng: parseFloat(this.event.pullman.loc.lng)
                    }
                ]
            }
        },

        methods: {
            open: function(event){
                this.event = event;
                this.$refs.rentalModal.show();
            },

            onDirectionsComplete: function(response){
                console.log(response);
            }
        }
    }
</script>
