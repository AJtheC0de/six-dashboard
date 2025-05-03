// src/components/WebsiteDetailsDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWebsites } from "../contexts/WebsiteContext";

const WebsiteDetailsDialog = ({ open, website, onClose }) => {
  const { updateWebsite } = useWebsites();
  const [tabValue, setTabValue] = useState(0);
  const [detailsData, setDetailsData] = useState({
    costs: {
      web: "",
      domain: "",
    },
    income: {
      creation: "",
      yearly: "",
    },
  });

  useEffect(() => {
    if (website) {
      setDetailsData({
        costs: website.costs || { web: "", domain: "" },
        income: {
          creation: website.income?.creation || "",
          yearly: website.income?.yearly || "",
        },
      });
    }
  }, [website]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setDetailsData({
        ...detailsData,
        [parent]: {
          ...detailsData[parent],
          [child]: value,
        },
      });
    } else {
      setDetailsData({
        ...detailsData,
        [name]: value,
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async () => {
    // Zahlen korrekt formatieren
    const processedData = {
      costs: {
        web: parseFloat(detailsData.costs.web) || 0,
        domain: parseFloat(detailsData.costs.domain) || 0,
      },
      income: {
        creation: parseFloat(detailsData.income.creation) || 0,
        yearly: parseFloat(detailsData.income.yearly) || 0,
      },
    };

    if (website?.id) {
      await updateWebsite(website.id, processedData);
    }

    onClose();
  };

  // Finanzdaten für das aktuelle Dashboard berechnen
  const calculateFinancials = () => {
    const webCost = parseFloat(detailsData.costs.web) || 0;
    const domainCost = parseFloat(detailsData.costs.domain) || 0;
    const totalCosts = webCost + domainCost;

    if (tabValue === 0) {
      // Jährlich
      const yearlyIncome = parseFloat(detailsData.income.yearly) || 0;
      const yearlyProfit = yearlyIncome - totalCosts;

      return {
        income: yearlyIncome,
        costs: totalCosts,
        profit: yearlyProfit,
      };
    } else {
      // Erstellung
      const creationIncome = parseFloat(detailsData.income.creation) || 0;
      return {
        income: creationIncome,
        costs: 0, // Bei Erstellung gibt es keine laufenden Kosten
        profit: creationIncome,
      };
    }
  };

  const financials = calculateFinancials();

  if (!website) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {website.name || "Webseiten Details"}
        <IconButton
          aria-label="schließen"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="costs.web"
              label="Kosten Web (CHF)"
              type="number"
              value={detailsData.costs.web}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="costs.domain"
              label="Kosten Domain (CHF)"
              type="number"
              value={detailsData.costs.domain}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="income.creation"
              label="Erstellung (CHF)"
              type="number"
              value={detailsData.income.creation}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="income.yearly"
              label="Jährlich (CHF)"
              type="number"
              value={detailsData.income.yearly}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Finanzielles Dashboard
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Jährlich" />
                <Tab label="Erstellung" />
              </Tabs>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "success.light",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Einnahmen
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {financials.income.toLocaleString("de-CH")} CHF
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "error.light",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Kosten
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {financials.costs.toLocaleString("de-CH")} CHF
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor:
                      financials.profit >= 0 ? "success.light" : "error.light",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Profit
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {financials.profit.toLocaleString("de-CH")} CHF
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2 }}>
          Abbrechen
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebsiteDetailsDialog;
