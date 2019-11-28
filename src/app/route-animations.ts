import {
	trigger,
	transition,
	style,
	query,
	group,
	animateChild,
	animate,
	keyframes
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
	transition('left => right', slideTo('left')),
	transition('right => left', slideTo('right'))
]);

export function slideTo(direction) {
	return [
		query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
			optional: true
		}),
		group([
			query(
				':enter',
				[
					style({
						transform: 'translateX(' + (direction === 'left' ? '' : '-') + '100%)'
					}),
					animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({
							transform: 'translateX(' + (direction === 'left' ? '-' : '+') + '100%)'
						})
					)
				],
				{ optional: true }
			)
		])
	];
}
