import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import { MessageContext } from 'hooks/useMessages';

export default function MessageProvider({ children }) {
  const [messages, setMessages] = useState({
    alignmentDotColor: false,
    cerakoteColor: false,
    glowCnc: false
  });

  const enableMessage = useCallback(
    (key) =>
      setMessages((prev) => ({
        ...prev,
        [key]: true
      })),
    []
  );
  const disableMessage = useCallback(
    (key) =>
      setMessages((prev) => ({
        ...prev,
        [key]: false
      })),
    []
  );

  return (
    <MessageContext.Provider
      value={{ messages, enableMessage, disableMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired
};
