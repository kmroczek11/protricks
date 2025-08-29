import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  SendEmailToGroupMutation,
  SendEmailToGroupMutationVariables,
  useSendEmailToGroupMutation,
} from "../../../../../generated/graphql";
import LoadingScreen from "../../../../lib/LoadingScreen";
import { ColorButton, CustomAlert } from "../../../../lib";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../auth/providers/AuthProvider";
import { useClient } from "../../../../auth/providers/ClientProvider";

const defaultValues = {
  subject: "",
  message: "",
};

interface SendEmailToGroupDialogProps {
  groupId: string;
  groupName: string;
  open: boolean;
  handleClose: () => void;
  onClose?: () => void;
}

const successMessage = "Wiadomość została wysłana pomyślnie.";

const SendEmailToGroupDialog: React.FC<SendEmailToGroupDialogProps> = (
  props
) => {
  const { groupId, groupName, open, handleClose, onClose } = props;
  const [sendEmailToGroupStatus, setSendEmailToGroupStatus] =
    useState<string>("");
  const { user } = useAuth();
  const { accessClient } = useClient()

  const { isLoading, mutate } = useSendEmailToGroupMutation<Error>(
    accessClient!,
    {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setSendEmailToGroupStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: SendEmailToGroupMutation,
        _variables: SendEmailToGroupMutationVariables,
        _context: unknown
      ) => {
        setSendEmailToGroupStatus(data.sendEmailToGroup.msg);
      },
    }
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle>{`Wyślij e-mail do grupy ${groupName}`}</DialogTitle>
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
      <DialogContent dividers>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            const { subject, message } = values;

            mutate({
              input: {
                groupId,
                sender: `${user?.firstName} ${user?.lastName}`,
                from: user?.emailPlain,
                subject,
                message,
              },
            });
          }}
          validationSchema={Yup.object().shape({
            subject: Yup.string().required("Wymagane"),
            message: Yup.string().required("Wymagane"),
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
              setFieldValue,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Autocomplete
                      id="subject-free-solo"
                      freeSolo
                      selectOnFocus
                      handleHomeEndKeys
                      includeInputInList
                      value={values.subject}
                      onChange={(e, value) =>
                        setFieldValue("subject", value! || "")
                      }
                      onInputChange={(e, value) =>
                        setFieldValue("subject", value! || "")
                      }
                      onOpen={handleBlur}
                      onBlur={handleBlur}
                      clearText="Wyczyść"
                      options={[
                        "Odwołanie zajęć",
                        "Przesunięcie zajęć",
                        "Nieobecność",
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="subject-input"
                          name="subject"
                          label="Temat"
                          type="text"
                          helperText={
                            errors.subject && touched.subject && errors.subject
                          }
                          error={
                            errors.subject && touched.subject ? true : false
                          }
                          fullWidth
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="message-input"
                      name="message"
                      label="Treść wiadomości"
                      type="text"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.subject && touched.subject && errors.subject
                      }
                      error={errors.subject && touched.subject ? true : false}
                      multiline
                      rows={4}
                      fullWidth
                      required
                    />
                  </Grid>
                  {sendEmailToGroupStatus === "Success" ? (
                    <CustomAlert severity="success" msg={successMessage} />
                  ) : (
                    sendEmailToGroupStatus && (
                      <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
                    )
                  )}
                  <ColorButton
                    type="submit"
                    variant="contained"
                    color="success"
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

export default SendEmailToGroupDialog;
