import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

function AdminLayout() {
  const location = useLocation();

  const menus = [
    { label: "Dashboard", path: "/admin" },
    { label: "Rooms", path: "/admin/rooms" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f6f8" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#111827",
            color: "white",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={800}>
            StayFlow
          </Typography>
          <Typography variant="body2" sx={{ color: "#9CA3AF", mt: 0.5 }}>
            PMS Admin
          </Typography>
        </Box>

        <List sx={{ px: 2 }}>
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;

            return (
              <ListItemButton
                key={menu.path}
                component={Link}
                to={menu.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  color: "white",
                  bgcolor: isActive ? "rgba(255,255,255,0.14)" : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <ListItemText
                  primary={menu.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 800 : 500,
                  }} 
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;