import PropTypes from 'prop-types';

import { cerakoteColors, cncHousingFinishes, heatshrinkColors } from 'utils';
import useModel from 'hooks/useModel';
import { forwardRef } from 'react';
import Material from './Material';

function CableConnector(
  {
    model,
    finish,
    cerakoteColor,
    innerHeatshrink,
    innerHeatshrinkHostColor,
    innerHeatshrinkDeviceColor,
    /* eslint-disable no-unused-vars */
    collarHeatshrink,
    collarHeatshrinkColor,
    collarAccent,
    collarAccentColor,
    /* eslint-enable no-unused-vars */
    ...props
  },
  ref
) {
  const nodes = useModel({
    path: `./connectors/${model}.3mf`
  });

  return (
    <group {...props} ref={ref}>
      {innerHeatshrink && (
        <mesh castShadow receiveShadow geometry={nodes.Heatshrink_R.geometry}>
          <meshPhysicalMaterial
            color={
              heatshrinkColors.find(
                (color) => color.id === innerHeatshrinkDeviceColor
              ).hex
            }
            roughness={0.7}
            transparent={innerHeatshrinkDeviceColor === 'clear'}
            opacity={innerHeatshrinkDeviceColor === 'clear' ? 0.4 : 1}
          />
        </mesh>
      )}
      <mesh castShadow receiveShadow geometry={nodes.Connector.geometry}>
        <Material
          materials={cncHousingFinishes}
          materialId={finish}
          colors={cerakoteColors}
          colorId={finish === 'cerakote' ? cerakoteColor : null}
        />
      </mesh>
      {innerHeatshrink && (
        <mesh castShadow receiveShadow geometry={nodes.Heatshrink_L.geometry}>
          <meshPhysicalMaterial
            color={
              heatshrinkColors.find(
                (color) => color.id === innerHeatshrinkHostColor
              ).hex
            }
            roughness={0.7}
            transparent={innerHeatshrinkHostColor === 'clear'}
            opacity={innerHeatshrinkHostColor === 'clear' ? 0.4 : 1}
          />
        </mesh>
      )}
    </group>
  );
}

export default forwardRef(CableConnector);

CableConnector.propTypes = {
  model: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired,
  cerakoteColor: PropTypes.string,
  innerHeatshrink: PropTypes.bool.isRequired,
  innerHeatshrinkHostColor: PropTypes.string,
  innerHeatshrinkDeviceColor: PropTypes.string,
  collarHeatshrink: PropTypes.bool.isRequired,
  collarHeatshrinkColor: PropTypes.string,
  collarAccent: PropTypes.bool.isRequired,
  collarAccentColor: PropTypes.string
};
