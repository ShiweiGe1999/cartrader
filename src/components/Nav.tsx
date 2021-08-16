import { AppBar, Button, Switch, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  switch: {
    color: "#fafafa",
  },
}));

export const whiteSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    "&$checked": {
      color: "#fafafa",
    },
    "&$checked + $track": {
      backgroundColor: "#fafafa",
    },
  },
})(Switch);
export interface NavProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Nav({ checked, onChange }: NavProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          German Garage
        </Typography>

        <Button color="inherit">
          <Link href="/">
            <a style={{ color: "white" }}>
              <Typography color="inherit">Home</Typography>
            </a>
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/addcar">
            <a style={{ color: "white" }}>
              <Typography color="inherit">Add</Typography>
            </a>
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/faq">
            <a style={{ color: "white" }}>
              <Typography color="inherit">FAQ</Typography>
            </a>
          </Link>
        </Button>
        <Switch
          checked={checked}
          onChange={onChange}
          name="mode"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Toolbar>
    </AppBar>
  );
}
