import { Accordion, Col, Container, Row } from 'react-bootstrap';

import logo from 'images/logo.png';
import OptionsPane from 'components/OptionsPane';
import CablePane from 'components/CablePane';
import CableDetachablePane from 'components/CableDetachablePane';
import HostConnectorPane from 'components/HostConnectorPane';
import DeviceConnectorPane from 'components/DeviceConnectorPane';
import SummaryPane from 'components/SummaryPane';

export default function Sidebar() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="d-flex flex-column bg-secondary">
          <h1 className="mt-2 mb-3 d-flex align-items-center h4 text-light">
            <img
              src={logo}
              alt="Sakura Reveries"
              className="mx-xs-1 mx-sm-2 mx-lg-4 sr-sidebar-logo"
            />
            <span className="text-end">Cable Builder</span>
          </h1>
          <hr className="border-white mt-0" />
          <Accordion alwaysOpen defaultActiveKey={['Cable']}>
            <OptionsPane />
            <CablePane />
            <CableDetachablePane />
            <HostConnectorPane />
            <DeviceConnectorPane />
            <SummaryPane />
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
