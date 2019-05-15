import {
  transition,
  trigger,
  style,
  animate,
  AnimationTriggerMetadata,
  state,
} from '@angular/animations';

export const popupAnimationDamage: AnimationTriggerMetadata = trigger('popupDamage', [
  state('initial', style({
    background: '#ff0000',
    opacity: 0,
  })),
  state('final', style({
    background: '#ff0000',
    opacity: 0,
  })),
  transition('initial<=>final', animate('1s ease-out',
    style({
      transform: 'translateY(3em)',
      opacity: 0.8,
    })
  ))
]);

export const popupAnimationDefence: AnimationTriggerMetadata = trigger('popupDefence', [
  state('initial', style({
    background: '#54ff00',
    opacity: 0,
    transform: 'translateY(3em)',
  })),
  state('final', style({
    background: '#54ff00',
    opacity: 0,
  })),
  transition('initial<=>final', animate('1s ease-out',
    style({
      transform: 'translateY(0em)',
      opacity: 0.8,
    })
  ))
]);
