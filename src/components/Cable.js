import PropTypes from 'prop-types';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

export default function Cable({ model, color, ...props }) {
  const obj = useLoader(STLLoader, `./${model}.stl`);

  return (
    <mesh {...props} castShadow receiveShadow>
      <primitive object={obj} attach="geometry" />
      <meshPhysicalMaterial
        color={color}
        specularColor="#aaaaaa"
        specularIntensity={4}
        clearcoat={0.2}
      />
    </mesh>
  );
}

Cable.propTypes = {
  model: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
