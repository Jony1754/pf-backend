import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
config();
// const serviceAccountPath = path.join(__dirname, 'payco.json');
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
const serviceAccount = {
  type: process.env.FIREBASE_TYPE as string,
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID as string,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
  clientId: process.env.FIREBASE_CLIENT_ID as string,
  authUri: process.env.FIREBASE_AUTH_URI as string,
  tokenUri: process.env.FIREBASE_TOKEN_URI as string,
  authProviderX509CertUrl: process.env
    .FIREBASE_AUTH_PROVIDER_X509_CERT_URL as string,
  clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL as string,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
