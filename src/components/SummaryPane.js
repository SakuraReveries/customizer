import { Alert, Container, Row, Col } from 'react-bootstrap';

import SidebarPane from 'components/SidebarPane';
import {
  cableTypes,
  sleeveTypes,
  connectorTypes,
  connectorFinishes,
  techFlexColors,
  mdpcxColors,
  heatshrinkColors,
  cerakoteColors,
  cncHousingFinishes,
  cncHousingTypes,
  housingTypes
} from 'utils';
import { useFormikContext } from 'formik';

export default function SummaryPane() {
  const { values } = useFormikContext();

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
            {connectorTypes[values.hostConnector.model]} ({hostConnectorDesc})
            w/ {connectorFinishes[values.hostConnector.connectorFinish].name}{' '}
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
            {connectorFinishes[values.deviceConnector.connectorFinish].name}{' '}
            finish
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12}>
            <Alert variant="info">
              Please be aware that the colors displayed in this tool may not
              precisely match the final product&apos;s actual colors due to
              variations in computer-generated representation, materials, and
              lighting conditions. Consider the displayed colors as a reference
              rather than an exact true to life depiction.
            </Alert>
          </Col>
        </Row>
      </Container>
    </SidebarPane>
  );
}
