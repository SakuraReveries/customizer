import { useContext } from 'react';

import { MessagesContext } from 'components/contexts/MessagesProvider';

export default function useMessages() {
  return useContext(MessagesContext);
}
