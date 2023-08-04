import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { createRoot } from 'react-dom/client';

import App from 'components/App';
import EnsureGPU from 'components/EnsureGPU';
import EnsureLandscape from 'components/EnsureLandscape';
import MessageProvider from 'components/contexts/MessagesProvider';
import AdminModeProvider from 'components/contexts/AdminModeProvider';
import './index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <Fragment>
    <Helmet title="Sakura Reveries Cable Builder">
      <link
        rel="icon"
        type="image/png"
        href="//www.sakurareveries.com/cdn/shop/files/sakurapetal.png"
      />
    </Helmet>
    <EnsureGPU>
      <EnsureLandscape>
        <MessageProvider>
          <AdminModeProvider>
            <App />
          </AdminModeProvider>
        </MessageProvider>
      </EnsureLandscape>
    </EnsureGPU>
  </Fragment>
);
