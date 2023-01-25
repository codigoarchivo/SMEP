import { ChangeEvent, useContext, useRef, useState } from 'react';
import { Container, Button, Chip } from '@mui/material';
import { UploadOutlined } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useForm } from 'react-hook-form';
import { MembershipContext } from '../../context/membership';
import { currencyFormatter, isEmpty } from '../../helpers';
import { mbepApi } from '../../api';

type FormData = {
  name: string;
  reference: string;
  email: string;
  datetime: string;
  adicional: string;
  images: string[];
};

const selectMembership = () => {
  const { check, sessionOrSubscription } = useContext(MembershipContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImage, setIsImage] = useState('none');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<FormData>();

  const handleVerify = () => {
    /* Checking if the images array is empty or not. If it is empty, it will display the error message. */
    if (getValues('images') === undefined) return setIsImage('flex');
  };

  const onSubmit = (form: FormData) => {
    setIsSaving(true);
    setIsImage('none');

    handleVerify();

    try {
      /* A function that is being called. */

      check.repro
        ? sessionOrSubscription({
            ...form,
            monthT: check.monthT || 0,
            priceU: check.priceU || 0,
            repro: check.repro || 0,
            title: check.title || '',
            desc:
              `${check.desc1}, ${check.desc2}, ${check.desc3} con un valor de ${check.price}` ||
              '',
            valid: false,
          })
        : sessionOrSubscription({
            ...form,
            priceU: check.priceU || 0,
            title: check.title || '',
            valid: false,
          });
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
    reset();
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
        if (getValues('images') !== undefined) {
          setValue('images', [...getValues('images'), data.message], {
            shouldValidate: true,
          });
        } else {
          setValue('images', [data.message], {
            shouldValidate: true,
          });
        }
      }
      setIsImage('none');
    } catch (error) {
      console.log({ error });
    }
  };

  /**
   * The function onDeleteImage takes an image as a parameter and sets the value of the images field to
   * the current value of the images field minus the image that was passed in as a parameter.
   * @param {string} image - string - the image to be deleted
   */
  const onDeleteImage = (image: string) => {
    setIsImage('flex');
    setIsSaving(false);
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {check.repro
                  ? 'Cantidad a pagar por mes: '
                  : 'Cantidad a pagar por Sesión: '}
              </span>
              <span>{currencyFormatter('USD', check.priceU)}</span>
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
            <Chip
              label={errors.name?.message}
              color='error'
              variant='outlined'
              sx={{
                display: errors.name?.message ? 'flex' : 'none',
              }}
            />
            {/* -------------------------------- */}

            {/* A button that when clicked, it opens a file explorer to select a file. */}
            <label htmlFor='name'>Agrega la imagen del recibo:</label>
            <Button
              color='primary'
              fullWidth
              startIcon={<UploadOutlined />}
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

            <div className='imageFile'>
              {getValues('images')?.map((item) => (
                <div style={{ position: 'relative' }} key={item}>
                  <span onClick={() => onDeleteImage(item)}>
                    <HighlightOffIcon />
                  </span>
                  <img src={`${item}`} width='40px' height={'40px'} alt='img' />
                </div>
              ))}
            </div>

            <Chip
              label={'Coloca la imagen del recibo de pago'}
              color='error'
              variant='outlined'
              sx={{
                display: isImage,
              }}
            />
            {/* -------------------------------- */}

            <label htmlFor='reference'>Referencia:</label>
            <input
              {...register('reference', {
                required: 'Reference es requerido',
              })}
              type='text'
            />
            <Chip
              label={errors.reference?.message}
              color='error'
              variant='outlined'
              sx={{
                display: errors.reference?.message ? 'flex' : 'none',
              }}
            />
            <label htmlFor='email'>Correo:</label>
            <input
              {...register('email', {
                required: 'Email es requerido',
              })}
              type='email'
            />
            <Chip
              label={errors.email?.message}
              color='error'
              variant='outlined'
              sx={{
                display: errors.email?.message ? 'flex' : 'none',
              }}
            />
            <label htmlFor='datetime'>Fecha De Pago:</label>
            <input
              {...register('datetime', {
                required: 'Dia es requerido',
              })}
              type='datetime-local'
            />
            <Chip
              label={errors.datetime?.message}
              color='error'
              variant='outlined'
              sx={{
                display: errors.datetime?.message ? 'flex' : 'none',
              }}
            />
            <label htmlFor='adicional'>Información Adicional:</label>
            <textarea
              style={{ marginBottom: '5px' }}
              {...register('adicional', {
                required: 'Adicional es requerido',
                minLength: { value: 3, message: 'Minimo 3 caracteres' },
              })}
            ></textarea>
            <Chip
              label={errors.adicional?.message}
              color='error'
              variant='outlined'
              sx={{
                display: errors.adicional?.message ? 'flex' : 'none',
              }}
            />
            <Button
              className='btn-send'
              color='primary'
              onClick={handleVerify}
              type='submit'
              disabled={isSaving}
            >
              Enviar
            </Button>
          </fieldset>
        </div>
      </form>
    </Container>
  );
};

export default selectMembership;
