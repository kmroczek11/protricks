import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../../lib";
import Box from "@mui/material/Box";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import {
  useChangeEmailMutation,
  ChangeEmailMutation,
  ChangeEmailMutationVariables,
} from "../../../generated/graphql";
import { useAuth } from "../../../context";
import LoadingScreen from "../../lib/LoadingScreen";
import CustomAlert from "../../lib/CustomAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const defaultValues = {
  newEmail: "",
};

const EmailForm: React.FC = () => {
  const [user, setUser] = useAuth();
  const [changeEmailStatus, setChangeEmailPicStatus] = useState<string>("");

  const { isLoading, mutate } = useChangeEmailMutation<Error>(
    graphqlRequestClient(),
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setChangeEmailPicStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: ChangeEmailMutation,
        _variables: ChangeEmailMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        localStorage.setItem("token", data.changeEmail.token);
        setUser(data.changeEmail.user);
      },
    }
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log("ok");
        setSubmitting(true);

        const { newEmail } = values;

        mutate({
          input: {
            id: user?.id!,
            email: newEmail,
          },
        });
      }}
      validationSchema={Yup.object().shape({
        newEmail: Yup.string().email("Nieprawidłowy email").required("Wymagane"),
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
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="new-email-input"
                name="newEmail"
                label="Nowy email"
                type="email"
                value={values.newEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.newEmail && touched.newEmail && errors.newEmail}
                error={errors.newEmail && touched.newEmail ? true : false}
                required
              />
              {changeEmailStatus && (
                <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
              )}
              <ColorButton type="submit" variant="outlined" color="secondary">
                Zmień
              </ColorButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmailForm;
