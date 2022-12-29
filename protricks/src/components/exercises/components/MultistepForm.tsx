import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Cities from "./Cities";
import City from "./City";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  GetAllCoachesQuery,
  useGetAllCoachesQuery,
} from "../../../generated/graphql";
import accessClient from "../../../graphql/clients/accessClient";
import TraineeForm from "./TraineeForm";
import Paperwork from "./Paperwork";
import {
  CreateTraineeMutation,
  CreateTraineeMutationVariables,
  useCreateTraineeMutation,
} from "../../../generated/graphql";
import { useAuth } from "../../auth";
import { useLocation } from "react-router-dom";
import { CustomDialog, PhotoCardsLoader } from "../../lib";
import {
  limitReachedMessage,
  logInMessage,
  joinGroupSuccessMessage,
} from "../../../translations/pl/errorMessages";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const MultistepForm: () => JSX.Element | null = () => {
  const [step, setStep] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const { user, setUser } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [registrationStatus, setRegistrationStatus] = useState<string>("");
  const [extraData, setExtraData] = useState<any>();

  const {
    data,
    isLoading: coachesLoading,
    error,
    refetch,
  } = useGetAllCoachesQuery<GetAllCoachesQuery, Error>(accessClient(), {});

  const { isLoading: creatingTraineeLoading, mutate } =
    useCreateTraineeMutation<Error>(accessClient(), {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setRegistrationStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: CreateTraineeMutation,
        _variables: CreateTraineeMutationVariables,
        _context: unknown
      ) => {
        setRegistrationStatus("Success");
        setUser(data.createTrainee.user);
      },
    });

  const nextStep = () => {
    if (!user) {
      setRegistrationStatus("Not logged in");
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const joinGroup = () => {
    const { birthDate, traineeName, parentPhone, parentEmail, feedback } =
      extraData;

    mutate({
      input: {
        userId: user?.id!,
        groupId: selectedGroup!,
        birthDate: birthDate.toISOString().split("T")[0],
        traineeName,
        parentPhone: `+${parentPhone}`,
        parentEmail,
        feedback,
      },
    });

    setStep(0);
  };

  const renderStep = () => {
    return (
      <React.Fragment>
        {coachesLoading ? (
          <PhotoCardsLoader />
        ) : (
          <Cities
            visible={step == 0 ? true : false}
            items={
              data?.coaches?.map(({ city }) => ({
                id: city.id,
                name: city.name,
                imgSrc: `${process.env.REACT_APP_HOST}/images/${city.citySrc}`,
              }))!
            }
            onClick={setName}
            nextStep={nextStep}
          />
        )}
        {data?.coaches && name && (
          <City
            visible={step == 1 ? true : false}
            selectedGroup={selectedGroup}
            item={data?.coaches?.find(({ city }) => city.name === name)!}
            nextStep={nextStep}
            prevStep={prevStep}
            selectGroup={setSelectedGroup}
          />
        )}
        <TraineeForm
          visible={step == 2 ? true : false}
          nextStep={nextStep}
          prevStep={prevStep}
          setExtraData={setExtraData}
        />
        <Paperwork
          visible={step == 3 ? true : false}
          nextStep={joinGroup}
          prevStep={prevStep}
        />
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ backgroundColor: "secondary.main", py: 10 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 5,
          }}
        >
          <Typography variant="h1" color="primary" gutterBottom>
            {step + 1} / 4
          </Typography>
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={step * 25}
              sx={{
                "& .MuiLinearProgress-colorPrimary": {
                  backgroundColor: "primary",
                },
                "& .MuiLinearProgress-barColorPrimary": {
                  backgroundColor: "green",
                },
              }}
            />
          </Box>
        </Box>
        {renderStep()}
      </Container>
      {registrationStatus === "Not logged in" ? (
        <CustomDialog
          title="Nie zalogowano"
          content={logInMessage}
          onClose={() => setRegistrationStatus("")}
        />
      ) : registrationStatus === "Limit reached" ? (
        <CustomDialog
          title="Brak miejsc w tej grupie"
          content={limitReachedMessage}
          onClose={() => setRegistrationStatus("")}
        />
      ) : registrationStatus === "Success" ? (
        <CustomDialog
          title="Dodano do grupy!"
          content={joinGroupSuccessMessage}
          onClose={() => setRegistrationStatus("")}
        />
      ) : (
        registrationStatus && (
          <CustomDialog
            title="Nieoczekiwany błąd"
            content={registrationStatus}
            onClose={() => setRegistrationStatus("")}
          />
        )
      )}
    </Box>
  );
};

export default MultistepForm;
