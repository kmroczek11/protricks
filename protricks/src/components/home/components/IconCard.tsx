import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "@mui/material/Link";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface IconCardProps {
  i: number;
  variant: "primary" | "secondary" | undefined;
  item: {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    name: string;
    content: string;
    path?: string;
  };
}

const IconCard: React.FC<IconCardProps> = (props) => {
  const { i, variant, item } = props;
  const { Icon, name, content, path } = item;

  return (
    <Link key={i} href={path} underline="none">
      <Card
        sx={{
          position: "relative",
          textAlign: "center",
          maxWidth: 345,
          border: "5px solid",
          borderColor: `${variant}.main`,
          borderRadius: "20px",
          backgroundColor:`${variant}.contrastText`
        }}
      >
        <CardActionArea sx={{ p: 5 }}>
          <Icon sx={{ width: 100, height: 100, color: `${variant}.main` }} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={`${variant}.main`}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="#000">
              {content}
            </Typography>
          </CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2" color={`${variant}.main`}>
              Dowiedz się więcej
            </Typography>
            <ArrowRightIcon />
          </Grid>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default IconCard;
