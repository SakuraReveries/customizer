import PropTypes from 'prop-types';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';

import ColorPicker from 'components/ColorPicker';
import SidebarPane from 'components/SidebarPane';
import { cables, colors, connectors } from 'utils';

export default function Sidebar({ values, setFieldValue }) {
  return (
    <Container fluid className="bg-secondary h-100">
      <Row>
        <Col xs={12} className="d-flex flex-column justify-content-end">
          <h1 className="text-light">Options</h1>
          <hr className="border-white mt-0" />
          <Accordion alwaysOpen>
            <SidebarPane title="Cable">
              <Form className="mb-2">
                <Form.Group>
                  <Form.Label className="text-light">Type</Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      setFieldValue('cable.model', event.target.value)
                    }
                    value={values.cable.model}
                  >
                    {Object.entries(cables).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">Color</Form.Label>
                  <ColorPicker
                    colors={colors}
                    onChange={(color) => setFieldValue('cable.color', color)}
                    value={values.cable.color}
                  />
                </Form.Group>
              </Form>
            </SidebarPane>
            <SidebarPane title="Host Connector">
              <Form className="mb-2">
                <Form.Group>
                  <Form.Label className="text-light">Type</Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      setFieldValue('hostConnector.model', event.target.value)
                    }
                    value={values.hostConnector.model}
                  >
                    {Object.entries(connectors).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </SidebarPane>
            <SidebarPane title="Device Connector">
              <Form className="mb-2">
                <Form.Group>
                  <Form.Label className="text-light">Type</Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      setFieldValue('deviceConnector.model', event.target.value)
                    }
                    value={values.deviceConnector.model}
                  >
                    {Object.entries(connectors).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </SidebarPane>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

Sidebar.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired
};
