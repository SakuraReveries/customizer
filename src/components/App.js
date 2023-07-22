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
import { environments } from 'utils';

const initialValues = {
  scene: {
    bgColor: '#f3969a',
    environment: environments[0].id
  },
  cable: {
    model: 'Charger',
    innerSleeveType: 'MDPC_X',
    innerSleeveColor: 'grandBleu',
    outerSleeveType: 'MDPC_X',
    outerSleeveColor: 'blackestBlack',
    opalSleeve: false,
    opalSleeveColor: '',
    connector: {
      model: 'FEMO',
      finish: 'Silver',
      innerHeatshrink: false,
      innerHeatshrinkHostColor: null,
      innerHeatshrinkDeviceColor: null,
      collarHeatshrink: false,
      collarHeatshrinkColor: null,
      collarAccent: false,
      collarAccentColor: null,
      cerakoteColor: null,
      hostDotColor: 'white',
      deviceDotColor: 'white'
    }
  },
  hostConnector: {
    model: 'USB_A',
    connectorFinish: 'Nickel',
    housingType: 'Heatshrink',
    subHousingType: null,
    housingFinish: null,
    heatshrinkColor: 'black',
    cerakoteColor: null
  },
  deviceConnector: {
    model: 'USB_C',
    connectorFinish: 'Nickel',
    housingType: 'Heatshrink',
    subHousingType: null,
    housingFinish: null,
    heatshrinkColor: 'black',
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

  const sidebarWidth = width >= 768 ? '25%' : '40%';
  const sceneWidth = width >= 768 ? '75%' : '60%';

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
