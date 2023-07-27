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
  const { values } = useFormikContext();
  const matRef = useRef();
  const nodes = useModel({
    path: './models/DeskMat.3mf'
  });
  const matProps = useTextures(values.scene.deskMaterial);
  const matWidthScale = (values.scene.deskMatWidth * 25.4) / matDims[0];
  const matHeightScale = (values.scene.deskMatHeight * 25.4) / matDims[2];

  return (
    <group>
      {values.scene.deskMat && (
        <group position={[0, -5, 0]}>
          <Center top onCentered={(cb) => cb.center}>
            <mesh
              dispose={null}
              castShadow
              geometry={nodes['OpenSCAD Model'].geometry}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              scale={[matHeightScale, matWidthScale, 1]}
            >
              <meshPhysicalMaterial color="#262323" roughness={0.7} />
            </mesh>
          </Center>
          {Boolean(values.scene.deskMatTexture) && (
            <mesh
              dispose={null}
              position={[0, matDims[1] + 0.25, 0]}
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry
                args={[
                  matDims[0] * matWidthScale - 30,
                  matDims[2] * matHeightScale - 30,
                  64,
                  64
                ]}
              />
              <meshPhysicalMaterial side={DoubleSide}>
                <canvasTexture
                  ref={matRef}
                  attach="map"
                  image={values.scene.deskMatTexture}
                />
              </meshPhysicalMaterial>
            </mesh>
          )}
        </group>
      )}
      <mesh dispose={null} position={[0, -15, 0]} receiveShadow>
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
