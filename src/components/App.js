import { Formik } from 'formik';
import { Suspense, useMemo } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { KeyboardControls } from '@react-three/drei';

import Scene from 'components/Scene';
import Loader from 'components/Loader';
import Sidebar from 'components/Sidebar';
import Messages from 'components/Messages';
import ResetCamera from 'components/ResetCamera';
import { controlMap, initialFormValues } from 'utils';

export default function App() {
  const { width } = useWindowSize();
  const [sidebarWidth, sceneWidth] = useMemo(
    () => (width >= 768 ? ['30%', '70%'] : ['40%', '60%']),
    [width]
  );

  return (
    <Formik initialValues={initialFormValues}>
      <Suspense fallback={<Loader />}>
        <div className="sr-app-scene" style={{ width: sceneWidth }}>
          <ResetCamera />
          <Messages />
          <KeyboardControls map={controlMap}>
            <Scene />
          </KeyboardControls>
        </div>
        <div
          style={{ width: sidebarWidth }}
          className="border-4 border-primary border-start sr-app-sidebar"
        >
          <Sidebar />
        </div>
      </Suspense>
    </Formik>
  );
}
