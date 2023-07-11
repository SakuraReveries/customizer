import { contrastColor } from 'contrast-color';
import PropTypes from 'prop-types';
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

export default function ColorPicker({ colors, onChange, value }) {
  return (
    <Container fluid className="g-0 d-flex">
      <Row className="g-0 w-100">
        {colors.map(({ id, name, hex }) => (
          <Col xs={2} key={id} className="g-2 d-flex justify-content-center">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>{name}</Tooltip>}
            >
              <button
                className="btn btn-sm"
                style={{
                  display: 'block',
                  height: 32,
                  width: 32,
                  backgroundColor: hex,
                  cursor: 'pointer',
                  border:
                    value === id
                      ? `2px dashed ${contrastColor({ bgColor: hex })}`
                      : null
                }}
                onClick={(event) => {
                  event.preventDefault();
                  onChange(id);
                }}
              />
            </OverlayTrigger>
          </Col>
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
      hex: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
