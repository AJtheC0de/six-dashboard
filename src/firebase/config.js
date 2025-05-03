import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Firebase-Konfiguration ohne Fallback-Werte
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let app, database, analytics;

// Firebase initialisieren
try {
  console.log("Firebase wird initialisiert...");
  console.log("Verwende databaseURL:", firebaseConfig.databaseURL);
  console.log("Verwende projectId:", firebaseConfig.projectId);
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);

  // Analytics nur im Browser initialisieren
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  console.log("Firebase erfolgreich initialisiert!");
} catch (error) {
  console.error("Fehler bei der Firebase-Initialisierung:", error);
}

export { app, database, analytics };
