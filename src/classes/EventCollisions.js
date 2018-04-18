export default class EventCollisions{

    constructor(event, graph, view){
        this.event = event;
        this.graph = graph
        this.graph.create(event.id);
        this.view = view;
        if(view === 'month'){
            this.start = parseInt(this.event.start.format("D"));
            this.end = parseInt(this.event.end.format("D"));
        }else if(view === 'day'){
            this.start = parseInt(this.event.start.format("H"));
            this.end = parseInt(this.event.end.format("H"));
        }
    }

    detectCollisions(events){
        let collisions = 1;
        let aT = this.start;
        let bT = this.end;
        for(let i = aT; i <= bT; i++){
            for(let e of events){
                if(
                    i === parseInt(e.start.format(this.getFormat())) || 
                    i === parseInt(e.end.format(this.getFormat()))
                ){
                    collisions++;
                    this.graph.add(this.event.id, e.id);
                    continue;
                }
            }
        }

        return collisions;
    }

    getFormat(){
        if(this.view === 'month'){
            return "D";
        }else if(this.view === 'day'){
            return "H";
        }
    }
}