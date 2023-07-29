import { forwardRef } from 'react';
import { useFormikContext } from 'formik';

import Material from 'components/Material';
import {
  cerakoteColors,
  cncHousingFinishes,
  heatshrinkColors,
  housingTypes
} from 'utils';
import useModel from 'hooks/useModel';

function CableConnector(props, ref) {
  const { values } = useFormikContext();
  const {
    model,
    finish,
    innerHeatshrink,
    /* eslint-disable no-unused-vars */
    collarHeatshrink,
    cerakoteColor,
    hostSide: {
      alignmentDotColor: alignmentDotHostColor,
      innerHeatshrinkColor: innerHeatshrinkHostColor,
      collarHeatshrinkColor: collarHeatshrinkHostColor,
      collarAccent,
      collarAccentColor
    },
    deviceSide: {
      alignmentDotColor: alignmentDotDeviceColor,
      innerHeatshrinkColor: innerHeatshrinkDeviceColor,
      collarHeatshrinkColor: collarHeatshrinkDeviceColor
    }
  } = values.cableConnector;
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
