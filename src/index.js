import { createRoot } from 'react-dom/client';

import './index.scss';
import App from 'components/App';
import MessageProvider from 'components/MessageProvider';
import AdminModeProvider from 'components/AdminModeProvider';
import EnsureGPU from 'components/EnsureGPU';
import EnsureLandscape from 'components/EnsureLandscape';

const root = createRoot(document.getElementById('root'));

root.render(
  <EnsureGPU>
    <EnsureLandscape>
      <MessageProvider>
        <AdminModeProvider>
          <App />
        </AdminModeProvider>
      </MessageProvider>
    </EnsureLandscape>
  </EnsureGPU>
);
