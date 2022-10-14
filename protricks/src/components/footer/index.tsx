import Grid from "@mui/material/Grid";
import React from "react";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../../assets/logos/logo.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ButtonBox, CustomList, Logo } from "../lib";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Divider, SvgIcon, useMediaQuery, useTheme } from "@mui/material";
import { ReactComponent as TikTokIcon } from "../../assets/icons/tiktok.svg";
import Tooltip from "@mui/material/Tooltip";

const txt1 = [
  { id: 1, name: "O nas" },
  { id: 2, name: "Partnerzy" },
  { id: 3, name: "FAQ" },
  { id: 4, name: "Regulamin" },
];

const txt2 = [
  { id: 1, name: "Ernest Jędrzejek" },
  { id: 2, name: "Telefon: +48 123 123 123" },
  { id: 3, name: "Email: kontakt@protricks.pl" },
];

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: "secondary.main" }}>
      <Grid container p={5} spacing={5}>
        <Grid item xs={12} md={4} textAlign="center">
          <Logo src={logo} alt="logo" />
          <Typography
            variant="body1"
            color="primary.dark"
            align="center"
            gutterBottom
          >
            Masz pytania? Napisz do nas na
            <br />
            <a href="mailto:kontakt@protricks.pl">kontakt@protricks.pl</a>
            <br />
            <br />
            Nasze social media
          </Typography>
          <ButtonBox justifyContent="center" alignItems="center">
            <Tooltip title="Kliknij, aby otworzyć Facebook">
              <IconButton
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/Protricks-academy-103440185814054",
                    "_blank"
                  );
                  window.open(
                    "https://www.facebook.com/profile.php?id=100063594550165",
                    "_blank"
                  );
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Kliknij, aby otworzyć Instagram">
              <IconButton
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/protricks.official/?hl=pl",
                    "_blank"
                  );
                  window.open(
                    "https://www.instagram.com/protricks.academy/",
                    "_blank"
                  );
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Kliknij, aby otworzyć YouTube">
              <IconButton
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/channel/UCTKSiKl9yPRPlBoPckPfYMQ",
                    "_blank"
                  )
                }
              >
                <YouTubeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Kliknij, aby otworzyć TikTok">
              <IconButton
                onClick={() =>
                  window.open(
                    "https://www.tiktok.com/@protricks.academy",
                    "_blank"
                  )
                }
              >
                <SvgIcon>
                  <TikTokIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </ButtonBox>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* <CustomList
            items={txt1}
            variant="secondary"
            title="LINKI"
            Icon={
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
            }
          /> */}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CustomList
            title="DANE KONTAKTOWE"
            items={txt2}
            variant="secondary"
            center={useMediaQuery(theme.breakpoints.down("sm"))}
          />
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: "primary.dark" }} />
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <CopyrightIcon color="primary" />
        <Typography variant="caption" color="primary">
          2022 Wszelkie prawa zastrzeżone
        </Typography>
      </Grid>
    </Box>
  );
};

export default Footer;
