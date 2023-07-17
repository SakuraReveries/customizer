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

  const innerSleeveColors =
    values.cable.innerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const outerSleeveColors =
    values.cable.outerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
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
              className="mx-4 sr-sidebar-logo"
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
                    label={sleeveTypes[values.cable.outerSleeveType]}
                    onChange={(event) =>
                      setFieldValue(
                        'cable.outerSleeveType',
                        event.target.checked ? 'MDPC_X' : 'TechFlex'
                      )
                    }
                    checked={values.cable.outerSleeveType === 'MDPC_X'}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">
                    Outer Sleeve Color
                  </Form.Label>
                  <ColorPicker
                    colors={outerSleeveColors}
                    onChange={(color) =>
                      setFieldValue('cable.outerSleeveColor', color)
                    }
                    value={values.cable.outerSleeveColor}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-light">
                    Inner Sleeve Color
                  </Form.Label>
                  <ColorPicker
                    colors={innerSleeveColors}
                    onChange={(color) =>
                      setFieldValue('cable.innerSleeveColor', color)
                    }
                    value={values.cable.innerSleeveColor}
                  />
                </Form.Group>
              </Form>
            </SidebarPane>
            {values.cable.model !== 'Charger' && (
              <SidebarPane title="Cable Connector">
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Heatshrink Color
                    </Form.Label>
                    <ColorPicker
                      colors={heatshrinkColors}
                      onChange={(color) =>
                        setFieldValue('cable.connector.heatshrinkColor', color)
                      }
                      value={values.cable.connector.heatshrinkColor}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Connector Finish
                    </Form.Label>
                    <Form.Select
                      onChange={(event) =>
                        setValues((values) => ({
                          ...values,
                          cable: {
                            ...values.cable,
                            connector: {
                              ...values.cable.connector,
                              finish: event.target.value,
                              cerakoteColor: event.target.value ? 'black' : null
                            }
                          }
                        }))
                      }
                      value={values.cable.connector.finish}
                    >
                      <ObjectOptions object={cncHousingFinishes} />
                    </Form.Select>
                  </Form.Group>
                  {values.cable.connector.finish === 'Cerakote' && (
                    <Form.Group>
                      <Form.Label className="text-light">
                        Cerakote Color
                      </Form.Label>
                      <ColorPicker
                        colors={cerakoteColors}
                        onChange={(color) =>
                          setFieldValue('cable.connector.cerakoteColor', color)
                        }
                        value={values.cable.connector.cerakoteColor}
                      />
                    </Form.Group>
                  )}
                </Form>
              </SidebarPane>
            )}
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
                      <Fragment>
                        <Form.Group className="mb-2">
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
                        <Alert variant="info">
                          Glow CNC offers the option to enhance the cable with
                          an LED light, which can be either a static color or a
                          non-addressable RGB (meaning the RGB auto cycles at a
                          predetermined speed between colors without control
                          over speed or color). When the cable is powered off,
                          the unique diffuser ring appears white, but when
                          powered on, it takes on the color of the Static or RGB
                          LED inside. Cool White is the most popular option for
                          these connectors. For static colors that are not
                          achievable with LED colors alone, please contact me to
                          inquire about custom dyed diffuser rings, which come
                          at an additional cost. These customized rings, paired
                          with a white static LED, can create unique accent
                          colors for the Glow CNC when powered on or off. Please
                          note that the lighting cannot be disabled; if the
                          cable is connected to a power source, the LED will
                          activate. These cables do not have any accompanying
                          software.
                        </Alert>
                      </Fragment>
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
                  <Col xs={3} md={4} lg={6}>
                    Cable
                  </Col>
                  <Col xs={9} md={8} lg={6}>
                    {cableTypes[values.cable.model]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} md={4} lg={6}>
                    Sleeve
                  </Col>
                  <Col xs={9} md={8} lg={6}>
                    {
                      innerSleeveColors.find(
                        (color) => color.id === values.cable.innerSleeveColor
                      ).name
                    }{' '}
                    {sleeveTypes[values.cable.innerSleeveType]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} md={4} lg={6}>
                    {' '}
                    Host Side
                  </Col>
                  <Col xs={9} md={8} lg={6}>
                    {connectorTypes[values.hostConnector.model]} (
                    {hostConnectorDesc}) w/{' '}
                    {
                      connectorFinishes[values.hostConnector.connectorFinish]
                        .name
                    }{' '}
                    finish
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} md={4} lg={6}>
                    {' '}
                    Device Side
                  </Col>
                  <Col xs={9} md={8} lg={6}>
                    {connectorTypes[values.deviceConnector.model]} (
                    {deviceConnectorDesc}) w/{' '}
                    {
                      connectorFinishes[values.deviceConnector.connectorFinish]
                        .name
                    }{' '}
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
