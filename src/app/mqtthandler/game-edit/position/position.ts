import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Court } from 'src/app/model/court';
import { PersonId } from 'src/app/model/personId';
import { Position } from 'src/app/model/position';
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

    nameControl = new FormControl('', [
        Validators.required
    ])

    form = new FormGroup({
        name: this.nameControl
    });

    constructor() {
        console.log("PositionEditComponent.constructor():")
    }

    ngOnInit(): void {
        console.log("PositionEditComponent.ngOnInit(): position.knownas: " + this.position.personId.knownas)
    }

    ngAfterViewInit() {
        console.log("PositionEditComponent.ngAfterViewInit()")
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
