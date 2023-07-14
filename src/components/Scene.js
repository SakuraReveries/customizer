import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import {
  Stage,
  Center,
  OrbitControls,
  PerspectiveCamera,
  Stats,
  useKeyboardControls,
  PerformanceMonitor
} from '@react-three/drei';
// eslint-disable-next-line import/no-unresolved
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import Cable from 'components/Cable';
import USBConnector from 'components/USBConnector';
import { cableAttachments } from 'utils';
import { useEffect, useState } from 'react';
import CableConnector from './CableConnector';

const getPerformanceBounds = (refreshRate) =>
  refreshRate > 60 ? [40, refreshRate] : [40, 60];

export default function Scene({ settings }) {
  const [degradedPerformance, setDegradedPerformance] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const attachments = cableAttachments[settings.cable.model];
  const toggleStats = useKeyboardControls((state) => state.toggleStats);

  useEffect(() => {
    if (toggleStats) {
      setShowStats((prevStats) => !prevStats);
    }
  }, [toggleStats]);

  return (
    <Canvas
      shadows={!degradedPerformance}
      gl={{ antialias: false }}
      style={{ height: '100vh' }}
      dpr={degradedPerformance ? 0.75 : 1.5}
    >
      <color attach="background" args={['#f3969a']} />
      <Stage
        intensity={0.1}
        adjustCamera={1.2}
        shadows={{ type: 'accumulative', frames: 20 }}
        environment="apartment"
      >
        <Center rotation={[Math.PI / 2, 0, Math.PI]}>
          <Cable {...settings.cable} />
          <group position={attachments?.deviceConnector ?? [0, 0, 0]}>
            <USBConnector {...settings.deviceConnector} />
          </group>
          <group position={attachments?.hostConnector ?? [0, 0, 0]}>
            <USBConnector {...settings.hostConnector} />
          </group>
          <group position={attachments?.cableConnector ?? [0, 0, 0]}>
            <CableConnector {...settings.cableConnector} />
          </group>
        </Center>
      </Stage>
      <PerspectiveCamera makeDefault fov={20} position={[-12, 8, 10]} />
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} panSpeed={0} />
      {showStats && <Stats />}
      {!degradedPerformance && (
        <EffectComposer disableNormalPass>
          <N8AO aoRadius={4} intensity={10} distanceFalloff={1} />
        </EffectComposer>
      )}
      <PerformanceMonitor
        iterations={5}
        threshold={0.6}
        factor={1}
        step={-1}
        bounds={getPerformanceBounds}
        onIncline={() => setDegradedPerformance(false)}
        onDecline={() => setDegradedPerformance(true)}
      />
    </Canvas>
  );
}

Scene.propTypes = {
  settings: PropTypes.object.isRequired
};
