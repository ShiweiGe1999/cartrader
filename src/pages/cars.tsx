/* eslint-disable react/display-name */
import { Grid } from "@material-ui/core";
import deepEqual from "fast-deep-equal";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import React, { useState } from "react";
import useSWR from "swr";
import Search, { SearchProps } from ".";
import { CarModel } from "../../api/Car";
import { Media } from "../components/CarCard";
import { CardPagination } from "../components/CarPagination";
import { getMakes } from "../database/getMakes";
import { getModels } from "../database/getModels";
import { getPaginatedCars } from "../database/getPaginatedCars";
export interface CarListProps extends SearchProps {
  cars: CarModel[];
  totalPages: number;
}

export default function CarList({
  makes,
  models,
  cars,
  totalPages,
}: CarListProps) {
  const { query } = useRouter();
  const [serverQuery] = React.useState(query);
  const { data, isValidating } = useSWR("/api/cars?" + stringify(query), {
    dedupingInterval: 15000,
    initialData: deepEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined,
  });
  
  return (
    <Grid container spacing={5} direction="row" justifyContent="center">
      <Grid item xs={12} sm={5} md={3} >
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid container item xs={12} sm={7} md={9} spacing={3}>
        <Grid item xs={12}>
          <CardPagination query={query} totalPages={totalPages} />
        </Grid>
        {data?.cars.map((car,index) => {
          return (
            <Grid item xs={12} sm={6} key={car.id}>
              <Media loading={isValidating} car={data?.cars[index]} />
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <CardPagination query={query} totalPages={totalPages} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const makes = await getMakes();
  const models = await getModels(ctx.query.make as string);
  const paginations = await getPaginatedCars(ctx.query);
  return {
    props: {
      makes,
      models,
      cars: paginations.cars,
      totalPages: paginations.totalPages,
    },
  };
};
