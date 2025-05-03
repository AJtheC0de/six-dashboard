// src/pages/Dashboard.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ResponsiveWebsiteTable from "../components/ResponsiveWebsiteTable";
import FinancialSummary from "../components/FinancialSummary";
import EditWebsiteDialog from "../components/EditWebsiteDialog";
import WebsiteDetailsDialog from "../components/WebsiteDetailsDialog";
import DeleteWebsiteDialog from "../components/DeleteWebsiteDialog";
import MobileHeader from "../components/MobileHeader";

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const handleAddWebsite = () => {
    setSelectedWebsite(null);
    setEditDialogOpen(true);
  };

  const handleEditWebsite = (website) => {
    setSelectedWebsite(website);
    setEditDialogOpen(true);
  };

  const handleViewDetails = (website) => {
    setSelectedWebsite(website);
    setDetailsDialogOpen(true);
  };

  const handleDeleteWebsite = (website) => {
    setSelectedWebsite(website);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      {/* Mobile Navigation */}
      <MobileHeader onAddWebsite={handleAddWebsite} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          {/* Desktop Header */}
          <Box
            sx={{
              mb: 4,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              color="primary.main"
            >
              Six Dashboard
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddWebsite}
              sx={{ borderRadius: 2 }}
            >
              Neue Webseite
            </Button>
          </Box>

          {/* Finanzielle Zusammenfassung */}
          <FinancialSummary />

          {/* Webseiten Tabelle */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              mb: 4,
            }}
          >
            <Box sx={{ p: 2, bgcolor: "background.paper" }}>
              <Typography variant="h5" component="h2" fontWeight="medium">
                Webseiten Übersicht
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ overflowX: "auto" }}>
              <ResponsiveWebsiteTable
                onEdit={handleEditWebsite}
                onViewDetails={handleViewDetails}
                onDelete={handleDeleteWebsite}
              />
            </Box>
          </Paper>

          {/* Footer */}
          <Box sx={{ mt: "auto", p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              © 2025 Six Dashboard
            </Typography>
          </Box>
        </Box>

        {/* Dialoge */}
        <EditWebsiteDialog
          open={editDialogOpen}
          website={selectedWebsite}
          onClose={() => setEditDialogOpen(false)}
        />

        <WebsiteDetailsDialog
          open={detailsDialogOpen}
          website={selectedWebsite}
          onClose={() => setDetailsDialogOpen(false)}
        />

        <DeleteWebsiteDialog
          open={deleteDialogOpen}
          website={selectedWebsite}
          onClose={() => setDeleteDialogOpen(false)}
        />
      </Container>
    </>
  );
}

export default Dashboard;
