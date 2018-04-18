import moment from 'moment';

export default class Event{

    constructor(route, color, date, view){
        this.prev = null;
        this.next = null;
        this.color = color !== undefined ? color : null;
        this.id = route !== undefined ? route.id : 0;
        this.rental = route !== undefined ? route.rental : null;
        if(this.rental !== null && color !== undefined){
            this.rental.color = color;   
        }
        this.to = route !== undefined ? route.to : null;
        this.from = route !== undefined ? route.from : null;
        this.waypoints = [];
        this.pullman = route !== undefined ? route.pullman : null;
        this.start = route !== undefined ? moment(route.departure) : null;
        this.end = route !== undefined ? moment(route.arrival) : null;
        this.distance = route !== undefined ? route.distance : null;
        if(this.start !== null && this.end !== null){
            this.getCalendarEvent(date, view);   
        }
    }

    toArray(){
        return {
            id: this.id,
            rental: this.rental,
            to: this.to,
            from: this.from,
            waypoints: this.waypoints,
            pullman: this.pullman,
            start: this.start !== undefined ? this.start : null,
            end: this.end !== undefined ? this.end : null,
            width: this.width !== undefined ? this.width : 0,
            offset: this.offset !== undefined ? this.offset: 0,
            color: this.color
        };
    }

    
    getCalendarEvent(date, view){
        let firstOfMonth = moment(date).startOf("month");
        let lastOfMonth = moment(date).endOf("month");
        let start = moment(this.start);
        let end = moment(this.end);

        let startHour = parseInt(start.format('H'));
        if(view === 'month'){
            this.offset = (100 / date.daysInMonth()) * (parseInt(start.format("D")) - 1);
            this.width = (100 / date.daysInMonth()) * (this.getDays(start, end)) - 0.1;
        }else if (view === 'day'){
            let hours = this.getHours(start, end);
            if(hours > 24 && start.format('D') === date.format('D')){
                hours = 24 - parseInt(start.format('H'));
            }else if(hours > 24 && end.format('D') === date.format('D')){
                hours = 24 - (24 - parseInt(end.format('H')));
                startHour = 0;
            }else if(
                hours > 24 
                && (
                    start.format('D') < date.format('D') && end.format('D') > date.format('D')
                )
            ){
                hours = 24
                startHour = 0;
            }
            this.offset = Math.round(100 / 24) * (startHour) + this.getQuarter(start);
            this.width = Math.round(100 / 24) *  (hours + 1) - 0.1;
        }

        return this;
    }

    getDays(a, b){
        let hoursDiff = b.diff(a, 'hours');
        if(hoursDiff <= 24){
            return 1
        }
        
        return Math.ceil(hoursDiff/24);
    }

    getHours(a, b){
        return b.diff(a, 'minutes') / 60;
    }

    getQuarter(a){
        return Math.round(parseInt(a.format('m')) / 15);
    }
}