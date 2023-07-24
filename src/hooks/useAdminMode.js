import { createContext, useContext } from 'react';

export const AdminModeContext = createContext({
  adminMode: false,
  innerSleeveColor: null,
  outerSleeveColor: null,
  outerSleeveOpacity: null,
  bgColor: null
});

export default function useAdminMode() {
  return useContext(AdminModeContext);
}
