import PropTypes from 'prop-types';
import { Fragment, useCallback, useState } from 'react';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';

import logo from 'images/logo.png';
import ColorPicker from 'components/ColorPicker';
import SidebarPane from 'components/SidebarPane';
import {
  cableTypes,
  cerakoteColors,
  cncHousingFinishes,
  cncHousingTypes,
  colors,
  connectorFinishes,
  connectorTypes,
  housingTypes,
  heatshrinkColors,
  mdpcxColors,
  sleeveTypes,
  techFlexColors
} from 'utils';

export default function Sidebar({ values, setFieldValue, setValues }) {
  const [activeKey, setActiveKey] = useState('Cable');
  const updateField = useCallback(
    (name) => (event) => setFieldValue(name, event.target.value),
    [setFieldValue]
  );

  const sleeveColors =
    values.cable.sleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const hostHeatshrink = !values.hostConnector.subHousingType;
  const deviceHeatshrink = !values.deviceConnector.subHousingType;

  let hostConnectorDesc = hostHeatshrink
    ? `${
        heatshrinkColors.find(
          (color) => color.id === values.hostConnector.heatshrinkColor
        ).name
      } ${housingTypes[values.hostConnector.housingType]}`
    : `${cncHousingFinishes[values.hostConnector.housingFinish]} ${
        cncHousingTypes.USB_A[values.hostConnector.subHousingType]
      }`;

  if (!hostHeatshrink && values.hostConnector.housingFinish === 'Cerakote') {
    hostConnectorDesc = `${
      cerakoteColors.find(
        (color) => color.id === values.hostConnector.cerakoteColor
      ).name
    } ${hostConnectorDesc}`;
  }

  let deviceConnectorDesc = deviceHeatshrink
    ? `${
        heatshrinkColors.find(
          (color) => color.id === values.deviceConnector.heatshrinkColor
        ).name
      } ${housingTypes[values.deviceConnector.housingType]}`
    : `${cncHousingFinishes[values.deviceConnector.housingFinish]} ${
        cncHousingTypes.USB_C[values.deviceConnector.subHousingType]
      }`;

  if (
    !deviceHeatshrink &&
    values.deviceConnector.housingFinish === 'Cerakote'
  ) {
    deviceConnectorDesc = `${
      cerakoteColors.find(
        (color) => color.id === values.deviceConnector.cerakoteColor
      ).name
    } ${deviceConnectorDesc}`;
  }

  return (
    <Container fluid className="bg-secondary h-100">
      <Row>
        <Col xs={12} className="d-flex flex-column">
          <h1 className="mt-2 mb-3 d-flex align-items-center h4 text-light">
            <img
              src={logo}
              alt="Sakura Reveries"
              style={{ height: 96 }}
              className="mx-4"
            />
            <span className="text-end">Cable Builder</span>
          </h1>
          <hr className="border-white mt-0" />
          <Accordion alwaysOpen activeKey={activeKey} onSelect={setActiveKey}>
            <SidebarPane title="Cable">
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">Type</Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      setFieldValue('cable.model', event.target.value)
                    }
                    value={values.cable.model}
                  >
                    {Object.entries(cableTypes).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">Outer Sleeve</Form.Label>
                  <Form.Check
                    type="switch"
                    className="text-light ms-3"
                    label={sleeveTypes[values.cable.sleeveType]}
                    onChange={(event) =>
                      setFieldValue(
                        'cable.sleeveType',
                        event.target.checked ? 'MDPC_X' : 'TechFlex'
                      )
                    }
                    checked={values.cable.sleeveType === 'MDPC_X'}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">Sleeve Color</Form.Label>
                  <ColorPicker
                    colors={sleeveColors}
                    onChange={(color) =>
                      setFieldValue('cable.sleeveColor', color)
                    }
                    value={values.cable.sleeveColor}
                  />
                </Form.Group>
              </Form>
            </SidebarPane>
            <SidebarPane title="Host Connector">
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">
                    Connector Finish
                  </Form.Label>
                  <Form.Select
                    onChange={updateField('hostConnector.connectorFinish')}
                    value={values.hostConnector.connectorFinish}
                  >
                    {Object.entries(connectorFinishes).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">Housing Type</Form.Label>
                  <Form.Check
                    type="switch"
                    className="text-light ms-3"
                    label={housingTypes[values.hostConnector.housingType]}
                    onChange={(event) =>
                      setValues((values) => ({
                        ...values,
                        hostConnector: {
                          ...values.hostConnector,
                          housingType: event.target.checked
                            ? 'CNC'
                            : 'Heatshrink',
                          subHousingType: event.target.checked ? 'Facet' : null,
                          housingFinish: event.target.checked ? 'Silver' : null
                        }
                      }))
                    }
                    checked={values.hostConnector.housingType === 'CNC'}
                  />
                </Form.Group>

                {values.hostConnector.housingType === 'Heatshrink' ? (
                  <Form.Group>
                    <Form.Label className="text-light">
                      Heatshrink Color
                    </Form.Label>
                    <ColorPicker
                      colors={colors}
                      onChange={(color) =>
                        setFieldValue('hostConnector.heatshrinkColor', color)
                      }
                      value={values.hostConnector.heatshrinkColor}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <Form.Label className="text-light">
                      Housing Finish
                    </Form.Label>
                    <Form.Select
                      onChange={(event) =>
                        setValues((values) => ({
                          ...values,
                          hostConnector: {
                            ...values.hostConnector,
                            housingFinish: event.target.value,
                            cerakoteColor:
                              event.target.value === 'Cerakote' ? 'black' : null
                          }
                        }))
                      }
                      value={values.hostConnector.housingFinish}
                    >
                      {Object.entries(cncHousingFinishes).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}
                {values.hostConnector.housingFinish === 'Cerakote' && (
                  <Form.Group>
                    <Form.Label className="text-light">
                      Cerakote Color
                    </Form.Label>
                    <ColorPicker
                      colors={cerakoteColors}
                      onChange={(color) =>
                        setFieldValue('hostConnector.cerakoteColor', color)
                      }
                      value={values.hostConnector.cerakoteColor}
                    />
                  </Form.Group>
                )}
              </Form>
            </SidebarPane>
            <SidebarPane title="Device Connector">
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">
                    Connector Finish
                  </Form.Label>
                  <Form.Select
                    onChange={updateField('deviceConnector.connectorFinish')}
                    value={values.deviceConnector.connectorFinish}
                  >
                    {Object.entries(connectorFinishes).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">Housing Type</Form.Label>
                  <Form.Check
                    type="switch"
                    className="text-light ms-3"
                    label={housingTypes[values.deviceConnector.housingType]}
                    onChange={(event) =>
                      setValues((values) => ({
                        ...values,
                        deviceConnector: {
                          ...values.deviceConnector,
                          housingType: event.target.checked
                            ? 'CNC'
                            : 'Heatshrink',
                          subHousingType: event.target.checked
                            ? 'MonoRing'
                            : null,
                          housingFinish: event.target.checked ? 'Silver' : null
                        }
                      }))
                    }
                    checked={values.deviceConnector.housingType === 'CNC'}
                  />
                </Form.Group>
                {values.deviceConnector.housingType === 'Heatshrink' ? (
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Heatshrink Color
                    </Form.Label>
                    <ColorPicker
                      colors={colors}
                      onChange={(color) =>
                        setFieldValue('deviceConnector.heatshrinkColor', color)
                      }
                      value={values.deviceConnector.heatshrinkColor}
                    />
                  </Form.Group>
                ) : (
                  <Fragment>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-light">
                        Housing Type
                      </Form.Label>
                      <Form.Select
                        onChange={updateField('deviceConnector.subHousingType')}
                        value={values.deviceConnector.subHousingType}
                      >
                        {Object.entries(cncHousingTypes.USB_C).map(
                          ([key, val]) => (
                            <option key={key} value={key}>
                              {val}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-light">
                        Housing Finish
                      </Form.Label>
                      <Form.Select
                        onChange={(event) =>
                          setValues((values) => ({
                            ...values,
                            deviceConnector: {
                              ...values.deviceConnector,
                              housingFinish: event.target.value,
                              cerakoteColor:
                                event.target.value === 'Cerakote'
                                  ? 'black'
                                  : null
                            }
                          }))
                        }
                        value={values.deviceConnector.housingFinish}
                      >
                        {Object.entries(cncHousingFinishes).map(
                          ([key, val]) => (
                            <option key={key} value={key}>
                              {val}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Fragment>
                )}
                {values.deviceConnector.housingFinish === 'Cerakote' && (
                  <Form.Group>
                    <Form.Label className="text-light">
                      Cerakote Color
                    </Form.Label>
                    <ColorPicker
                      colors={cerakoteColors}
                      onChange={(color) =>
                        setFieldValue('deviceConnector.cerakoteColor', color)
                      }
                      value={values.deviceConnector.cerakoteColor}
                    />
                  </Form.Group>
                )}
              </Form>
            </SidebarPane>
            <SidebarPane title="Summary">
              <Container fluid className="text-light">
                <Row>
                  <Col xs={6}>Cable Type</Col>
                  <Col xs={6}>{cableTypes[values.cable.model]}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Outer Sleeve</Col>
                  <Col xs={6}>
                    {
                      sleeveColors.find(
                        (color) => color.id === values.cable.sleeveColor
                      ).name
                    }{' '}
                    {sleeveTypes[values.cable.sleeveType]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>Host Connector</Col>
                  <Col xs={6}>
                    {connectorTypes[values.hostConnector.model]} (
                    {hostConnectorDesc}) w/{' '}
                    {connectorFinishes[values.hostConnector.connectorFinish]}{' '}
                    finish
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>Device Connector</Col>
                  <Col xs={6}>
                    {connectorTypes[values.deviceConnector.model]} (
                    {deviceConnectorDesc}) w/{' '}
                    {connectorFinishes[values.deviceConnector.connectorFinish]}{' '}
                    finish
                  </Col>
                </Row>
              </Container>
            </SidebarPane>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

Sidebar.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired
};
