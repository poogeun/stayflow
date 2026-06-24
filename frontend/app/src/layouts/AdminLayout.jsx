import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { DashboardOutlined, CalendarMonthOutlined, MeetingRoomOutlined } from "@mui/icons-material";
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

function AdminLayout() {
  const location = useLocation();

  const menus = [
    { label: "Dashboard", path: "/admin", icon: <DashboardOutlined fontSize="small" /> },
    { label: "Reservations", path: "/admin/reservations", icon: <CalendarMonthOutlined fontSize="small" /> },
    { label: "Rooms", path: "/admin/rooms", icon: <MeetingRoomOutlined fontSize="small" /> },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#fff",
            borderRight: "0.5px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box sx={{ p: 3, py: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
            StayFlow
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            PMS Admin
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ px: 1.5, pt: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              color: "text.disabled",
              fontWeight: 600,
              letterSpacing: "0.08em"
            }}
          >
            OVERVIEW
          </Typography>
        </Box>

        <List sx={{ px: 1.5, pt: 0.5 }}>
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;

            return (
              <ListItemButton
                key={menu.path}
                component={Link}
                to={menu.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: isActive ? "#1D9E75" : "text.secondary",
                  bgcolor: isActive ? "rgba(29,158,117,0.08)" : "transparent",
                  "&:hover": {
                    bgcolor: isActive ? "rgba(29,158,117,0.08)" : "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                  }} 
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;