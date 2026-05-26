import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle fontWeight={800}>
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>
          {cancelText}
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;