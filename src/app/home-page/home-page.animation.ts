import { trigger,
  transition,
  style,
  state,
  animate
} from '@angular/animations';

export const homePageAnimationsComponent: any = {
  animate: trigger('fade', [
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('false <=> true', [
      style({ transform: 'translateX(10%)' }),
      animate(1000)
    ])
  ])
};
