import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';
import { useLoader, useGraph } from '@react-three/fiber';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { mdpcxColors, techFlexColors } from 'utils';

export default function Cable({ sleeveType, sleeveColor, model, ...props }) {
  const obj = useLoader(ThreeMFLoader, `./cables/${model}.3mf`);
  const { nodes } = useGraph(obj);

  const colors = sleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const color = colors.find((color) => color.id === sleeveColor).hex;

  useLayoutEffect(() => {
    nodes['OpenSCAD Model'].geometry.computeVertexNormals();
  }, [nodes]);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      geometry={nodes['OpenSCAD Model'].geometry}
      dispose={null}
    >
      <meshPhysicalMaterial color={color} />
    </mesh>
  );
}

Cable.propTypes = {
  model: PropTypes.string.isRequired,
  sleeveType: PropTypes.string.isRequired,
  sleeveColor: PropTypes.string.isRequired
};
