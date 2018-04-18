import Event from "./Event";

export default class EventList{

    constructor(){
        this._length = 0;
        this.head = null;
        this.tail = null;
    }

    count(){
        return this._length;
    }

    getFirst(){
        return this.head;
    }

    getLast(){
        return this.tail;
    }

    add(event){
        if(!this.head){
            this.head = event;
            this.tail = event;
        } else {
            event.prev = this.tail;
            this.tail.next = event;
            this.tail = event;
        }

        this._length++;

        return event;
    }

    remove(event){
        if(event.prev == null){
            this.head = event.next;
        } else {
            event.prev.next = event.next
        }

        if(event.next == null){
            this.tail = event.prev;
        } else {
            event.next.prev = event.prev;
        }

        this._length--;
    }

    filter(compare){
        let current = this.head;
        let newList = new EventList();
        while(current){
            if(compare && compare(current)){
                newList.add(current);
            }

            current = current.next;
        }

        return newList;
    }

    toArray(){
        let current = this.head;
        let listArray = [];
        while(current){
            listArray.push(current.toArray());
            current = current.next;
        }
        return listArray;
    }

    getStepsEvent(date, view){
        let event = new Event();
        let list = new EventList();
        event.id = this.head.id;
        event.rental = this.head.rental;
        event.rental.color = this.head.color;
        event.color = this.head.color;
        event.pullman = this.head.pullman;
        event.from = this.head.from;
        event.to = this.tail.to;
        event.start = this.head.start;
        event.end = this.tail.end;
        
        let current = this.head.next;
        let distance = this.head.distance;
        let steps = [];
        for(let i = 0; i < this.count() - 1; i++){
            steps.push(current.from);
            steps.push(current.to);
            distance += current.distance;
            current = current.next;
        }
        
        event.waypoints = this.getSteps(steps);
        event.distance = distance;
        event.getCalendarEvent(date, view);
        list.add(event);
        return list;
    }

    getSteps(steps){
        steps = steps.reduce((acc, value, index) => {
            if(index === 0 || index === steps.length - 1){
                acc.push(value);
            }else{
                const found = acc.find((s) => { return s.address === value.address });
                if(found === undefined){
                    acc.push(value);
                }
            }

            return acc;
        }, []);
        steps.pop();

        return steps;
    }

}