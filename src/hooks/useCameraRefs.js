import { useRef, useMemo } from 'react';

export default function useCameraRefs() {
  const cableRef = useRef();
  const hostConnectorRef = useRef();
  const cableConnectorRef = useRef();
  const deviceConnectorRef = useRef();
  const refs = useMemo(
    () => ({
      center: cableRef,
      hostConnector: hostConnectorRef,
      deviceConnector: deviceConnectorRef,
      cableConnector: cableConnectorRef
    }),
    [cableRef, hostConnectorRef, deviceConnectorRef, cableConnectorRef]
  );

  return refs;
}
