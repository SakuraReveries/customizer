import PropTypes from 'prop-types';
import { interpolateHslLong } from 'd3-interpolate';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// eslint-disable-next-line import/no-unresolved
import { Color } from 'three';

import useModel from 'hooks/useModel';
import {
  connectorOffsets,
  connectorRotations,
  cerakoteColors,
  heatshrinkColors,
  ledColors,
  cncHousingFinishes,
  connectorFinishes
} from 'utils';

const interpolators = {
  falling: interpolateHslLong('#ff0000', '#0000ff'),
  rising: interpolateHslLong('#0000ff', '#ff0000')
};

export default function USBConnector({
  connectorFinish,
  heatshrinkColor,
  subHousingType,
  cerakoteColor,
  housingFinish,
  housingType,
  ledColor,
  model,
  ...props
}) {
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
      const { hex } = ledColors.find((color) => color.id === ledColor);

      newColor = new Color(hex);
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
    >
      <mesh castShadow receiveShadow geometry={nodes.Connector.geometry}>
        <meshPhysicalMaterial
          color={connectorFinishes[connectorFinish].hex}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {Boolean(nodes.LED) && (
        <mesh castShadow receiveShadow geometry={nodes.LED.geometry}>
          <meshPhysicalMaterial ref={ledMatRef} />
        </mesh>
      )}
      {Boolean(nodes.Heatshrink) && (
        <mesh castShadow receiveShadow geometry={nodes.Heatshrink.geometry}>
          <meshPhysicalMaterial
            color={
              heatshrinkColors.find((color) => color.id === heatshrinkColor).hex
            }
            roughness={0.5}
            clearcoat={0.4}
            opacity={heatshrinkColor === 'clear' ? 0.7 : 0}
            transparent={heatshrinkColor === 'clear'}
          />
        </mesh>
      )}
      {Boolean(nodes.Housing) && (
        <mesh castShadow receiveShadow geometry={nodes.Housing.geometry}>
          <meshPhysicalMaterial
            color={
              housingFinish === 'Cerakote'
                ? cerakoteColors.find((color) => color.id === cerakoteColor).hex
                : cncHousingFinishes[housingFinish].hex
            }
            metalness={housingFinish === 'Cerakote' ? 0.4 : 1}
            roughness={housingFinish === 'Cerakote' ? 0.7 : 0.5}
          />
        </mesh>
      )}
    </group>
  );
}

USBConnector.propTypes = {
  connectorFinish: PropTypes.string.isRequired,
  housingType: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  heatshrinkColor: PropTypes.string,
  subHousingType: PropTypes.string,
  cerakoteColor: PropTypes.string,
  housingFinish: PropTypes.string,
  ledColor: PropTypes.string
};
