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
import LoadingScreen from "../../lib/LoadingScreen";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "..";
import CustomAlert from "../../lib/CustomAlert";

interface LogInDialogProps {
  open: boolean;
  handleClose: () => void;
  setActive: (name: string) => void;
}

const defaultValues = {
  email: "",
  password: "",
};

const invalidEmailOrPasswordError = "Nieprawidłowy e-mail lub hasło.";

const LogInDialog: React.FC<LogInDialogProps> = (props) => {
  const { open, handleClose, setActive } = props;
  const { isLogInLoading, logInError, logIn } = useAuth();

  return isLogInLoading ? (
    <LoadingScreen />
  ) : (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Zaloguj się</DialogTitle>
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

            const { email, password } = values;

            logIn({
              input: {
                email: email,
                password: password,
              },
            });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Nieprawidłowy email")
              .required("Wymagane"),
            password: Yup.string().required("Wymagane"),
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
                  {logInError === "Invalid email or password" ? (
                    <CustomAlert
                      severity="error"
                      msg={invalidEmailOrPasswordError}
                    />
                  ) : (
                    logInError && (
                      <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
                    )
                  )}
                  <ColorButton
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ my: 2 }}
                  >
                    Zaloguj
                  </ColorButton>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={() => setActive("register")}
                  >
                    Nie masz jeszcze konta? Zarejestruj się
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

export default LogInDialog;
