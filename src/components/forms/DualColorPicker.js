import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import ColorSwatch from 'components/forms/ColorSwatch';

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
        {colors.map((color) => (
          <ColorSwatch
            key={color.id}
            {...color}
            active={color.id === hostValue || color.id === deviceValue}
            onChange={(id) => {
              setNextValue((prevVal) =>
                prevVal === 'host' ? 'device' : 'host'
              );
              onChange(nextValue, id);
            }}
            colorList={colors}
          >
            {hostValue === color.id && deviceValue === color.id && (
              <span>H/D</span>
            )}
            {hostValue === color.id && deviceValue !== color.id && (
              <span>H</span>
            )}
            {deviceValue === color.id && hostValue !== color.id && (
              <span>D</span>
            )}
          </ColorSwatch>
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
      color: PropTypes.string.isRequired,
      image: PropTypes.string,
      colors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  hostValue: PropTypes.string,
  deviceValue: PropTypes.string
};
