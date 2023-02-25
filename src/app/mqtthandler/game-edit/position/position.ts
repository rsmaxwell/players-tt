import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { Position } from 'src/app/model/position';
import { Waiter } from 'src/app/model/waiter';

@Component({
    selector: 'position-edit',
    templateUrl: './position.html',
    styleUrls: ['./position.scss']
})
export class PositionEditComponent implements OnInit, OnDestroy {

    @Input() waiters: Waiter[] = [];
    @Input() position!: Position;
    @Input() court!: Court;
    @Input() formGroup3!: FormGroup;

    constructor(
        public alertService: AlertService
    ) {
        console.log("PositionEditComponent.constructor():")
    }

    ngOnInit(): void {
        console.log("PositionEditComponent.ngOnInit(entry): position: " + JSON.stringify(this.position))
        let controlName = 'position_' + this.position.index.toString()
        
        this.formGroup3.addControl(controlName, new FormControl(this.position, [ Validators.required ] ))
    }

    ngOnDestroy(): void {
        console.log("PositionEditComponent.ngOnDestroy()")
    }

    getValueForWaiter(waiter: Waiter) {
        let result = new Position()
        result.index = this.position.index
        result.personId = waiter.personId
        return result
    }

    getValue() {
        return this.position
    }

    getDisplayValue() {
        return (this.position && this.position.personId) ? this.position.personId.knownas : null 
    }

    getErrorMessage(formControl: FormControl) {
        if (formControl.hasError('required')) {
            return "This field is required";
        }
        if (formControl.hasError('minlength')) {
            let requiredLength = formControl.errors!['minlength'].requiredLength
            return "The minimum length for this field is " + String(requiredLength) + " characters.";
        }
        if (formControl.hasError('maxlength')) {
            let requiredLength = formControl.errors!['maxlength'].requiredLength
            return "The maximum length for this field is " + String(requiredLength) + " characters.";
        }

        return '';
    }
}
