// src/components/DeleteWebsiteDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWebsites } from "../contexts/WebsiteContext";

const DeleteWebsiteDialog = ({ open, website, onClose }) => {
  const { deleteWebsite } = useWebsites();

  const handleDelete = async () => {
    if (website?.id) {
      await deleteWebsite(website.id);
    }
    onClose();
  };

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
        Webseite löschen
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
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            Möchtest du diese Webseite wirklich löschen?
          </Typography>
          <Typography color="text.secondary">
            Webseite: <strong>{website.name || "Unbenannte Webseite"}</strong>
          </Typography>
          <Typography color="error" sx={{ mt: 2 }}>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2 }}>
          Abbrechen
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ borderRadius: 2 }}
        >
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWebsiteDialog;
