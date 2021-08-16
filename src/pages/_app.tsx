import { Box, Container, CssBaseline, ThemeOptions } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';
import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useState } from "react";
import { SWRConfig } from "swr";
import { Nav } from "../components/Nav";
import PropTypes from "prop-types";

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
    },
    darkTheme: {
      palette: {
        type: "dark",
        primary: {
          main:'#484848',
        },
        secondary: {
          main: "#ffffff",
        }
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
    isDark: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeState((prevState) => {
      return {
        ...prevState,
        isDark: !prevState.isDark
      };
    });
  };
  return (
    <React.Fragment>
      <Head>
        <title>Car Trader</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider
        theme={themeState.isDark ? createTheme(themeState.darkTheme as ThemeOptions) : createTheme(themeState.lightTheme as ThemeOptions)}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Nav checked={themeState.isDark} onChange={handleChange} />

        <SWRConfig
          value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}
        >
          <Container maxWidth={false}>
            <Component {...pageProps} />
          </Container>
        </SWRConfig>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
