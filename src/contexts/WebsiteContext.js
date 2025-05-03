// src/contexts/WebsiteContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  subscribeToWebsites,
  addWebsite,
  updateWebsite,
  deleteWebsite,
} from "../firebase/databaseService";

const WebsiteContext = createContext();

export const useWebsites = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [financialSummary, setFinancialSummary] = useState({
    activeCount: 0,
    costs: 0,
    income: 0,
    profit: 0,
  });

  useEffect(() => {
    // Abonniere Änderungen an den Webseiten-Daten
    const unsubscribe = subscribeToWebsites((websitesList) => {
      setWebsites(websitesList);
      setLoading(false);
      calculateFinancialSummary(websitesList);
    });

    // Cleanup bei Unmount
    return () => unsubscribe();
  }, []);

  // Finanzielle Zusammenfassung berechnen
  const calculateFinancialSummary = (websitesList) => {
    const summary = websitesList.reduce(
      (acc, website) => {
        // Nur Webseiten berücksichtigen, die nicht auf "Keine Antwort" stehen
        if (website.status !== "Keine Antwort") {
          // Aktive Webseiten zählen
          acc.activeCount += 1;

          // Bei "Free" Webseiten werden nur Domain-Kosten berücksichtigt
          const websiteCost =
            website.status === "Free" ? 0 : website.costs?.web || 0;
          const domainCost = website.costs?.domain || 0;

          // Kosten addieren
          acc.costs += websiteCost + domainCost;

          // Einnahmen berechnen (bei Gesendet, Am Warten, Gekündigt wird das Geld erwartet)
          if (
            ["Gesendet", "Am Warten", "Gekündigt", "Free"].includes(
              website.status
            )
          ) {
            acc.income += website.income?.yearly || 0;
          }
        }

        return acc;
      },
      { activeCount: 0, costs: 0, income: 0, profit: 0 }
    );

    // Profit berechnen
    summary.profit = summary.income - summary.costs;

    setFinancialSummary(summary);
  };

  // Webseite hinzufügen
  const addNewWebsite = async (websiteData) => {
    try {
      await addWebsite(websiteData);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Webseite aktualisieren
  const updateExistingWebsite = async (id, updates) => {
    try {
      await updateWebsite(id, updates);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Webseite löschen
  const removeWebsite = async (id) => {
    try {
      await deleteWebsite(id);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const value = {
    websites,
    loading,
    error,
    financialSummary,
    addWebsite: addNewWebsite,
    updateWebsite: updateExistingWebsite,
    deleteWebsite: removeWebsite,
  };

  return (
    <WebsiteContext.Provider value={value}>{children}</WebsiteContext.Provider>
  );
};
