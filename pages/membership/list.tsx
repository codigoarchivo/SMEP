import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { dbSession } from '../../database';
import { ISession, IUserLem } from '../../interfaces';
import { currencyFormatter } from '../../helpers';
import { ListMembershipModal } from '../../components/membership';
import { QUESTIONSDELETE } from '../../static';

interface PropsSession {
  sessiones: ISession[];
}
const ListMembership: NextPage<PropsSession> = ({ sessiones }) => {
  const [selectMem, setselectMem] = useState(true);
  const [textImg, setTextImg] = useState(true);
  const [open, setOpen] = useState(false);
  const [openTextImg, setOpenTextImg] = useState<string[] | string>('' || []);

  const handleOpenCloseText = (data: string | string[]) => {
    setTextImg(false);
    setOpen(!open);
    setOpenTextImg(data);
  };

  const handleOpenCloseImg = (data: string | string[]) => {
    setTextImg(true);
    setOpen(!open);
    setOpenTextImg(data);
  };

  const handleOpenCloseButton = (data: string, id: string) => {
    setTextImg(false);
    setOpen(!open);
    setOpenTextImg([id, data, 'session']);
  };

  return (
    <Container>
      <div>
        <div className='membership__btn'>
          <IconButton
            className='membership__btn-style'
            size='small'
            sx={{ borderRadius: 1 }}
            aria-label='fingerprint'
            color='primary'
            onClick={() => setselectMem(true)}
          >
            <Fingerprint />
            <span>Session</span>
          </IconButton>
          <IconButton
            className='membership__btn-style'
            size='small'
            sx={{ borderRadius: 1 }}
            aria-label='fingerprint'
            color='primary'
            onClick={() => setselectMem(false)}
          >
            <Fingerprint />
            <span>Subscription</span>
          </IconButton>
        </div>
        <Container>
          {selectMem ? (
            <div className='membership__list'>
              {sessiones.map((item: ISession) => (
                <div key={item.createdAt} className='membership__list-card'>
                  <div className='membership__list-cont'>
                    <ul>
                      <li>
                        <span>Tipo:</span>
                        <span>{item.title}</span>
                      </li>
                      <li>
                        <span>Nombre:</span>
                        <span>{item.name}</span>
                      </li>
                      <li>
                        <span>Email:</span>
                        <span>{item.email}</span>
                      </li>
                      <li>
                        <span>Fecha y hora:</span>
                        <span>{item.datetime}</span>
                      </li>
                      <li>
                        <span>Referencia:</span>
                        <span>{item.reference}</span>
                      </li>
                      <li>
                        <span>Precio:</span>
                        <span>{currencyFormatter('USD', item.priceU)}</span>
                      </li>
                      <li>
                        <span>Estatus:</span>
                        <Chip
                          icon={item.valid ? <DoneIcon /> : <CloseIcon />}
                          label={item.valid ? 'Permitido' : 'Denegado'}
                          color='error'
                          variant='outlined'
                          size='small'
                        />
                      </li>
                    </ul>
                  </div>
                  <div className='membership__list-action'>
                    <li>
                      <Button
                        onClick={() => handleOpenCloseText(item.adicional)}
                        color='primary'
                      >
                        Adicional
                      </Button>

                      <ListMembershipModal
                        textImg={textImg}
                        allData={openTextImg}
                        open={open}
                        handleOpenClose={handleOpenCloseText}
                      />
                    </li>
                    <li>
                      <Button
                        onClick={() => handleOpenCloseImg(item.images)}
                        color='primary'
                      >
                        Recibos
                      </Button>
                      <ListMembershipModal
                        textImg={textImg}
                        allData={openTextImg}
                        open={open}
                        handleOpenClose={handleOpenCloseImg}
                      />
                    </li>
                    <li>
                      <Button
                        onClick={() =>
                          handleOpenCloseButton(
                            QUESTIONSDELETE,
                            item._id as string
                          )
                        }
                        color='primary'
                      >
                        Eliminar
                      </Button>
                    </li>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='membership__list'>
              <h1>dos</h1>
            </div>
          )}
        </Container>
      </div>
    </Container>
  );
};

export default ListMembership;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session | null = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/membership/list',
        permanent: false,
      },
    };
  }

  const user = { ...session?.user } as IUserLem;
  const sessiones = await dbSession.listSession(user._id);

  return {
    props: { sessiones },
  };
};
