import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import ListItemIcon from "@mui/material/ListItemIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface RAMPListObject {
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

interface RAMPListProps {
  items: RAMPListObject[];
  variant: string;
}

const RAMPList: React.FC<RAMPListProps> = (props) => {
  const { items, variant } = props;

  return (
    <List
      sx={{ color: `${variant}.contrastText` }}
      aria-labelledby="nested-list-subheader"
    >
      {items.map(({ name, Icon }, i) => (
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
              <ListItemIcon>
                <Icon sx={{ width: 60, height: 60 }} />
              </ListItemIcon>
              <ListItemText primary={name} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default RAMPList;
