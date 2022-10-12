import { Subject, BehaviorSubject } from "rxjs";
import { Court } from "../model/court";

export class SharedDataService {
    constructor() { }
    //Using any
    public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.editDataDetails);
    currentCourt = this.messageSource.asObservable();
    
    changeCourt(message: Court) {
        this.messageSource.next(message)
    }
}
