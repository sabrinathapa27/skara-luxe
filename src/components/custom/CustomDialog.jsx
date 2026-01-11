import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  CircularProgress,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    background: `linear-gradient(135deg, ${
      theme.palette.background.paper
    } 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
    backdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    boxShadow: `0 25px 50px ${alpha(theme.palette.common.black, 0.15)}`,
    overflow: "hidden",
  },
}));

const DialogHeader = styled(DialogTitle)(({ theme, type }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: theme.spacing(0.5),
  background:
    type === "warning"
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.warning.main,
          0.08
        )} 0%, transparent 100%)`
      : type === "error"
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.error.main,
          0.08
        )} 0%, transparent 100%)`
      : type === "success"
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.success.main,
          0.08
        )} 0%, transparent 100%)`
      : type === "info"
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.info.main,
          0.08
        )} 0%, transparent 100%)`
      : `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.08
        )} 0%, transparent 100%)`,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    background: `linear-gradient(90deg, transparent 0%, ${alpha(
      theme.palette.divider,
      0.5
    )} 50%, transparent 100%)`,
  },
}));

const IconContainer = styled(Box)(({ theme, type }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: 12,
  background:
    type === "warning"
      ? `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`
      : type === "error"
      ? `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
      : type === "success"
      ? `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
      : type === "info"
      ? `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: `0 4px 12px ${alpha(
    type === "warning"
      ? theme.palette.warning.main
      : type === "error"
      ? theme.palette.error.main
      : type === "success"
      ? theme.palette.success.main
      : type === "info"
      ? theme.palette.info.main
      : theme.palette.primary.main,
    0.3
  )}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(0.2),
  textAlign: "center",
}));

const StyledDialogActions = styled(DialogActions)(({ theme, isMobile }) => ({
  padding: theme.spacing(1),
  gap: theme.spacing(1),
  background: alpha(theme.palette.background.default, 0.6),
  flexDirection: isMobile ? "column" : "row",
  "& > *": {
    margin: "0 !important",
    flex: isMobile ? 1 : "none",
    width: isMobile ? "100%" : "auto",
  },
}));

const ActionButton = styled(Button)(({ theme, varianttype, ismobile }) => ({
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.875rem",
  minWidth: 40,
  width: ismobile === "true" ? "100%" : "auto",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(
      theme.palette.common.white,
      0.2
    )}, transparent)`,
    transition: "left 0.5s ease",
  },
  "&:hover::before": {
    left: "100%",
  },
  ...(varianttype === "contained" && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
  }),
  ...(varianttype === "outlined" && {
    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    "&:hover": {
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
      transform: "translateY(-2px)",
    },
  }),
}));

const CustomDialog = ({
  open,
  title = "Confirm Action",
  content = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  transition = true,
  type = "error", // 'confirm', 'info', 'warning', 'error', 'success'
  hideCancelButton = false,
  confirmButtonColor = "primary",
  maxWidth = "xs",
  fullWidth = true,
  showCloseIcon = true,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getIcon = () => {
    const iconProps = { sx: { fontSize: 24, color: "white" } };
    switch (type) {
      case "warning":
        return <WarningAmberIcon {...iconProps} />;
      case "error":
        return <ErrorIcon {...iconProps} />;
      case "success":
        return <CheckCircleIcon {...iconProps} />;
      case "info":
        return <InfoIcon {...iconProps} />;
      default:
        return <WarningAmberIcon {...iconProps} />;
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "success":
        return "success";
      case "info":
        return "info";
      default:
        return confirmButtonColor;
    }
  };

  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return;
    }
    if (disableEscapeKeyDown && reason === "escapeKeyDown") {
      return;
    }
    onCancel?.();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={transition ? Transition : undefined}
      keepMounted
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* Header with Icon and Close Button */}
      <DialogHeader type={type}>
        <IconContainer type={type}>{getIcon()}</IconContainer>
        <Box sx={{ flex: 1 }}>
          <Typography
            id="alert-dialog-title"
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: "1 rem",
            }}
          >
            {title}
          </Typography>
        </Box>
        {showCloseIcon && (
          <IconButton
            aria-label="close"
            onClick={onCancel}
            disabled={loading}
            sx={{
              width: 36,
              height: 36,
              color: theme.palette.text.secondary,
              backgroundColor: alpha(theme.palette.action.hover, 0.5),
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.text.primary,
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </DialogHeader>

      {/* Content */}
      <StyledDialogContent>
        <DialogContentText
          id="alert-dialog-description"
          component="div"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          {content}
        </DialogContentText>
      </StyledDialogContent>

      {/* Actions */}
      <StyledDialogActions isMobile={isMobile}>
        {!hideCancelButton && (
          <ActionButton
            onClick={onCancel}
            disabled={loading}
            variant="outlined"
            varianttype="outlined"
            ismobile={isMobile.toString()}
            sx={{
              order: isMobile ? 2 : 1,
            }}
          >
            {cancelText}
          </ActionButton>
        )}
        <ActionButton
          onClick={onConfirm}
          color={getConfirmButtonColor()}
          variant="contained"
          disabled={loading}
          varianttype="contained"
          ismobile={isMobile.toString()}
          startIcon={
            loading ? (
              <CircularProgress size={18} sx={{ color: "inherit" }} />
            ) : null
          }
          sx={{
            order: isMobile ? 1 : 2,
            background:
              type === "warning"
                ? `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`
                : type === "error"
                ? `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
                : type === "success"
                ? `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
                : type === "info"
                ? `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`
                : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow:
              type === "warning"
                ? `0 4px 15px ${alpha(theme.palette.warning.main, 0.3)}`
                : type === "error"
                ? `0 4px 15px ${alpha(theme.palette.error.main, 0.3)}`
                : type === "success"
                ? `0 4px 15px ${alpha(theme.palette.success.main, 0.3)}`
                : type === "info"
                ? `0 4px 15px ${alpha(theme.palette.info.main, 0.3)}`
                : `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
            "&:hover": {
              boxShadow:
                type === "warning"
                  ? `0 6px 20px ${alpha(theme.palette.warning.main, 0.4)}`
                  : type === "error"
                  ? `0 6px 20px ${alpha(theme.palette.error.main, 0.4)}`
                  : type === "success"
                  ? `0 6px 20px ${alpha(theme.palette.success.main, 0.4)}`
                  : type === "info"
                  ? `0 6px 20px ${alpha(theme.palette.info.main, 0.4)}`
                  : `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          }}
        >
          {loading ? "Processing..." : confirmText}
        </ActionButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CustomDialog;
