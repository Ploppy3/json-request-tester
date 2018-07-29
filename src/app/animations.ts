import { trigger, state, transition, style, animate, query, group } from "@angular/animations";

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({
    opacity: 0,
  })),
  state('hidden', style({
    opacity: 0,
  })),
  state('visible', style({
    opacity: 1,
  })),
  transition(':enter, hidden => visible', [
    animate('500ms ease-out', style({ opacity: 1, })),
  ]),
  transition(':leave, visible => hidden', [
    animate('500ms ease-out', style({ opacity: 0, })),
  ]),
]);

export const collapse = trigger('collapse', [
  transition(':enter', [
    style({ height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, opacity: 0 }),
    animate('.25s ease-in', style({ height: '*', paddingTop: '*', paddingBottom: '*', marginTop: '*', marginBottom: '*' })),
    animate('.25s ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('.25s ease-in', style({ opacity: 0 })),
    animate('.25s ease-out', style({ height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 })),
  ]),
  transition('collapsed <=> expanded', animate('500ms ease-in-out')),
]);