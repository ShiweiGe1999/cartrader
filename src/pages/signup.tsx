import { Box, Button, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} md={3}>
        <Paper elevation={5}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const response = axios.post("/api/signup", {
                  email: values.email,
                  password: values.password,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  birthday: values.birthday,
                  phone: values.phone,
                }, {
                  headers: {
                    "Content-Type": 'application/json'
                  }
                }).then(res => {
                  console.log(res.data)
                }).catch(err => {
                  console.log(err)
                })
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <div className="box">
                  <Field
                    component={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                  />
                </div>
                <div className="box">
                  <Field
                    component={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                  />
                </div>
                <div className="box">
                  <Field
                    component={TextField}
                    name="birthday"
                    label="Birthday"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </div>
                <div className="box">
                  <Field
                    component={TextField}
                    name="phone"
                    label="Mobile"
                    type="number"
                    fullWidth
                  />
                </div>
                <div className="box">
                  <Field
                    component={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                  />
                </div>
                <div className="box">
                  <Field
                    component={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                  />
                </div>
                <div className="box">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
