import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ColorButton, CustomAlert, LoadingScreen } from "../../lib";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import useLogInUser from "../hooks/useLogInUser";
import { invalidEmailOrPasswordMessage } from "../../../translations/pl/errorMessages";
import { useClient } from "../providers/ClientProvider";
import { useAuth } from "../providers/AuthProvider";
import { useTokens } from "../providers/TokensProvider";

interface LogInDialogProps {
  open: boolean;
  handleClose: () => void;
  setActive: (name: string) => void;
}

const defaultValues = {
  emailPlain: "",
  password: "",
};

const LogInDialog: React.FC<LogInDialogProps> = (props) => {
  const { open, handleClose, setActive } = props;
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [logInError, setLogInError] = useState<string>("");
  const { setUserId, getUserRefetch } = useAuth()
  const { getAccessTokenRefetch } = useTokens()
  const { client } = useClient()

  const { isLogInLoading, logIn } = useLogInUser(
    client!,
    setLogInError,
    (data) => {
      setUserId(data.logInUser.userId)
      getUserRefetch()
      getAccessTokenRefetch()
    }
  );

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

            const { emailPlain, password } = values;

            logIn({
              input: {
                emailPlain: emailPlain,
                password: password,
              },
            });
          }}
          validationSchema={Yup.object().shape({
            emailPlain: Yup.string()
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
                      id="emailPlain-input"
                      name="emailPlain"
                      label="E-mail"
                      type="email"
                      value={values.emailPlain}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.emailPlain && touched.emailPlain && errors.emailPlain}
                      error={errors.emailPlain && touched.emailPlain ? true : false}
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
                      msg={invalidEmailOrPasswordMessage}
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
                    sx={{ color: "#000", textTransform: "none" }}
                    onClick={() => setOpenForgotPasswordDialog(true)}
                  >
                    Nie pamiętam hasła
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: "#000", textTransform: "none" }}
                    onClick={() => setActive("register")}
                  >
                    Nie masz jeszcze konta? Zarejestruj się
                  </Button>
                  {openForgotPasswordDialog && (
                    <ForgotPasswordDialog
                      open={openForgotPasswordDialog}
                      handleClose={() => setOpenForgotPasswordDialog(false)}
                    />
                  )}
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
