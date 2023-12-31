import PropTypes from 'prop-types';
import { useCallback, useState, createContext } from 'react';

import { sceneBackgroundColor } from 'utils';

export const AdminModeContext = createContext({
  showStats: false,
  adminMode: false,
  innerSleeveColor: null,
  outerSleeveColor: null,
  outerSleeveOpacity: null,
  bgColor: null
});

export default function AdminModeProvider({ children }) {
  const [showStats, setShowStats] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [outerSleeveOpacity, setOuterSleeveOpacity] = useState(0.6);
  const [innerSleeveColor, setInnerSleeveColor] = useState('#ff0000');
  const [outerSleeveColor, setOuterSleeveColor] = useState('#0000ff');
  const [bgColor, setBgColor] = useState(sceneBackgroundColor);

  const toggleAdminMode = useCallback(
    () => setAdminMode((prevVal) => !prevVal),
    []
  );
  const toggleShowStats = useCallback(
    () => setShowStats((prevVal) => !prevVal),
    []
  );

  return (
    <AdminModeContext.Provider
      value={{
        adminMode,
        toggleAdminMode,
        showStats,
        toggleShowStats,
        bgColor,
        innerSleeveColor,
        outerSleeveColor,
        outerSleeveOpacity,
        setBgColor,
        setInnerSleeveColor,
        setOuterSleeveColor,
        setOuterSleeveOpacity
      }}
    >
      {children}
    </AdminModeContext.Provider>
  );
}

AdminModeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
