import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Material from 'components/Material';
import useModel from 'hooks/useModel';
import { mdpcxColors, techFlexColors, cableRotations } from 'utils';
import useAdminMode from 'hooks/useAdminMode';

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
  const {
    adminMode,
    outerSleeveOpacity: customOuterSleeveOpacity,
    innerSleeveColor: customInnerSleeveColor,
    outerSleeveColor: customOuterSleeveColor
  } = useAdminMode();
  const nodes = useModel({
    path: `./cables/${model}.3mf`
  });

  return (
    <group {...props} rotation={cableRotations[model]} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenSCAD Model'].geometry}
        dispose={null}
      >
        {adminMode ? (
          <meshPhysicalMaterial color={customInnerSleeveColor} />
        ) : (
          <Material
            materials={
              innerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors
            }
            materialId={innerSleeveColor}
            transparent={innerSleeveColor === 'clear'}
            opacity={innerSleeveColor === 'clear' ? 0.2 : 1}
          />
        )}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenSCAD Model'].geometry}
        dispose={null}
      >
        {adminMode ? (
          <meshPhysicalMaterial
            color={customOuterSleeveColor}
            transparent
            opacity={customOuterSleeveOpacity}
          />
        ) : (
          <Material
            materials={
              outerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors
            }
            materialId={outerSleeveColor}
            transparent={outerSleeveColor === 'clear'}
            opacity={outerSleeveColor === 'clear' ? 0.2 : 0.6}
          />
        )}
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
