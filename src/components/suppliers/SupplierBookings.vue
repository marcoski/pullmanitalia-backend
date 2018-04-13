<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-file-text"></i> Prenotazioni per {{ nameParam }} ({{ routesCount }})</h4>
            </div>
            <div class="ml-auto p-1">

            </div>
        </div>
        <b-container fluid class="app-bills-body">
            <pullmans-booking-calendar :supplier="$route.params.id" @dropevent="onDropEvent" @clickevent="onClickEvent">
            </pullmans-booking-calendar>
        </b-container>
        <!--<booking-modal ref="bookingModal" :booking="selectedBooking" :center="selectedBookingPullmanLoc"></booking-modal>-->
        <rental-modal ref="rentalModal"></rental-modal>
    </b-card>
</template>
<script>
    import BreadcrumbModifier from "../mixins/BreadcrumbModifier";
    import PullmansBookingCalendar from "../util/PullmansBookingCalendar"
    import RentalModal from '../util/RentalModal';

    export default{
        name: 'supplier-bookings',

        data: function(){
            return {
                routes: [],
                routesCount: 0,
                pullmans: [],
                pullmansCount: 0,
                calendarEvents: [],
            }
        },

        components: {
            PullmansBookingCalendar,
            RentalModal
        },

        mixins: [BreadcrumbModifier],

        created: function(){
            let id = this.$route.params.id;
            let cachedItems = this.$store.getters.allRoutes;
            if(cachedItems.length > 0 ){
                return cachedItems;
            }
            /** 
             * MUST HANDLE pagination, filters and sorting on the server side:
             * to do that no-provider-paging, no-provider-sorting, no-provider-filtering props must be disabled or setted to false
             */
            this.$store.dispatch('loadPullmans', {msg: 'Carico pullmans...', data: id}).then(() => {
                    this.pullmans = this.$store.getters.allPullmans;
                    this.pullmansCount = this.$store.getters.countPullmans;
            }).then(() => {
                this.$radio.$emit('suppliers_booking:loaded');
            });
            
            this.$radio.$on("booking_calendar_routes:loaded", () => {
                this.routesCount = this.$store.getters.countRoutes;
            });
        },

        computed: {
            idParam: function(){
                return this.$route.params.id;
            }
        },

        methods: {
            setCalendarEvents: function(){
                return [];
            },

            onDropEvent: function(pullman, event){
                let toReplace = this.pullmans.filter((p) => (p.id == pullman))[0];
                let actualPullman = this.pullmans.filter((p) => (p.id == event.pullman))[0];
                let searchedBooking = Object.assign({}, actualPullman.bookings.filter((b) => (b.id == event.booking))[0]);
                searchedBooking.pullman = pullman;
                //remove booking
                actualPullman.bookings = actualPullman.bookings.reduce(function(bookingsAccumulator, currentBooking){
                    if(currentBooking.id != event.booking){
                        bookingsAccumulator.push(currentBooking);
                    }

                    return bookingsAccumulator;
                }, []);

                //add booking to other pullman
                toReplace.bookings.push(searchedBooking);
                //refresh event object
                event.pullman = pullman;
            },

            onClickEvent: function(event){
                console.log(JSON.parse(JSON.stringify(event)));
                /*let actualPullman = this.pullmans.filter((p) => (p.id == event.pullman))[0];
                this.selectedBooking = actualPullman.bookings.filter((b) => (b.id == event.booking))[0];
                this.selectedBookingPullmanLoc = {
                    lat: actualPullman.loc.lat,
                    lng: actualPullman.loc.lng
                };*/
                this.$refs.rentalModal.open(event);
            }
        }
    }

</script>