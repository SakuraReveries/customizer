import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { Suspense, useMemo } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { KeyboardControls } from '@react-three/drei';

import Loader from 'components/Loader';
import Sidebar from 'components/Sidebar';
import Scene from 'components/Scene';

const initialValues = {
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
      innerHeatshrinkColor: null,
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
  const { values, setFieldValue, setValues } = useFormik({
    initialValues
  });

  let maxWidth = '50%';

  if (width >= 1200) {
    maxWidth = '25%';
  } else if (width >= 768) {
    maxWidth = '33%';
  }

  return (
    <Suspense fallback={<Loader />}>
      <Helmet title="Sakura Reveries Cable Builder" />
      <div className="sr-app-scene">
        <KeyboardControls map={controlMap}>
          <Scene settings={values} />
        </KeyboardControls>
      </div>
      <div
        style={{ maxWidth }}
        className="border-4 border-primary border-start h-100 sr-app-sidebar"
      >
        <Sidebar
          values={values}
          setFieldValue={setFieldValue}
          setValues={setValues}
        />
      </div>
    </Suspense>
  );
}
