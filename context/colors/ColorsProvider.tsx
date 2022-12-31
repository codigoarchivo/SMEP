import {
  FC,
  ReactNode,
  useState,
  useMemo,
  useEffect
} from 'react';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import Cookie from 'js-cookie';
import { ColorsContext } from './';

interface PropsChildren {
  children: ReactNode;
}

export const ColorsProvider: FC<PropsChildren> = ({ children }) => {
  const [mode, setMode] = useState<any>('dark');
  const modeIni = Cookie.get('mode');

  useEffect(() => {
    setMode(modeIni);
  }, [setMode, modeIni]);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: any) => {
          const nexMode = prevMode === 'light' ? 'dark' : 'light';
          Cookie.set('mode', nexMode);
          return nexMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          ...(mode === 'light'
            ? {
              background: {
                default: '#E5E4E2',
                paper: '#E5E4E2',
              },
              primary: {
                main: '#fff',
              },
              secondary: {
                main: '#1b2232',
              },
              info: {
                main: '#fff',
              },
            }
            : {
              background: {
                default: '#1b2232',
                paper: '#1b2232',
              },
              primary: {
                main: '#43495b',
              },
              secondary: {
                main: '#1b2232',
              },
              info: {
                main: '#fff',
              },
            }),
        },
        components: {
          MuiLink: {
            defaultProps: {
              underline: 'none',
            },
          },
          MuiAppBar: {
            defaultProps: {
              elevation: 0,
              position: 'fixed',
            }
          },

          MuiTypography: {
            styleOverrides: {
              h1: {
                fontSize: 30,
                fontWeight: 600,
              },
              h2: {
                fontSize: 20,
                fontWeight: 400,
              },
              subtitle1: {
                fontSize: 18,
                fontWeight: 600,
              },
            },
          },

          MuiButton: {
            defaultProps: {
              variant: 'contained',
              size: 'small',
              disableElevation: true,
              color: 'info',
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
                boxShadow: 'none',
                borderRadius: 10,
                ':hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              },
            },
          },

          MuiCard: {
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
                borderRadius: '10px',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorsContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorsContext.Provider>
  );
};
