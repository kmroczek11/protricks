import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ColorButton, CustomAlert, LoadingScreen } from "../../lib";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  useForgotPasswordMutation,
} from "../../../generated/graphql";
import { resetPasswordSuccessMessage } from "../../../translations/pl/errorMessages";
import { useClient } from "../providers/ClientProvider";

interface LogInDialogProps {
  open: boolean;
  handleClose: () => void;
}

const defaultValues = {
  email: "",
}

const ForgotPasswordDialog: React.FC<LogInDialogProps> = (props) => {
  const { open, handleClose } = props;
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<string>("");
  const { accessClient } = useClient()

  const { isLoading, mutate } = useForgotPasswordMutation<Error>(
    accessClient!,
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setForgotPasswordStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: ForgotPasswordMutation,
        _variables: ForgotPasswordMutationVariables,
        _context: unknown
      ) => {
        setForgotPasswordStatus(data.forgotPassword.msg);
      },
    }
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Nie pamiętam hasła</DialogTitle>
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
        <DialogContentText id="forgot-password-dialog-descdription">
          W celu wygenerowania nowego hasła, prosimy podać adres e-mail konta,
          do którego dostęp chcesz odzyskać
        </DialogContentText>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            const { email } = values;

            mutate({
              input: {
                email: email,
              },
            });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Nieprawidłowy email")
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
                  {forgotPasswordStatus === "Success" ? (
                    <CustomAlert severity="success" msg={resetPasswordSuccessMessage} />
                  ) : (
                    forgotPasswordStatus && (
                      <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
                    )
                  )}
                  <ColorButton
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ my: 2 }}
                  >
                    Wyślij
                  </ColorButton>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
