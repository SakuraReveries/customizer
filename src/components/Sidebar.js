import { Accordion, Col, Container, Row } from 'react-bootstrap';

import logo from 'images/logo.png';
import AdminPane from 'components/panes/AdminPane';
import CablePane from 'components/panes/CablePane';
import ScenePane from 'components/panes/ScenePane';
import SummaryPane from 'components/panes/SummaryPane';
import HostConnectorPane from 'components/panes/HostConnectorPane';
import CableDetachablePane from 'components/panes/CableDetachablePane';
import DeviceConnectorPane from 'components/panes/DeviceConnectorPane';

export default function Sidebar() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={12} className="d-flex flex-column bg-secondary h-100">
          <h1 className="mt-2 mb-3 d-flex align-items-center h4 text-light">
            <img
              src={logo}
              alt="Sakura Reveries"
              className="mx-xs-1 mx-sm-2 mx-lg-4 sr-sidebar-logo"
            />
            <span className="ms-auto me-auto">Cable Builder</span>
          </h1>
          <hr className="border-white mt-0" />
          <Accordion alwaysOpen defaultActiveKey={['Cable']}>
            <AdminPane />
            <ScenePane />
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
