import PropTypes from 'prop-types';

import useModel from 'hooks/useModel';
import { mdpcxColors, techFlexColors } from 'utils';

export default function Cable({ sleeveType, sleeveColor, model, ...props }) {
  const nodes = useModel({
    path: `./cables/${model}.3mf`
  });
  const colors = sleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const color = colors.find((color) => color.id === sleeveColor).hex;

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      geometry={nodes['OpenSCAD Model'].geometry}
      dispose={null}
    >
      <meshPhysicalMaterial color={color} />
    </mesh>
  );
}

Cable.propTypes = {
  model: PropTypes.string.isRequired,
  sleeveType: PropTypes.string.isRequired,
  sleeveColor: PropTypes.string.isRequired
};
