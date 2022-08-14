import app from './app';
import admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = process.env;
const serviceAccount = JSON.parse(<string>config.FB_SRVC_ACC);

let appPort: string;

if (<string>config.NODE_ENV === 'production') {
  appPort = <string>process.env.PORT || <string>config.PROD_PORT;
} else {
  appPort = <string>process.env.PORT || <string>config.DEV_PORT;
}

// Connect to Firebase DB
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FB_DB_URL
});

// Start API server
app.listen(appPort, () => {
  console.log(`Contacts Service Server started on port ${appPort}`);
});
