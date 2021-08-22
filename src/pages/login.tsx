import { Box, Button, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import router from "next/router";
import { object, string } from "yup";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} md={6}>
        <Paper elevation={5}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const response = axios.post(
                  "/api/login",
                  {
                    email: values.email,
                    password: values.password,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                ).then(res => {
                  console.log(res)
                })
                setSubmitting(false);
            
              }, 400);

            }}
          >
            {({ isSubmitting }) => (
              <Form>
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
                    Login
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
