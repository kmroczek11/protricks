import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { ColorButton, StyledTextField } from "../../lib";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import plLocale from "date-fns/locale/pl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type FormValuesType = {
  birthDate: string;
  traineeName: string;
  parentPhone: string;
  parentEmail: string;
  feedback: string;
  accepted: boolean;
};

const defaultValues = {
  birthDate: "",
  traineeName: "",
  parentPhone: "",
  parentEmail: "",
  feedback: "",
  accepted: false,
};

interface TraineeFormProps {
  visible: boolean;
  nextStep: () => void;
  prevStep: () => void;
  setExtraData: (data: any) => void;
}

interface FormObserverProps {
  setFormValues: (values: FormValuesType) => void;
}

const FormObserver: React.FC<FormObserverProps> = (props) => {
  const { setFormValues } = props;
  const { values } = useFormikContext<FormValuesType>();

  useEffect(() => {
    setFormValues(values);
  }, [values]);

  return null;
};

const TraineeForm: React.FC<TraineeFormProps> = (props) => {
  const { visible, nextStep, prevStep, setExtraData } = props;
  const [formValues, setFormValues] = useState<FormValuesType>(defaultValues);
  const [form, setForm] = useState<HTMLFormElement | null>(null);

  useEffect(() => {
    form?.scrollIntoView();
  }, [form]);

  return visible ? (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      <Formik
        initialValues={formValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setExtraData(values);
          nextStep();
        }}
        validationSchema={Yup.object().shape({
          birthDate: Yup.date()
            .typeError("Nieprawidłowa data")
            .required("Wymagane"),
          traineeName: Yup.string().required("Wymagane"),
          parentPhone: Yup.string().min(7).required(),
          parentEmail: Yup.string()
            .email("Nieprawidłowy email")
            .required("Wymagane"),
          feedback: Yup.string(),
          accepted: Yup.bool()
            .oneOf([true], "Wymagana zgoda")
            .required("Wymagana zgoda"),
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
            <Grid item xs={12}>
              <Form
                ref={setForm}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormObserver setFormValues={setFormValues} />
                <Grid
                  container
                  maxWidth="sm"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      locale={plLocale}
                    >
                      <DatePicker
                        mask="__.__.____"
                        label="Data urodzenia wychowanka"
                        value={values.birthDate}
                        onChange={(value) =>
                          setFieldValue("birthDate", value, true)
                        }
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            id="birthDate-input"
                            name="birthDate"
                            type="text"
                            helperText={
                              errors.birthDate &&
                              touched.birthDate &&
                              errors.birthDate
                            }
                            error={
                              errors.birthDate && touched.birthDate
                                ? true
                                : false
                            }
                            fullWidth
                            required
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      id="traineeName-input"
                      name="traineeName"
                      label="Imię i nazwisko wychowanka"
                      type="text"
                      value={values.traineeName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.traineeName &&
                        touched.traineeName &&
                        errors.traineeName
                      }
                      error={
                        errors.traineeName && touched.traineeName ? true : false
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PhoneInput
                      inputProps={{
                        variant: "standard",
                        name: "parentPhone",
                        required: true,
                      }}
                      inputStyle={{
                        width: "100%",
                      }}
                      specialLabel="Numer telefonu rodzica"
                      country={"pl"}
                      value={values.parentPhone}
                      onChange={(phone) => (values.parentPhone = phone)}
                      onBlur={handleBlur}
                      isValid={(value) => {
                        if (value.length > 7) {
                          return true;
                        } else {
                          return "Nieprawidłowy numer telefonu";
                        }
                      }}
                      onlyCountries={["pl", "de", "gb"]}
                      localization={{
                        pl: "Polska",
                        de: "Niemcy",
                        gb: "Wielka Brytania",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      id="parentEmail-input"
                      name="parentEmail"
                      label="E-mail rodzica"
                      type="email"
                      value={values.parentEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.parentEmail &&
                        touched.parentEmail &&
                        errors.parentEmail
                      }
                      error={
                        errors.parentEmail && touched.parentEmail ? true : false
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="feedback-free-solo"
                      freeSolo
                      selectOnFocus
                      handleHomeEndKeys
                      includeInputInList
                      value={values.feedback}
                      onChange={(e, value) =>
                        setFieldValue("feedback", value! || "")
                      }
                      onInputChange={(e, value) =>
                        setFieldValue("feedback", value! || "")
                      }
                      onOpen={handleBlur}
                      onBlur={handleBlur}
                      clearText="Wyczyść"
                      options={[
                        "Kontynuacja zajęć",
                        "Wyszukiwarka Google",
                        "Facebook",
                        "YouTube",
                        "Instagram",
                        "TikTok",
                        "Z pokazu",
                        "Z polecenia",
                      ]}
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          id="feedback-input"
                          name="feedback"
                          label="Skąd dowiedzieli się Państwo o zajęciach?"
                          type="text"
                          helperText={
                            errors.feedback &&
                            touched.feedback &&
                            errors.feedback
                          }
                          error={
                            errors.feedback && touched.feedback ? true : false
                          }
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      id="accepted-checkbox"
                      name="accepted"
                      label={
                        <div>
                          <span>
                            Wyrażam zgodę na przetwarzanie moich danych
                            osobowych. Więcej informacji znajdziesz{" "}
                            <a
                              href="/static/documents/umowa.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              tutaj
                            </a>
                            .
                          </span>
                        </div>
                      }
                      onChange={handleChange}
                      sx={{
                        "& .MuiFormControlLabel-label, .MuiSvgIcon-root": {
                          color: "primary.main",
                        },
                      }}
                      control={<Checkbox checked={values.accepted} required />}
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ColorButton
                    variant="outlined"
                    color="primary"
                    onClick={prevStep}
                  >
                    Cofnij
                  </ColorButton>
                  <ColorButton type="submit" variant="outlined" color="primary">
                    Dalej
                  </ColorButton>
                </Box>
              </Form>
            </Grid>
          );
        }}
      </Formik>
    </Grid>
  ) : null;
};

export default TraineeForm;
