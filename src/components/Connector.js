import PropTypes from 'prop-types';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { connectorRotations } from 'utils';

export default function Connector({ model, ...props }) {
  const obj = useLoader(STLLoader, `./${model}.stl`);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      rotation={connectorRotations[model] ?? [0, 0, 0]}
    >
      <primitive object={obj} attach="geometry" />
      <meshPhysicalMaterial
        color="#848789"
        metalness={0.8}
        roughness={0.3}
        reflectivity={0.2}
      />
    </mesh>
  );
}

Connector.propTypes = {
  model: PropTypes.string.isRequired
};
