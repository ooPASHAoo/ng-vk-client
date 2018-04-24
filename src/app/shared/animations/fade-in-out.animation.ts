import {trigger, animate, transition, style} from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [
    style({'opacity': 0}),
    animate(200)
  ]),
  transition(':leave',
    animate(200, style({'opacity': 0}))
  )
]);
