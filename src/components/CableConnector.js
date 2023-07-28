import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Material from 'components/Material';
import {
  cerakoteColors,
  cncHousingFinishes,
  heatshrinkColors,
  housingTypes
} from 'utils';
import useModel from 'hooks/useModel';

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
          <Material
            materials={housingTypes}
            materialId={finish}
            colors={heatshrinkColors}
            colorId={innerHeatshrinkDeviceColor}
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
          <Material
            materials={housingTypes}
            materialId={finish}
            colors={heatshrinkColors}
            colorId={innerHeatshrinkHostColor}
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
