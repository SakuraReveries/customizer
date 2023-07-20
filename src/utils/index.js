import rgbImage from 'images/rgb.png';
import transparentImage from 'images/transparent.png';

export const environments = [
  { id: 'apartment', name: 'Apartment' },
  { id: 'city', name: 'City' },
  { id: 'dark', name: 'Dawn' },
  { id: 'lobby', name: 'Lobby' },
  { id: 'night', name: 'Night' },
  { id: 'studio', name: 'Studio' },
  { id: 'sunset', name: 'Sunset' },
  { id: 'warehouse', name: 'Warehouse' }
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

export const techFlexColors = [
  { id: 'aquaBlue', name: 'Aqua Blue', hex: '#8cdeef' },
  { id: 'blue', name: 'Blue', hex: '#083265' },
  { id: 'neonBlue', name: 'Neon Blue', hex: '#1c6cd6' },
  { id: 'tealBlue', name: 'Teal Blue', hex: '#049cb7' },
  { id: 'forestGreen', name: 'Forest Green', hex: '#344c40' },
  { id: 'green', name: 'Green', hex: '#04845f' },
  { id: 'neonGreen', name: 'Neon Green', hex: '#04a843' },
  { id: 'oliveDrab', name: 'Olive Drab', hex: '#3c4c33' },
  { id: 'gray', name: 'Gray', hex: '#b6b8c0' },
  {
    id: 'platinumGray',
    name: 'Platinum Gray',
    hex: '#747c8d',
    sheen: 0.4,
    sheenColor: '#ffffff'
  },
  { id: 'shimmer', name: 'Shimmer (Gray/Clear)', hex: '#b6b8c0' },
  { id: 'darkPurple', name: 'Dark Purple', hex: '#5450b3' },
  { id: 'purple', name: 'Purple', hex: '#c9a9fc' },
  {
    id: 'blackMagic',
    name: 'Black Magic (Black/Dark Purple)',
    hex: '#000000',
    sheen: 0.6,
    sheenColor: '#5450b3'
  },
  { id: 'neonRed', name: 'Neon Red', hex: '#fa745c' },
  { id: 'red', name: 'Red', hex: '#cf4853' },
  { id: 'neonYellow', name: 'Neon Yellow', hex: '#fcbd1d' },
  { id: 'yellow', name: 'Yellow', hex: '#f9c14e' },
  { id: 'neonOrange', name: 'Neon Orange', hex: '#f47930' },
  { id: 'orange', name: 'Orange', hex: '#f99a75' },
  { id: 'brown', name: 'Brown', hex: '#543c34' },
  { id: 'black', name: 'Black', hex: '#000000' },
  {
    id: 'carbon',
    name: 'Carbon (Black/Clear)',
    hex: '#000000',
    sheen: 0.5,
    sheenColor: '#ffffff'
  },
  { id: 'beige', name: 'Beige', hex: '#8c7c74' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'clear', name: 'Clear', hex: '#ffffff', image: transparentImage }
];

export const mdpcxColors = [
  { id: 'blackestBlack', name: 'Blackest Black', hex: '#000000' },
  { id: 'shade19', name: 'Shade 19', hex: '#303030' },
  { id: 'titaniumGrey', name: 'Titanium Grey', hex: '#454445' },
  { id: 'platinumX', name: 'Platinum X', hex: '#6e6e6e' },
  { id: 'aluminumGrey', name: 'Aluminum Grey', hex: '#8C8F91' },
  { id: 'hazeGrey', name: 'Haze Grey', hex: '#939393' },
  { id: 'naturalWhite', name: 'Natural White', hex: '#F8F8F8' },
  { id: 'xxxWhite', name: 'XXX White', hex: '#FFFFFF' },
  { id: 'gold', name: 'Gold', hex: '#b4962f' },
  { id: 'copperBrown', name: 'Copper Brown', hex: '#863200' },
  { id: 'vanillaSands', name: 'Vanilla Sands', hex: '#b69a56' },
  { id: 'mellowYellow', name: 'Mellow Yellow', hex: '#dcba00' },
  { id: 'area51', name: 'Area 51', hex: '#ecff47' },
  { id: 'lamboGreeny', name: 'Lambo Greeny', hex: '#79db43' },
  { id: 'atomicGreen', name: 'Atomic Green', hex: '#3be31a' },
  { id: 'commandoGreen', name: 'Commando Green', hex: '#4B5320' },
  { id: 'vividViolet', name: 'Vivid Violet', hex: '#944cd6' },
  { id: 'grandBleu', name: 'Grand Bleu', hex: '#000b6f' },
  { id: 'bMagic', name: 'B-Magic', hex: '#0e20ca' },
  { id: 'rivieraBlue', name: 'Riviera Blue', hex: '#1188d3' },
  { id: 'gulfBlue', name: 'Gulf Blue', hex: '#9ad8ff' },
  { id: 'theTurquoise', name: 'The Turquoise', hex: '#40E0D0' },
  { id: 'plumPurple', name: 'Plum Purple', hex: '#940158' },
  { id: 'perfectPink', name: 'Perfect Pink', hex: '#cf348f' },
  { id: 'codeRed', name: 'Code Red', hex: '#da2d35' },
  { id: 'italianRed', name: 'Italian Red', hex: '#c20009' },
  { id: 'bloodline', name: 'Bloodline', hex: '#8d0107' },
  { id: 'diamondRed', name: 'Diamond Red', hex: '#7d1015' },
  { id: 'oxideOrange', name: 'Oxide Orange', hex: '#c25700' },
  { id: 'papayaOrange', name: 'Papaya Orange', hex: '#f1852d' },
  { id: 'lavaOrange', name: 'Lava Orange', hex: '#ff4200' }
];

export const cerakoteColors = [
  { id: 'robinsEggBlue', name: 'Robins Egg Blue', hex: '#7bebdf' },
  { id: 'kalTechNavyBlue', name: 'Kal-Tech Navy Blue', hex: '#1d4b76' },
  { id: 'itsABoy', name: 'Its a boy', hex: '#9dcff7' },
  { id: 'nraBlue', name: 'NRA Blue', hex: '#1572ae' },
  { id: 'righewayBlue', name: 'Ridgeway Blue', hex: '#42829f' },
  { id: 'aztecTeal', name: 'Aztec Teal', hex: '#2495a9' },
  { id: 'titaniumBlue', name: 'Titanium Blue', hex: '#35697a' },
  { id: 'usmcRed', name: 'USMC Red', hex: '#ff3422' },
  { id: 'crimson', name: 'Crimson', hex: '#ce3923' },
  { id: 'hunterOrange', name: 'Hunter Orange', hex: '#fe8739' },
  { id: 'copper', name: 'Copper', hex: '#d18359' },
  { id: 'burntBronze', name: 'Brunt Bronze', hex: '#5f4f42' },
  { id: 'chocolateBrown', name: 'Chocolate Brown', hex: '#745437' },
  { id: 'lightSand', name: 'Light Sand', hex: '#ecddc0' },
  { id: 'blackCherry', name: 'Black Cherry', hex: '#752638' },
  { id: 'brightPurple', name: 'Bright Purple', hex: '#9b63a6' },
  { id: 'crushedOrchid', name: 'Crushed orchid', hex: '#786e9f' },
  { id: 'lavender', name: 'Lavender', hex: '#a298b5' },
  { id: 'corvetteYellow', name: 'Corvette Yellow', hex: '#ffc934' },
  { id: 'gold', name: 'Gold', hex: '#dca01e' },
  { id: 'roseGold', name: 'Rose Gold', hex: '#dda899' },
  { id: 'prisonPink', name: 'Prison Pink', hex: '#ed5481' },
  { id: 'bazookaPink', name: 'Bazooka Pink', hex: '#f8b5be' },
  { id: 'pinkSherbert', name: 'Pink Sherbert', hex: '#fea2a8' },
  { id: 'parakeetGreen', name: 'Parakeet Green', hex: '#7cec67' },
  { id: 'squatchGreen', name: 'Squatch Green', hex: '#367a46' },
  { id: 'magpulOdGreen', name: 'Magpul OD Green', hex: '#5a633f' },
  { id: 'islandGreen', name: 'Island Green', hex: '#85d397' },
  { id: 'highlandGreen', name: 'Highland Green', hex: '#425a42' },
  { id: 'graphiteBlack', name: 'Graphite Black', hex: '#36352e' },
  { id: 'stormTrooperWhite', name: 'StromTrooper White', hex: '#f5f4ed' },
  { id: 'titanium', name: 'Titanium', hex: '#afaba3' },
  { id: 'tungstenGrey', name: 'Tungsten Grey', hex: '#636363' }
];

export const alignmentDotColors = [
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'gray', name: 'Gray', hex: '#808080' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'red', name: 'Red', hex: '#c4000f' },
  { id: 'wine', name: 'Wine', hex: '#95484e' },
  { id: 'blue', name: 'Blue', hex: '#0000FF' },
  { id: 'navyBlue', name: 'Navy Blue', hex: '#000080' },
  { id: 'teal', name: 'Teal', hex: '#008080' },
  { id: 'turquoise', name: 'Turquoise', hex: '#40E0D0' },
  { id: 'green', name: 'Green', hex: '#008000' },
  { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
  { id: 'orange', name: 'Orange', hex: '#ffa311' },
  { id: 'pastelPink', name: 'Pastel Pink', hex: '#FFD1DC' },
  { id: 'purple', name: 'Purple', hex: '#800080' },
  { id: 'magenta', name: 'Magenta', hex: '#c1378f' },
  { id: 'pastelViolet', name: 'Pastel Violet', hex: '#b087d6' },
  { id: 'brown', name: 'Brown', hex: '#805a00' },
  { id: 'goldMetallic', name: 'Gold Metallic', hex: '#e1ac25' },
  { id: 'copperMetallic', name: 'Copper Metallic', hex: '#9c6226' },
  { id: 'silverMetallic', name: 'Silver Metallic', hex: '#C0C0C0' },
  { id: 'aluminumMetallic', name: 'Aluminum Metallic', hex: '#929292' },
  { id: 'sunsetRedMetallic', name: 'Sunset Red Metallic', hex: '#be1e5b' },
  { id: 'greenMistMetallic', name: 'Green Mist Metallic', hex: '#0d965e' },
  { id: 'balticBlueMetallic', name: 'Baltic Blue Metallic', hex: '#0769af' }
];

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

export const opalColors = [
  { id: 'whiteOpal', name: 'White Opal', hex: '#fefefe' }
];

export const cableTypes = {
  Charger: 'Charger',
  Straight: 'Straight',
  // StraightExit: 'Straight Exit',
  LeftParallel: 'Left Parallel',
  LeftRearExit: 'Left Rear Exit'
  // RightParallel: 'Right Parallel',
  // RightRearExit: 'Right Rear Exit'
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

export const cableOffsets = {
  Charger: [0, 0, 0],
  Straight: [-50, 4, 0],
  StraightExit: [0, 0, 0],
  LeftParallel: [125, 8, 0],
  LeftRearExit: [0, 8, 0],
  RightParallel: [0, 0, 0],
  RightRearExit: [0, 0, 0]
};

export const cableRotations = {
  Charger: [-Math.PI / 2, 0, 0],
  Straight: [-Math.PI / 2, 0, 0],
  StraightExit: [Math.PI * 1.5, 0, Math.PI],
  LeftParallel: [-Math.PI / 2, 0, 0],
  LeftRearExit: [-Math.PI / 2, 0, 0],
  RightParallel: [0, 0, 0],
  RightRearExit: [0, 0, 0]
};

export const cableAttachments = {
  Charger: {
    hostConnector: {
      position: [20, 20, -20],
      rotation: [Math.PI / 2, 0, -Math.PI / 2]
    },
    deviceConnector: {
      position: [80, 0, 0],
      rotation: [Math.PI / 2, 0, Math.PI / 2]
    }
  },
  Straight: {
    hostConnector: {
      position: [20, 20, -20],
      rotation: [Math.PI / 2, 0, -Math.PI / 2]
    },
    deviceConnector: {
      position: [180, 0, 0],
      rotation: [Math.PI / 2, 0, Math.PI / 2]
    },
    cableConnector: {
      position: [110, 0, -4.75]
    }
  },
  StraightExit: {
    hostConnector: {},
    deviceConnector: {},
    cableConnector: {}
  },
  LeftParallel: {
    hostConnector: {
      position: [-220, 8, -0.25],
      rotation: [Math.PI / 2, 0, -Math.PI / 2]
    },
    deviceConnector: {
      position: [0, 8, 30],
      rotation: [-Math.PI / 2, 0, 0]
    },
    cableConnector: {
      position: [-160, 8, -5]
    }
  },
  LeftRearExit: {
    hostConnector: {
      position: [0, 8, -150],
      rotation: [Math.PI / 2, 0, 0]
    },
    deviceConnector: {
      position: [81.5, 8, 50],
      rotation: [-Math.PI / 2, 0, 0]
    },
    cableConnector: {
      position: [-4.75, 8, -80],
      rotation: [0, Math.PI / 2, 0]
    }
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
