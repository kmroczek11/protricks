import Alert, { AlertColor } from "@mui/material/Alert";

interface CustomAlertProps {
  severity: AlertColor | undefined;
  msg: any;
}

const CustomAlert: React.FC<CustomAlertProps> = (props) => {
  const { severity, msg } = props;

  return (
    <Alert severity={severity} sx={{ width: "100%" }}>
      {msg}
    </Alert>
  );
};

export default CustomAlert;
