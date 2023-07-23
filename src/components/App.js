import { Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Suspense, useMemo } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { KeyboardControls } from '@react-three/drei';

import Loader from 'components/Loader';
import Sidebar from 'components/Sidebar';
import Scene from 'components/Scene';
import MessageProvider from 'components/MessageProvider';
import ForceOrientation from 'components/ForceOrientation';
import {
  cncHousingFinishes,
  connectorFinishes,
  environments,
  heatshrinkColors,
  housingTypes
} from 'utils';

const initialValues = {
  scene: {
    bgColor: '#8d5265',
    environment: environments[0].id,
    focusOn: 'center'
  },
  cable: {
    model: 'Charger',
    innerSleeveType: 'MDPC_X',
    innerSleeveColor: 'grandBleu',
    outerSleeveType: 'MDPC_X',
    outerSleeveColor: 'blackestBlack',
    opalSleeve: false,
    opalSleeveColor: null,
    connector: {
      model: 'FEMO',
      finish: cncHousingFinishes[1].id,
      innerHeatshrink: false,
      innerHeatshrinkHostColor: null,
      innerHeatshrinkDeviceColor: null,
      collarHeatshrink: false,
      collarHeatshrinkColor: null,
      collarAccent: false,
      collarAccentColor: null,
      cerakoteColor: null,
      hostDotColor: null,
      deviceDotColor: null
    }
  },
  hostConnector: {
    model: 'USB_A',
    connectorFinish: connectorFinishes[0].id,
    housingType: housingTypes[0].id,
    subHousingType: null,
    housingFinish: null,
    heatshrinkColor: heatshrinkColors[1].id,
    cerakoteColor: null
  },
  deviceConnector: {
    model: 'USB_C',
    connectorFinish: connectorFinishes[0].id,
    housingType: housingTypes[0].id,
    subHousingType: null,
    housingFinish: null,
    heatshrinkColor: heatshrinkColors[1].id,
    cerakoteColor: null,
    ledColor: null
  }
};

export default function App() {
  const { width } = useWindowSize();
  const controlMap = useMemo(
    () => [
      { name: 'toggleStats', keys: ['F4'] },
      { name: 'toggleGrid', keys: ['F8'] }
    ],
    []
  );

  const sidebarWidth = width >= 768 ? '30%' : '40%';
  const sceneWidth = width >= 768 ? '70%' : '60%';

  return (
    <MessageProvider>
      <Formik initialValues={initialValues}>
        <ForceOrientation allowLandscape>
          <Helmet title="Sakura Reveries Cable Builder" />
          <Suspense fallback={<Loader />}>
            <div className="sr-app-scene" style={{ width: sceneWidth }}>
              <KeyboardControls map={controlMap}>
                <Scene />
              </KeyboardControls>
            </div>
            <div
              style={{ width: sidebarWidth }}
              className="border-4 border-primary border-start h-100 sr-app-sidebar"
            >
              <Sidebar />
            </div>
          </Suspense>
        </ForceOrientation>
      </Formik>
    </MessageProvider>
  );
}
