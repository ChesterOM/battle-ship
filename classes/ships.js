class Ship {
    constructor(length){
        this.length = length;
        this.hits = Array(length).fill(false);
    }

    hit(position) {
        this.hits[position] = true;
    }

    isSunk() {
        return this.hits.every(hit => hit);
    }
}


export { Ship };
