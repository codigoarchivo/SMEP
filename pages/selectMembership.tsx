import { useContext } from 'react';
import { Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MembershipContext } from '../context/membership';
import { currencyFormatter } from '../helpers';

type FormData = {
  name: string;
  reference: string;
  email: string;
  datetime: string;
  adicional: string;
};

const selectMembership = () => {
  const { check } = useContext(MembershipContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handlebuy = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handlebuy)}>
        <div className='form-content'>
          <fieldset>
            <legend>
              <span className='number'>1</span> Información para realizar pago
            </legend>
            <div className='space'>
              <span>Nombre:</span>
              <span>Edgar Marcano</span>
            </div>
            <div className='space'>
              <span>Correo:</span>
              <span>ehms1975@gmail.com</span>
            </div>
            <div className='space'>
              <span>Phone:</span>
              <span>+1 973 510 8452</span>
            </div>
            <div className='space'>
              <span>Número de cuenta:</span>
              <span>381053465609</span>
            </div>
            <hr />
            <h2>
              {check.title === 'PLAN EMPRESARIAL'
                ? 'Facturado anualmente'
                : 'Facturado por sesiones'}
            </h2>
            <div className='space'>
              <span>Plan:</span>
              <span>{check.title}</span>
            </div>
            <div className='space'>
              <span>
                {check.priceU
                  ? 'Cantidad a pagar por mes: '
                  : 'Cantidad a pagar por Sesión: '}
              </span>
              <span>
                {currencyFormatter(
                  'USD',
                  check.priceU ? check.priceU : check.priceS
                )}
              </span>
            </div>
            {check.desc1 && (
              <div className='space'>
                <span>Paquete Incluye: </span>
                <span>{`${check.desc1}, ${check.desc2}, ${check.desc3}`}</span>
              </div>
            )}
          </fieldset>
          <fieldset>
            <legend>
              <span className='number'>2</span> Persona que realizo el pago
            </legend>

            <label htmlFor='name'>Nombre:</label>
            <input
              {...register('name', {
                required: 'Nombre es requerido',
              })}
              type='text'
            />
            <label htmlFor='reference'>Referencia:</label>
            <input
              {...register('reference', {
                required: 'Reference es requerido',
              })}
              type='text'
            />
            <label htmlFor='email'>Correo:</label>
            <input
              {...register('email', {
                required: 'Email es requerido',
              })}
              type='email'
            />
            <label htmlFor='datetime'>Fecha De Pago:</label>
            <input
              {...register('datetime', {
                required: 'Dia es requerido',
              })}
              type='datetime-local'
            />
            <label htmlFor='adicional'>Información Adicional:</label>
            <textarea
              {...register('adicional', {
                required: 'Adicional es requerido',
                minLength: { value: 3, message: 'Minimo 3 caracteres' },
              })}
            ></textarea>
            <button type='submit'>Enviar</button>
          </fieldset>
        </div>
      </form>
    </Container>
  );
};

export default selectMembership;
