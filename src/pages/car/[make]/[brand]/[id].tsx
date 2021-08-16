/* eslint-disable @next/next/no-img-element */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { CarModel } from "../../../../../api/Car";
import { openDB } from "../../../../openDB";
import Head from 'next/head'
interface CarDetailProps {
  car: CarModel | null | undefined;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    img: {
      width: "100%",
    },
  })
);
export default function CarDetails({ car }: CarDetailProps) {
  const classes = useStyles();
  if (!car) {
    return <h1>Sorry, Car not Found!</h1>;
  }
  return (
    <div>
      <Head>
        <title>{car.make + ' ' + car.model}</title>
      </Head>
      <Paper className={classes.paper}>
        <Grid container spacing={3} direction="row" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <img alt="complex" src={car.photoUrl} className={classes.img} />
          </Grid>
          <Grid item xs={12} md={8} sm={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {car.make + " " + car.model}
                </Typography>
                <Typography gutterBottom variant="h4">
                  {`$${car.price}`}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {"Year" + ": " + car.year}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {"Mileage: " + car.kilometers}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {"Fuel Type" + ": " + car.fuelType}
                </Typography>
                <Typography gutterBottom variant="body1" color="textSecondary">
                  {"Details" + ": " + car.details}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const getServerSideProps = async (context: {
  params: {
    id: number;
  };
}) => {
  const id = context.params.id;
  const db = await openDB();
  const car = await db.get<CarModel | undefined>(
    "SELECT * FROM Car where id = ?",
    id
  );
  return {
    props: { car: car || null },
  };
};
