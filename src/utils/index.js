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

export const heatshrinkColors = colors.slice();

export const techFlexColors = colors.slice();

export const mdpcxColors = colors.slice();

export const cerakoteColors = colors.slice();

export const cableTypes = {
  Charger: 'Charger',
  Straight: 'Straight',
  StraightExit: 'Straight Exit',
  LeftParallel: 'Left Parallel',
  LeftRearExit: 'Left Rear Exit',
  RightParallel: 'Right Parallel',
  RightRearExit: 'Right Rear Exit'
};

export const connectorFinishes = {
  Nickel: 'Nickel',
  Gold: 'Gold-plated'
};

export const connectorFinishColors = {
  Nickel: '#727472',
  Gold: '#d4af37'
};

export const housingTypes = {
  Heatshrink: 'Heatshrink',
  CNC: 'CNC Housing'
};

export const sleeveTypes = {
  MDPC_X: 'MDPC-X',
  TechFlex: 'TechFlex'
};

export const connectorTypes = {
  USB_A: 'USB-A',
  USB_C: 'USB-C'
};

export const cncHousingTypes = {
  USB_A: {
    Facet: 'Facet'
  },
  USB_C: {
    GlowRing: 'Glow',
    MonoRing: 'Mono Ring',
    RightAngle: 'Right-angle'
  }
};

export const cncHousingFinishes = {
  Gold: 'Gold-plated',
  Silver: 'Silver-plated',
  Cerakote: 'Cerakote'
};

export const cncHousingFinishColors = {
  Gold: '#d4af37',
  Silver: '#c0c0c0'
};

export const cableAttachments = {
  Charger: {
    hostConnector: [87.5, -50, 8],
    deviceConnector: [0, -50, -8]
  },
  Straight: {},
  StraightExit: {},
  LeftParallel: {},
  LeftRearExit: {},
  RightParallel: {},
  RightRearExit: {}
};

export const connectorOffsets = {
  USB_A: {
    Heatshrink: [0, -20, 3.25],
    Facet: [0, -20, -3.25]
  },
  USB_C: {
    Heatshrink: [0, -20, -3.25],
    GlowRing: [0, 0, 0],
    MonoRing: [0, -10, 6],
    RightAngle: [0, 0, 0]
  }
};

export const connectorRotations = {
  USB_A: {
    Heatshrink: [0, Math.PI, 0],
    Facet: [0, 0, 0]
  },
  USB_C: {
    Heatshrink: [0, 0, 0],
    GlowRing: [0, 0, 0],
    MonoRing: [0, Math.PI, 0],
    RightAngle: [0, 0, 0]
  }
};
