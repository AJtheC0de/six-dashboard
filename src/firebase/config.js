import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Firebase-Konfiguration mit Fallback-Werten
const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyAjZF5I9IAuqFy5yfc5yf4o-Tcc_wS0fzo",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "sixam-dashboard.firebaseapp.com",
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE_URL ||
    "https://sixam-dashboard-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "sixam-dashboard",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "sixam-dashboard.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "626119010537",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:626119010537:web:78e25e9733ef75f20ae878",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-GJRZHJ73PX",
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
