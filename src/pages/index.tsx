import { Box } from "@material-ui/core";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectProps,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { width } from "@material-ui/system";
import axios from "axios";
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import { getMakes, Make } from "../database/getMakes";
import { getModels, Model } from "../database/getModels";
import { getAsString } from "../getAsString";
import classes from "./index.module.css";
import getUser from "./api/getuser";
export interface SearchProps {
  makes: Make[];
  models: Model[];
  singleColumn?: boolean;
  message?: string;
}

const prices = [500, 1000, 5000, 15000, 25000, 50000];

export default function Search({
  makes,
  models,
  singleColumn,
  message,
}: SearchProps) {
  const { query, push } = useRouter();
  const smValue = singleColumn ? 12 : 6;
  const initialValues = {
    make: getAsString(query.make as string | string[]) || "all",
    model: getAsString(query.model as string | string[]) || "all",
    minPrice: getAsString(query.minPrice as string | string[]) || "all",
    maxPrice: getAsString(query.maxPrice as string | string[]) || "all",
  };
  return (
    <>
      {message ? (
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Alert severity="error">Please Login!</Alert>
        </div>
      ) : null}

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          push(
            `/cars?${values.make != "all" ? `make=${values.make}&` : ""}${
              values.make != "all" ? `model=${values.model}&` : ""
            }${values.minPrice != "all" ? `minPrice=${values.minPrice}&` : ""}${
              values.maxPrice != "all" ? `maxPrice=${values.maxPrice}&` : ""
            }page=1`
          );
        }}
      >
        {({ values }) => (
          <Form>
            <Paper elevation={5} className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={smValue}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="Search-Make">Make</InputLabel>
                    <Field
                      as={Select}
                      labelId="Search-Make"
                      label="make"
                      name="make"
                    >
                      <MenuItem value="all">
                        <em>All Makes</em>
                      </MenuItem>
                      {makes.map((e, index) => (
                        <MenuItem value={e.make} key={index}>
                          <em>{`${e.make} (${e.count})`}</em>
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={smValue}>
                  <ModelSelect
                    initialMake={initialValues.make}
                    make={values.make}
                    name="model"
                    models={models}
                  />
                </Grid>
                <Grid item xs={12} sm={smValue}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="minPrice">Min</InputLabel>
                    <Field
                      as={Select}
                      labelId="Min-Price"
                      label="minPrice"
                      name="minPrice"
                    >
                      <MenuItem value="all">
                        <em>No min</em>
                      </MenuItem>
                      {prices.map((e, index) => (
                        <MenuItem value={e} key={index}>
                          <em>{`$${e.toLocaleString()}`}</em>
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={smValue}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="maxPrice">Max</InputLabel>
                    <Field
                      as={Select}
                      labelId="Max-Price"
                      label="MaxPrice"
                      name="maxPrice"
                    >
                      <MenuItem value="all">
                        <em>No Max</em>
                      </MenuItem>
                      {prices.map((e, index) => (
                        <MenuItem value={e} key={index}>
                          <em>{`$${e.toLocaleString()}`}</em>
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" variant="contained" fullWidth>
                    <Link href="/addcar">
                      <a style={{ color: "white" }}>Add New Car</a>
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </>
  );
}

export interface ModelSelectProps extends SelectProps {
  name: string;
  models: Model[];
  make: string;
  initialMake: string;
}

export function ModelSelect({
  initialMake,
  models,
  make,
  ...props
}: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const initialModelsOrUndefined = make === initialMake ? models : undefined;

  const { data: newModels } = useSWR<Model[]>("/api/models?make=" + make, {
    dedupingInterval: 60000,
    initialData: make === "all" ? [] : initialModelsOrUndefined,
  });

  useEffect(() => {
    if (!newModels?.map((a) => a.model).includes(field.value)) {
      setFieldValue("model", "all");
    }
  }, [field.value, make, newModels, setFieldValue]);

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id="search-model">Model</InputLabel>
      <Select labelId="search-model" label="Model" {...field} {...props}>
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels?.map((model) => (
          <MenuItem key={model.model} value={model.model}>
            {`${model.model} (${model.count})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const makes = await getMakes();
  const make = getAsString(ctx.query.make as string | string[]);
  const message = ctx.query.message || null;
  const models = await getModels(make);

  return {
    props: {
      makes,
      models,
      message,
    },
  };
};
