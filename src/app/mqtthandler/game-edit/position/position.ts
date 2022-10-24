import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { Position } from 'src/app/model/position';
import { IndexedState, State } from 'src/app/model/state';
import { Waiter } from 'src/app/model/waiter';

@Component({
    selector: 'position-edit',
    templateUrl: './position.html',
    styleUrls: ['./position.scss']
})
export class PositionEditComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() waiters: Waiter[] = [];
    @Input() position!: Position;
    @Input() court!: Court;
    @Input() form!: FormGroup;

    displayValue!: string;
    state!: IndexedState;

    constructor(
        public alertService: AlertService
    ) {
        console.log("PositionEditComponent.constructor():")
    }

    ngOnInit(): void {
        console.log("PositionEditComponent.ngOnInit(): position: " + JSON.stringify(this.position))

        this.state = new IndexedState()
        this.state.index = this.position.index
        this.state.value =  this.position.personId
        this.state.original =  this.position.personId

        this.displayValue = (this.position.personId != null) ? this.position.personId.knownas : ''

        console.log("PositionEditComponent.ngOnInit(): state: " + JSON.stringify(this.state))

        this.form.addControl('position-' + this.position.index.toString(), new FormControl(this.state, [
            Validators.required
        ]))
    }

    ngAfterViewInit() {
        console.log("PositionEditComponent.ngAfterViewInit(): form.value: " + JSON.stringify(this.form.value));
    }

    ngOnDestroy(): void {
        console.log("PositionEditComponent.ngOnDestroy()")
    }

    getErrorMessage(formControl: FormControl) {
        if (formControl.hasError('required')) {
            return "This field is required";
        }
        if (formControl.hasError('minlength')) {
            let requiredLength = formControl.errors!.minlength.requiredLength
            return "The minimum length for this field is " + String(requiredLength) + " characters.";
        }
        if (formControl.hasError('maxlength')) {
            let requiredLength = formControl.errors!.maxlength.requiredLength
            return "The maximum length for this field is " + String(requiredLength) + " characters.";
        }

        return '';
    }
}
