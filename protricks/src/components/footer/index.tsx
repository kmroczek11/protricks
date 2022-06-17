import Grid from "@mui/material/Grid";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Theme, styled } from "@mui/material/styles";
import logo from "../../images/logo.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomList, Logo } from "../lib";
import ListItemIcon from "@mui/material/ListItemIcon";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Divider } from "@mui/material";

const txt1 = [
  { id: 1, name: "O nas" },
  { id: 2, name: "Partnerzy" },
  { id: 3, name: "FAQ" },
  { id: 4, name: "Regulamin" },
];

const txt2 = [
  { id: 1, name: "4746 Tipple Road Michigan 48449" },
  { id: 2, name: "Mobile : 1.800.000.0000" },
  { id: 3, name: "Email : info@your-company.com" },
];

const ButtonBox = styled(Box)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: theme.palette.secondary.contrastText,
  },
}));

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "secondary.main" }}>
      <Grid container sx={{ p: 10 }}>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Logo src={logo} alt="logo" />
          <Typography
            variant="body1"
            color="primary.dark"
            align="center"
            gutterBottom
          >
            Protricks jest firmą związana z akrobatyką działającą na terenie
            Krakowa i okolic
          </Typography>
          <ButtonBox justifyContent="center" alignItems="center">
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <YouTubeIcon />
            </IconButton>
          </ButtonBox>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CustomList
            items={txt1}
            variant="secondary"
            title="LINKI"
            Icon={
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CustomList
            items={txt2}
            variant="secondary"
            title="DANE KONTAKTOWE"
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
