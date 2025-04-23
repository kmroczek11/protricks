import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import { ColorButton } from "../../../../lib";
import { ChangeGroupMutation, useChangeGroupMutation } from "../../../../../generated/graphql";
import { useClient } from "../../../../auth/providers/ClientProvider";

interface TraineeInfoDialogProps {
  traineeId: string;
  groups: Array<{ id: string, name: string }> | null
  open: boolean;
  handleClose: () => void;
  onClose?: () => void;
}

const TraineeInfoDialog: React.FC<TraineeInfoDialogProps> = (props) => {
  const { traineeId, groups, open, handleClose, onClose } = props;
  const [groupId, setGroupId] = React.useState(groups![0].id);
  const { accessClient } = useClient()

  const { isLoading, mutate: changeGroup } =
    useChangeGroupMutation<Error>(accessClient!, {});

  const handleChange = (event: SelectChangeEvent) => {
    setGroupId(event.target.value as string);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle>Wybierz nową grupę</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {groups?.length != 0 ? (
          <React.Fragment>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Nowa grupa</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupId}
                  label="Nowa grupa"
                  onChange={handleChange}
                >
                  {groups?.map(({ id,name }) => (
                    <MenuItem value={id}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ColorButton
                variant="contained"
                color="success"
                type="submit"
                sx={{ my: 2 }}
                onClick={() => changeGroup({
                  input:{
                    traineeId,
                    groupId
                  }
                })}
              >
                Zmień
              </ColorButton>
            </Box>
          </React.Fragment>

        ) : (
          <Typography
            gutterBottom
            variant="body1"
            color="secondary.main"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Brak grup
          </Typography>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default TraineeInfoDialog;
