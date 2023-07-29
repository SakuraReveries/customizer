import PropTypes from 'prop-types';
import { interpolateHslLong } from 'd3-interpolate';
import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
// eslint-disable-next-line import/no-unresolved
import { Color } from 'three';
import { useFormikContext } from 'formik';

import Material from 'components/Material';
import useModel from 'hooks/useModel';
import {
  connectorOffsets,
  connectorRotations,
  cerakoteColors,
  heatshrinkColors,
  ledColors,
  cncHousingFinishes,
  connectorFinishes,
  housingTypes,
  findById
} from 'utils';

const interpolators = {
  falling: interpolateHslLong('#ff0000', '#0000ff'),
  rising: interpolateHslLong('#0000ff', '#ff0000')
};

function USBConnector({ type, ...props }, ref) {
  const { values } = useFormikContext();
  const {
    connectorFinish,
    heatshrinkColor,
    subHousingType,
    cerakoteColor,
    housingFinish,
    housingType,
    ledColor,
    model
  } = values[`${type}Connector`];
  const ledMatRef = useRef(null);
  const nodes = useModel({
    path: `./connectors/${model}_${housingType}${
      subHousingType ? `_${subHousingType}` : ''
    }.3mf`
  });

  useFrame((scene) => {
    if (!ledMatRef.current) {
      return;
    }

    let newColor = new Color();

    if (ledColor?.startsWith?.('rgb')) {
      const interpolatorKey =
        (scene.clock.getElapsedTime() / 20) % 1 > 0.5 ? 'rising' : 'falling';
      const lerpAlpha = (scene.clock.getElapsedTime() / 10) % 1;
      const interpolator = interpolators[interpolatorKey];

      newColor = new Color(interpolator(lerpAlpha));
    } else {
      newColor = new Color(findById(ledColors, ledColor).color);
    }

    ledMatRef.current.color.set(newColor);
    ledMatRef.current.emissive.set(newColor);
  });

  return (
    <group
      {...props}
      dispose={null}
      position={
        connectorOffsets[model][subHousingType || housingType] ?? [0, 0, 0]
      }
      rotation={
        connectorRotations[model][subHousingType || housingType] ?? [0, 0, 0]
      }
      ref={ref}
    >
      <mesh castShadow receiveShadow geometry={nodes.Connector.geometry}>
        <Material materials={connectorFinishes} materialId={connectorFinish} />
      </mesh>
      {Boolean(nodes.LED) && (
        <mesh castShadow receiveShadow geometry={nodes.LED.geometry}>
          <meshPhysicalMaterial ref={ledMatRef} />
        </mesh>
      )}
      {Boolean(nodes.Heatshrink) && (
        <mesh castShadow receiveShadow geometry={nodes.Heatshrink.geometry}>
          <Material
            materials={housingTypes}
            materialId={housingType}
            colors={heatshrinkColors}
            colorId={heatshrinkColor}
            opacity={heatshrinkColor === 'clear' ? 0.4 : 1}
            transparent={heatshrinkColor === 'clear'}
          />
        </mesh>
      )}
      {Boolean(nodes.Housing) && (
        <mesh castShadow receiveShadow geometry={nodes.Housing.geometry}>
          <Material
            materials={cncHousingFinishes}
            materialId={housingFinish}
            colors={cerakoteColors}
            colorId={housingFinish === 'cerakote' ? cerakoteColor : null}
          />
        </mesh>
      )}
    </group>
  );
}

export default forwardRef(USBConnector);

USBConnector.propTypes = {
  type: PropTypes.string.isRequired
};
