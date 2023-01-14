import { ChangeEvent, useContext, useRef } from 'react';
import { Container, Button, Chip } from '@mui/material';
import { UploadOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { MembershipContext } from '../context/membership';
import { currencyFormatter, isEmpty } from '../helpers';
import { mbepApi } from '../api';

type FormData = {
  name: string;
  reference: string;
  email: string;
  datetime: string;
  adicional: string;
  images: string[];
};

const selectMembership = () => {
  const { check } = useContext(MembershipContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>();

  const handlebuy = (data) => {
    console.log(data);
  };

  const onFilesSelected = async ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    /* Checking if the target.files is empty or not. */
    if (!files || isEmpty(files)) return;

    try {
      for (var i = 0; i < files.length; i++) {
        /* Creating a new FormData object and appending the file to it. */
        const formData = new FormData();
        formData.append('file', files[i]);

        /* Sending the file to the server. */
        const { data } = await mbepApi.post<{ message: string }>(
          '/admin/upload',
          formData
        );
        
        /* Adding the image to the images array. */
        // ! corregir el error que arroja
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
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

            {/* -------------------------------- */}

            {/* A button that when clicked, it opens a file explorer to select a file. */}
            <label htmlFor='name'>Agrega la imagen del recibo:</label>
            <Button
              color='secondary'
              fullWidth
              startIcon={<UploadOutlined />}
              sx={{ mb: 3 }}
              onClick={() => fileInputRef.current?.click()}
            >
              Cargar imagen
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='image/png, image/gif, image/jpeg'
              style={{ display: 'none' }}
              onChange={onFilesSelected}
            />

            <Chip
              label='Es necesario al 1 imagen'
              color='error'
              variant='outlined'
              sx={{ display: getValues('images') ? 'flex' : 'none' }}
            />
            {/* -------------------------------- */}

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
