import { useFormikContext } from 'formik';
import useTextures from 'hooks/useTextures';

import { backdropDims } from 'utils';

export default function Desk() {
  const { values } = useFormikContext();
  const matProps = useTextures(values.scene.backdropMaterial);

  return (
    <mesh dispose={null} position={[0, -15, 0]} receiveShadow>
      <boxGeometry args={[...backdropDims, 101, 4, 64]} attach="geometry" />
      <meshPhysicalMaterial
        {...matProps}
        normalScale={0.4}
        aoMapIntensity={0.4}
      />
    </mesh>
  );
}
