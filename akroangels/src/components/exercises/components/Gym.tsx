import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth";
import { Role } from "../../../generated/graphql";
import { ColorButton, PhotoCard, CustomAvatar, ButtonBox } from "../../lib";
import GroupList from "./GroupList";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PriceList from "./PriceList";
import { useTheme, useMediaQuery } from "@mui/material";

interface GymProps {
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
    gym: {
      id: string;
      name: string;
      room: string;
      gymSrc: string;
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

const Gym: React.FC<GymProps> = (props) => {
  const { visible, selectedGroup, item, nextStep, prevStep, selectGroup } =
    props;
  const { facebookUrl, instagramUrl, user: coach, gym, groups } = item;
  const { firstName, lastName, imgSrc } = coach;
  const { name, room, roomSrc, mapSrc, priceListSrc } = gym;
  const { user } = useAuth();
  const [selected, setSelected] = useState<boolean>(false);
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              imgSrc:
                roomSrc &&
                (process.env.NODE_ENV === "development"
                  ? `${process.env.REACT_APP_HOST}/images/${roomSrc}`
                  : `${process.env.REACT_APP_HOST}/public/images/${roomSrc}`),
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
            imgSrc={
              imgSrc &&
              (process.env.NODE_ENV === "development"
                ? `${process.env.REACT_APP_HOST}/images/${imgSrc}`
                : `${process.env.REACT_APP_HOST}/public/images/${imgSrc}`)
            }
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
          pt: lgScreen ? "0 !important" : undefined,
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
          imgSrc={
            priceListSrc &&
            (process.env.NODE_ENV === "development"
              ? `${process.env.REACT_APP_HOST}/images/${priceListSrc}`
              : `${process.env.REACT_APP_HOST}/public/images/${priceListSrc}`)
          }
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

export default Gym;
