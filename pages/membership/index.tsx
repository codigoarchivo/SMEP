import { useState, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Paper, Button, Container } from "@mui/material";
import { member } from "../../database";
import { IMembership } from "../../interfaces";
import { calcAge, returnNumber } from "../../helpers";
import { MembershipContext } from "../../context/membership";

const membership: NextPage = () => {
  const [toggle, setToggle] = useState(false);
  const { selectedCheck } = useContext(MembershipContext);
  const { push } = useRouter();

  const handleCheck = () => {
    setToggle(!toggle);
  };

  const handleSelected = (data: IMembership) => {
    selectedCheck(
      toggle
        ? {
            ...data,
            monthT: calcAge(1),
            priceU: returnNumber(data.price?.slice(0, 8)),
            repro: returnNumber(data.desc3),
          }
        : {
            title: data.title,
            priceU: returnNumber(data.price),
          }
    );

    push("/membership/select");
  };

  const data: IMembership[] = toggle ? member.membershiAge : member.membership;

  return (
    <Container>
      <section className="pricing-section">
        <div className="pricing">
          <div className="pricing-header">
            <h3>
              <span>E D G A R ' S</span>
              <span>P E N D U L U M</span>
            </h3>
          </div>
          <div className="pricing-body">
            <div className="pricing-body-header">
              <h2>Elige un plan</h2>
              <div className="pricing-checkbox">
                <span className={!toggle ? "text-light" : ""}>
                  Facturado por sesiones
                </span>
                <div
                  className={toggle ? "anually" : ""}
                  onClick={handleCheck}
                  id="custom-checkbox"
                >
                  <div className="annual"></div>
                </div>
                <span className={toggle ? "text-light" : ""}>
                  Facturado anualmente
                </span>
              </div>
            </div>

            <div className="pricing-body-plans">
              <>
                {data.map((item) => (
                  <Paper key={item.title} className="card" elevation={2}>
                    <div className="card-header">
                      <span className="card-title">{item.title}</span>
                      {toggle && <h2 className="card-price">{item.price}</h2>}
                    </div>
                    <div className="card-body">
                      <ul>
                        {toggle ? (
                          <>
                            <li>
                              <span>{item.desc1}</span>
                            </li>
                            <li>
                              <span>{item.desc2}</span>
                            </li>
                            <li>
                              <span>{item.desc3}</span>
                            </li>
                          </>
                        ) : (
                          <li>
                            <span>{item.price}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="card-footer">
                      <Button
                        onClick={() => handleSelected(item)}
                        color="primary"
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
