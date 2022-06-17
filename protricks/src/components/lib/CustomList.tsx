import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "@mui/material/Link";

interface CustomListObject {
  name: string;
}

interface CustomListProps {
  items: CustomListObject[];
  variant: string;
  title?: string;
  Icon?: React.ReactElement;
}

const CustomList: React.FC<CustomListProps> = (props) => {
  const { items, variant, title, Icon } = props;

  return (
    <List
      sx={{ color: `${variant}.contrastText` }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{ bgcolor: `${variant}.main`, color: `${variant}.contrastText` }}
          component="div"
          id="nested-list-subheader"
        >
          {title}
        </ListSubheader>
      }
    >
      {items.map(({ name }, i) => (
        <Link
          key={i}
          // href={path}
          underline="none"
        >
          <ListItem
            sx={{
              color: `${variant}.contrastText`,

              "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: `${variant}.contrastText`,
              },

              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            disablePadding
          >
            <ListItemButton>
              {Icon}
              <ListItemText primary={name} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default CustomList;
