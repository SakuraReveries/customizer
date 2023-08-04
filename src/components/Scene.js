import { Fragment, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFormikContext } from 'formik';
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  useKeyboardControls,
  PerformanceMonitor,
  Environment,
  Bounds,
  Center,
  AccumulativeShadows,
  RandomizedLight
} from '@react-three/drei';
// eslint-disable-next-line import/no-unresolved
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import Desk from 'components/objects/Desk';
import Cable from 'components/objects/Cable';
import USBConnector from 'components/objects/USBConnector';
import CableConnector from 'components/objects/CableConnector';
import CameraController from 'components/CameraController';
import useAdminMode from 'hooks/useAdminMode';
import useCameraRefs from 'hooks/useCameraRefs';
import { cableAttachments, sceneBackgroundColor } from 'utils';

const getPerformanceBounds = (refreshRate) =>
  refreshRate > 60 ? [30, refreshRate] : [25, 60];

export default function Scene() {
  const refs = useCameraRefs();
  const { values: settings } = useFormikContext();
  const [degradedPerformance, setDegradedPerformance] = useState(false);
  const { showStats, adminMode, bgColor, toggleAdminMode, toggleShowStats } =
    useAdminMode();
  const toggleStats = useKeyboardControls((state) => state.toggleStats);
  const toggleAdmin = useKeyboardControls((state) => state.toggleAdmin);
  const attachments = cableAttachments[settings.cable.model];

  useEffect(() => {
    if (toggleStats && toggleShowStats) {
      toggleShowStats();
    }
  }, [toggleStats, toggleShowStats]);

  useEffect(() => {
    if (toggleAdmin && toggleAdminMode) {
      toggleAdminMode();
    }
  }, [toggleAdmin, toggleAdminMode]);

  return (
    <Canvas
      shadows={!degradedPerformance}
      gl={{ antialias: false }}
      style={{ height: '100vh' }}
      dpr={degradedPerformance ? 0.6 : 1.5}
    >
      <color
        attach="background"
        args={[adminMode ? bgColor : sceneBackgroundColor]}
      />
      <Desk />
      <Bounds fit clip damping={4} margin={2}>
        <CameraController refs={refs} focusOn={settings.scene.focusOn} />
        <Center top>
          <Cable ref={refs.center} />
          <group {...attachments?.deviceConnector}>
            <USBConnector type="device" ref={refs.deviceConnector} />
          </group>
          <group {...attachments?.hostConnector}>
            <USBConnector type="host" ref={refs.hostConnector} />
          </group>
          <group {...attachments?.cableConnector}>
            <CableConnector ref={refs.cableConnector} />
          </group>
        </Center>
      </Bounds>
      <Environment
        background={false}
        files={`./environments/${settings.scene.environment}.hdr`}
        path="/"
      />
      <PerspectiveCamera makeDefault fov={20} position={[-12, 20, 15]} />
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
      />
      {showStats && <Stats />}
      {!degradedPerformance && (
        <Fragment>
          <EffectComposer disableNormalPass>
            <N8AO aoRadius={8} intensity={10} distanceFalloff={1} />
          </EffectComposer>
          <group position={[0, -2, 0]}>
            <AccumulativeShadows
              temporal
              frames={100}
              scale={1000}
              alphaTest={0.9}
              toneMapped
            >
              <RandomizedLight
                amount={4}
                radius={100}
                ambient={0.8}
                intensity={1}
                position={[-100, 50, -100]}
                size={1000}
                bias={0.0001}
              />
            </AccumulativeShadows>
          </group>
        </Fragment>
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
