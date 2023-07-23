import PropTypes from 'prop-types';

import useModel from 'hooks/useModel';
import { mdpcxColors, techFlexColors, cableRotations } from 'utils';
import { forwardRef } from 'react';

function Cable(
  {
    innerSleeveType,
    innerSleeveColor,
    outerSleeveType,
    outerSleeveColor,
    model,
    ...props
  },
  ref
) {
  const nodes = useModel({
    path: `./cables/${model}.3mf`
  });
  const innerColors =
    innerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const innerColor = innerColors.find(
    (color) => color.id === innerSleeveColor
  ).hex;
  const outerColors =
    outerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const outerColor = outerColors.find(
    (color) => color.id === outerSleeveColor
  ).hex;

  return (
    <group {...props} rotation={cableRotations[model]} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenSCAD Model'].geometry}
        dispose={null}
      >
        <meshPhysicalMaterial
          color={innerColor}
          transparent
          opacity={innerSleeveColor === 'clear' ? 0.2 : 1.0}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenSCAD Model'].geometry}
        dispose={null}
      >
        <meshPhysicalMaterial
          color={outerColor}
          transparent
          opacity={outerSleeveColor === 'clear' ? 0.2 : 0.6}
        />
      </mesh>
    </group>
  );
}

export default forwardRef(Cable);

Cable.propTypes = {
  model: PropTypes.string.isRequired,
  innerSleeveType: PropTypes.string.isRequired,
  innerSleeveColor: PropTypes.string.isRequired,
  outerSleeveType: PropTypes.string.isRequired,
  outerSleeveColor: PropTypes.string.isRequired
};
