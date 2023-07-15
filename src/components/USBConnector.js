import PropTypes from 'prop-types';
import { interpolateHslLong } from 'd3-interpolate';
import { useMemo, useLayoutEffect, useRef } from 'react';
import { useFrame, useGraph, useLoader } from '@react-three/fiber';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
// eslint-disable-next-line import/no-unresolved
import { Color } from 'three';

import {
  connectorOffsets,
  connectorRotations,
  cncHousingFinishColors,
  connectorFinishColors,
  cerakoteColors,
  heatshrinkColors,
  ledColors
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
  const cachedObj = useLoader(
    ThreeMFLoader,
    `./connectors/${model}_${housingType}${
      subHousingType ? `_${subHousingType}` : ''
    }.3mf`
  );
  const obj = useMemo(() => cachedObj.clone(), [cachedObj]);
  const ledMatRef = useRef();
  const { nodes } = useGraph(obj);

  useFrame((scene) => {
    if (!ledMatRef.current) {
      return;
    }

    if (ledColor?.startsWith?.('rgb')) {
      const interpolatorKey =
        (scene.clock.getElapsedTime() / 20) % 1 > 0.5 ? 'rising' : 'falling';
      const lerpAlpha = (scene.clock.getElapsedTime() / 10) % 1;
      const interpolator = interpolators[interpolatorKey];
      const newColor = new Color(interpolator(lerpAlpha));

      ledMatRef.current.color.set(newColor);
      ledMatRef.current.emissive.set(newColor);
    } else {
      const { hex } = ledColors.find((color) => color.id === ledColor);

      ledMatRef.current.color.set(hex);
      ledMatRef.current.emissive.set(hex);
    }
  });

  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) =>
      node.geometry.computeVertexNormals()
    );
  }, [nodes]);

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
          color={connectorFinishColors[connectorFinish]}
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
                : cncHousingFinishColors[housingFinish]
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
