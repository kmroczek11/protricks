import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Typography from "@mui/material/Typography";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface CustomListObject {
  name: string;
  ElementIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

interface CustomListProps {
  items: CustomListObject[];
  sxBackground?: SxProps<Theme>;
  variant: string;
  size?: "sm" | "lg";
  center?: boolean;
  title?: string;
  ListIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const CustomList: React.FC<CustomListProps> = (props) => {
  const {
    items,
    sxBackground,
    variant,
    size = "sm",
    center,
    title,
    ListIcon,
  } = props;

  return (
    <List
      sx={sxBackground}
      aria-labelledby="nested-list-subheader"
      subheader={
        <Typography
          variant={size === "lg" ? "h1" : "sm" ? "subtitle1" : undefined}
          align={center ? "center" : undefined}
          color={`${variant}.contrastText`}
          gutterBottom
        >
          {title}
        </Typography>
      }
    >
      {items.map(({ name, ElementIcon }, i) => (
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
              {ListIcon && <ListIcon sx={{ width: 60, height: 60 }} />}
              {ElementIcon && <ElementIcon sx={{ width: 60, height: 60 }} />}
              <ListItemText
                primary={
                  <Typography
                    variant={size === "lg" ? "h2" : "sm" ? "body1" : undefined}
                    align={center ? "center" : undefined}
                    gutterBottom
                  >
                    {name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default CustomList;
