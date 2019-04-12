// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment:Record<string, boolean | Object> = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyAHif6HXbccv1wvIEBUmFT2GQwSYYSenCk',
    authDomain: 'epam-indigo-project.firebaseapp.com',
    databaseURL: 'https://epam-indigo-project.firebaseio.com',
    projectId: 'epam-indigo-project',
    storageBucket: 'epam-indigo-project.appspot.com',
    messagingSenderId: '833805581525'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
