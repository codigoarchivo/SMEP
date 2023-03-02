import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Container from '@mui/material/Container';
import { dbSession } from '../../database';
import { ISession, IUserLem } from '../../interfaces';
import { CardScreen } from '../../components/membership';
import { MembershipContext } from '../../context/membership';

interface PropsSession {
  sessiones: ISession[];
}

const ListSessiones: NextPage<PropsSession> = ({ sessiones }) => {
  const { listSession } = useContext(MembershipContext);

  useEffect(() => {
    listSession(sessiones);
  }, []);

  return (
    <Container>
      <div className='membership__list'>
        <CardScreen />
      </div>
    </Container>
  );
};

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

export default ListSessiones;
