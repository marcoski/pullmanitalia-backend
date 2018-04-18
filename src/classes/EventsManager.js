import moment from 'moment';
import EventList from "./EventList";
import Event from "./Event";
import ColorSchemer from "./ColorSchemer";

const baseColors = [
    "20a8d8", "6610f2", "6f42c1", "e83e8c", "f86c6b", "f8cb00", "ffc107", "4dbd74", "20c997", "63c2de" 
]

class EventsManager{
    
    /**
     * Construct an events manager
     * @param {[]} routes the routes for the given supplier
     * @param {moment} moment Date for which calendar is set
     */
    constructor(routes, date, view){
        this.date = date;
        this.view = view;
        this.calendarEvents = [];
        this.dateFirstOfMonth = moment(date).startOf('month');
        this.dateLastOfMonth = moment(date).endOf('month');
        let color = null;
        this.events = routes.reduce((accumulator, route, i) => {
            if(accumulator[route.rental.id] === undefined){
                if(route.rental.color === null || route.rental.color === undefined){
                    const colorSchemer = new ColorSchemer(baseColors[Math.floor(Math.random() * baseColors.length)], 4);
                    color = colorSchemer.getRandomColor();   
                }
                accumulator[route.rental.id] = new EventList();
            }
            
            if(route.rental.type === EventsManager.DISP){
                route.rental.type = EventsManager.DISP_STR;
            }else if (route.rental.type === EventsManager.TRF){
                route.rental.type = EventsManager.TRF_STR;
            }else if (route.rental.type === EventsManager.TOUR){
                route.rental.type = EventsManager.TOUR_STR;
            }
            
            const event = new Event(
                route, 
                (route.rental.color === null || route.rental.color === undefined) ? color : route.rental.color,
                moment(this.date),
                view
            );
            accumulator[route.rental.id].add(event);
            return accumulator;
        }, {});
    }

    generateCalendarEvents(){
        let calendarEvents = [];
        for(let rental in this.events){
            if(this.events[rental].count() > 1){
                calendarEvents.push(
                    this.events[rental].getStepsEvent(moment(this.date), this.view)
                );
            }else{
                calendarEvents.push(this.events[rental]);
            }
        }
        this.calendarEvents = calendarEvents.reduce((acc, val) => {
            if(this.view === 'day'){
                val = val.filter((e) => {
                    const start = e.start;
                    const end = e.end;
                    let isInDay = false;
                    if(moment(this.date).isBetween(moment(start), moment(end), null, []) || 
                        moment(this.date).isSame(moment(start), 'day') || 
                        moment(this.date).isSame(moment(start), 'day')
                    ){
                        isInDay = true;
                    }
                    return isInDay
                    
                });
            }
            return acc.concat(val.toArray());
        }, []);
    }

    /**
     * 
     * @param moment a 
     * @param moment b 
     */
    getDays(a, b){
        let hoursDiff = b.diff(a, 'hours');

        if(hoursDiff < 8){
            return 0.5
        }else if(hoursDiff >= 8 && hoursDiff <= 24){
            return 1;
        }

        return Math.round(hoursDiff/24);
    }
}

EventsManager.DISP = 0;
EventsManager.DISP_STR = 'disp';
EventsManager.TRF = 1;
EventsManager.TRF_STR = 'trf';
EventsManager.TOUR = 2;
EventsManager.TOUR_STR = 'tour';

export default EventsManager;