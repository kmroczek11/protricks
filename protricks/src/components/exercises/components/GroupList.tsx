import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

interface GroupListProps {
  groups: GroupObject[];
  selectedGroup: string | undefined;
  selectGroup: (id: string) => void;
  setSelected: (selected: boolean) => void;
}

interface GroupObject {
  id: string;
  name: string;
  freePlaces: number;
}

const GroupList: React.FC<GroupListProps> = (props) => {
  const { groups, selectedGroup, selectGroup, setSelected } = props;

  const handleToggle = (value: string) => () => {
    selectGroup(value);
    setSelected(true);
  };

  return (
    <List
      sx={{
        bgcolor: "background.paper",
        "&& .Mui-selected": {
          bgcolor: "success.light",
          "&:hover": {
            bgcolor: "success.dark",
          },
        },
      }}
    >
      {groups.map(({ id, name, freePlaces }) => {
        const labelId = `checkbox-list-secondary-label-${id}`;
        return (
          <ListItem
            key={id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(id)}
                checked={selectedGroup === id}
                inputProps={{ "aria-labelledby": labelId }}
                color="secondary"
              />
            }
            sx={{
              "& .MuiAvatar-root": {
                width: 100,
                height: 100,
                m: 2,
              },
              "& .MuiSvgIcon-root": {
                fontSize: 40,
              },
            }}
            disablePadding
          >
            <ListItemButton
              selected={selectedGroup == id}
              onClick={handleToggle(id)}
              sx={{ p: 8 }}
            >
              <ListItemText
                id={labelId}
                primaryTypographyProps={{ fontWeight: 600 }}
                primary={name}
              />
              <ListItemText
                id={labelId}
                primary={`Pozostało miejsc: ${freePlaces}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default GroupList;
