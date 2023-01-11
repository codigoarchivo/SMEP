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
  const { sesion, business } = useContext(MembershipContext);
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
              <span className='number'>1</span> {sesion.title}
            </legend>
            <label>Elige una sesion acordes a tus necesidades:</label>
            <div className='space'>
              <input
                type='radio'
                id='sesion1'
                value={JSON.stringify(sesion.sesion1)}
                name='sesion'
              />
              <label htmlFor='sesion1' className='light'>
                {sesion.sesion1?.description}
              </label>
            </div>
            <div className='space'>
              <input
                type='radio'
                id='sesion2'
                value={JSON.stringify(sesion.sesion2)}
                name='sesion'
              />
              <label htmlFor='sesion2' className='light'>
                {sesion.sesion2?.description}
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className='number'>2</span> Información para realizar pago
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
            <div className='space'>
              <span>Cantidad a pagar:</span>
              <span>{currencyFormatter('USD', sesion.sesion1?.price!)} </span>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className='number'>3</span> Persona Que Hizo El Pago
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
