import PropTypes from 'prop-types';
import { useLayoutEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// eslint-disable-next-line import/no-unresolved
import { RepeatWrapping, TextureLoader } from 'three';

export default function Cable({ model, ...props }) {
  const cachedObj = useLoader(STLLoader, `./cables/${model}.stl`);
  const obj = useMemo(() => cachedObj.clone(), [cachedObj]);
  const [colorMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    './textures/Fabric012_1K_Color.png',
    './textures/Fabric012_1K_NormalGL.png',
    './textures/Fabric012_1K_Roughness.png'
  ]);

  useLayoutEffect(() => {
    colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(0.8, 0.8);
    normalMap.repeat.set(0.8, 0.8);
    colorMap.anisotropy = 16;
    normalMap.anisotropy = 16;
  }, [colorMap, normalMap]);

  return (
    <mesh {...props} castShadow receiveShadow>
      <primitive object={obj} attach="geometry" />
      <meshPhysicalMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        normalScale={0.2}
      />
    </mesh>
  );
}

Cable.propTypes = {
  model: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
