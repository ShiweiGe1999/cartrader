import { Button, Container, Grid, Paper } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import UploadButtons from "../components/UploadButtons";

const AddCar = () => {
  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={5}>
          <Container>
            <Formik
              initialValues={{
                make: "",
                model: "",
                year: "",
                fuelType: "all",
                kilometers: "",
                details: "",
                price: "",
                photoUrl: "",
              }}
              onSubmit={(values) => {console.log(values)}}
            >
              {({ isSubmitting, values }) => {
                return (
                  <Form autoComplete="off">
                    <Grid container item spacing={3}>
                      <Grid item xs={6}>
                        <Field
                          component={TextField}
                          name="make"
                          type="text"
                          label="Make"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          component={TextField}
                          name="model"
                          type="text"
                          label="Model"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          component={TextField}
                          name="year"
                          type="number"
                          label="Year"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="fuelType">Fuel Type</InputLabel>
                          <Field
                            as={Select}
                            labelId="Fuel-Type"
                            label="FuelType"
                            name="fuelType"
                          >
                            <MenuItem value="all" disabled>
                              <em>Select Fuel Type</em>
                            </MenuItem>
                            <MenuItem value="gas">
                              <em>Regular Gas</em>
                            </MenuItem>
                            <MenuItem value="diexel">
                              <em>Diexel</em>
                            </MenuItem>
                            <MenuItem value="electric">
                              <em>Electrical</em>
                            </MenuItem>
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          component={TextField}
                          name="Mileage"
                          type="number"
                          label="Mileage"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          component={TextField}
                          name="price"
                          type="number"
                          label="Price"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          name="details"
                          type="text"
                          label="Description"
                          fullWidth
                        />
                      </Grid>
                      <Grid item container xs={12}>
                        <Grid item>
                          <Field
                            component={UploadButtons}
                            name="file"
                            label="Simple File Upload"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddCar;
