import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import GroupIcon from "@mui/icons-material/Group";

interface GroupListProps {
  groups: GroupObject[];
  selectedGroup: string | undefined;
  selectGroup: (id: string) => void;
  setSelected: (selected: boolean) => void;
}

interface GroupObject {
  id: string;
  name: string;
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
      {groups.map(({ id, name }) => {
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
              sx={{ p: 2 }}
            >
              <ListItemAvatar>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default GroupList;
