import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import { ColorButton } from "../../lib";
import UserDialog from "../../auth/components/UserDialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Role } from "../../../generated/graphql";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CustomAvatar from "../../lib/CustomAvatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";

const UserButtonsBox: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user, setUser] = useAuth();
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 0,
        flexDirection: { xs: "column", md: "row" },
        justifyContext: "space-between",
        alignItems: "center",
        display: "flex",
      }}
    >
      {(!user || user?.roles == [Role.User]) && (
        <ColorButton
          color="secondary"
          variant="contained"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Zapisz się na zajęcia
        </ColorButton>
      )}
      {!user ? (
        <React.Fragment>
          <IconButton onClick={handleDialogOpen}>
            <PersonIcon />
          </IconButton>
          <UserDialog open={dialogOpen} handleClose={handleDialogClose} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Tooltip title="Otwórz ustawienia">
            <IconButton onClick={handleOpenUserMenu}>
              <CustomAvatar
                name={`${user.firstName} ${user.lastName}`}
                size="small"
                imgSrc={
                  user.imgSrc &&
                  `${process.env.REACT_APP_ENDPOINT}/uploads/${user.imgSrc}`
                }
              />
            </IconButton>
          </Tooltip>
          <Typography
            variant="body2"
            color="secondary.main"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {user.firstName}
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
            {user.roles.includes(Role.Trainee) && (
              <MenuItem onClick={() => navigate("/uczen")}>
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                Moje zajęcia
              </MenuItem>
            )}
            {user.roles.includes(Role.Coach) && (
              <MenuItem onClick={() => navigate("/trener")}>
                <ListItemIcon>
                  <AddTaskIcon fontSize="small" />
                </ListItemIcon>
                Ustal zajęcia
              </MenuItem>
            )}
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{ justifyContent: "center" }}
            >
              <ColorButton variant="contained" color="error" onClick={logout}>
                Wyloguj
              </ColorButton>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </Box>
  );
};

export default UserButtonsBox;
