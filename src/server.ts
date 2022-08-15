import app from './app';
import admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = process.env;

let appPort: string;

if (<string>config.NODE_ENV === 'production') {
  appPort = <string>process.env.PORT || <string>config.PROD_PORT;

  // Connect to Firebase DB
  // const serviceAccount = JSON.parse(<string>config.FB_SRVC_ACC);
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: config.FB_DB_URL
  // });
} else {
  appPort = <string>process.env.PORT || <string>config.DEV_PORT;

  // Connect to Firebase DB Emulator
  // const fbApp = firebase.initializeApp({ projectId: 'address-book-api-c73c6' });
  // const db = getDatabase(fbApp);
  // connectDatabaseEmulator(db, 'localhost', 9000);
}

// Start API server
app.listen(appPort, () => {
  console.log(`Contacts Service Server started on port ${appPort}`);
});
