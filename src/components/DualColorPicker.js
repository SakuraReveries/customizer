import { contrastColor } from 'contrast-color';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

export default function DualColorPicker({
  colors,
  onChange,
  hostValue,
  deviceValue
}) {
  const [nextValue, setNextValue] = useState('host');

  return (
    <Container fluid className="g-0 d-flex">
      <Row className="g-0 w-100">
        {colors.map(({ id, name, hex, image }) => (
          <Col xs={2} key={id} className="g-2 d-flex justify-content-center">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{name}</Tooltip>}
            >
              <button
                className="btn btn-sm sr-color-picker-swatch d-flex p-0 justify-content-center align-items-center"
                style={
                  image
                    ? {
                        color: contrastColor({ bgColor: hex }),
                        backgroundImage: `url(${image})`,
                        border:
                          hostValue === id || deviceValue === id
                            ? `2px dashed ${contrastColor({ bgColor: hex })}`
                            : null
                      }
                    : {
                        color: contrastColor({ bgColor: hex }),
                        backgroundColor: hex,
                        border:
                          hostValue === id || deviceValue === id
                            ? `2px dashed ${contrastColor({ bgColor: hex })}`
                            : null
                      }
                }
                onClick={(event) => {
                  event.preventDefault();
                  onChange(nextValue, id);

                  setNextValue((currVal) =>
                    currVal === 'host' ? 'device' : 'host'
                  );
                }}
              >
                {hostValue === id && deviceValue === id && <span>H/D</span>}
                {hostValue === id && deviceValue !== id && <span>H</span>}
                {deviceValue === id && hostValue !== id && <span>D</span>}
              </button>
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

DualColorPicker.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hex: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  hostValue: PropTypes.string,
  deviceValue: PropTypes.string
};
