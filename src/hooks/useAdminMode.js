import { createContext, useContext } from 'react';

export const AdminModeContext = createContext({
  adminMode: false,
  innerSleeveColor: null,
  outerSleeveColor: null,
  outerSleeveOpacity: null
});

export default function useAdminMode() {
  return useContext(AdminModeContext);
}
