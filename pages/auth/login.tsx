import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const { query } = useRouter();
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    /* Getting the providers from the next-auth.js file. */
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Iniciar Sesion
              </Typography>

              <Chip
                label='No reconocemos ese usuario / contraseña'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='username'
                label='Correo'
                type='email'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='current-password'
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Minimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type={'submit'}
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                ingresar
              </Button>
            </Grid>
            <Grid item xs={12} textAlign='end'>
              <NextLink
                href={
                  query.p
                    ? `/auth/register?p=${query.p?.toString()}`
                    : '/auth/register'
                }
                passHref
                style={{ color: 'currentcolor' }}
              >
                ¿No tienes cuenta?
              </NextLink>
            </Grid>
            
            {/* This is the code that renders the buttons for the different providers. */}
            <Grid item xs={12} textAlign='end'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              
              {Object.values(providers).map((provider: any) => {
                if (provider.id === 'credentials') return;

                return (
                  <Button
                    key={provider.id}
                    variant='outlined'
                    fullWidth
                    color='primary'
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

/**
 * If the user is logged in, redirect them to the page they were trying to access
 * @param ctx - The context object that Next.js provides.
 * @returns A redirect to the page the user was on before they were redirected to the login page.
 */

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  const { p = '/' } = ctx.query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default LoginPage;
