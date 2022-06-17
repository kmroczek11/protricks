import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../../lib";
import Box from "@mui/material/Box";

const defaultPasswordValues = {
  newEmail: ""
};

const EmailForm: React.FC = () => {
  const [formEmailValues, setFormPasswordValues] = useState(
    defaultPasswordValues
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormPasswordValues({
      ...formEmailValues,
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
        id="new-email-input"
        name="new-email"
        label="Nowy email"
        type="email"
        value={formEmailValues.newEmail}
        onChange={handleInputChange}
      />
      <ColorButton variant="outlined" color="secondary">
        Zmień
      </ColorButton>
    </Box>
  );
};

export default EmailForm;
