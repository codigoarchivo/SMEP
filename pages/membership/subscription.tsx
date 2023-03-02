import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Container from "@mui/material/Container";
import { dbSubscription } from "../../database";
import { ISubscription, IUserLem } from "../../interfaces";
import { CardScreen } from "../../components/membership";
import { MembershipContext } from "../../context/membership";

interface PropsSession {
  subscription: ISubscription[];
}

const ListSubscription: NextPage<PropsSession> = ({ subscription }) => {
  const { listSubscription } = useContext(MembershipContext);

  useEffect(() => {
    listSubscription(subscription);
  }, []);

  return (
    <Container>
      <div className="membership__list">
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
        destination: "/auth/login?p=/membership/list",
        permanent: false,
      },
    };
  }

  const user = { ...session?.user } as IUserLem;
  const subscription = await dbSubscription.listSubscription(user._id);

  return {
    props: { subscription },
  };
};

export default ListSubscription;
