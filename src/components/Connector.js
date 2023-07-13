import PropTypes from 'prop-types';
import { useMemo, useLayoutEffect } from 'react';
import { useGraph, useLoader } from '@react-three/fiber';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';

import {
  colors,
  connectorOffsets,
  connectorRotations,
  cncHousingFinishColors,
  connectorFinishColors,
  cerakoteColors
} from 'utils';

export default function Connector({
  connectorFinish,
  heatshrinkColor,
  subHousingType,
  cerakoteColor,
  housingFinish,
  housingType,
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
  const { nodes } = useGraph(obj);

  useLayoutEffect(() => {
    nodes.Connector.geometry.computeVertexNormals();
    if (nodes.Heatshrink) {
      nodes.Heatshrink.geometry.computeVertexNormals();
    }
    if (nodes.Housing) {
      nodes.Housing.geometry.computeVertexNormals();
    }
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
      {Boolean(nodes.Heatshrink) && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Heatshrink.geometry}
          material={nodes.Heatshrink.material}
        >
          <meshPhysicalMaterial
            color={colors.find((color) => color.id === heatshrinkColor).hex}
            roughness={0.5}
            clearcoat={0.4}
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

Connector.propTypes = {
  connectorFinish: PropTypes.string.isRequired,
  housingType: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  heatshrinkColor: PropTypes.string,
  subHousingType: PropTypes.string,
  cerakoteColor: PropTypes.string,
  housingFinish: PropTypes.string
};
