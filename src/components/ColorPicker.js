import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';

import ColorSwatch from './ColorSwatch';

export default function ColorPicker({ colors, onChange, value }) {
  return (
    <Container fluid className="g-0 d-flex">
      <Row className="g-0 w-100">
        {colors.map((color) => (
          <ColorSwatch
            key={color.id}
            {...color}
            active={color.id === value}
            onChange={onChange}
            colorList={colors}
          />
        ))}
      </Row>
    </Container>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
      image: PropTypes.string,
      colors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
