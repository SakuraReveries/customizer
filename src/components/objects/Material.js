import PropTypes from 'prop-types';

import { getMaterialProps } from 'utils';

export default function Material({
  materials,
  materialId,
  colors = [],
  colorId,
  ...props
}) {
  return (
    <meshPhysicalMaterial
      {...getMaterialProps(materials, materialId, colors, colorId)}
      {...props}
    />
  );
}

Material.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  materialId: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.object),
  colorId: PropTypes.string
};
