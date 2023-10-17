class Ship {
    constructor(length, orientation = 'horizontal', id){
        this.length = length;
        this.id = id;
        this.hits = Array(length).fill(false);
        this.orientation = orientation; 
        this.startCoord = [];
    }

    hit(position) {
        this.hits[position] = true;
        console.log('Ship hit:', position);//test
    }

    isSunk() {
        return this.hits.every(hit => hit);
    }
}


export { Ship };
