export const cables = {
  Charger: 'Charger',
  Straight: 'Straight',
  StraightExit: 'Straight Exit',
  LeftParallel: 'Left Parallel',
  LeftRearExit: 'Left Rear Exit',
  RightParallel: 'Right Parallel',
  RightRearExit: 'Right Rear Exit'
};

export const connectors = {
  USB_A: 'USB-A',
  USB_C: 'USB-C',
  USB_A_Alt: 'USB_A (Alt)',
  USB_C_Alt: 'USB_C (Alt)'
};

export const cableAttachments = {
  Charger: {
    hostConnector: [95.7, -70, 11],
    deviceConnector: [0, -70, -14]
  }
};

export const connectorOffsets = {
  USB_A: [0, 0, 0]
};
export const connectorRotations = {
  USB_A: [0, Math.PI, 0]
};
