import { useContext } from 'react';

import { AdminModeContext } from 'components/contexts/AdminModeProvider';

export default function useAdminMode() {
  return useContext(AdminModeContext);
}
