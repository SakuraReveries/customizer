import { Center } from '@react-three/drei';
import { useFormikContext } from 'formik';
import { useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { DoubleSide } from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import useModel from 'hooks/useModel';
import useTextures from 'hooks/useTextures';
import { deskDims, matDims } from 'utils';

export default function Desk() {
  const matRef = useRef();
  const { values } = useFormikContext();
  const nodes = useModel({
    path: './models/DeskMat.3mf'
  });
  const matProps = useTextures(values.scene.deskMaterial);

  // useLayoutEffect(() => {
  //   if (matRef.current) {
  //     console.dir('setting needsUpdate');
  //     matRef.current.needsUpdate = true;
  //   }
  // }, [values.scene.deskMatTexture]);

  return (
    <group>
      {values.scene.deskMat && (
        <group position={[0, -10, 0]}>
          <Center top>
            <mesh
              dispose={null}
              castShadow
              geometry={nodes['OpenSCAD Model'].geometry}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            >
              <meshStandardMaterial color="#262323" />
            </mesh>
          </Center>
          <mesh
            dispose={null}
            position={[0, 4.1, 0]}
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[matDims[0] - 60, matDims[2] - 60, 64, 64]} />
            <meshPhysicalMaterial side={DoubleSide}>
              {Boolean(values.scene.deskMatTexture) && (
                <canvasTexture
                  ref={matRef}
                  attach="map"
                  image={values.scene.deskMatTexture}
                />
              )}
            </meshPhysicalMaterial>
          </mesh>
        </group>
      )}
      <mesh dispose={null} position={[0, -20, 0]} receiveShadow>
        <boxGeometry args={[...deskDims, 32, 8, 16]} attach="geometry" />
        <meshPhysicalMaterial
          {...matProps}
          normalScale={0.4}
          aoMapIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
