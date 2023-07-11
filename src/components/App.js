import { useFormik } from 'formik';
import { Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Loader from 'components/Loader';
import Sidebar from 'components/Sidebar';
import Scene from 'components/Scene';
import { Helmet } from 'react-helmet';

const initialValues = {
  cable: {
    model: 'Charger',
    color: 'red'
  },
  hostConnector: {
    model: 'USB_A',
    heatshrinkColor: 'green',
    finish: 'Standard'
  },
  deviceConnector: {
    model: 'USB_C',
    heatshrinkColor: 'blue',
    finish: 'Standard'
  }
};

export default function App() {
  const { values, setFieldValue } = useFormik({
    initialValues
  });

  return (
    <Suspense fallback={<Loader />}>
      <Helmet title="Sakura Reveries Cable Builder" />
      <Container fluid className="g-0 h-100">
        <Row className="g-0 h-100">
          <Col xs={8} sm={9}>
            <Scene settings={values} />
          </Col>
          <Col xs={4} sm={3}>
            <Sidebar values={values} setFieldValue={setFieldValue} />
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
}
