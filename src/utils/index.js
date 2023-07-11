export const colors = [
  { id: 'red', name: 'Red', hex: '#ff0000' },
  { id: 'green', name: 'Green', hex: '#00ff00' },
  { id: 'blue', name: 'Blue', hex: '#0000ff' },
  { id: 'cyan', name: 'Cyan', hex: '#00ffff' },
  { id: 'magenta', name: 'Magenta', hex: '#ff00ff' },
  { id: 'yellow', name: 'Yellow', hex: '#ffff00' },
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'black', name: 'Black', hex: '#000000' }
];

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
  USB_A_Alt: 'USB-A (Alt)',
  USB_C_Alt: 'USB-C (Alt)',
  USB_C_GlowRing: 'USB-C (Glow Ring)'
};

export const finishes = {
  Standard: 'Standard',
  Gold: 'Gold-plated',
  Nickel: 'Nickel-plated'
};

export const finishColors = {
  Standard: '#848789',
  Gold: '#d4af37',
  Nickel: '#727472'
};

export const cableAttachments = {
  Charger: {
    hostConnector: [95.7, -50, 8],
    deviceConnector: [0, -50, -8]
  }
};

export const connectorOffsets = {
  USB_A: [0, -20, 3.25],
  USB_A_Alt: [0, -20, 3.25],
  USB_C: [0, -20, -3.25],
  USB_C_Alt: [0, -10, 6]
};
export const connectorRotations = {
  USB_A: [0, Math.PI, 0],
  USB_A_Alt: [0, Math.PI, 0],
  USB_C: [0, 0, 0],
  USB_C_Alt: [0, Math.PI, 0]
};
