import { Fragment, useEffect, useState, useRef, useMemo } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { useFormikContext } from 'formik';
import {
  Stage,
  OrbitControls,
  PerspectiveCamera,
  Stats,
  useKeyboardControls,
  PerformanceMonitor,
  Environment,
  Bounds,
  Center
} from '@react-three/drei';
// eslint-disable-next-line import/no-unresolved
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import Cable from 'components/Cable';
import USBConnector from 'components/USBConnector';
import CableConnector from 'components/CableConnector';
import CameraController from 'components/CameraController';
import Desk from 'components/Desk';
import useMessages from 'hooks/useMessages';
import useAdminMode from 'hooks/useAdminMode';
import { cableAttachments, sceneBackgroundColor } from 'utils';

const getPerformanceBounds = (refreshRate) =>
  refreshRate > 60 ? [30, refreshRate] : [25, 60];

export default function Scene() {
  const cableRef = useRef();
  const hostConnectorRef = useRef();
  const cableConnectorRef = useRef();
  const deviceConnectorRef = useRef();
  const refs = useMemo(
    () => ({
      center: cableRef,
      hostConnector: hostConnectorRef,
      deviceConnector: deviceConnectorRef,
      cableConnector: cableConnectorRef
    }),
    [cableRef, hostConnectorRef, deviceConnectorRef, cableConnectorRef]
  );
  const { messages, disableMessage } = useMessages();
  const { values: settings, setFieldValue } = useFormikContext();
  const [degradedPerformance, setDegradedPerformance] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const toggleStats = useKeyboardControls((state) => state.toggleStats);
  const { adminMode, bgColor, toggleAdminMode } = useAdminMode();
  const toggleAdmin = useKeyboardControls((state) => state.toggleAdmin);
  const attachments = cableAttachments[settings.cable.model];

  useEffect(() => {
    if (toggleStats) {
      setShowStats((prevStats) => !prevStats);
    }
  }, [toggleStats]);

  useEffect(() => {
    if (toggleAdmin && toggleAdminMode) {
      toggleAdminMode();
    }
  }, [toggleAdmin, toggleAdminMode]);

  return (
    <Fragment>
      <div
        style={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 1000,
          width: 250,
          height: '100%',
          opacity: 0.6
        }}
      >
        {settings.scene.focusOn !== 'center' && (
          <Button
            onClick={() => setFieldValue('scene.focusOn', 'center')}
            size="sm"
            className="mb-2"
          >
            Reset Camera
          </Button>
        )}
        {messages.alignmentDotColor && (
          <Alert
            variant="info"
            dismissible
            onClose={() => disableMessage('alignmentDotColor')}
          >
            For alignment dot colors not listed or custom color tones please
            contact me for a one on one consultation. Please note colors are an
            approximate representation of the real to life colors and can vary
            based on display and lighting conditions.
          </Alert>
        )}
        {messages.cerakoteColor && (
          <Alert
            variant="info"
            dismissible
            onClose={() => disableMessage('cerakoteColor')}
          >
            Please note colors are an approximate representation of the real to
            life colors and can vary based on display and lighting conditions.
          </Alert>
        )}
        {messages.glowCnc && (
          <Alert
            variant="info"
            dismissible
            onClose={() => disableMessage('glowCnc')}
          >
            Glow CNC provides options for LED colors in static or
            non-addressable RGB formats. The LED remains powered on when the
            cable is connected to a power source, and there is no software
            control over the RGB colors. The diffuser ring appears white when
            powered off but can be custom dyed. Feel free to reach out for
            custom dyed quotes or any connector-related inquiries before
            purchasing.
          </Alert>
        )}
      </div>
      <Canvas
        shadows={!degradedPerformance}
        gl={{ antialias: false }}
        style={{ height: '100vh' }}
        dpr={degradedPerformance ? 0.75 : 1.5}
      >
        <color
          attach="background"
          args={[adminMode ? bgColor : sceneBackgroundColor]}
        />
        <Stage
          intensity={0.1}
          adjustCamera={false}
          shadows={{ type: 'accumulative', frames: 40 }}
          environment={null}
        >
          <Desk />
          <Bounds fit clip observe damping={4} margin={1.5}>
            <CameraController refs={refs} focusOn={settings.scene.focusOn} />
            <Center top>
              <group>
                <Cable {...settings.cable} ref={cableRef} />
                <group {...attachments?.deviceConnector}>
                  <USBConnector
                    {...settings.deviceConnector}
                    ref={deviceConnectorRef}
                  />
                </group>
                <group {...attachments?.hostConnector}>
                  <USBConnector
                    {...settings.hostConnector}
                    ref={hostConnectorRef}
                  />
                </group>
                {settings.cable.model !== 'Charger' && (
                  <group {...attachments?.cableConnector}>
                    <CableConnector
                      {...settings.cable.connector}
                      ref={cableConnectorRef}
                    />
                  </group>
                )}
              </group>
            </Center>
          </Bounds>
        </Stage>
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
    </Fragment>
  );
}
