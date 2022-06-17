import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import logo from "../../images/logo_alt.jpg";
import IconButton from "@mui/material/IconButton";
import { CustomList, Logo } from "../lib";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { NavItemsObject } from "../../routes";
import AppBar from "@mui/material/AppBar";
import UserButtonsBox from "./components/UserButtonsBox";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

interface NavProps {
  items: NavItemsObject[];
}

const Navbar: React.FC<NavProps> = (props) => {
  const { items } = props;
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 7 }}>
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
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
            <UserButtonsBox />
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="top"
        open={drawerOpen}
        sx={{
          zIndex: 2,
          [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Paper>
          <MenuList>
            {items.map(({ name }) => (
              <MenuItem>
                <ListItemText sx={{textAlign:'center'}}>{name}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
