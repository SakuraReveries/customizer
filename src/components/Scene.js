import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { Stage, Center, OrbitControls } from '@react-three/drei';
// eslint-disable-next-line import/no-unresolved
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import Cable from 'components/Cable';
import Connector from 'components/Connector';
import { cableAttachments } from 'utils';

export default function Scene({ settings }) {
  return (
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
          <Cable model={settings.cable.model} color={settings.cable.color} />
          <Connector
            model={settings.deviceConnector.model}
            position={
              cableAttachments[settings.cable.model]?.deviceConnector ?? [
                0, 0, 0
              ]
            }
          />
          <Connector
            model={settings.hostConnector.model}
            position={
              cableAttachments[settings.cable.model]?.hostConnector ?? [0, 0, 0]
            }
          />
        </Center>
      </Stage>
      <OrbitControls makeDefault />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={320} />
      </EffectComposer>
    </Canvas>
  );
}

Scene.propTypes = {
  settings: PropTypes.object.isRequired
};
