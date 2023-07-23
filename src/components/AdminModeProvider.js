import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import { AdminModeContext } from 'hooks/useAdminMode';

export default function AdminModeProvider({ children }) {
  const [adminMode, setAdminMode] = useState(false);
  const [outerSleeveOpacity, setOuterSleeveOpacity] = useState(0.6);
  const [innerSleeveColor, setInnerSleeveColor] = useState('#ff0000');
  const [outerSleeveColor, setOuterSleeveColor] = useState('#0000ff');

  const toggleAdminMode = useCallback(
    () => setAdminMode((prevVal) => !prevVal),
    []
  );

  return (
    <AdminModeContext.Provider
      value={{
        adminMode,
        toggleAdminMode,
        innerSleeveColor,
        outerSleeveColor,
        outerSleeveOpacity,
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
