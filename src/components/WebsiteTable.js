// src/components/WebsiteTable.js
import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Chip,
  Link,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useWebsites } from "../contexts/WebsiteContext";

// Statusfarben
const statusColors = {
  Gesendet: "info",
  "Am Warten": "warning",
  Gekündigt: "error",
  Free: "success",
  "Keine Antwort": "default",
};

const WebsiteTable = ({ onEdit, onViewDetails, onDelete }) => {
  const { websites, loading } = useWebsites();

  // Datumsformatierung
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
    } catch (error) {
      console.error("Ungültiges Datum:", dateString);
      return "-";
    }
  };

  if (loading) {
    return <Typography>Daten werden geladen...</Typography>;
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ borderRadius: 2, overflow: "hidden" }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}
          >
            <TableCell sx={{ fontWeight: "bold" }}>Webseiten Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Letzte Zahlung</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nächste Zahlung</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Rechnung</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Betrag</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Online bis</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Aktionen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {websites.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography sx={{ py: 3 }}>
                  Keine Webseiten vorhanden
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            websites.map((website) => (
              <TableRow key={website.id} hover>
                <TableCell>
                  <Typography sx={{ fontWeight: "medium" }}>
                    {website.name || "-"}
                  </Typography>
                </TableCell>
                <TableCell>{formatDate(website.lastPayment)}</TableCell>
                <TableCell>{formatDate(website.nextPayment)}</TableCell>
                <TableCell>
                  {website.invoice?.url ? (
                    <Link
                      href={website.invoice.url}
                      target="_blank"
                      rel="noopener"
                    >
                      {website.invoice.name || "Rechnung"}
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {website.income?.yearly
                    ? `${website.income.yearly.toLocaleString("de-CH")} CHF`
                    : "-"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={website.status || "-"}
                    color={statusColors[website.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(website.onlineUntil)}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onViewDetails(website)}
                      color="primary"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(website)}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(website)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WebsiteTable;
