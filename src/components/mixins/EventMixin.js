import EventCollisions from "../../classes/EventCollisions";
import CollisionGraph from "../../classes/CollisionsGraph";

export default {
    methods: {
        getEventsByPullman: function(pullman, view){
            const collisionGraph = new CollisionGraph();
            let events = this.events.filter((e) => e.pullman.id == pullman.id);
            let collisionsMap = {};
            let calendarEvents = events.map((event) => {
                const eventCollisions = new EventCollisions(event, collisionGraph, view);
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
            let styles = {
                width: event.width + "%",
                left: event.offset + "%",
                height: ((100/collisions) - 3) + "%",
                "border-top": "3px solid #" + color
            };
            
            return styles;
        }
    }
}