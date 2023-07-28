import { Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Fragment, Suspense, useMemo } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { KeyboardControls } from '@react-three/drei';

import Loader from 'components/Loader';
import Sidebar from 'components/Sidebar';
import Scene from 'components/Scene';
import { initialFormValues } from 'utils';

export default function App() {
  const { width } = useWindowSize();
  const controlMap = useMemo(
    () => [
      { name: 'toggleStats', keys: ['F4'] },
      { name: 'toggleAdmin', keys: ['F8'] }
    ],
    []
  );

  const sidebarWidth = width >= 768 ? '30%' : '40%';
  const sceneWidth = width >= 768 ? '70%' : '60%';

  return (
    <Fragment>
      <Helmet title="Sakura Reveries Cable Builder">
        <link
          rel="icon"
          type="image/png"
          href="//www.sakurareveries.com/cdn/shop/files/sakurapetal.png"
        />
      </Helmet>
      <Formik initialValues={initialFormValues}>
        <Suspense fallback={<Loader />}>
          <div className="sr-app-scene" style={{ width: sceneWidth }}>
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
    </Fragment>
  );
}
