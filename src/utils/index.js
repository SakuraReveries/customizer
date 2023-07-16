import rgbImage from 'images/rgb.png';
import transparentImage from 'images/transparent.png';

const colors = [
  { id: 'red', name: 'Red', hex: '#ff0000' },
  { id: 'green', name: 'Green', hex: '#00ff00' },
  { id: 'blue', name: 'Blue', hex: '#0000ff' },
  { id: 'cyan', name: 'Cyan', hex: '#00ffff' },
  { id: 'magenta', name: 'Magenta', hex: '#ff00ff' },
  { id: 'yellow', name: 'Yellow', hex: '#ffff00' },
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'black', name: 'Black', hex: '#000000' }
];

export const heatshrinkColors = [
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'grey', name: 'Grey', hex: '#666666' },
  { id: 'brown', name: 'Brown', hex: '#593200' },
  { id: 'green', name: 'Green', hex: '#00974b' },
  { id: 'purple', name: 'Purple', hex: '#7c498d' },
  { id: 'red', name: 'Red', hex: '#b22739' },
  { id: 'orange', name: 'Orange', hex: '#f26817' },
  { id: 'yellow', name: 'Yellow', hex: '#ffc63d' },
  { id: 'blue', name: 'Blue', hex: '#316bed' },
  { id: 'clear', name: 'Clear', hex: '#ffffff', image: transparentImage }
];

export const techFlexColors = colors.slice();

export const mdpcxColors = colors.slice();

export const cerakoteColors = colors.slice();

export const ledColors = [
  { id: 'coolWhite', name: 'Cool White', hex: '#eef2ff' },
  { id: 'warmWhite', name: 'Warm White', hex: '#ffda8c' },
  { id: 'amberOrange', name: 'Amber Orange', hex: '#fe9c1b' },
  { id: 'yellowGold', name: 'Yellow Gold', hex: '#edc918' },
  { id: 'blue', name: 'Blue', hex: '#1c00ff' },
  { id: 'uvPurple', name: 'UV Purple', hex: '#c44eff' },
  { id: 'red', name: 'Red', hex: '#ff1700' },
  { id: 'pink', name: 'Pink', hex: '#fe4dca' },
  { id: 'pureGreen', name: 'Pure Green', hex: '#5ffb5f' },
  { id: 'rgb', name: 'RGB', hex: '#ffffff', image: rgbImage }
];

export const cableTypes = {
  Charger: 'Charger',
  Straight: 'Straight',
  StraightExit: 'Straight Exit',
  LeftParallel: 'Left Parallel',
  LeftRearExit: 'Left Rear Exit',
  RightParallel: 'Right Parallel',
  RightRearExit: 'Right Rear Exit'
};

export const cableConnectorTypes = {
  FEMO: 'FEMO'
};

export const connectorFinishes = {
  Nickel: {
    name: 'Nickel',
    hex: '#727472'
  },
  Gold: {
    name: 'Gold-plated',
    hex: '#d4af37'
  }
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
  Gold: {
    name: 'Gold-plated',
    hex: '#d4af37'
  },
  Silver: {
    name: 'Silver-plated',
    hex: '#c0c0c0'
  },
  Cerakote: {
    name: 'Cerakote'
  }
};

export const cableRotations = {
  Charger: [Math.PI / 2, 0, Math.PI],
  Straight: [0, 0, 0],
  StraightExit: [Math.PI * 1.5, 0, Math.PI],
  LeftParallel: [0, 0, 0],
  LeftRearExit: [0, 0, 0],
  RightParallel: [0, 0, 0],
  RightRearExit: [0, 0, 0]
};

export const cableAttachments = {
  Charger: {
    hostConnector: {
      position: [0, 0, 0]
    },
    deviceConnector: {
      position: [120, 15, -10],
      rotation: [0, 0, Math.PI * 0.8]
    }
  },
  Straight: {
    hostConnector: {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, -Math.PI / 2]
    },
    deviceConnector: {
      position: [200, 0, 0],
      rotation: [Math.PI / 2, 0, Math.PI / 2]
    },
    cableConnector: {
      position: [100, 0, -4.75]
    }
  },
  StraightExit: {
    hostConnector: {},
    deviceConnector: {},
    cableConnector: {}
  },
  LeftParallel: {
    hostConnector: {},
    deviceConnector: {},
    cableConnector: {}
  },
  LeftRearExit: {
    hostConnector: {},
    deviceConnector: {},
    cableConnector: {}
  },
  RightParallel: {
    hostConnector: {},
    deviceConnector: {},
    cableConnector: {}
  },
  RightRearExit: {
    hostConnector: {},
    deviceConnector: {},
    cableConnector: {}
  }
};

export const connectorOffsets = {
  USB_A: {
    Heatshrink: [0, -20, 3.25],
    Facet: [0, -20, -3.25]
  },
  USB_C: {
    Heatshrink: [0, -20, -3.25],
    GlowRing: [0, -10, -6],
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
