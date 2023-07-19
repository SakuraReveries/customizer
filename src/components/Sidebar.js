import PropTypes from 'prop-types';
import { Fragment, useCallback } from 'react';
import { Accordion, Alert, Col, Container, Form, Row } from 'react-bootstrap';

import logo from 'images/logo.png';
import DualColorPicker from 'components/DualColorPicker';
import ObjectOptions from 'components/ObjectOptions';
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
  ledColors,
  opalColors,
  alignmentDotColors
} from 'utils';

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
                  <Form.Switch
                    className="text-light ms-3"
                    label={sleeveTypes[values.cable.outerSleeveType]}
                    onChange={(event) =>
                      setValues((values) => ({
                        ...values,
                        cable: {
                          ...values.cable,
                          outerSleeveType: event.target.checked
                            ? 'MDPC_X'
                            : 'TechFlex',
                          outerSleeveColor: event.target.checked
                            ? mdpcxColors[0].id
                            : techFlexColors[0].id
                        }
                      }))
                    }
                    checked={values.cable.outerSleeveType === 'MDPC_X'}
                  />
                </Form.Group>
                {values.cable.outerSleeveType === 'TechFlex' && (
                  <Form.Group className="mb-2">
                    <Form.Switch
                      className="text-light ms-3"
                      label="Opal Sleeve?"
                      onChange={(event) =>
                        setValues((values) => ({
                          ...values,
                          cable: {
                            ...values.cable,
                            opalSleeve: event.target.checked,
                            opalSleeveColor: event.target.checked
                              ? opalColors[0].id
                              : null
                          }
                        }))
                      }
                      checked={values.cable.opalSleeve}
                    />
                  </Form.Group>
                )}
                {values.cable.opalSleeve && (
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Opal Sleeve Color
                    </Form.Label>
                    <ColorPicker
                      colors={opalColors}
                      onChange={(color) =>
                        setFieldValue('cable.opalSleeveColor', color)
                      }
                      value={values.cable.opalSleeveColor}
                    />
                  </Form.Group>
                )}
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
                {values.cable.outerSleeveType === 'TechFlex' && (
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
                )}
              </Form>
            </SidebarPane>
            {values.cable.model !== 'Charger' && (
              <SidebarPane title="Cable Detachable">
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">Heatshrink?</Form.Label>
                    <Form.Switch
                      checked={values.cable.connector.innerHeatshrink}
                      onChange={(event) =>
                        setValues((values) => ({
                          ...values,
                          cable: {
                            ...values.cable,
                            connector: {
                              ...values.cable.connector,
                              innerHeatshrink: event.target.checked,
                              innerHeatshrinkColor: event.target.checked
                                ? heatshrinkColors[0].id
                                : null
                            }
                          }
                        }))
                      }
                    />
                  </Form.Group>
                  {values.cable.connector.innerHeatshrink && (
                    <Form.Group className="mb-2">
                      <Form.Label className="text-light">
                        Heatshrink Color
                      </Form.Label>
                      <ColorPicker
                        colors={heatshrinkColors.filter(
                          ({ id }) => id !== 'clear'
                        )}
                        onChange={(color) =>
                          setFieldValue(
                            'cable.connector.innerHeatshrinkColor',
                            color
                          )
                        }
                        value={values.cable.connector.innerHeatshrinkColor}
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Heatshrink Accents?
                    </Form.Label>
                    <Form.Switch
                      checked={values.cable.connector.collarHeatshrink}
                      onChange={(event) =>
                        setValues((values) => ({
                          ...values,
                          cable: {
                            ...values.cable,
                            connector: {
                              ...values.cable.connector,
                              collarHeatshrink: event.target.checked,
                              collarHeatshrinkColor: event.target.checked
                                ? heatshrinkColors[0].id
                                : null
                            }
                          }
                        }))
                      }
                    />
                  </Form.Group>
                  {values.cable.connector.collarHeatshrink && (
                    <Form.Group className="mb-2">
                      <Form.Label className="text-light">
                        Heatshrink Accents Color
                      </Form.Label>
                      <ColorPicker
                        colors={heatshrinkColors.filter(
                          ({ id }) => id !== 'clear'
                        )}
                        onChange={(color) =>
                          setFieldValue(
                            'cable.connector.collarHeatshrinkColor',
                            color
                          )
                        }
                        value={values.cable.connector.collarHeatshrinkColor}
                      />
                    </Form.Group>
                  )}
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
                              cerakoteColor:
                                event.target.value === 'Cerakote'
                                  ? cerakoteColors[0].id
                                  : null
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
                    <Fragment>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-light">
                          Cerakote Color
                        </Form.Label>
                        <ColorPicker
                          colors={cerakoteColors}
                          onChange={(color) =>
                            setFieldValue(
                              'cable.connector.cerakoteColor',
                              color
                            )
                          }
                          value={values.cable.connector.cerakoteColor}
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-light">
                          Accent Collar?
                        </Form.Label>
                        <Form.Switch
                          checked={values.cable.connector.accentCollar}
                          onChange={(event) =>
                            setValues((values) => ({
                              ...values,
                              cable: {
                                ...values.cable,
                                connector: {
                                  ...values.cable.connector,
                                  accentCollar: event.target.checked,
                                  accentCollarColor: event.target.checked
                                    ? cerakoteColors[0].id
                                    : null
                                }
                              }
                            }))
                          }
                        />
                      </Form.Group>
                      {values.cable.connector.accentCollar && (
                        <Form.Group className="mb-2">
                          <Form.Label className="text-light">
                            Accent Collar Color
                          </Form.Label>
                          <ColorPicker
                            colors={cerakoteColors}
                            onChange={(color) =>
                              setFieldValue(
                                'cable.connector.accentCollarColor',
                                color
                              )
                            }
                            value={values.cable.connector.accentCollarColor}
                          />
                        </Form.Group>
                      )}
                    </Fragment>
                  )}
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Alignment Dot Color
                    </Form.Label>
                    <DualColorPicker
                      colors={alignmentDotColors}
                      onChange={(type, color) =>
                        setFieldValue(`cable.connector.${type}DotColor`, color)
                      }
                      hostValue={values.cable.connector.hostDotColor}
                      deviceValue={values.cable.connector.deviceDotColor}
                    />
                  </Form.Group>
                  <Alert variant="info">
                    For alignment dot colors not listed or custom color tones
                    please contact me for a one on one consultation. Please note
                    colors are an approximate representation of the real to life
                    colors and can vary based on display and lighting
                    conditions.
                  </Alert>
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
                  <Form.Switch
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
                              event.target.value === 'Cerakote'
                                ? cerakoteColors[0].id
                                : null
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
                  <Form.Switch
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
                          ledColor: checked ? ledColors[0].id : null
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
                        <ObjectOptions
                          object={{ ...cncHousingFinishes, Gold: undefined }}
                        />
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
                  <Col xs={3} md={4}>
                    Cable
                  </Col>
                  <Col xs={9} md={8}>
                    {cableTypes[values.cable.model]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} md={4}>
                    Sleeve
                  </Col>
                  <Col xs={9} md={8}>
                    {
                      innerSleeveColors.find(
                        (color) => color.id === values.cable.innerSleeveColor
                      ).name
                    }{' '}
                    {sleeveTypes[values.cable.innerSleeveType]} under{' '}
                    {
                      outerSleeveColors.find(
                        (color) => color.id === values.cable.outerSleeveColor
                      ).name
                    }{' '}
                    {sleeveTypes[values.cable.outerSleeveType]}
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} md={4}>
                    {' '}
                    Host Side
                  </Col>
                  <Col xs={9} md={8}>
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
                  <Col xs={3} md={4}>
                    {' '}
                    Device Side
                  </Col>
                  <Col xs={9} md={8}>
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
