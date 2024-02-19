import React from "react";
import Grid from "@mui/material/Grid";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { useMediaQuery, useTheme } from "@mui/material";
import IconCard from "./IconCard";

interface IconCardsProps {
  data: ReadonlyArray<{
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    name: string;
    content: string;
    path?: string;
  }>;
}

const IconCards: React.FC<IconCardsProps> = (props) => {
  const { data } = props;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={5}
      direction={smScreen ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
    >
      {data.map((item, i) => (
        <Grid item xs={12} md={12 / data.length} key={i}>
          <IconCard
            i={i}
            item={item}
            variant={i == 1 ? "primary" : "secondary"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IconCards;
