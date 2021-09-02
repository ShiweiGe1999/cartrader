import {
  Container,
  CssBaseline,
  ThemeOptions,
  unstable_createMuiStrictModeTheme as createTheme,
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import Head from "next/head";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { SWRConfig } from "swr";
import Nav from "../components/Nav";
import "./global.css";
import App, { AppProps, AppContext } from "next/app";
import { verify } from "jsonwebtoken";
import { secret } from "../../api/secret";
import { store } from "../redux/store";
import { Provider, connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/UI";
export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#556cd6",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiCardActions: {
      root: {
        padding: "0",
      },
    },
    MuiIconButton: {
      root: {
        marginLeft: "auto",
      },
    },
    MuiContainer: {
      root: {
        marginTop: "2rem",
      },
    },
  },
  props: {
    MuiCard: {
      elevation: 12,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCardActions: {
      root: {
        padding: "0",
      },
    },
    MuiIconButton: {
      root: {
        marginLeft: "auto",
      },
    },
    MuiContainer: {
      root: {
        marginTop: "2rem",
      },
    },
  },
  props: {
    MuiCard: {
      elevation: 12,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [themeState, setThemeState] = useState({
    lightTheme: {
      palette: {
        type: "light",
        primary: {
          main: "#2196f3",
        },
        error: {
          main: red.A400,
        },
        background: {
          default: "#fff",
        },
      },
      overrides: {
        MuiCardActions: {
          root: {
            padding: "0",
          },
        },
        MuiIconButton: {
          root: {
            marginLeft: "auto",
          },
        },
        MuiContainer: {
          root: {
            marginTop: "2rem",
          },
        },
      },
      props: {
        MuiCard: {
          elevation: 12,
        },
      },
    },
    darkTheme: {
      palette: {
        type: "dark",
        primary: {
          main: "#484848",
        },
        secondary: {
          main: "#ffffff",
        },
      },
      overrides: {
        MuiCardActions: {
          root: {
            padding: "0",
          },
        },
        MuiIconButton: {
          root: {
            marginLeft: "auto",
          },
        },
        MuiContainer: {
          root: {
            marginTop: "2rem",
          },
        },
        MuiFormLabel: {
          root: {
            "&$focused": {
              color: "#ffffff",
            },
          },
        },
      },
      props: {
        MuiCard: {
          elevation: 12,
        },
      },
    },
    isDark: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeState((prevState) => {
      return {
        ...prevState,
        isDark: !prevState.isDark,
      };
    });
  };
  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>Car Trader</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider
          theme={
            themeState.isDark
              ? createTheme(themeState.darkTheme as ThemeOptions)
              : createTheme(themeState.lightTheme as ThemeOptions)
          }
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Nav
            checked={themeState.isDark}
            onChange={handleChange}
            userInfo={pageProps.userInfo}
          />

          <SWRConfig
            value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}
          >
            <Container maxWidth={false}>
              <Component {...pageProps} />
            </Container>
          </SWRConfig>
        </ThemeProvider>
      </React.Fragment>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  try {
    const appProps = await App.getInitialProps(appContext);
    const cookie = appContext.ctx.req?.headers.cookie;
    const res = await axios.get("http://localhost:3001/api/getuser", {
      headers: cookie ? { cookie } : undefined,
    });

    return {
      pageProps: {
        ...appProps.pageProps,
        userInfo: res.data,
      },
    };
  } catch (err) {
    const appProps = await App.getInitialProps(appContext);
    return {
      pageProps: {
        ...appProps.pageProps,
      },
    };
  }
};
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
