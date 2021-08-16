import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import Skeleton from "@material-ui/lab/Skeleton";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { CarModel } from "../../api/Car";

export interface CarCardProps {
  car: CarModel;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    anchorTag: {
      textDecoration: "none",
    },
    action: {
      padding: "0",
    },
  })
);

export function CarCard({ car }: CarCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Link
      href="car/[make]/[brand]/[id]"
      as={`/car/${car.make}/${car.model}/${car.id}`}
    >
      <a className={classes.anchorTag}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="car" src="\photos\cars\BMW.svg"></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${car.year} ${car.make} ${car.model} `}
            subheader={`$${car.price.toLocaleString()}`}
          />
          <CardMedia
            className={classes.media}
            image={car.photoUrl}
            title={car.make}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {car.details}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent></CardContent>
          </Collapse>
        </Card>
      </a>
    </Link>
  );
}

interface MediaProps {
  loading?: boolean;
  car: CarModel;
}

export function Media(props: MediaProps) {
  const { loading, car } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card >
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt="BMW" src="\photos\cars\BMW.svg" />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            `${car.year} ${car.make} ${car.model} `
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            `$${car.price.toLocaleString()}`
          )
        }
      />
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CardMedia
          className={classes.media}
          image={car.photoUrl}
          title={car.make}
        />
      )}

      {loading && (
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      )}

      <CardActions className={classes.action} disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{car.details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
