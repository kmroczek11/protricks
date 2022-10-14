import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAuth } from "../../auth";
import { Role } from "../../../generated/graphql";
import {
  ColorButton,
  PhotoCard,
  CustomList,
  CustomAvatar,
  ButtonBox,
} from "../../lib";
import GroupList from "./GroupList";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PriceList from "./PriceList";
import { useTheme, useMediaQuery } from "@mui/material";

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
    facebookUrl: string;
    instagramUrl: string;
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
      priceListSrc: string;
    };
    groups?: Array<{
      id: string;
      name: string;
      limit: number;
      trainees?: Array<{ id: string }> | null;
    }> | null;
  };
  nextStep: () => void;
  prevStep: () => void;
  selectGroup: (id: string) => void;
}

const City: React.FC<CityProps> = (props) => {
  const { visible, selectedGroup, item, nextStep, prevStep, selectGroup } =
    props;
  const { facebookUrl, instagramUrl, user: coach, city, groups } = item;
  const { firstName, lastName, imgSrc } = coach;
  const { name, room, roomSrc, mapSrc, priceListSrc } = city;
  const { user } = useAuth();
  const [selected, setSelected] = useState<boolean>(false);
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return visible ? (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h1" color="primary.main" align="center">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={5}>
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
              imgSrc: `${process.env.REACT_APP_HOST}/images/${roomSrc}`,
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
            imgSrc={imgSrc && `${process.env.REACT_APP_HOST}/images/${imgSrc}`}
          />
          <Typography
            variant="subtitle1"
            color="primary.main"
            align="center"
            gutterBottom
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <ButtonBox>
            <Tooltip title="Kliknij, aby otworzyć Facebook">
              <IconButton onClick={() => window.open(facebookUrl, "_blank")}>
                <FacebookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Kliknij, aby otworzyć Instagram">
              <IconButton onClick={() => window.open(instagramUrl, "_blank")}>
                <InstagramIcon />
              </IconButton>
            </Tooltip>
          </ButtonBox>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          pt: lgScreen ? "0 !important":undefined,
        }}
      >
        <Typography
          variant="h1"
          color="primary.main"
          align="center"
          gutterBottom
        >
          Cennik
        </Typography>
        <Typography
          variant="h2"
          color="primary.main"
          align="center"
          gutterBottom
        >
          Tak prezentuje się cennik w wybranym mieście
        </Typography>
        <PriceList
          imgSrc={`${process.env.REACT_APP_HOST}/images/${priceListSrc}`}
        />
      </Grid>
      {![Role.Coach, Role.Trainee].some((e) => user?.roles?.includes(e)) ? (
        <Grid item xs={12}>
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
            groups={
              groups?.map((group) => ({
                ...group,
                freePlaces: group.limit - group.trainees?.length!,
              }))!
            }
            selectedGroup={selectedGroup}
            selectGroup={selectGroup}
            setSelected={setSelected}
          />
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <CustomList
          title="Jak wybrać odpowiednią grupę?"
          items={txt}
          variant="secondary"
          size="lg"
          center
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
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
      </Grid>
    </Grid>
  ) : null;
};

export default City;
