import {
  transition,
  trigger,
  style,
  animate,
  AnimationTriggerMetadata,
  state,
} from '@angular/animations';

export const attackAnimationsA: AnimationTriggerMetadata = trigger('attackAnimationA', [
  state('initial', style({
    transform: 'translateX(15em)'
  })),
  state('final', style({
    transform: 'translateX(55em) translateY(-5em)',
    opacity: 0
  })),
  transition('initial=>final', animate('0.3s ease-in'))
]);

export const attackAnimationsB: AnimationTriggerMetadata = trigger('attackAnimationB', [
  state('initial', style({
    transform: 'translateX(55em)'
  })),
  state('final', style({
    transform: 'translateX(5em) translateY(5em)',
    opacity: 0
  })),
  transition('initial=>final', animate('0.3s ease-in'))
]);

export const defenseAnimation: AnimationTriggerMetadata = trigger('defenseAnimation', [
  state('initial', style({
    opacity: 1
  })),
  state('final', style({
    opacity: 0
  })),
  transition('initial=>final', animate('0.3s ease-in'))
]);
