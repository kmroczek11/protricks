import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ColorButton } from "../../lib";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "react-query";
import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from "../../../generated/graphql";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import LoadingScreen from "../../lib/LoadingScreen";
import CustomAlert from "../../lib/CustomAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useAuth } from "../../../context";
YupPassword(Yup); // extend yup

interface RegisterDialogProps {
  open: boolean;
  handleClose: () => void;
  setActive: (name: string) => void;
}

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const userExistsMessage = "Użytkownik o podanym adresie e-mail już istnieje.";

const RegisterDialog: React.FC<RegisterDialogProps> = (props) => {
  const { open, handleClose, setActive } = props;
  const queryClient = useQueryClient();
  const [user, setUser] = useAuth();
  const [registrationStatus, setRegistrationStatus] = useState<string>("");

  const { isLoading, error, mutate } = useRegisterUserMutation<Error>(
    graphqlRequestClient(),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setRegistrationStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: RegisterUserMutation,
        _variables: RegisterUserMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        localStorage.setItem("token", data.registerUser.token);
        console.log(data.registerUser.user)
        setUser(data.registerUser.user);
      },
    }
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Zarejestruj się</DialogTitle>
      {handleClose ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <DialogContent dividers>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            const { firstName, lastName, email, password } = values;

            mutate({
              input: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
              },
            });
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Wymagane"),
            lastName: Yup.string().required("Wymagane"),
            email: Yup.string()
              .email("Nieprawidłowy email")
              .required("Wymagane"),
            password: Yup.string()
              .min(8, "Hasło musi się składać z minimum 8 znaków")
              .minUppercase(1, "Hasło musi zawierać minimum 1 dużą literę")
              .minSymbols(1, "Hasło musi zawierać minimum 1 znak specjalny")
              .minNumbers(1, "Hasło musi zawierać minimum 1 cyfrę")
              .required("Wymagane"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  spacing={2}
                >
                  <Grid item>
                    <TextField
                      id="firstname-input"
                      name="firstName"
                      label="Imię"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.firstName &&
                        touched.firstName &&
                        errors.firstName
                      }
                      error={
                        errors.firstName && touched.firstName ? true : false
                      }
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="lastname-input"
                      name="lastName"
                      label="Nazwisko"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.lastName && touched.lastName && errors.lastName
                      }
                      error={errors.lastName && touched.lastName ? true : false}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="email-input"
                      name="email"
                      label="E-mail"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}
                      error={errors.email && touched.email ? true : false}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="password-input"
                      name="password"
                      label="Hasło"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                      error={errors.password && touched.password ? true : false}
                      required
                    />
                  </Grid>
                  {registrationStatus === "User already exists" ? (
                    <CustomAlert severity="error" msg={userExistsMessage} />
                  ) : (
                    registrationStatus && (
                      <CustomAlert severity="error" msg="Nieoczekiwany błąd" />
                    )
                  )}
                  <ColorButton
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ my: 2 }}
                    disabled={isSubmitting}
                  >
                    Zarejestruj
                  </ColorButton>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={() => setActive("login")}
                  >
                    Masz już konto? Zaloguj się
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
