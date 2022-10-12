
import { Position } from "./position";


export class Court {
    id!: string;
    name!: string;
    positions: Array<Position> = [];

    constructor() { }

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
            position = {index: -1, personId: { id: -1, knownas: ""}}
          }
          court.positions.push(position)
        }        
    }
}
