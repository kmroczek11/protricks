import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../../lib";
import Box from "@mui/material/Box";

const defaultPasswordValues = {
  oldPassword: "",
  newPassword: "",
};

const PasswordForm: React.FC = () => {
  const [formPasswordValues, setFormPasswordValues] = useState(
    defaultPasswordValues
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormPasswordValues({
      ...formPasswordValues,
      [name]: value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="old-password-input"
        name="old-password"
        label="Stare hasło"
        type="password"
        value={formPasswordValues.oldPassword}
        onChange={handleInputChange}
      />
      <TextField
        id="new-password-input"
        name="new-password"
        label="Nowe hasło"
        type="password"
        value={formPasswordValues.newPassword}
        onChange={handleInputChange}
      />
      <ColorButton variant="outlined" color="secondary">
        Zmień
      </ColorButton>
    </Box>
  );
};

export default PasswordForm;
