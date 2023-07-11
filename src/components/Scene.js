import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import {
  Stage,
  Center,
  OrbitControls,
  PerspectiveCamera,
  Stats
} from '@react-three/drei';
// eslint-disable-next-line import/no-unresolved
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import Cable from 'components/Cable';
import Connector from 'components/Connector';
import { cableAttachments } from 'utils';

export default function Scene({ settings }) {
  const attachments = cableAttachments[settings.cable.model];

  return (
    <Canvas shadows>
      <color attach="background" args={['#f3969a']} />
      <Stage
        intensity={0.1}
        adjustCamera={1.2}
        shadows="accumulative"
        environment="apartment"
      >
        <Center rotation={[Math.PI / 2, 0, Math.PI]}>
          <Cable {...settings.cable} />
          <Connector
            {...settings.deviceConnector}
            position={attachments?.deviceConnector ?? [0, 0, 0]}
          />
          <Connector
            {...settings.hostConnector}
            position={attachments?.hostConnector ?? [0, 0, 0]}
          />
        </Center>
      </Stage>
      <PerspectiveCamera makeDefault fov={20} position={[-12, 8, 10]} />
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} panSpeed={0} />
      <Stats />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={320} />
      </EffectComposer>
    </Canvas>
  );
}

Scene.propTypes = {
  settings: PropTypes.object.isRequired
};
