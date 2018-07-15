import { trigger, state, transition, style, animate, query, group } from "@angular/animations";

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({
    opacity: '0',
  })),
  transition(':enter', [
    animate('500ms ease-out', style({ opacity: 1, })),
  ]),
  transition(':leave', [
    animate('500ms ease-out', style({ opacity: 0, })),
  ]),
]);