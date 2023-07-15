import { useFormik } from 'formik';
import { Suspense, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Loader from 'components/Loader';
import Sidebar from 'components/Sidebar';
import Scene from 'components/Scene';
import { Helmet } from 'react-helmet';
import { KeyboardControls } from '@react-three/drei';

const initialValues = {
  cable: {
    model: 'Charger',
    sleeveType: 'MDPC_X',
    sleeveColor: 'black'
  },
  cableConnector: {},
  hostConnector: {
    model: 'USB_A',
    connectorFinish: 'Nickel',
    housingType: 'Heatshrink',
    subHousingType: null,
    housingFinish: null,
    heatshrinkColor: 'black',
    cerakoteColor: null
  },
  deviceConnector: {
    model: 'USB_C',
    connectorFinish: 'Nickel',
    housingType: 'Heatshrink',
    subHousingType: null,
    housingFinish: null,
    heatshrinkColor: 'black',
    cerakoteColor: null,
    ledColor: null
  }
};

export default function App() {
  const controlMap = useMemo(() => [{ name: 'toggleStats', keys: ['F4'] }], []);
  const { values, setFieldValue, setValues } = useFormik({
    initialValues
  });

  return (
    <Suspense fallback={<Loader />}>
      <Helmet title="Sakura Reveries Cable Builder" />
      <Container fluid className="g-0 h-100">
        <Row className="g-0 h-100">
          <Col xs={6} md={8} lg={9}>
            <KeyboardControls map={controlMap}>
              <Scene settings={values} />
            </KeyboardControls>
          </Col>
          <Col xs={6} md={4} lg={3}>
            <Sidebar
              values={values}
              setFieldValue={setFieldValue}
              setValues={setValues}
            />
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
}
