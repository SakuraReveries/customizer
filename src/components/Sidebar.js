import PropTypes from 'prop-types';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { ChromePicker } from 'react-color';
import { cables, connectors } from 'utils';

export default function Sidebar({ values, setFieldValue }) {
  return (
    <Container fluid className="bg-secondary h-100">
      <Row>
        <Col xs={12} className="d-flex flex-column justify-content-end">
          <h1 className="text-light">Settings</h1>
          <hr className="border-white mt-0" />
          <p className="h6 text-light">Cable</p>
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
              <ChromePicker
                className="mb-2"
                disableAlpha
                onChange={(color) => setFieldValue('cable.color', color.hex)}
                color={values.cable.color}
              />
            </Form.Group>
          </Form>
          <p className="h6 text-light">Host Connector</p>
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
          <p className="h6 text-light">Device Connector</p>
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
        </Col>
      </Row>
    </Container>
  );
}

Sidebar.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired
};
