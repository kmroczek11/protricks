import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../../lib";
import Box from "@mui/material/Box";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import { useCreateGroupMutation } from "../../../generated/graphql";
import LoadingScreen from "../../lib/LoadingScreen";
import { useAuth } from "../../../context";

const defaultGroupValues = {
  name: "Nowa grupa",
  limit: 1,
};

const CreateGroupForm: React.FC = () => {
  const [formGroupValues, setFormGroupValues] = useState(defaultGroupValues);
  const [user] = useAuth();

  const { isLoading, mutate } = useCreateGroupMutation<Error>(
    graphqlRequestClient(),
    {}
  );

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormGroupValues({
      ...formGroupValues,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
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
        id="name-input"
        name="name"
        label="Nazwa grupy"
        type="text"
        value={formGroupValues.name}
        onChange={handleInputChange}
      />
      <TextField
        id="limit-input"
        name="limit"
        label="Limit"
        type="number"
        value={formGroupValues.limit}
        onChange={handleInputChange}
        InputProps={{
          inputProps: { min: 1 },
        }}
      />
      <ColorButton
        variant="outlined"
        color="secondary"
        onClick={() =>
          mutate({
            input: {
              coachId: user?.id!,
              name: formGroupValues.name,
              limit: formGroupValues.limit,
            },
          })
        }
      >
        Dodaj
      </ColorButton>
    </Box>
  );
};

export default CreateGroupForm;
