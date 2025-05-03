// src/components/FinancialSummary.js
import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PaidIcon from "@mui/icons-material/Paid";
import WebIcon from "@mui/icons-material/Web";
import { useWebsites } from "../contexts/WebsiteContext";

const SummaryCard = ({ icon, title, value, color }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(145deg, ${color}15, ${color}05)`,
        border: `1px solid ${color}20`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            borderRadius: "50%",
            p: 1,
            mr: 1,
            backgroundColor: `${color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(icon, { sx: { color } })}
        </Box>
        <Typography variant="h6" component="h3" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        component="p"
        fontWeight="bold"
        mt={1}
        color={
          title === "Profit"
            ? value >= 0
              ? "success.main"
              : "error.main"
            : "text.primary"
        }
      >
        {typeof value === "number" && title !== "Aktiv derzeit"
          ? `${value.toLocaleString("de-CH")} CHF`
          : value}
      </Typography>
    </Paper>
  );
};

const FinancialSummary = () => {
  const { financialSummary } = useWebsites();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<WebIcon />}
          title="Aktiv derzeit"
          value={financialSummary.activeCount}
          color="#0071e3" // Apple Blau
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<MoneyOffIcon />}
          title="Deine Kosten"
          value={financialSummary.costs}
          color="#ff3b30" // Apple Rot
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<PaidIcon />}
          title="Deine Einnahmen"
          value={financialSummary.income}
          color="#34c759" // Apple Grün
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          icon={<AccountBalanceIcon />}
          title="Profit"
          value={financialSummary.profit}
          color={financialSummary.profit >= 0 ? "#34c759" : "#ff3b30"}
        />
      </Grid>
    </Grid>
  );
};

export default FinancialSummary;
