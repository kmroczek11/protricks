import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import logo from "../../assets/logos/logo_alt.jpg";
import { Logo } from "../lib";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavItemsObject } from "../../routes";
import AppBar from "@mui/material/AppBar";
import UserButtonsBox from "./components/UserButtonsBox";

interface NavProps {
  items: NavItemsObject[];
}

const Navbar: React.FC<NavProps> = (props) => {
  const { items } = props;

  return (
    <React.Fragment>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
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
                justifyContent: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              {items.map(({ id, name, path }) => (
                <Link
                  color="inherit"
                  noWrap
                  key={id}
                  variant="body1"
                  href={path}
                  underline="none"
                  sx={{
                    p: 1,
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
        </Container>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Navbar;
