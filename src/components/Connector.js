import PropTypes from 'prop-types';
import { useMemo, useLayoutEffect } from 'react';
import { useGraph, useLoader } from '@react-three/fiber';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';

import {
  colors,
  finishColors,
  connectorOffsets,
  connectorRotations
} from 'utils';

export default function Connector({
  finish,
  heatshrinkColor,
  model,
  ...props
}) {
  const cachedObj = useLoader(ThreeMFLoader, `./connectors/${model}.3mf`);
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
    <group {...props} dispose={null}>
      <group
        position={connectorOffsets[model] ?? [0, 0, 0]}
        rotation={connectorRotations[model] ?? [0, 0, 0]}
      >
        <mesh castShadow receiveShadow geometry={nodes.Connector.geometry}>
          <meshPhysicalMaterial color={'#EFF4F7'} metalness={1} roughness={0} />
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
              color={finishColors[finish]}
              metalness={1}
              roughness={0.5}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

Connector.propTypes = {
  model: PropTypes.string.isRequired,
  heatshrinkColor: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired
};
