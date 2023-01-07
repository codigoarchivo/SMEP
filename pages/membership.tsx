import { useState } from "react";
import { NextPage } from "next";
import { Container } from "@mui/material";
import { member } from "../database";
import { IMembership } from "../interfaces";

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
      <section className="pricing-section">
        <div className="pricing">
          <div className="pricing-header">
            <p>Your current plan:</p>
            <h3>
              Starter Trial <span>•</span> 500MAUs
            </h3>
          </div>
          <div className="pricing-body">
            <div className="pricing-body-header">
              <h2>Choose a plan</h2>
              <div className="pricing-checkbox">
                <span>Billed monthly</span>
                <div
                  className={!toggle ? "anually" : ""}
                  onClick={handleCheck}
                  id="custom-checkbox"
                >
                  <div className="annual"></div>
                </div>
                <span>Billed anually</span>
              </div>
            </div>

            {!toggle ? (
              <div className="pricing-body-plans">
                {member.membership.map((item) => (
                  <div key={item.title} className="card box-shadow">
                    <div className="card-header">
                      <h1 className="card-title">{item.title}</h1>
                    </div>
                    <div className="card-body">
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
                    <div className="card-footer">
                      <button
                        className="box-shadow"
                        onClick={() => handleSelected(item)}
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pricing-body-plans">
                <div className="card box-shadow">
                  <div className="card-header">
                    <span className="card-title">
                      E(Empresarial) afiliación de tienda virtual
                    </span>
                    <h2 className="card-price">50$ 1/año</h2>
                  </div>
                  <div className="card-body">
                    <ul>
                      <li>500 MAUs</li>
                      <li>3 projects</li>
                      <li>Unlimited guides</li>
                      <li>Unlimited flows</li>
                      <li>Unlimited branded themes</li>
                      <li>Email support</li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <button className="box-shadow">Choose Plan</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default membership;
