// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/',
  backendUrl: 'https://findr-backend.herokuapp.com/api/v1/',
  imgurBaseUrl: 'https://api.imgur.com/',
  firebaseConfig: {
    apiKey: 'AIzaSyC29nX596od5rpDppgYqds0bYj2224znOk',
    authDomain: 'findr-8172c.firebaseapp.com',
    projectId: 'findr-8172c',
    storageBucket: 'findr-8172c.appspot.com',
    messagingSenderId: '889417025859',
    appId: '1:889417025859:web:f9db9e2c8b2bce236d47f6',
    measurementId: 'G-G9MK65411N',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
