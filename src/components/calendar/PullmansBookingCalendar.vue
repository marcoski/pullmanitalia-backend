<template>
    <b-card header-tag="header" class="scheduler">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <b-input-group>
                    <b-input-group-addon>
                        <i class="fa fa-bus"></i>
                    </b-input-group-addon>
                    <b-form-select v-model="selectedFilter" :options="filters"></b-form-select>
                </b-input-group>
            </div>
            <div class="mr-auto ml-auto period align-self-center">
                <span v-if="view === 'month'">{{ start }} - {{ end }}</span>
                <span v-else-if="view === 'day'">{{ dayDateStr }}</span>
            </div>
            <div class="ml-auto actions align-self-center">
                <b-btn @click="switchToDay" v-if="view === 'month'">Vista giornata</b-btn>
                <b-btn @click="switchToMonth" v-if="view === 'day'">Vista mese</b-btn>
                <b-btn @click="onToday" class="mr-4">Oggi</b-btn>
                <b-btn @click="onPrevPeriod"><i class="fa fa-caret-left"></i></b-btn>
                <b-btn @click="onNextPeriod"><i class="fa fa-caret-right"></i></b-btn>
            </div>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>
                    <div class="scheduler-header d-flex flex-row text-center">
                        <div class="p-2 align-self-center services"><i class="fa fa-bus"></i> Pullman</div>
                        <div class="calendar-bar">
                            <div class="p-2  current-month">
                                <span v-if="view === 'month'">{{ month }}</span>
                                <span v-if="view === 'day'">{{ dayOfWeek }}</span>
                            </div>
                            <div class="month-days d-flex flex-row">
                                <template v-if="view === 'month'">
                                    <div 
                                        class="p-2 day" 
                                        @click="onClickDay(day, month)" 
                                        v-for="day in date.daysInMonth()" 
                                        :key="day" 
                                        :style="dayCellWidth"
                                    >
                                        {{ day }}
                                    </div>
                                </template>
                                <template v-if="view === 'day'">
                                    <div
                                        class="p-2 day"
                                        v-for="hour in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]"
                                        :key="hour"
                                        :style="hourCellWidth"
                                    >
                                        {{ hour }}
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div v-for="pullman in pullmans" :key="pullman.id" class="scheduler-body d-flex flex-row">
                        <div class="p-2 align-self-center services">{{ pullman.name }}</div>
                        <month 
                            v-if="view === 'month'"
                            :date="date" 
                            :cellWidth="dayCellWidth" 
                            :pullman="pullman"
                            :events="events"
                            @clickevent="onClickEvent"
                        ></month>
                        <day 
                            v-else-if="view === 'day'"
                            :date="dayDate"
                            :cellWidth="hourCellWidth" 
                            :pullman="pullman"
                            :events="events"
                            @clickevent="onClickEvent"
                        >
                        </day>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>

    import Month from "./Month";
    import Day from "./Day";

    export default{
        name: "pullmans-booking-calendar",

        props: ['supplier'],

        components: {
            Month,
            Day
        },

        data: function(){
            return {
                view: 'month',
                pullmans: [],
                events: [],
                selectedFilter: 'all',
                filters: [
                    { value: 'all', text: 'Tutte' }
                ],
                date: null,
                dayDate: null,
                start: null,
                end: null,
                month: null,
                dayCellWidth: {
                    "width": "0%"
                },
                hourCellWidth: {
                    "width": 100/24 + "%"
                },
                currentDragEvent: null,
            }
        },

        created: function(){
            this.$radio.$on('suppliers_booking:loaded', () => {
                this.pullmans = this.$store.getters.allPullmans;
                this.pullmans.forEach((p) => {
                    this.filters.push({
                        text: p.name,
                        value: p.id
                    });
                });
            }); 
            this.$moment.locale('it');
            this.date = this.$moment();
        },

        watch: {
            date: function(date){
                let d = this.$moment(date);
                /** set start period */
                d.set('date', 1);
                this.startObj = this.$moment(d);
                this.start = d.format('D MMMM YYYY');

                /** set end period */
                let lastDayOfMonth = d.add(1, 'months').date(0);
                this.end = lastDayOfMonth.format('D MMMM YYYY');

                this.month = date.format("MMMM YYYY");
                this.dayCellWidth = {
                    "width": 100/date.daysInMonth()+"%"
                };
                this.events = [];
                this.$store.dispatch('loadRoutes', {
                    msg: 'Carico prenotazioni e tratte...', 
                    data: {
                        id: this.supplier, date: this.date, view: this.view
                    }
                }).then(() => {
                    this.events = this.$store.getters.allRoutes;
                    this.$radio.$emit("booking_calendar_routes:loaded");
                });
            },

            dayDate: function(date){
                this.dayDateStr = this.dayDate.format('D MMMM YYYY');
                this.dayOfWeek = this.dayDate.format('dddd');
                this.events = [];
                this.$store.dispatch('loadRoutes', {
                    msg: 'Carico prenotazioni e tratte...', 
                    data: {
                        id: this.supplier, date: this.dayDate, view: this.view
                    }
                }).then(() => {
                    this.events = this.$store.getters.allRoutes;
                    this.$radio.$emit("booking_calendar_routes:loaded");
                })
            }
        },

        methods: {
            onToday: function(){
                this.date = this.$moment();
                this.dayDate = this.$moment();
            },

            onNextPeriod: function(){
                if(this.view === 'month'){
                    let d = this.$moment(this.date);
                    d.add(1, 'months');
                    this.date = d;
                }else if(this.view === 'day'){
                    let d = this.$moment(this.dayDate);
                    d.add(1, 'days');
                    this.dayDate = d;
                }
            },

            onPrevPeriod: function(){
                if(this.view === 'month'){
                    let d = this.$moment(this.date);
                    d.subtract(1, 'months');
                    this.date = d;
                }else if(this.view === 'day'){
                    let d = this.$moment(this.dayDate);
                    d.subtract(1, 'days');
                    this.dayDate = d;
                }
            },

            onClickEvent: function(event){
                this.$emit('clickevent', event);
            },

            onClickDay: function(day){
                this.dayDate = this.$moment(this.startObj).add(day - 1, 'days');
                this.view = 'day';
            },

            switchToMonth: function(){
                this.view = 'month';
                this.events = [];
                if(this.date === null){
                    this.date = this.$moment();
                }
                this.$store.dispatch('loadRoutes', {
                    msg: 'Carico prenotazioni e tratte...', 
                    data: {
                        id: this.supplier, date: this.date, view: this.view
                    }
                }).then(() => {
                    this.events = this.$store.getters.allRoutes;
                    this.$radio.$emit("booking_calendar_routes:loaded");
                })
            },

            switchToDay: function(){
                this.view = 'day';
                this.events = []; 
                if(this.dayDate === null){
                    this.dayDate = this.$moment();
                }
                this.$store.dispatch('loadRoutes', {
                    msg: 'Carico prenotazioni e tratte...', 
                    data: {
                        id: this.supplier, date: this.dayDate, view: this.view
                    }
                }).then(() => {
                    this.events = this.$store.getters.allRoutes;
                    this.$radio.$emit("booking_calendar_routes:loaded");
                })
            },

            /**
             * Darg and Drops events handling
             */
            onDragStart: function(event, wEvent){
                wEvent.dataTransfer.effectAllow = 'move';
                wEvent.dataTransfer.setData("text/plain", event.booking);
                wEvent.dataTransfer.setDragImage(wEvent.target, 0, 0);
                this.currentDragEvent = this.events.find(
                    ev => (ev.start.isSame(event.start) && ev.end.isSame(event.end) && ev.booking == event.booking)
                );
                return true;
            },

            onDragOver: function(pullmanId, wEvent){
                if(wEvent.preventDefault){
                    wEvent.preventDefault();
                }
            },

            onDragEnter: function(pullmanId, wEvent){
                if(this.currentDragEvent.pullman == pullmanId){
                    return false;
                }
                wEvent.target.closest('.calendar-bar').classList.add('dragover');
            },

            onDragLeave: function(pullmanId, wEvent){
                if(this.currentDragEvent.pullman == pullmanId){
                    return false;
                }
                wEvent.target.closest('.calendar-bar').classList.remove('dragover');
            },

            onDrop: function(pullmanId, wEvent){
                if(this.currentDragEvent.pullman == pullmanId){
                    return false;
                }
                this.$emit('dropevent', pullmanId, this.currentDragEvent);
                wEvent.target.closest('.calendar-bar').classList.remove('dragover');
            },

        },

        filters: {
            daysWidth: function(date){
                return 100/date.daysInMonth();
            }
        }
    }
</script>