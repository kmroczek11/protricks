import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ColorButton } from "../../lib";
import Box from "@mui/material/Box";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import {
  useChangePasswordMutation,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "../../../generated/graphql";
import { useAuth } from "../../../context";
import LoadingScreen from "../../lib/LoadingScreen";
import CustomAlert from "../../lib/CustomAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const defaultValues = {
  oldPassword: "",
  newPassword: "",
};

const invalidPasswordMessage = "Nieprawidłowe hasło.";

const PasswordForm: React.FC = () => {
  const [user, setUser] = useAuth();
  const [changePasswordStatus, setChangePasswordPicStatus] =
    useState<string>("");

  const { isLoading, mutate } = useChangePasswordMutation<Error>(
    graphqlRequestClient(),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setChangePasswordPicStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: ChangePasswordMutation,
        _variables: ChangePasswordMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        localStorage.setItem("token", data.changePassword.token);
        setUser(data.changePassword.user);
      },
    }
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        const { oldPassword, newPassword } = values;

        mutate({
          input: {
            id: user?.id!,
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
        });
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().required("Wymagane"),
        newPassword: Yup.string()
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
              <Grid
                item
                sx={{
                  "& > :not(style)": { m: 1 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="old-password-input"
                  name="oldPassword"
                  label="Stare hasło"
                  type="password"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.oldPassword &&
                    touched.oldPassword &&
                    errors.oldPassword
                  }
                  error={
                    errors.oldPassword && touched.oldPassword ? true : false
                  }
                  required
                />
                <TextField
                  id="new-password-input"
                  name="newPassword"
                  label="Nowe hasło"
                  type="password"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.newPassword &&
                    touched.newPassword &&
                    errors.newPassword
                  }
                  error={
                    errors.newPassword && touched.newPassword ? true : false
                  }
                  required
                />
                <ColorButton type="submit" variant="outlined" color="secondary">
                  Zmień
                </ColorButton>
              </Grid>
              {changePasswordStatus === "Invalid password" ? (
                <CustomAlert severity="error" msg={invalidPasswordMessage} />
              ) : (
                changePasswordStatus && (
                  <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
                )
              )}
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PasswordForm;
