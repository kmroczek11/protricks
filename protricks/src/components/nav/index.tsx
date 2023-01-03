import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import logo from "../../assets/logos/logo2.jpg";
import { Logo } from "../lib";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavItemsObject } from "../../routes";
import AppBar from "@mui/material/AppBar";
import UserButtonsBox from "./components/UserButtonsBox";
import { useMediaQuery, useTheme } from "@mui/material";

interface NavProps {
  items: NavItemsObject[];
}

const Navbar: React.FC<NavProps> = (props) => {
  const { items } = props;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "black",
        }}
      >
        <Box sx={{ px: smScreen ? 10 : 30 }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              borderBottom: 1,
              borderColor: "divider",
            }}
            disableGutters
          >
            <Link href="/">
              <Logo src={logo} alt="logo" />
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "right",
                display: { xs: "none", md: "flex" },
              }}
            >
              {items.map(({ id, name, path }) => (
                <Link
                  color="primary"
                  noWrap
                  key={id}
                  variant="body1"
                  href={path}
                  underline="none"
                  sx={{
                    px: 5,
                    flexShrink: 0,

                    "&:hover": {
                      color: "primary.dark",
                    },
                  }}
                >
                  {name}
                </Link>
              ))}
            </Box>
            <UserButtonsBox items={items} />
          </Toolbar>
        </Box>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Navbar;
