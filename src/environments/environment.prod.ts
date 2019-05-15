import { EnvironmentInterface } from './environment.interface';
import { fireConfig } from 'src/firebase.config';

export const environment: EnvironmentInterface = {
  production: true,
  fireConfig
};
