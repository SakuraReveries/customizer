import PropTypes from 'prop-types';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { connectorOffsets, connectorRotations } from 'utils';
import { useMemo } from 'react';

export default function Connector({ model, ...props }) {
  const cachedObj = useLoader(STLLoader, `./connectors/${model}.stl`);
  const obj = useMemo(() => cachedObj.clone(), [cachedObj]);

  return (
    <group {...props}>
      <mesh
        position={connectorOffsets[model] ?? [0, 0, 0]}
        rotation={connectorRotations[model] ?? [0, 0, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={obj.clone()} attach="geometry" />
        <meshPhysicalMaterial
          color="#848789"
          metalness={0.8}
          roughness={0.3}
          reflectivity={0.2}
        />
      </mesh>
    </group>
  );
}

Connector.propTypes = {
  model: PropTypes.string.isRequired
};
