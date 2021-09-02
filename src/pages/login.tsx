import { Box, Button, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import router from "next/router";
import { object, string } from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Alert from "@material-ui/lab/Alert";
import { setMessage } from "../redux/UI";
import { setUserInfo, login } from "../redux/UI";

export default function Login() {
  const UI = useSelector((state: RootState) => state.UI);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} md={3}>
        <Paper elevation={5}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={object({
              email: string()
                .required("Must not be empty")
                .email("Invalid Email address, Please check"),
              password: string().required("Must not be empty"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const response = axios
                  .post(
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
                  )
                  .then((res) => {
                    dispatch(login());
                    dispatch(setUserInfo(res.data));
                    console.log(res);
                    router.push("/");
                  })
                  .catch((err) => {
                    dispatch(setMessage("Email or Password are uncorrect!"));
                  });
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {UI.error.message && (
                  <div className="box">
                    <Alert severity="error">{UI.error.message}</Alert>
                  </div>
                )}
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
