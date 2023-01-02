import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton, LoadingScreen } from "../../../../lib";
import Box from "@mui/material/Box";
import { useCreateGroupMutation } from "../../../../../generated/graphql";
import createAccessClient from "../../../../../graphql/clients/accessClient";

const defaultGroupValues = {
  name: "Nowa grupa",
  limit: 1,
  price:0,
};

interface CreateGroupFormProps {
  coachId: string;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = (props) => {
  const { coachId } = props;
  const [formGroupValues, setFormGroupValues] = useState(defaultGroupValues);

  const { isLoading, mutate } = useCreateGroupMutation<Error>(
    createAccessClient(),
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
      <TextField
        id="price-input"
        name="price"
        label="Cena"
        type="number"
        value={formGroupValues.price}
        onChange={handleInputChange}
        InputProps={{
          inputProps: { min: 0 },
        }}
      />
      <ColorButton
        variant="outlined"
        color="secondary"
        onClick={() =>
          mutate({
            input: {
              coachId: coachId,
              name: formGroupValues.name,
              limit: formGroupValues.limit,
              price: formGroupValues.price,
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
