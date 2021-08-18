import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import { number, object, string } from "yup";
import UploadButtons from "../components/UploadButtons";

const useStyles = makeStyles({
  Avatar: {
    display: "inline-block",
  },
  icon: {
    textAlign: "right",
  },
  borderError: {
    color: "#ff1744",
  },
});

const AddCar = () => {
  const classes = useStyles();
  const [files, setFiles] = useState<File[]>();
  const removeHandler = (index: number) => {
    setFiles((prev) => {
      return prev?.filter((e, i) => i != index);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files as ArrayLike<File>));
  };
  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
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
                files: [],
              }}
              validationSchema={object({
                make: string()
                  .max(15, "Must less than 15 characters")
                  .required("Required"),
                model: string()
                  .max(15, "Must less than 15 characters")
                  .required("Required"),
                year: number()
                  .min(1976, "Must be 1976 or later")
                  .max(
                    new Date().getFullYear() + 1,
                    `Newest Model must less than ${
                      new Date().getFullYear() + 1
                    }`
                  )
                  .required("Required"),

                fuelType: string().matches(/gas|diexel|electric/),
                kilometers: number().required("Required"),
                details: string().min(5).required("Required"),
                price: number().required("Required"),
              })}
              onSubmit={async (values, actions) => {
                const formData = new FormData();
                const config = {
                  headers: { "content-type": "multipart/form-data" },
                  onUploadProgress: (event: ProgressEvent) => {
                    console.log(
                      `Current progress:`,
                      Math.round((event.loaded * 100) / event.total)
                    );
                  },
                };
                formData.append("make", values.make);
                formData.append("model", values.model);
                formData.append("year", values.year);
                formData.append("fuelType", values.fuelType);
                formData.append("kilometers", values.kilometers);
                formData.append("details", values.details);
                formData.append("price", values.price);
                for (let file of values.files) {
                  formData.append("theFiles", file);
                }
                const response = await axios.post(
                  "/api/addCars",
                  formData,
                  config
                );
                console.log("response", response.data);

                actions.resetForm();
              }}
            >
              {({ isSubmitting, values, errors, setFieldValue }) => {
                return (
                  <Form>
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
                          <InputLabel
                            id="fuelType"
                            className={
                              errors.fuelType ? classes.borderError : undefined
                            }
                          >
                            Fuel Type
                          </InputLabel>
                          <Field
                            as={Select}
                            labelId="Fuel-Type"
                            label="FuelType"
                            name="fuelType"
                            className={
                              errors.fuelType ? classes.borderError : null
                            }
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
                          name="kilometers"
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
                            label="Simple File Upload"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(event);
                              setFieldValue(
                                "files",
                                Array.from(
                                  event.target.files as
                                    | ArrayLike<File>
                                    | Iterable<File>
                                )
                              );
                            }}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid item container spacing={3} xs={12}>
                        {values.files.map(
                          (
                            file: { name: string; [keys: string]: any },
                            index
                          ) => {
                            return (
                              <Grid
                                item
                                container
                                justifyContent="space-between"
                                xs={12}
                        
                                key={index}
                                alignItems="center"
                              >
                                <Grid item xs={4}>
                                  <Avatar>
                                    <ImageIcon />
                                  </Avatar>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="body1">
                                    {file?.name}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4} className={classes.icon}>
                                  <IconButton
                                    aria-label="delete"
                                    type="button"
                                    onClick={() => {
                                      const copy = values.files;
                                      copy.splice(index, 1);
                                      setFieldValue("files", copy);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            );
                          }
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          fullWidth
                        >
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
