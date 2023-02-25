import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
import { PersonId } from 'src/app/model/personId';
import { Position } from 'src/app/model/position';
import { SharedDataService } from 'src/app/service/game.service';
import { PlayersService } from 'src/app/service/players.service';
import { GridEditComponent } from '../grid/grid';
import { PositionEditComponent } from '../position/position';

@Component({
	selector: 'game-edit',
	templateUrl: './game.html',
	styleUrls: ['./game.scss']
})
export class GameEditComponent implements OnInit, AfterViewInit {

	subscription_updateCourt!: Subscription
	subscription_updateGame!: Subscription
	id: any;

	@ViewChild(GridEditComponent) myGridComponent!: GridEditComponent;
	@Input() court!: Court;

	formGroup!: FormGroup

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private playersService: PlayersService,
		private alertService: AlertService,
		private fb: FormBuilder,
		private sharedDataService: SharedDataService
	) {
		console.log("GameEditComponent.constructor")

        this.formGroup = this.fb.group({})

		this.sharedDataService.currentCourt
			.subscribe({
				next: (response: any) => {
					console.log("GameEditComponent.constructor:calllback: response: " + JSON.stringify(response))
					if (response.length <= 0) {
						console.log("GameEditComponent.constructor:calllback: response: EMPTY")
						this.router.navigate(['app/games']);
					}
					else {
						this.court = response //<= Always get current value! 				
						this.createForm()
					}
				},
				error: (err: any) => {
					console.log("GameEditComponent.constructor:calllback: error: " + err)
					this.alertService.error(err);
				},
				complete: () => {
					console.log("GameEditComponent.constructor:calllback: complete")
				}
			});
		console.log("GameEditComponent.constructor: court: " + JSON.stringify(this.court))
	}

	ngOnInit(): void {
		console.log("GameEditComponent.ngOnInit")
	}

	createForm() {
		console.log("GameEditComponent.createForm(): court: " + JSON.stringify(this.court))
	}

	ngAfterViewInit() {
		console.log("GameEditComponent.ngAfterViewInit(): controls:")
        Object.keys(this.formGroup.controls).forEach(key => {
            let control = this.formGroup.controls[key]
            console.log('key: ' + key + ', control.value: ' + JSON.stringify(control.value) )
          });
          console.log("GameEditComponent.ngAfterViewInit(exit)")		
	}

	onSubmit(): void {
		console.log("GameEditComponent.onSubmit(): formGroup.value: " + JSON.stringify(this.formGroup.value));
		console.log("GameEditComponent.onSubmit(): formGroup.invalid: " + JSON.stringify(this.formGroup.invalid));

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.formGroup.invalid) {
			console.log("GameEditComponent.onSubmit(): formGroup is invalid");
			return;
		}

        // Make a sparse list of positions, to send to the server

		let positions: Position[] = []
		
		console.log("GameEditComponent.onSubmit()");
		for (const key in this.formGroup.controls) { // 'key' is a string

			const control = this.formGroup.get(key); // 'control' is a FormControl  

			if (control == null) {
				console.log("GameEditComponent.onSubmit(): control is null");
				continue
			}

			if (control == undefined) {
				console.log("GameEditComponent.onSubmit(): control is undefined");
				continue
			}

			if (control.value == undefined) {
				console.log("GameEditComponent.onSubmit(): control.value is undefined");
				continue
			}
			
            console.log('GameEditComponent.onSubmit(): key: ' + key + ', control.value: ' + JSON.stringify(control.value) + ', dirty: ' + control.dirty)			

			if (control.dirty) {
      			let position = new Position(control.value.index, control.value.personId)
				console.log("GameEditComponent.onSubmit(): newPosition: " + JSON.stringify(position));
			    positions.push(position)
			}
		}

		console.log("GameEditComponent.onSubmit(): positions: " + JSON.stringify(positions));

		var request: any = {}
		request.court = this.court.id
		request.positions = positions

		console.log("GameEditComponent.onSubmit(): request: " + JSON.stringify(request));

		this.subscription_updateGame = this.playersService.updateGame(this.id, request)
			.subscribe({
				next: (response: any) => {
					let payload = response.payload.toString()
					let payload2 = payload
					if (payload.length > 100) {
						payload2 = payload.substring(0, 100) + "..."
					}
					console.log("GameEditComponent.ngOnInit: response: " + payload2)
					let object = JSON.parse(payload)
					if (!('status' in object)) {
						console.log("GameEditComponent.ngOnInit: Error: missing 'status' field in response")
						this.alertService.error("Unexpected response from server")
					}
					else if (object.status != 200) {
						console.log("GameEditComponent.ngOnInit: Error: bad status in response")
						this.alertService.error("Unexpected response from server")
					}
					else {
						console.log("GameEditComponent.onSubmit: ok")
						this.router.navigate(["app/games"])
					}
				},
				error: (err: any) => {
					console.log("GameEditComponent.onSubmit: error: " + JSON.stringify(err))
					this.alertService.error(err)
				},
				complete: () => {
					console.log("GameEditComponent.onSubmit: complete")
					this.router.navigate(["app/games"])
				}
			})
	}

	onCancel(): void {
		console.log("GameEditComponent.onCancel()")
		this.router.navigate(['app/games']);
	}

	ngOnDestroy(): void {
		console.log("GameEditComponent.ngOnDestroy()")

		if (this.subscription_updateCourt != undefined) {
			this.subscription_updateCourt.unsubscribe()
		}
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
