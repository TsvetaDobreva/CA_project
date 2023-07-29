import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


import { environment } from '../src/environments/environment.development';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export { db }