import { contrastColor } from 'contrast-color';
import PropTypes from 'prop-types';
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { findById } from 'utils';

export default function ColorPicker({ colors, onChange, value }) {
  return (
    <Container fluid className="g-0 d-flex">
      <Row className="g-0 w-100">
        {colors.map(({ id, name, color, image, colors: innerColors }) => {
          const style = {};

          if (image) {
            style.backgroundImage = `url(${image})`;
          } else if (color) {
            style.backgroundColor = color;
          } else if (innerColors) {
            const [firstColor, secondColor] = [
              findById(colors, innerColors[0]).color,
              findById(colors, innerColors[1]).color
            ];

            style.backgroundColor = firstColor;
            style.backgroundImage = `linear-gradient(45deg, ${firstColor} 50%, ${secondColor} 50%)`;
          }

          return (
            <Col xs={2} key={id} className="g-2 d-flex justify-content-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{name}</Tooltip>}
              >
                <button
                  className="btn btn-sm sr-color-picker-swatch p-0"
                  style={{
                    ...style,
                    border:
                      value === id
                        ? `2px dashed ${contrastColor({ bgColor: color })}`
                        : '0'
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    onChange(id);
                  }}
                />
              </OverlayTrigger>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
