import { forwardRef, useMemo } from 'react';

import Material from 'components/Material';
import useModel from 'hooks/useModel';
import {
  mdpcxColors,
  techFlexColors,
  mdpcxCarbonColors,
  mdpcxLiquidColors,
  cableRotations
} from 'utils';
import useAdminMode from 'hooks/useAdminMode';
import { useFormikContext } from 'formik';

function Cable(props, ref) {
  const { values } = useFormikContext();
  const { innerSleeveColor, outerSleeveColor, model } = values.cable;
  const {
    adminMode,
    outerSleeveOpacity: customOuterSleeveOpacity,
    innerSleeveColor: customInnerSleeveColor,
    outerSleeveColor: customOuterSleeveColor
  } = useAdminMode();
  const nodes = useModel({
    path: `./cables/${model}.3mf`
  });
  const innerSleeveColors = useMemo(
    () => [...mdpcxColors, ...mdpcxCarbonColors],
    []
  );
  const outerSleeveColors = useMemo(
    () => [...techFlexColors, ...mdpcxLiquidColors],
    []
  );

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
            materials={innerSleeveColors}
            materialId={innerSleeveColor}
            transparent={innerSleeveColor === 'clear'}
            opacity={innerSleeveColor === 'clear' ? 0.2 : 1}
          />
        )}
      </mesh>
      {Boolean(outerSleeveColor) && (
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
              materials={outerSleeveColors}
              materialId={outerSleeveColor}
              transparent
              opacity={outerSleeveColor === 'clear' ? 0.2 : 0.6}
            />
          )}
        </mesh>
      )}
    </group>
  );
}

export default forwardRef(Cable);
