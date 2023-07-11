import PropTypes from 'prop-types';

import { connectorOffsets, connectorRotations } from 'utils';
import useConnectorMesh from 'hooks/useConnectorMesh';

export default function Connector({
  finish,
  heatshrinkColor,
  model,
  ...props
}) {
  const { meshRef, obj } = useConnectorMesh(model, finish, heatshrinkColor);

  return (
    <group {...props}>
      <mesh
        position={connectorOffsets[model] ?? [0, 0, 0]}
        rotation={connectorRotations[model] ?? [0, 0, 0]}
        castShadow
        receiveShadow
        ref={meshRef}
      >
        <primitive object={obj} />
      </mesh>
    </group>
  );
}

Connector.propTypes = {
  model: PropTypes.string.isRequired,
  heatshrinkColor: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired
};
