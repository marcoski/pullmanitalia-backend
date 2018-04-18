<template>
    <div class="calendar-bar">
        <div class="month-days d-flex flex-row">
            <div 
                :class="{'p-2': true, 'day': true}" 
                v-for="hour in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]" 
                :key="hour" 
                :style="cellWidth"
                @dragover="onDragOver(pullman.id, $event)"
                @dragenter.prevent="onDragEnter(pullman.id, $event)"
                @dragleave.prevent="onDragLeave(pullman.id, $event)"
                @drop.prevent="onDrop(pullman.id, $event)"
            >
            </div>
        </div>
        <div v-for="event in getEventsByPullman(pullman, 'day')"
            class="event alert"
            :class="[event.rental.confirmed ? 'alert-success' : 'alert-info', event.rental.type]"
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
</template>

<script>
    
    import DateTimeFormat from '../mixins/DateTimeFormat';
    import EventMixin from '../mixins/EventMixin';
    
    export default {
        name: 'day',

        mixins: [DateTimeFormat, EventMixin],

        props: ['date', 'cellWidth', 'pullman', 'events'],

        methods: {
            onClickEvent: function(event){
                this.$emit('clickevent', event);
            }
        }
    }
</script>
