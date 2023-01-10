import { useState } from 'react';
import { NextPage } from 'next';
import { Paper, Button, Container } from '@mui/material';
import { member } from '../database';
import { IMembership } from '../interfaces';

const membership: NextPage = () => {
  const [toggle, setToggle] = useState(false);

  const handleCheck = () => {
    setToggle(!toggle);
  };

  const handleSelected = (data: IMembership) => {
    console.log(data);
  };

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
                <span style={{ color: !toggle ? '#000000' : '' }}>
                  Facturado por sesiones
                </span>
                <div
                  className={toggle ? 'anually' : ''}
                  onClick={handleCheck}
                  id='custom-checkbox'
                >
                  <div className='annual'></div>
                </div>
                <span style={{ color: !toggle ? '' : '#000000' }}>
                  Facturado anualmente
                </span>
              </div>
            </div>

            {toggle ? (
              <div className='pricing-body-plans'>
                <Paper className='card' elevation={2}>
                  <div className='card-header'>
                    <span className='card-title'>
                      E(Empresarial) <br /> Plus, afiliación de tienda virtual
                    </span>
                    <h2 className='card-price'>7$/mes 1 un año</h2>
                  </div>
                  <div className='card-body'>
                    <ul>
                      <li>Publicación ilimitada</li>
                      <li>Link a su página</li>
                    </ul>
                  </div>
                  <div className='card-footer'>
                    <Button color='primary'>Elija plan</Button>
                  </div>
                </Paper>
                <Paper className='card' elevation={2}>
                  <div className='card-header'>
                    <span className='card-title'>
                      E(Empresarial) Profesional, afiliación de tienda virtual
                    </span>
                    <h2 className='card-price'>6$/mes 2 años</h2>
                  </div>
                  <div className='card-body'>
                    <ul>
                      <li>Publicación ilimitada</li>
                      <li>Link a su página</li>
                    </ul>
                  </div>
                  <div className='card-footer'>
                    <Button color='primary'>Elija plan</Button>
                  </div>
                </Paper>
                <Paper className='card' elevation={2}>
                  <div className='card-header'>
                    <span className='card-title'>
                      E(Empresarial) Premium, afiliación de tienda virtual
                    </span>
                    <h2 className='card-price'>5$/mes 3 años</h2>
                  </div>
                  <div className='card-body'>
                    <ul>
                      <li>Publicación ilimitada</li>
                      <li>Link a su página</li>
                    </ul>
                  </div>
                  <div className='card-footer'>
                    <Button color='primary'>Elija plan</Button>
                  </div>
                </Paper>
              </div>
            ) : (
              <div className='pricing-body-plans'>
                {member.membership.map((item) => (
                  <Paper key={item.title} className='card' elevation={2}>
                    <div className='card-header'>
                      <h1 className='card-title'>{item.title}</h1>
                    </div>
                    <div className='card-body'>
                      <ul>
                        <li>
                          <span>{item.seccion1.slice(0, -4)}</span>
                          <span>{item.seccion1.slice(8, 13)}</span>
                        </li>
                        <li>
                          <span>{item.seccion2.slice(0, -4)}</span>
                          <span>{item.seccion2.slice(11, 16)}</span>
                        </li>

                        {item?.seccion3 && (
                          <li>
                            <span>{item?.seccion3.slice(0, -4)}</span>
                            <span>{item?.seccion3.slice(11, 16)}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className='card-footer'>
                      <Button
                        color='primary'
                        onClick={() => handleSelected(item)}
                      >
                        Elija plan
                      </Button>
                    </div>
                  </Paper>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default membership;
