import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ColorButton, StyledTextField } from "../../lib";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

type FormValuesType = {
  age: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  feedback: string;
};

const defaultValues = {
  age: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  feedback: "",
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
    <Formik
      initialValues={formValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(true);
        setExtraData(values);
        nextStep();
      }}
      validationSchema={Yup.object().shape({
        age: Yup.number().required("Wymagane"),
        parentName: Yup.string().required("Wymagane"),
        parentPhone: Yup.string().min(7).required(),
        parentEmail: Yup.string()
          .email("Nieprawidłowy email")
          .required("Wymagane"),
        feedback: Yup.string().required("Wymagane"),
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
          <Form ref={setForm} onSubmit={handleSubmit}>
            <FormObserver setFormValues={setFormValues} />
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing={2}
            >
              <Grid item>
                <StyledTextField
                  id="age-input"
                  name="age"
                  label="Wiek dziecka"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.age && touched.age && errors.age}
                  error={errors.age && touched.age ? true : false}
                  required
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                />
              </Grid>
              <Grid item>
                <StyledTextField
                  id="parentName-input"
                  name="parentName"
                  label="Imię i nazwisko rodzica"
                  type="text"
                  value={values.parentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.parentName && touched.parentName && errors.parentName
                  }
                  error={errors.parentName && touched.parentName ? true : false}
                  required
                />
              </Grid>
              <Grid item>
                <PhoneInput
                  inputProps={{
                    variant: "standard",
                    name: "parentPhone",
                    required: true
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
                  inputStyle={{
                    width: window.innerWidth < 600 ? 250 : 600,
                  }}
                  onlyCountries={["pl", "de", "gb"]}
                  localization={{
                    pl: "Polska",
                    de: "Niemcy",
                    gb: "Wielka Brytania",
                  }}
                />
              </Grid>
              <Grid item>
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
                  required
                />
              </Grid>
              <Grid item>
                <StyledTextField
                  select
                  id="feedback-select"
                  name="feedback"
                  label="Skąd dowiedzieli się Państwo o zajęciach?"
                  type="text"
                  value={values.feedback}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.feedback && touched.feedback && errors.feedback
                  }
                  error={errors.feedback && touched.feedback ? true : false}
                  required
                >
                  <MenuItem value="Wyszukiwarka Google">
                    Wyszukiwarka Google
                  </MenuItem>
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="Z polecenia">Z polecenia</MenuItem>
                  <MenuItem value="Kontynuacja zajęć">
                    Kontynuacja zajęć
                  </MenuItem>
                </StyledTextField>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
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
        );
      }}
    </Formik>
  ) : null;
};

export default TraineeForm;
