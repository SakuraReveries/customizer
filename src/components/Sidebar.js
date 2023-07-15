import PropTypes from 'prop-types';
import { Fragment, useCallback } from 'react';
import { Accordion, Alert, Col, Container, Form, Row } from 'react-bootstrap';

import logo from 'images/logo.png';
import ColorPicker from 'components/ColorPicker';
import SidebarPane from 'components/SidebarPane';
import {
  cableTypes,
  cerakoteColors,
  cncHousingFinishes,
  cncHousingTypes,
  connectorFinishes,
  connectorTypes,
  housingTypes,
  heatshrinkColors,
  mdpcxColors,
  sleeveTypes,
  techFlexColors,
  ledColors
} from 'utils';
import ObjectOptions from './ObjectOptions';

export default function Sidebar({ values, setFieldValue, setValues }) {
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
    <Container
      fluid
      className="bg-secondary h-100 border-4 border-primary border-start"
    >
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
          <Accordion alwaysOpen defaultActiveKey={['Cable']}>
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
                    <ObjectOptions object={cableTypes} />
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
                    <ObjectOptions object={connectorFinishes} />
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
                      colors={heatshrinkColors}
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
                      <ObjectOptions object={cncHousingFinishes} />
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
                    <ObjectOptions object={connectorFinishes} />
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">Housing Type</Form.Label>
                  <Form.Check
                    type="switch"
                    className="text-light ms-3"
                    label={housingTypes[values.deviceConnector.housingType]}
                    onChange={({ target: { checked } }) =>
                      setValues((values) => ({
                        ...values,
                        deviceConnector: {
                          ...values.deviceConnector,
                          housingType: checked ? 'CNC' : 'Heatshrink',
                          subHousingType: checked ? 'MonoRing' : null,
                          housingFinish: checked ? 'Silver' : null,
                          ledColor: checked ? 'red' : null
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
                      colors={heatshrinkColors}
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
                        <ObjectOptions object={cncHousingTypes.USB_C} />
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
                        <ObjectOptions object={cncHousingFinishes} />
                      </Form.Select>
                    </Form.Group>
                    {values.deviceConnector.subHousingType === 'GlowRing' && (
                      <Form.Group>
                        <Form.Label className="text-light">
                          LED Color
                        </Form.Label>
                        <ColorPicker
                          colors={ledColors}
                          onChange={(color) =>
                            setFieldValue('deviceConnector.ledColor', color)
                          }
                          value={values.deviceConnector.ledColor}
                        />
                      </Form.Group>
                    )}
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
                  <Col xs={6} md={3}>
                    Cable
                  </Col>
                  <Col xs={6} md={9}>
                    {cableTypes[values.cable.model]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>
                    Sleeve
                  </Col>
                  <Col xs={6} md={9}>
                    {
                      sleeveColors.find(
                        (color) => color.id === values.cable.sleeveColor
                      ).name
                    }{' '}
                    {sleeveTypes[values.cable.sleeveType]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>
                    Host Side
                  </Col>
                  <Col xs={6} md={9}>
                    {connectorTypes[values.hostConnector.model]} (
                    {hostConnectorDesc}) w/{' '}
                    {connectorFinishes[values.hostConnector.connectorFinish]}{' '}
                    finish
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>
                    Device Side
                  </Col>
                  <Col xs={6} md={9}>
                    {connectorTypes[values.deviceConnector.model]} (
                    {deviceConnectorDesc}) w/{' '}
                    {connectorFinishes[values.deviceConnector.connectorFinish]}{' '}
                    finish
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12}>
                    <Alert variant="info">
                      Please be aware that the colors displayed in this tool may
                      not precisely match the final product&apos;s actual colors
                      due to variations in computer-generated representation,
                      materials, and lighting conditions. Consider the displayed
                      colors as a reference rather than an exact true to life
                      depiction.
                    </Alert>
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
