import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ColorButton } from "../../lib";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "react-query";
import {
  LoginUserMutation,
  LoginUserMutationVariables,
  useLoginUserMutation,
} from "../../../generated/graphql";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import LoadingScreen from "../../lib/LoadingScreen";
import CustomAlert from "../../lib/CustomAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context";

interface RegisterDialogProps {
  open: boolean;
  handleClose: () => void;
  setActive: (name: string) => void;
}

const defaultValues = {
  email: "",
  password: "",
};

const userDoesntExistMessage = "Podany użytkownik nie istnieje.";

const invalidEmailOrPasswordMessage = "Nieprawidłowy e-mail lub hasło.";

const LoginDialog: React.FC<RegisterDialogProps> = (props) => {
  const { open, handleClose, setActive } = props;
  const queryClient = useQueryClient();
  const [user, setUser] = useAuth();
  const [loginStatus, setLoginStatus] = useState<string>("");

  const { isLoading, error, mutate } = useLoginUserMutation<Error>(
    graphqlRequestClient(),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setLoginStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: LoginUserMutation,
        _variables: LoginUserMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        localStorage.setItem("token", data.loginUser.token);
        setUser(data.loginUser.user);
        handleClose();
      },
    }
  );

  return isLoading ? (
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

            mutate({
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
                  {loginStatus === "User doesn't exist" ? (
                    <CustomAlert severity="error" msg={userDoesntExistMessage} />
                  ) : loginStatus === "Invalid email or password" ? (
                    <CustomAlert
                      severity="error"
                      msg={invalidEmailOrPasswordMessage}
                    />
                  ) : (
                    loginStatus && (
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

export default LoginDialog;
