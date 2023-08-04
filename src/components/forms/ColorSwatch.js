import PropTypes from 'prop-types';
import { contrastColor } from 'contrast-color';
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useMemo } from 'react';

import { findById } from 'utils';

export default function ColorSwatch({
  id,
  name,
  image,
  color,
  colors,
  colorList,
  active = false,
  children,
  onChange
}) {
  const style = useMemo(() => {
    const result = {};

    if (colors) {
      const [firstColor, secondColor] = colors.map(
        (id) => findById(colorList, id).color
      );

      result.backgroundColor = firstColor;
      result.backgroundImage = `linear-gradient(45deg, ${firstColor} 50%, ${secondColor} 50%)`;
    } else if (color) {
      result.backgroundColor = color;
    }

    if (image) {
      result.backgroundImage = `url(${image})`;
    }

    const bgColor = contrastColor({ bgColor: result.backgroundColor });

    result.color = bgColor;
    result.border = active ? `2px dashed ${bgColor}` : '0';

    return result;
  }, [image, active, colors, color, colorList]);

  return (
    <Col xs={2} className="g-2 d-flex justify-content-center">
      <OverlayTrigger placement="bottom" overlay={<Tooltip>{name}</Tooltip>}>
        <button
          type="button"
          className="btn btn-sm sr-color-swatch p-0"
          style={style}
          onClick={() => onChange(id)}
        >
          {children}
        </button>
      </OverlayTrigger>
    </Col>
  );
}

ColorSwatch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  color: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  colorList: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
};
