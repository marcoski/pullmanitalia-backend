<template>
    <b-modal class="modal-info app-modal-booking" ref="rentalModal" ok-variant="info">
        <template>
            <div slot="modal-title">
                <h5 class="modal-title"><i class="fa fa-ticket-o"></i> Prenotazione: {{ event.rental.code }} </h5>
            </div>
            <b-container fluid>
                <b-row>
                    <b-col>
                    <b-card no-body>
                        <b-tabs pills card v-model="tab" @input="onTabShow">
                            <b-tab title="Dettagli">
                                <form>
                                    <div class="form-group row">
                                        <label for="type" class="col-sm-2 col-form-label">Tipo:</label>
                                            <div class="col-sm-10">
                                                <b-form-input v-model="typeStr" disabled></b-form-input>    
                                            </div>
                                    </div>
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
                                <google-maps-map ref="routesMap" class="map" :zoom.sync="mapZoom" :center="center">
                                    <template v-for="marker in markers">
                                        <google-maps-marker :title="marker.title" :position="marker.loc"></google-maps-marker>
                                    </template>
                                    <google-maps-directions
                                        :origin="origin" 
                                        :destination="destination" 
                                        :waypoints="waypoints"
                                    />
                                </google-maps-map>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </b-modal>
</template>
<script>
    import DateTimeFormat from "../mixins/DateTimeFormat";
    import ColorPicker from "../util/ColorPicker";
    import EventManager from "../../classes/EventsManager";

    export default {
        name: "rental-modal",

        mixins: [DateTimeFormat],

        props: ['event'],

        components: {
            ColorPicker
        },

        data: function() {
            return {
                tab: 0,
                editorOptions: {
                    modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ align: [] }],
                        ["link"]
                    ]
                    }
                },
                mapZoom: 6
            };
        },

        computed: {
            center: function() {
                const start = this.event.from;
                return {
                    lat: parseFloat(start.lat),
                    lng: parseFloat(start.lng)
                };
            },

            markers: function() {
                let markers = [];
                const start = this.event.from
                const end = this.event.to
                markers.push({
                    loc: {
                        lat: parseFloat(start.lat),
                        lng: parseFloat(start.lng)
                    },
                    title: start.address
                })
                for(const route of this.event.waypoints){
                    let marker = {};
                    marker.loc = {
                        lat: parseFloat(route.lat),
                        lng: parseFloat(route.lng)
                    }
                    marker.title = route.address;
                    markers.push(marker);
                }

                if(start.address !== end.address){
                    marker.push({
                        loc: {
                            lat: parseFloat(end.lat),
                            lng: parseFloat(end.lng)
                        },
                        title: end.address
                    })
                }
                return markers;
            },

            origin: function(){
                const start = this.event.from;
                return {
                    lat: parseFloat(start.lat),
                    lng: parseFloat(start.lng)
                }
            },

            destination: function(){
                const end = this.event.to;
                return {
                    lat: parseFloat(end.lat),
                    lng: parseFloat(end.lng)
                }
            },

            waypoints: function(){
                let waypoints = [];
                const routes = this.event.waypoints
                for(let i = 1; i < routes.length - 1; i++){
                    const waypoint = {};
                    waypoint.location = {
                        lat: parseFloat(routes[i].lat),
                        lng: parseFloat(routes[i].lng)
                    };

                    waypoints.push(waypoint);
                }

                return waypoints;
            },

            typeStr: function(){
                if(this.event.rental.type === EventManager.DISP_STR){
                    return 'Disposizione in giornata'
                }else if(this.event.rental.type === EventManager.TRF_STR){
                    return 'Trasferimento semplice'
                }else if(this.event.rental.type === EventManager.TOUR_STR){
                    return 'Tour'
                }
            }
        },

        methods: {
            open: function() {
                this.$refs.rentalModal.show();
            },

            onDirectionsComplete: function(response) {
                console.log(response);
            },

            onTabShow(index){
                window.google.maps.event.trigger(this.$refs.routesMap.$_map, 'resize');
                this.$refs.routesMap.$_map.setCenter(this.center);
                this.$refs.routesMap.$_map.setZoom(this.mapZoom);
                console.log(index, this.$refs.routesMap);
            }
        }
    };
</script>
