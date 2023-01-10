import { useState, useContext } from 'react';
import { NextPage } from 'next';
import { Paper, Button, Container } from '@mui/material';
import { member } from '../database';
import { IMembership } from '../interfaces';
import { calcAge } from '../helpers';
import { MembershipContext } from '../context/membership';
import { useRouter } from 'next/router';

const membership: NextPage = () => {
  const [toggle, setToggle] = useState(false);
  const { selectedSesion, selectedBusiness } = useContext(MembershipContext);
  const { push } = useRouter();

  const handleCheck = () => {
    setToggle(!toggle);
  };

  const handleSelected = (data: IMembership) => {
    toggle
      ? selectedBusiness({
          ...data,
          age: Number(data.price!.slice(6, 8).trim()),
          priceMonth: Number(data.price!.slice(0, 1).trim()),
          price:
            Number(data.price!.slice(0, 1).trim()) *
            calcAge(Number(data.price!.slice(6, 8).trim())),
        })
      : selectedSesion({
          title: data.title,
          sesion1: {
            description: data.desc1,
            price: Number(data.desc1.slice(8, 12).trim()),
            nSesion: Number(data.desc1.slice(0, 1).trim()),
          },
          sesion2: {
            description: data.desc2,
            price: Number(data.desc2.slice(11, 14).trim()),
            nSesion: Number(data.desc2.slice(0, 1).trim()),
          },
        });
    push('/selectMembership');
  };

  const data: IMembership[] = toggle ? member.membershiAge : member.membership;

  return (
    <Container>
      <section className='pricing-section'>
        <div className='pricing'>
          <div className='pricing-header'>
            <h3>E D G A R ' S P E N D U L U M</h3>
          </div>
          <div className='pricing-body'>
            <div className='pricing-body-header'>
              <h2>Elige un plan</h2>
              <div className='pricing-checkbox'>
                <span className={!toggle ? 'text-light' : ''}>
                  Facturado por sesiones
                </span>
                <div
                  className={toggle ? 'anually' : ''}
                  onClick={handleCheck}
                  id='custom-checkbox'
                >
                  <div className='annual'></div>
                </div>
                <span className={toggle ? 'text-light' : ''}>
                  Facturado anualmente
                </span>
              </div>
            </div>

            <div className='pricing-body-plans'>
              <>
                {data.map((item) => (
                  <Paper key={item.title} className='card' elevation={2}>
                    <div className='card-header'>
                      <span className='card-title'>{item.title}</span>
                      <h2 className='card-price'>{item.price}</h2>
                    </div>
                    <div className='card-body'>
                      <ul>
                        {toggle ? (
                          <>
                            <li>{item.desc1}</li>
                            <li>{item.desc2}</li>
                          </>
                        ) : (
                          <>
                            <li>
                              <span>{item.desc1.slice(0, -4)}</span>
                              <span>{item.desc1.slice(8, 13)}</span>
                            </li>
                            <li>
                              <span>{item.desc2.slice(0, -4)}</span>
                              <span>{item.desc2.slice(11, 16)}</span>
                            </li>
                          </>
                        )}
                        {item?.desc3 && (
                          <li>
                            <span>{item?.desc3.slice(0, -4)}</span>
                            <span>{item?.desc3.slice(11, 16)}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className='card-footer'>
                      <Button
                        onClick={() => handleSelected(item)}
                        color='primary'
                      >
                        Elija plan
                      </Button>
                    </div>
                  </Paper>
                ))}
              </>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default membership;
