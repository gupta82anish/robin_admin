// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api:'http://localhost:3030',
  firebase:{
    apiKey: "AIzaSyAI1LDUZUO_Q_ZywLCyV4YiA8Ed0DxU67A",
    authDomain: "scout-11666.firebaseapp.com",
    databaseURL: "https://scout-11666.firebaseio.com",
    projectId: "scout-11666",
    storageBucket: "scout-11666.appspot.com",
    messagingSenderId: "717173714514"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
