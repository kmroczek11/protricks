import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../../lib";
import Box from "@mui/material/Box";
import { useEditGroupMutation } from "../../../generated/graphql";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import LoadingScreen from "../../lib/LoadingScreen";

interface EditGroupFormProps {
  item: {
    id: number;
    name: string;
    limit: number;
  };
}

const EditGroupForm: React.FC<EditGroupFormProps> = (props) => {
  const { item } = props;
  const { id, ...payload } = item;
  const [formGroupValues, setFormGroupValues] = useState(payload);

  const { isLoading, mutate } = useEditGroupMutation<Error>(
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
        label="Nowa nazwa grupy"
        type="text"
        value={formGroupValues.name}
        onChange={handleInputChange}
      />
      <TextField
        id="limit-input"
        name="limit"
        label="Nowy limit"
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
              groupId: id,
              name: formGroupValues.name,
              limit: formGroupValues.limit,
            },
          })
        }
      >
        Zmień
      </ColorButton>
    </Box>
  );
};

export default EditGroupForm;
