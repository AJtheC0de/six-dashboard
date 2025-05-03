// src/firebase/databaseService.js
import {
  ref,
  set,
  get,
  remove,
  update,
  onValue,
  push,
  child,
} from "firebase/database";
import { database } from "./config";

// Webseiten-Operationen
export const addWebsite = async (websiteData) => {
  try {
    const newWebsiteRef = push(ref(database, "websites"));
    await set(newWebsiteRef, {
      ...websiteData,
      id: newWebsiteRef.key,
      createdAt: new Date().toISOString(),
    });
    return newWebsiteRef.key;
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Webseite:", error);
    throw error;
  }
};

export const updateWebsite = async (id, updates) => {
  try {
    const websiteRef = ref(database, `websites/${id}`);
    await update(websiteRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Webseite:", error);
    throw error;
  }
};

export const deleteWebsite = async (id) => {
  try {
    const websiteRef = ref(database, `websites/${id}`);
    await remove(websiteRef);
    return true;
  } catch (error) {
    console.error("Fehler beim Löschen der Webseite:", error);
    throw error;
  }
};

export const getWebsites = async () => {
  try {
    const websitesRef = ref(database, "websites");
    const snapshot = await get(websitesRef);

    if (snapshot.exists()) {
      const websites = snapshot.val();
      return Object.keys(websites).map((key) => ({
        ...websites[key],
        id: key,
      }));
    }

    return [];
  } catch (error) {
    console.error("Fehler beim Abrufen der Webseiten:", error);
    throw error;
  }
};

export const subscribeToWebsites = (callback) => {
  const websitesRef = ref(database, "websites");

  const unsubscribe = onValue(websitesRef, (snapshot) => {
    if (snapshot.exists()) {
      const websites = snapshot.val();
      const websitesList = Object.keys(websites).map((key) => ({
        ...websites[key],
        id: key,
      }));
      callback(websitesList);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};
