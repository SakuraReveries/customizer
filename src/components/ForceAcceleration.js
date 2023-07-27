import PropTypes from 'prop-types';
import { useDetectGPU } from '@react-three/drei';
import { isChrome, isChromium, isEdge, isFirefox } from 'react-device-detect';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function ForceAcceleration({ children }) {
  const [bypassed, setBypassed] = useState(false);
  const gpu = useDetectGPU({
    failIfMajorPerformanceCaveat: true
  });

  if (gpu?.tier > 0 || bypassed) {
    return children;
  } else {
    return (
      <div className="d-flex flex-column w-100 h-100 justify-content-center bg-secondary">
        <h1 className="display-4 text-center text-light">
          It looks like hardware acceleration is disabled.
        </h1>
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center">
              {(isChrome || isChromium || isEdge) && (
                <p className="text-light">
                  In your browser, go to Settings &gt; System and check
                  &quot;Use hardware acceleration when available.&quot;
                </p>
              )}
              {isFirefox && (
                <Row>
                  <Col xs={12} className="text-center">
                    <p className="text-light">
                      In your browser, go to Settings &gt; General &gt;
                      Performance and uncheck &quot;Use Recommended Performance
                      settings.&quot; Then uncheck the &quot;Use hardware
                      acceleration when available&quot; checkbox.
                    </p>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center">
              <p>
                <Button variant="danger" onClick={() => setBypassed(true)}>
                  <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth />{' '}
                  Load Anyway
                </Button>
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center">
              <p>
                Performance may be slow or unstable with hardware acceleration
                disabled.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ForceAcceleration.propTypes = {
  children: PropTypes.node.isRequired
};
