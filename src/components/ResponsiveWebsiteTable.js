// src/components/ResponsiveWebsiteTable.js
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Link,
  Card,
  CardContent,
  Grid,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useWebsites } from "../contexts/WebsiteContext";
import WebsiteTable from "./WebsiteTable";

// Statusfarben
const statusColors = {
  Gesendet: "info",
  "Am Warten": "warning",
  Gekündigt: "error",
  Free: "success",
  "Keine Antwort": "default",
};

const WebsiteCard = ({ website, onEdit, onViewDetails }) => {
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

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h3" fontWeight="medium">
            {website.name || "Unbenannte Webseite"}
          </Typography>
          <Chip
            label={website.status || "-"}
            color={statusColors[website.status] || "default"}
            size="small"
          />
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Letzte Zahlung
            </Typography>
            <Typography variant="body2">
              {formatDate(website.lastPayment)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Nächste Zahlung
            </Typography>
            <Typography variant="body2">
              {formatDate(website.nextPayment)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Rechnung
            </Typography>
            <Typography variant="body2">
              {website.invoice?.url ? (
                <Link href={website.invoice.url} target="_blank" rel="noopener">
                  {website.invoice.name || "Rechnung"}
                </Link>
              ) : (
                "-"
              )}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Betrag
            </Typography>
            <Typography variant="body2">
              {website.income?.yearly
                ? `${website.income.yearly.toLocaleString("de-CH")} CHF`
                : "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Online bis
            </Typography>
            <Typography variant="body2">
              {formatDate(website.onlineUntil)}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

const ResponsiveWebsiteTable = ({ onEdit, onViewDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { websites, loading } = useWebsites();

  if (loading) {
    return <Typography>Daten werden geladen...</Typography>;
  }

  if (isMobile) {
    return (
      <Box sx={{ p: 2 }}>
        {websites.length === 0 ? (
          <Typography sx={{ py: 3, textAlign: "center" }}>
            Keine Webseiten vorhanden
          </Typography>
        ) : (
          websites.map((website) => (
            <WebsiteCard
              key={website.id}
              website={website}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </Box>
    );
  }

  return <WebsiteTable onEdit={onEdit} onViewDetails={onViewDetails} />;
};

export default ResponsiveWebsiteTable;
