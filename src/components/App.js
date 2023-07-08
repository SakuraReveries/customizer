import PropTypes from 'prop-types';
import { Stage, OrbitControls, Center } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom
  // eslint-disable-next-line
} from '@react-three/postprocessing';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Suspense, useCallback, useState } from 'react';
import Loader from './Loader';

export function Connector(props) {
  const obj = useLoader(STLLoader, `./${props.model}.stl`);

  return (
    <mesh {...props} castShadow receiveShadow>
      <primitive object={obj} attach="geometry" />
      <meshPhysicalMaterial
        color="#848789"
        metalness={0.8}
        roughness={0.3}
        reflectivity={0.2}
        clearcoat={0.3}
      />
    </mesh>
  );
}

Connector.propTypes = {
  model: PropTypes.string.isRequired
};

export function Cable(props) {
  const [highlight, setHighlight] = useState(false);
  const obj = useLoader(STLLoader, './cable.stl');

  const enableHighlight = useCallback(() => setHighlight(true), []);
  const disableHighlight = useCallback(() => setHighlight(false), []);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      onPointerEnter={enableHighlight}
      onPointerLeave={disableHighlight}
    >
      <primitive object={obj} attach="geometry" />
      <meshPhysicalMaterial
        color="#005aa0"
        specularColor="#aaaaaa"
        specularIntensity={4}
        emissive="#ffffff"
        emissiveIntensity={highlight ? 0.2 : 0}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas shadows>
        <color attach="background" args={['#e3be9b']} />
        <Stage
          intensity={0.1}
          adjustCamera={1}
          shadows="accumulative"
          environment="apartment"
          preset="rembrandt"
        >
          <Center rotation={[Math.PI / 2, 0, 0]}>
            <Cable />
            <Connector
              model="USB_C"
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -100, -8]}
            />
            <Connector
              model="USB_A"
              rotation={[-Math.PI / 2, 0, 0]}
              position={[95, -120, 8]}
            />
          </Center>
        </Stage>
        <OrbitControls makeDefault />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={320} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}
