// src/components/EditWebsiteDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWebsites } from "../contexts/WebsiteContext";

const EditWebsiteDialog = ({ open, website, onClose }) => {
  const { updateWebsite, addWebsite } = useWebsites();
  const [formData, setFormData] = useState({
    name: "",
    lastPayment: "",
    nextPayment: "",
    invoice: { name: "", url: "" },
    income: { yearly: "" },
    status: "Gesendet",
    onlineUntil: "",
  });

  // Form zurücksetzen, wenn sich die Webseite ändert
  useEffect(() => {
    if (website) {
      setFormData({
        name: website.name || "",
        lastPayment: website.lastPayment || "",
        nextPayment: website.nextPayment || "",
        invoice: website.invoice || { name: "", url: "" },
        income: website.income || { yearly: "" },
        status: website.status || "Gesendet",
        onlineUntil: website.onlineUntil || "",
      });
    } else {
      // Neues Formular
      setFormData({
        name: "",
        lastPayment: "",
        nextPayment: "",
        invoice: { name: "", url: "" },
        income: { yearly: "" },
        status: "Gesendet",
        onlineUntil: "",
      });
    }
  }, [website]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    // Zahlen korrekt formatieren
    const processedData = {
      ...formData,
      income: {
        ...formData.income,
        yearly: parseFloat(formData.income.yearly) || 0,
      },
    };

    if (website?.id) {
      // Bestehende Webseite aktualisieren
      await updateWebsite(website.id, processedData);
    } else {
      // Neue Webseite hinzufügen
      await addWebsite(processedData);
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {website?.id ? "Webseite bearbeiten" : "Neue Webseite hinzufügen"}
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
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Webseiten Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="lastPayment"
              label="Letzte Zahlung"
              type="date"
              value={formData.lastPayment}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="nextPayment"
              label="Nächste Zahlung"
              type="date"
              value={formData.nextPayment}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="invoice.name"
              label="Rechnungsname"
              value={formData.invoice.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="invoice.url"
              label="Rechnungs-URL"
              value={formData.invoice.url}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="income.yearly"
              label="Jährlicher Betrag (CHF)"
              type="number"
              value={formData.income.yearly}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Gesendet">Gesendet</MenuItem>
                <MenuItem value="Am Warten">Am Warten</MenuItem>
                <MenuItem value="Gekündigt">Gekündigt</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Keine Antwort">Keine Antwort</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="onlineUntil"
              label="Online bis"
              type="date"
              value={formData.onlineUntil}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
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

export default EditWebsiteDialog;
