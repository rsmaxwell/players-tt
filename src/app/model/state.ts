import { PersonId } from "./personId";

export class State {
    value?: PersonId;
    original?: PersonId;
}

export class IndexedState {
    index!: number;
    value?: PersonId;
    original?: PersonId;
}
