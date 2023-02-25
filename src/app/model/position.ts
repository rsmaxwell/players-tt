import { PersonId } from "./personId";

export class Position {
    index!: number;
    personId?: PersonId;

    constructor(index = 0, personId = undefined) {
        this.index = index;
        this.personId = personId;
      }    
}


