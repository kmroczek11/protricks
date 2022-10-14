import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import UserAvatar from "./components/UserAvatar";
import { useAuth } from "../auth";

const UserPanel: React.FC = () => {
  const { user } = useAuth();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const items = [
    { name: "Email", value: user?.email },
    { name: "Hasło", value: "********" },
  ];
  const [selected, setSelected] = useState<string>("");

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: { xs: 0, md: 10 },
        py: 8,
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserAvatar
          name={fullName}
          size="large"
          imgSrc={
            user?.imgSrc &&
            `${process.env.REACT_APP_HOST}/images/${user?.imgSrc}`
          }
          BadgeIcon={AddAPhotoIcon}
        />
        <Typography
          gutterBottom
          variant="h1"
          color="secondary.main"
          component="div"
          sx={{ p: 5 }}
        >
          {fullName}
        </Typography>
      </Grid>
      <Container maxWidth="lg">
        <List
          subheader={
            <ListSubheader sx={{ fontSize: 40, p: 2 }}>
              Ogólne ustawienia konta
            </ListSubheader>
          }
        >
          <Divider />
          {items.map(({ name, value }) => (
            <React.Fragment>
              <ListItemButton
                role={undefined}
                dense
                onClick={() => setSelected(name)}
              >
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  }
                  sx={{ p: 2 }}
                >
                  <ListItemText primary={name} />
                  <ListItemText primary={value} />
                </ListItem>
              </ListItemButton>
              <Collapse in={name === selected} timeout="auto" unmountOnExit>
                {name === "Email" && <EmailForm />}
                {name === "Hasło" && <PasswordForm />}
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Grid>
  );
};

export default UserPanel;
