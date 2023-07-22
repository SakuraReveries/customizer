import { createContext, useContext } from 'react';

export const MessageContext = createContext({
  messages: {
    alignmentDotColor: false,
    cerakoteColor: false,
    glowCnc: false
  }
});

export default function useMessages() {
  return useContext(MessageContext);
}
