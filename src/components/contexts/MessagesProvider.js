import PropTypes from 'prop-types';
import { useState, useCallback, createContext } from 'react';

export const MessagesContext = createContext({
  messages: {
    alignmentDotColor: false,
    cerakoteColor: false,
    glowCnc: false
  }
});

export default function MessagesProvider({ children }) {
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
    <MessagesContext.Provider
      value={{ messages, enableMessage, disableMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

MessagesProvider.propTypes = {
  children: PropTypes.node.isRequired
};
