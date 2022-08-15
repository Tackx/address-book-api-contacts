import * as firebase from 'firebase/app';
import { getDatabase, connectDatabaseEmulator, Database, ref, onValue } from 'firebase/database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = process.env;

export let fbApp: any;
export let db: Database;

if (<string>config.NODE_ENV === 'production') {
  // Connect to Firebase DB
  const fbConfig = JSON.parse(<string>config.FB_CONFIG);
  fbApp = firebase.initializeApp(fbConfig);
  db = getDatabase(fbApp);
} else if (<string>config.NODE_ENV === 'development') {
  // Connect to Firebase DB Emulator
  fbApp = firebase.initializeApp({ projectId: 'address-book-api-c73c6' });
  db = getDatabase(fbApp);
  connectDatabaseEmulator(db, 'firebase-db', 9000);
  onValue(ref(db, 'addressBook/'), (snap: any) => {
    console.log('New contact added:', snap.val());
  });
}
