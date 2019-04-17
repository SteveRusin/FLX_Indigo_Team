import { trigger,
  transition,
  style,
  animate
} from '@angular/animations';

export const HomePageAnimationsComponent = {
  animate: trigger('fade', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate(1000)
    ])
  ])
}
