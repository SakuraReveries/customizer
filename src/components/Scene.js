import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Stage,
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
import CableConnector from 'components/CableConnector';
import { cableAttachments, cableOffsets } from 'utils';
import { useFormikContext } from 'formik';

const getPerformanceBounds = (refreshRate) =>
  refreshRate > 60 ? [40, refreshRate] : [40, 60];

export default function Scene() {
  const { values: settings } = useFormikContext();
  const [degradedPerformance, setDegradedPerformance] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const toggleStats = useKeyboardControls((state) => state.toggleStats);
  const attachments = cableAttachments[settings.cable.model];

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
      <color attach="background" args={[settings.scene.bgColor]} />
      <Stage
        intensity={0.1}
        adjustCamera={1.2}
        shadows={{ type: 'accumulative', frames: 20 }}
        environment={settings.scene.environment}
      >
        <group position={cableOffsets[settings.cable.model]}>
          <Cable {...settings.cable} />
          <group {...attachments?.deviceConnector}>
            <USBConnector {...settings.deviceConnector} />
          </group>
          <group {...attachments?.hostConnector}>
            <USBConnector {...settings.hostConnector} />
          </group>
          {settings.cable.model !== 'Charger' && (
            <group {...attachments?.cableConnector}>
              <CableConnector {...settings.cable.connector} />
            </group>
          )}
        </group>
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
