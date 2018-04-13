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
                <span>{{ start }} - {{ end }}</span>
            </div>
            <div class="ml-auto actions align-self-center">
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
                            <div class="p-2  current-month"><span>{{ month }}</span></div>
                            <div class="month-days d-flex flex-row">
                                <div class="p-2 day" v-for="day in date.daysInMonth()" :key="day" :style="dayCellWidth">
                                    {{ day }}
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div v-for="pullman in pullmans" :key="pullman.id" class="scheduler-body d-flex flex-row">
                        <div class="p-2 align-self-center services">{{ pullman.name }}</div>
                        <div class="calendar-bar">
                            <div class="month-days d-flex flex-row">
                                <div 
                                    :class="{'p-2': true, 'day': true, 'weekend': isWeekend(day)}" 
                                    v-for="day in date.daysInMonth()" 
                                    :key="day" 
                                    :style="dayCellWidth"
                                    @dragover="onDragOver(pullman.id, $event)"
                                    @dragenter.prevent="onDragEnter(pullman.id, $event)"
                                    @dragleave.prevent="onDragLeave(pullman.id, $event)"
                                    @drop.prevent="onDrop(pullman.id, $event)"
                                >
                                </div>
                            </div>
                            <div v-for="event in getEventsByPullman(pullman)"
                                class="event alert"
                                :class="[event.confirmed ? 'alert-success' : 'alert-info']"
                                :style="event.style"
                                :id="event.id + event.start.format('x') + event.end.format('x')"
                                draggable="true"
                                @click.stop="onClickEvent(event)"
                                @dragstart="onDragStart(event, $event)"
                            >
                                <b-popover :target="event.id + event.start.format('x') + event.end.format('x')" placement="bottom" triggers="hover focus">
                                    <template slot="title">
                                        <h2><i class="fa fa-ticket"></i> {{ event.rental.code }}</h2>
                                    </template>
                                    <ul class="event-info-list">
                                        <li><i class="fa fa-bus"></i> Pullman: {{ pullman.name }}</li>
                                        <li>
                                            <i class="fa fa-calendar-check-o"></i> Dal: {{ event.start.format(dateFormat) }} <br/>
                                            <i class="fa fa-clock-o"></i> Alle: {{ event.start.format(timeFormat) }}
                                        </li>
                                        <li>
                                            <i class="fa fa-calendar-check-o"></i> Al: {{ event.end.format(dateFormat) }} <br/>
                                            <i class="fa fa-clock-o"></i> Alle: {{ event.end.format(timeFormat) }}
                                        </li>
                                    </ul>
                                </b-popover>
                                <h1><i class="fa fa-ticket"></i></h1>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>
<script>

    import DateTimeFormat from '../mixins/DateTimeFormat';
    import EventCollisions from "../../classes/EventCollisions";
    import CollisionGraph from "../../classes/CollisionsGraph";
    import ColorSchemer from "../../classes/ColorSchemer";
    

    export default{
        name: "pullmans-booking-calendar",

        mixins: [DateTimeFormat],

        props: ['supplier'],

        data: function(){
            return {
                pullmans: [],
                events: [],
                selectedFilter: 'all',
                filters: [
                    { value: 'all', text: 'Tutte' }
                ],
                date: null,
                start: null,
                end: null,
                month: null,
                dayCellWidth: {
                    "width": "0%"
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
                this.start = d.format('D MMMM YYYY');

                /** set end period */
                let lastDayOfMonth = d.add(1, 'months').date(0);
                this.end = lastDayOfMonth.format('D MMMM YYYY');

                this.month = date.format("MMMM YYYY");
                this.dayCellWidth = {
                    "width": 100/date.daysInMonth()+"%"
                };
                this.$store.dispatch('loadRoutes', {
                    msg: 'Carico prenotazioni e tratte...', 
                    data: {
                        id: this.supplier, date: this.date
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
            },

            onNextPeriod: function(){
                let d = this.$moment(this.date);
                d.add(1, 'months');
                this.date = d;
            },

            onPrevPeriod: function(){
                let d = this.$moment(this.date);
                d.subtract(1, 'months');
                this.date = d;
            },

            onClickEvent: function(event){
                this.$emit('clickevent', event);
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

            isWeekend: function(day){
                let d = this.$moment(this.date);
                d.set('date', day);
                return d.isoWeekday() >= 6 ? true : false;
            },

            getEventsByPullman: function(pullman){
                const collisionGraph = new CollisionGraph();
                let events = this.events.filter((e) => e.pullman.id == pullman.id);
                let collisionsMap = {};
                let calendarEvents = events.map((event) => {
                    const eventCollisions = new EventCollisions(event, collisionGraph);
                    let collisions = eventCollisions.detectCollisions(events.filter((e) => e.id !== event.id));
                    collisionsMap[event.id] = collisions;
                    let fixedStyle = this.getEventStyle(event, collisions);
                    event.style = fixedStyle;
                    return event;
                });
                collisionGraph.createPositionGraphs();
                return calendarEvents.map((event) => {
                    let graph = collisionGraph.getGraph(event.id);
                    if(graph !== null){
                        let position = 2;
                        let index = 1;
                        for(let g of graph){
                            let graphEvent = calendarEvents.find(e => e.id === g);
                            if(graphEvent !== undefined){
                                graphEvent.style.top = ((100/collisionsMap[g]) * index)+"%";
                            }
                            index++;
                        }
                    }
                    return event;
                });
            },

            getEventStyle: function(event, collisions){
                const color = event.color;
                const textColor = new ColorSchemer(color);
                textColor.darker(20);
                let styles = {
                    width:((100/this.date.daysInMonth())*(event.days) - 0.1) + "%",
                    left: ((100/this.date.daysInMonth())*event.offset) + "%",
                    height: ((100/collisions) - 3) + "%",
                    "color": "#" + textColor.rgbToHex(),
                    "background-color": '#' + color
                };
                
                return styles;
            },

        },

        filters: {
            daysWidth: function(date){
                return 100/date.daysInMonth();
            }
        }
    }
</script>