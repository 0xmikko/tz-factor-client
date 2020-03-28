import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {numberWithCommas} from "../utils/formaters";

interface TotalBarProps {
  total_amount: number;
}

interface ToolbarDataItemProps {
  title: string;
  measure: string;
  amount: string;
}

const ToolbarDataItem: React.FC<ToolbarDataItemProps> = ({
  title,
  measure,
  amount,
}) => (
    <>
    <h6 className="tx-12 tx-lg-14 tx-semibold tx-uppercase tx-spacing-1 mg-b-5">
      { title } <span className="tx-normal tx-color-03">{ measure } </span>
    </h6>
    <div className="d-flex align-items-baseline">
    <h2 className="tx-20 tx-lg-28 tx-normal tx-rubik tx-spacing--2 lh-2 mg-b-0">
      { amount }
    </h2>
    </div>
      </>);

export const TotalBar: React.FC<TotalBarProps> = ({total_amount}) => (
  <Card>
    <Card.Body>
      <Container>
        <Row>
          <Col lg={4} md={4} xs={12}>
            <ToolbarDataItem title={"Mature date"} measure={''} amount={'2020-12-20'}/>
          </Col>
          <Col lg={4} md={4} xs={12}>
            <ToolbarDataItem title={"Total supply"} measure={'(USD)'} amount={numberWithCommas(1000000)}/>
          </Col>
          <Col lg={4} md={4} xs={12}>
            <ToolbarDataItem title={"AVG. INTEREST"} measure={''} amount={'6.55%'}/>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>
);
