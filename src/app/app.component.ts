import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		// <-- add your animations here
		// fader
		slider
		// transformer,
		// stepper
	]
})
export class AppComponent {
	title = 'Algo Anim';

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}
}
