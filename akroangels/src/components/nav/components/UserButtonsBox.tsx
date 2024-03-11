import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import { ColorButton, CustomDialog } from "../../lib";
import UserDialog from "../../auth/components/UserDialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {
  LogOutUserMutation,
  LogOutUserMutationVariables,
  Role,
  useLogOutUserMutation,
} from "../../../generated/graphql";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CustomAvatar from "../../lib/CustomAvatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { NavItemsObject } from "../../../routes";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import createAccessClient from "../../../graphql/clients/accessClient";
import PaymentIcon from "@mui/icons-material/Payment";

interface UserButtonsBoxProps {
  items: NavItemsObject[];
}

const errorMessage =
  "Wystąpił nieoczekiwany błąd. Skontaktuj się z administratorem strony.";

const UserButtonsBox: React.FC<UserButtonsBoxProps> = (props) => {
  const { items } = props;
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [logoutStatus, setLogoutStatus] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const { isLoading, mutate: logOut } = useLogOutUserMutation<Error>(
    createAccessClient(),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setLogoutStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: LogOutUserMutation,
        _variables: LogOutUserMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_SECRET!);
        setUser(null);
      },
    }
  );

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 0,
        flexDirection: "row",
        justifyContext: "space-between",
        alignItems: "center",
        display: "flex",
      }}
    >
      {/* {(!user ||
        JSON.stringify(user?.roles) == JSON.stringify([Role.User])) && (
        <ColorButton
          color="secondary"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Zapisz się na zajęcia
        </ColorButton>
      )} */}
      {!user ? (
        <React.Fragment>
          <Tooltip title="Kliknij, aby się zalogować">
            <IconButton onClick={handleDialogOpen}>
              <PersonIcon color="primary" />
            </IconButton>
          </Tooltip>
          <UserDialog open={dialogOpen} handleClose={handleDialogClose} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Tooltip title="Otwórz panel użytkownika">
            <IconButton onClick={handleOpenUserMenu}>
              <CustomAvatar
                name={`${user.firstName} ${user.lastName}`}
                size="small"
                imgSrc={
                  user?.imgSrc &&
                  (process.env.NODE_ENV === "development"
                    ? `${process.env.REACT_APP_HOST}/images/${user.imgSrc}`
                    : `${process.env.REACT_APP_HOST}/public/images/${user.imgSrc}`)
                }
              />
            </IconButton>
          </Tooltip>
          <Typography
            variant="body2"
            color="primary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {user.firstName}
          </Typography>
          &nbsp;
          <Typography
            variant="body2"
            color="primary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {user.lastName}
          </Typography>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user.roles.includes(Role.User) && (
              <MenuItem onClick={() => navigate("/ustawienia")}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Ustawienia
              </MenuItem>
            )}
            {user.roles.includes(Role.Coach) && (
              <MenuItem onClick={() => navigate("/trener/zarzadzanie_grupami")}>
                <ListItemIcon>
                  <AddTaskIcon fontSize="small" />
                </ListItemIcon>
                Ustal zajęcia
              </MenuItem>
            )}
            {user.roles.includes(Role.Coach) && (
              <MenuItem onClick={() => navigate("/trener/zajecia")}>
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                Moje zajęcia
              </MenuItem>
            )}
            {user.roles.includes(Role.Trainee) && (
              <MenuItem onClick={() => navigate("/uczen/zajecia")}>
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                Moje zajęcia
              </MenuItem>
            )}
            {user.roles.includes(Role.Trainee) && (
              <MenuItem onClick={() => navigate("/uczen/platnosci")}>
                <ListItemIcon>
                  <PaymentIcon fontSize="small" />
                </ListItemIcon>
                Płatności
              </MenuItem>
            )}
            <MenuItem sx={{ justifyContent: "center" }}>
              <ColorButton
                variant="contained"
                color="error"
                onClick={() => logOut({})}
              >
                Wyloguj
              </ColorButton>
            </MenuItem>
          </Menu>
          {logoutStatus && (
            <CustomDialog
              title="Nieoczekiwany błąd"
              content={errorMessage}
              onClose={() => setLogoutStatus("")}
            />
          )}
        </React.Fragment>
      )}
      {/* <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
        }}
      >
        <Paper>
          <Toolbar />
          <MenuList>
            {items.map(({ name, path }, i) => (
              <Link
                key={i}
                href={path}
                underline="none"
                color="primary.contrastText"
              >
                <MenuItem>
                  <ListItemText sx={{ textAlign: "center" }}>
                    {name}
                  </ListItemText>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Paper>
      </Drawer> */}
    </Box>
  );
};

export default UserButtonsBox;
