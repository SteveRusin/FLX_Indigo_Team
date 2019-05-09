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
    transform: 'translateX(18em) translateY(8em)',
    opacity: 0,
  })),
  state('final', style({
    transform: 'translateX(53em) translateY(-2em)',
    opacity: 0,
  })),
  transition('initial=>final', animate('0.6s ease-out',
    style({
      transform: 'translateX(53em) translateY(-2em)',
      opacity: 1,
    })
  ))
]);

export const attackAnimationsB: AnimationTriggerMetadata = trigger('attackAnimationB', [
  state('initial', style({
    transform: 'translateX(55em) translateY(-2em)',
    opacity: 0,
  })),
  state('final', style({
    transform: 'translateX(22em) translateY(6em)',
    opacity: 0,
  })),
  transition('initial=>final', animate('0.6s ease-out',
    style({
      transform: 'translateX(22em) translateY(6em)',
      opacity: 1,
    })
  ))
]);

export const attackAnimation: AnimationTriggerMetadata = trigger('attackAnimation', [
  state('initial', style({
    transform: 'scale(1)',
  })),
  state('final', style({
    transform: 'scale(1)',
  })),
  transition('initial<=>final', animate('0.5s ease-out',
    style({
      filter: 'saturate(3)',
    })
  ))
]);

export const defenseAnimation: AnimationTriggerMetadata = trigger('defenseAnimation', [
  state('initial', style({
    transform: 'scale(1)',
  })),
  state('final', style({
    transform: 'scale(1)',
  })),
  transition('initial<=>final', animate('1s ease-out',
    style({
      filter: 'brightness(2)',
      transform: 'scale(1.2)',
    })
  ))
]);
