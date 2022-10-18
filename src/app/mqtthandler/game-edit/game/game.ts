import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert/alert.service';
import { Court } from 'src/app/model/court';
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
	id: any;

	@ViewChild(GridEditComponent) myGridComponent!: GridEditComponent;
	@Input() court!: Court;

	nameControl = new FormControl('', [
	  Validators.required
	])
  
	dummyForm = new FormGroup({
	  name: this.nameControl
	});

	positionControls: Array<FormControl> = []

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private playersService: PlayersService,
		private alertService: AlertService,
		private fb: FormBuilder,
        private sharedDataService: SharedDataService
	) {
		console.log("GameEditComponent.constructor")
	}

	ngOnInit(): void {
		console.log("GameEditComponent.ngOnInit")
        this.sharedDataService.currentCourt.subscribe(court => (this.court = court)); //<= Always get current value! 
		console.log("GameEditComponent.ngOnInit: court: " + JSON.stringify(this.court))
	}

	createForm() {
		console.log("GameEditComponent.createForm(): court: " + JSON.stringify(this.court))

		// this.court.positions.forEach((position, index) => {
		//	 this.positionControls.push(new FormControl(index))
		// })

		// this.dummyForm = this.fb.group({
		//   nestedForm: this.positionControls
		// });
	  }

	ngAfterViewInit() {
		console.log("GameEditComponent.ngAfterViewInit")
	}

	onSubmit(): void {
		console.log("GameEditComponent.onSubmit");
		console.log(this.dummyForm.value);

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.dummyForm.invalid) {
			console.log("GameEditComponent.onSubmit(): dummyForm is invalid");
			return;
		}

		console.log("GameEditComponent.onSubmit(): form.value: " + JSON.stringify(this.dummyForm.value));

//		this.subscription_updateCourt = this.playersService.updateCourt(this.id, this.form.value)
//			.subscribe(
//				response => {
//					let payload = response.payload.toString()
//					let payload2 = payload
//					if (payload.length > 100) {
//						payload2 = payload.substring(0, 100) + "..."
//					}
//					console.log("GameEditComponent.ngOnInit: response: " + payload2)
//					let object = JSON.parse(payload)
//
//					if (!('status' in object)) {
//						console.log("GameEditComponent.ngOnInit: Error: missing 'status' field in response")
//						this.alertService.error("Unexpected response from server")
//					}
//					else if (object.status != 200) {
//						console.log("GameEditComponent.ngOnInit: Error: bad status in response")
//						this.alertService.error("Unexpected response from server")
//					}
//					else {
//						console.log("GameEditComponent.onSubmit: ok")
//						this.router.navigate(["app/courts"])
//					}
//				},
//				error => {
//					console.log("GameEditComponent.onSubmit: error: " + JSON.stringify(error))
//					this.alertService.error(error)
//				},
//				() => {
//					console.log("GameEditComponent.onSubmit: complete")
//					this.router.navigate(["app/courts"])
//				}
//			)
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
