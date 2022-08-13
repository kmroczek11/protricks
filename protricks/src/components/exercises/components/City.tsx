import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAuth } from "../../auth";
import { Role } from "../../../generated/graphql";
import { ColorButton, PhotoCard, CustomList } from "../../lib";
import CustomAvatar from "../../lib/CustomAvatar";
import GroupList from "./GroupList";
import Map from "./Map";

const txt = [
  {
    name: `Jeśli osoba nie miała wcześniej większego kontaktu z sportem polecamy
    zacząć od grupy wprowadzającej, Ukształtuje odpowiednią siłę i gibkośc
    oraz zostanie wprowadzona do pięknego świata akrobatyki.`,
  },
  {
    name: `Grupę podstawową polecamy osobą, które miały wcześniej kontakt z
        sportem. Ćwiczymy tutaj między innymi takie elementy jak stanie na rękach,
        przewroty, gwiazdy czy przejścia.`,
  },
  {
    name: `Grupa średnio-zaawansowana jest dla osób, które ćwiczyły już wcześniej
        akrobatykę. Jeśli takie elementy jak rundak, stanie na rękach, przejścia w
        przód i w tył nie stanowią dla niej większego problemu,to idealne
        sprawdzi się w tej grupie.`,
  },
];

interface CityProps {
  visible: boolean;
  selectedGroup: string | undefined;
  item: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      imgSrc: string;
    };
    city: {
      id: string;
      name: string;
      room: string;
      citySrc: string;
      roomSrc: string;
      mapSrc: string;
    };
    groups?: Array<{
      id: string;
      name: string;
      exercises?: Array<{
        id: string;
        day: any;
        start: string;
        end: string;
      }> | null;
    }> | null;
  };
  nextStep: () => void;
  prevStep: () => void;
  selectGroup: (id: string) => void;
}

const City: React.FC<CityProps> = (props) => {
  const { visible, selectedGroup, item, nextStep, prevStep, selectGroup } =
    props;
  const { user: coach, city, groups } = item;
  const { firstName, lastName, imgSrc } = coach;
  const { name, room, roomSrc, mapSrc } = city;
  const { user } = useAuth();
  const [selected, setSelected] = useState<boolean>(false);

  return visible ? (
    <React.Fragment>
      <Typography variant="h1" color="primary.main" align="center">
        {name}
      </Typography>
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Typography
            variant="h2"
            color="primary.main"
            align="center"
            gutterBottom
          >
            Sala
          </Typography>
          <PhotoCard
            item={{
              name: room,
              imgSrc: `${process.env.REACT_APP_ENDPOINT}/uploads/${roomSrc}`,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h2"
            color="primary.main"
            align="center"
            gutterBottom
          >
            Lokalizacja
          </Typography>
          <iframe
            src={mapSrc}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            color="primary.main"
            align="center"
            gutterBottom
          >
            Trener
          </Typography>
          <CustomAvatar
            name={`${firstName} ${lastName}`}
            size="large"
            imgSrc={imgSrc!}
          />
          <Typography
            variant="subtitle1"
            color="primary.main"
            align="center"
            gutterBottom
          >
            {`${firstName} ${lastName}`}
          </Typography>
        </Grid>
      </Grid>
      {![Role.Coach, Role.Trainee].some((e) => user?.roles?.includes(e)) ? (
        <React.Fragment>
          <Typography
            variant="h1"
            color="primary.main"
            align="center"
            gutterBottom
          >
            Grafik
          </Typography>
          <Typography
            variant="h2"
            color="primary.main"
            align="center"
            gutterBottom
          >
            Aby się zapisać, wybierz grupę
          </Typography>
          <GroupList
            groups={groups!}
            selectedGroup={selectedGroup}
            selectGroup={selectGroup}
            setSelected={setSelected}
          />
          <Typography
            variant="h1"
            color="secondary.contrastText"
            align="center"
            gutterBottom
          >
            Jak wybrać odpowiednią grupę?
          </Typography>
          <CustomList items={txt} variant="secondary" />
        </React.Fragment>
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <ColorButton variant="outlined" color="primary" onClick={prevStep}>
          Cofnij
        </ColorButton>
        <ColorButton
          variant="outlined"
          color="primary"
          disabled={selected ? false : true}
          onClick={nextStep}
        >
          Dalej
        </ColorButton>
      </Box>
    </React.Fragment>
  ) : null;
};

export default City;
