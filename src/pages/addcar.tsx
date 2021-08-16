import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { Fragment } from "react";
import { Paper } from "@material-ui/core";


const AddCar = () => {


  return (
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
          onSubmit={() => {}}
        >
          {({ isSubmitting, values }) => {
            return (
              <Form>
                <Grid container spacing={3}>
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
                        <MenuItem value="gas" >
                          <em>Regular Gas</em>
                        </MenuItem>
                        <MenuItem value="diexel" >
                          <em>Diexel</em>
                        </MenuItem>
                        <MenuItem value="electric" >
                          <em>Electrical</em>
                        </MenuItem>

                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Paper>
  );
};

export default AddCar;
