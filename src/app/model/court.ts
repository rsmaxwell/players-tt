
import { FormGroup } from "@angular/forms";
import { Position } from "./position";


export class Court {
    id: string;
    name: string;
    positions: Array<Position>;

    constructor() { 
      this.id = ''
      this.name = ''  
      this.positions = []     
    }

    static fromFormGroup(form: FormGroup): Court {
      let court = new Court()
      court.id = form.value.id!
      court.name = form.value.name!
      court.positions = form.value.positions!
      return court
    }

    static expand(court: Court): void {

        let sparceArray = court.positions
        court.positions = []

        let mapOfPositions = new Map<number, Position>()
        sparceArray.forEach(position => {
          mapOfPositions.set(position.index, position)
        });
    
        for (let i = 0; i < 4; i++) {
          let position = mapOfPositions.get(i)
          if (!position) {
            position = {index: i}
          }
          court.positions.push(position)
        }        
    }
}
