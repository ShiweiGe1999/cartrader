import { AppBar, Button, Switch, Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";
import { setUserInfo } from "../redux/UI";
import { connect, useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { logout, login } from "../redux/UI";
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
  userInfo?: any;
}
export default function Nav({
  checked,
  onChange,
  userInfo,
  ...props
}: NavProps) {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.UI.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(login());
      dispatch(setUserInfo(userInfo))
    }
  }, [userInfo, dispatch]);
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
          <Link href="/faq">
            <a style={{ color: "white" }}>
              <Typography color="inherit">FAQ</Typography>
            </a>
          </Link>
        </Button>
        {!user.loggedIn && (
          <Button color="inherit">
            <Link href="/login">
              <a style={{ color: "white" }}>
                <Typography color="inherit">Login</Typography>
              </a>
            </Link>
          </Button>
        )}
        {!user.loggedIn && (
          <Button color="inherit">
            <Link href="/signup">
              <a style={{ color: "white" }}>
                <Typography color="inherit">Signup</Typography>
              </a>
            </Link>
          </Button>
        )}

        {user.loggedIn && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  const res = axios
                    .post(
                      "http://localhost:3001/api/logout",
                      {},
                      {
                        headers: {
                          "Content-Type": "Application/json",
                        },
                      }
                    )
                    .then((res) => {
                      dispatch(logout());
                      handleClose();
                      console.log(res.data);
                    });
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </div>
        )}

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
