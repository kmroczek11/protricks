import React, { useRef } from "react";
import { useState } from "react";
import Cities from "./Cities";
import City from "./City";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  GetAllCitiesQuery,
  useGetAllCitiesQuery,
} from "../../../generated/graphql";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import PhotoCardsLoader from "../../lib/PhotoCardsLoader";
import TraineeForm from "./TraineeForm";
import Paperwork from "./Paperwork";
import {
  CreateTraineeMutation,
  CreateTraineeMutationVariables,
  useCreateTraineeMutation,
} from "../../../generated/graphql";
import CustomDialog from "../../lib/CustomDialog";
import { useAuth } from "../../../context";

const logInMessage = `Aby móc zapisać się na zajęcia, 
konieczne jest posiadanie konta na naszej stronie. 
Jeśli jeszcze go nie posiadasz, utwórz je, klikając ikonkę w prawym górnym rogu.
Jeśli już je założyłeś, zaloguj się, również klikając tę samą ikonkę.`;

const limitReachedMessage = `Niestety, w danej grupie osiągnięto już maksymalną liczbę uczestników. Proszę wybrać inną grupę.`;

const successMessage = `Pomyślnie zapisano do grupy. Aby wyświetlić najbliższe zajęcia, otwórz panel użytkownika, a następnie wybierz zakładkę 'Moje zajęcia'.`;

const MultistepForm: () => JSX.Element | null = () => {
  const [step, setStep] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [user, setUser] = useAuth();
  const [selectedGroup, setSelectedGroup] = useState<number>();
  const [registrationStatus, setRegistrationStatus] = useState<string>("");
  const [extraData, setExtraData] = useState<any>();

  const {
    data,
    isLoading: citiesLoading,
    error,
    refetch,
  } = useGetAllCitiesQuery<GetAllCitiesQuery, Error>(graphqlRequestClient(), {});

  const { isLoading: creatingTraineeLoading, mutate } =
    useCreateTraineeMutation<Error>(graphqlRequestClient(), {
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
        localStorage.setItem("token", data.createTrainee.token);
        setUser(data.createTrainee.user);
      },
    });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const joinGroup = () => {
    if (user) {
      const { age, parentName, parentPhone, parentEmail, feedback } = extraData;
      mutate({
        input: {
          userId: user.id,
          groupId: selectedGroup!,
          age: age,
          parentName: parentName,
          parentPhone: `+${parentPhone}`,
          parentEmail: parentEmail,
          feedback: feedback,
        },
      });
      setStep(0);
    } else {
      setRegistrationStatus("Not logged in");
    }
  };

  const renderStep = () => {
    return (
      <>
        {citiesLoading ? (
          <PhotoCardsLoader />
        ) : (
          <Cities
            visible={step == 0 ? true : false}
            items={
              data?.cities?.map((city) => ({
                id: city.id,
                name: city.name,
                imgSrc: `${process.env.REACT_APP_ENDPOINT}/uploads/${city.citySrc}`,
              }))!
            }
            onClick={setName}
            nextStep={nextStep}
          />
        )}
        {data?.cities && name && (
          <City
            visible={step == 1 ? true : false}
            selectedGroup={selectedGroup}
            item={data?.cities?.find((city) => city.name === name)!}
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
      </>
    );
  };

  return (
    <Box sx={{ backgroundColor: "secondary.main", py: 10 }}>
      <Container>{renderStep()}</Container>
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
          content={successMessage}
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
