import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import { Theme, useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Typography from "@mui/material/Typography";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CustomExercisesListObject {
  title: string;
  text: string;
  titleColor?: string;
  ElementIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

interface CustomExercisesListProps {
  items: CustomExercisesListObject[];
  sxBackground?: SxProps<Theme>;
  variant: string;
  size?: "sm" | "lg";
  center?: boolean;
  title?: string;
  ListIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const CustomExercisesList: React.FC<CustomExercisesListProps> = (props) => {
  const {
    items,
    sxBackground,
    variant,
    size = "sm",
    center,
    title,
    ListIcon,
  } = props;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List
      sx={sxBackground}
      aria-labelledby="nested-list-subheader"
      subheader={
        <Typography
          variant={size === "lg" ? "h2" : "sm" ? "subtitle1" : undefined}
          align={center ? "center" : undefined}
          color={`${variant}.contrastText`}
          textTransform="uppercase"
          gutterBottom
        >
          {title}
        </Typography>
      }
    >
      {items.map(({ title, text, titleColor, ElementIcon }, i) => (
        <Link
          key={i}
          // href={path}
          underline="none"
        >
          <ListItem
            sx={{
              color: `${variant}.contrastText`,
              textTransform: "uppercase",

              "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: `${variant}.contrastText`,
              },

              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            disablePadding
          >
            <ListItemButton
              sx={{
                display: "flex",
                flexDirection: smScreen ? "column" : "row",
              }}
            >
              {ListIcon && <ListIcon sx={{ width: 60, height: 60 }} />}
              {ElementIcon && <ElementIcon sx={{ width: 60, height: 60 }} />}
              <ListItemText
                primary={
                  <Typography
                    variant={size === "lg" ? "h2" : "sm" ? "body1" : undefined}
                    align={center ? "center" : undefined}
                    color={titleColor}
                    py={smScreen ? undefined : 3}
                    gutterBottom
                  >
                    {title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant={size === "lg" ? "h2" : "sm" ? "body1" : undefined}
                    align={center ? "center" : undefined}
                    px={smScreen ? undefined : 5}
                    gutterBottom
                  >
                    {text}
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

export default CustomExercisesList;
