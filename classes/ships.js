class Ship {
    constructor(length, startCoord = [0,0], orientation = 'horizontal'){
        this.length = length;
        this.startCoord = startCoord;
        this.orientation = orientation;
        this.hits = Array(length).fill(null); 
    }

    hit(position) {
        this.hits[position] = 'hit'; 
        console.log('Ship hit:', position);
    }

    isSunk() {
        return this.hits.every(hit => hit === 'hit'); 
    }
}


export { Ship };
