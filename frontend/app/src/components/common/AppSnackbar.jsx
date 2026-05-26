import { Alert, Snackbar } from "@mui/material";

function AppSnackbar({ snackbar, onClose }) {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={snackbar.severity}
        variant='filled'
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;