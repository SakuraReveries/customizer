import { useTexture } from '@react-three/drei';
import { useFormikContext } from 'formik';
import { useLayoutEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { RepeatWrapping } from 'three';

import { findById, getMaterialUrl, backdropMaterials } from 'utils';

const width = 792;
const height = 500;

export default function Backdrop() {
  const { values } = useFormikContext();
  const backdropMaterial = findById(
    backdropMaterials,
    values.scene.backdropMaterial
  );
  const matProps = useTexture(
    Object.fromEntries(
      Object.entries(backdropMaterial.textures).map(([key, val]) => [
        key,
        getMaterialUrl(backdropMaterial.id, val)
      ])
    )
  );

  useLayoutEffect(() => {
    Object.keys(backdropMaterial.textures).forEach((key) => {
      console.dir(key);
      matProps[key].wrapS = matProps[key].wrapT = RepeatWrapping;
      matProps[key].repeat.set(
        backdropMaterial.repeat,
        backdropMaterial.repeat * (height / width)
      );
    });
  });

  return (
    <mesh dispose={null} position={[0, -15, 0]} receiveShadow>
      <boxGeometry args={[width, 25, height, 101, 4, 64]} attach="geometry" />
      <meshPhysicalMaterial
        {...matProps}
        normalScale={0.4}
        aoMapIntensity={0.4}
      />
    </mesh>
  );
}
