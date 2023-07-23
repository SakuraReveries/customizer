import omit from 'lodash.omit';

import rgbImage from 'images/rgb.png';
import transparentImage from 'images/transparent.png';

export const environments = [
  { id: 'photo_studio_london_hall_2k', name: 'Natural Light' },
  { id: 'marry_hall_2k', name: 'Cool Light' },
  { id: 'christmas_photo_studio_01_2k', name: 'Warm Light' },
  { id: 'studio_small_04_2k', name: 'Low Light' }
];

export const heatshrinkColors = [
  { id: 'white', name: 'White', color: '#ffffff' },
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'grey', name: 'Grey', color: '#666666' },
  { id: 'brown', name: 'Brown', color: '#593200' },
  { id: 'green', name: 'Green', color: '#00974b' },
  { id: 'purple', name: 'Purple', color: '#7c498d' },
  { id: 'red', name: 'Red', color: '#b22739' },
  { id: 'orange', name: 'Orange', color: '#f26817' },
  { id: 'yellow', name: 'Yellow', color: '#ffc63d' },
  { id: 'blue', name: 'Blue', color: '#316bed' },
  {
    id: 'clear',
    name: 'Clear',
    color: '#ffffff',
    transparent: true,
    opacity: 0.2,
    image: transparentImage
  }
];

export const techFlexColors = [
  { id: 'aquaBlue', name: 'Aqua Blue', color: '#8cdeef' },
  { id: 'blue', name: 'Blue', color: '#083265' },
  { id: 'neonBlue', name: 'Neon Blue', color: '#1c6cd6' },
  { id: 'tealBlue', name: 'Teal Blue', color: '#049cb7' },
  { id: 'forestGreen', name: 'Forest Green', color: '#344c40' },
  { id: 'green', name: 'Green', color: '#04845f' },
  { id: 'neonGreen', name: 'Neon Green', color: '#04a843' },
  { id: 'oliveDrab', name: 'Olive Drab', color: '#3c4c33' },
  { id: 'gray', name: 'Gray', color: '#b6b8c0' },
  {
    id: 'platinumGray',
    name: 'Platinum Gray',
    color: '#747c8d',
    sheen: 0.4,
    sheenColor: '#ffffff'
  },
  { id: 'shimmer', name: 'Shimmer (Gray/Clear)', color: '#b6b8c0' },
  { id: 'darkPurple', name: 'Dark Purple', color: '#5450b3' },
  { id: 'purple', name: 'Purple', color: '#c9a9fc' },
  {
    id: 'blackMagic',
    name: 'Black Magic (Black/Dark Purple)',
    color: '#000000',
    sheen: 0.6,
    sheenColor: '#5450b3'
  },
  { id: 'neonRed', name: 'Neon Red', color: '#fa745c' },
  { id: 'red', name: 'Red', color: '#cf4853' },
  { id: 'neonYellow', name: 'Neon Yellow', color: '#fcbd1d' },
  { id: 'yellow', name: 'Yellow', color: '#f9c14e' },
  { id: 'neonOrange', name: 'Neon Orange', color: '#f47930' },
  { id: 'orange', name: 'Orange', color: '#f99a75' },
  { id: 'brown', name: 'Brown', color: '#543c34' },
  { id: 'black', name: 'Black', color: '#000000' },
  {
    id: 'carbon',
    name: 'Carbon (Black/Clear)',
    color: '#000000',
    sheen: 0.5,
    sheenColor: '#ffffff'
  },
  { id: 'beige', name: 'Beige', color: '#8c7c74' },
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'clear', name: 'Clear', color: '#ffffff', image: transparentImage }
];

export const mdpcxColors = [
  { id: 'blackestBlack', name: 'Blackest Black', color: '#000000' },
  { id: 'shade19', name: 'Shade 19', color: '#303030' },
  { id: 'titaniumGrey', name: 'Titanium Grey', color: '#454445' },
  { id: 'platinumX', name: 'Platinum X', color: '#6e6e6e' },
  { id: 'aluminumGrey', name: 'Aluminum Grey', color: '#8C8F91' },
  { id: 'hazeGrey', name: 'Haze Grey', color: '#939393' },
  { id: 'naturalWhite', name: 'Natural White', color: '#F8F8F8' },
  { id: 'xxxWhite', name: 'XXX White', color: '#FFFFFF' },
  { id: 'gold', name: 'Gold', color: '#b4962f' },
  { id: 'copperBrown', name: 'Copper Brown', color: '#863200' },
  { id: 'vanillaSands', name: 'Vanilla Sands', color: '#b69a56' },
  { id: 'mellowYellow', name: 'Mellow Yellow', color: '#dcba00' },
  { id: 'area51', name: 'Area 51', color: '#ecff47' },
  { id: 'lamboGreeny', name: 'Lambo Greeny', color: '#79db43' },
  { id: 'atomicGreen', name: 'Atomic Green', color: '#3be31a' },
  { id: 'commandoGreen', name: 'Commando Green', color: '#4B5320' },
  { id: 'vividViolet', name: 'Vivid Violet', color: '#944cd6' },
  { id: 'grandBleu', name: 'Grand Bleu', color: '#000b6f' },
  { id: 'bMagic', name: 'B-Magic', color: '#0e20ca' },
  { id: 'rivieraBlue', name: 'Riviera Blue', color: '#1188d3' },
  { id: 'gulfBlue', name: 'Gulf Blue', color: '#9ad8ff' },
  { id: 'theTurquoise', name: 'The Turquoise', color: '#40E0D0' },
  { id: 'plumPurple', name: 'Plum Purple', color: '#940158' },
  { id: 'perfectPink', name: 'Perfect Pink', color: '#cf348f' },
  { id: 'codeRed', name: 'Code Red', color: '#da2d35' },
  { id: 'italianRed', name: 'Italian Red', color: '#c20009' },
  { id: 'bloodline', name: 'Bloodline', color: '#8d0107' },
  { id: 'diamondRed', name: 'Diamond Red', color: '#7d1015' },
  { id: 'oxideOrange', name: 'Oxide Orange', color: '#c25700' },
  { id: 'papayaOrange', name: 'Papaya Orange', color: '#f1852d' },
  { id: 'lavaOrange', name: 'Lava Orange', color: '#ff4200' }
];

export const cerakoteColors = [
  { id: 'robinsEggBlue', name: 'Robins Egg Blue', color: '#7bebdf' },
  { id: 'kalTechNavyBlue', name: 'Kal-Tech Navy Blue', color: '#1d4b76' },
  { id: 'itsABoy', name: 'Its a boy', color: '#9dcff7' },
  { id: 'nraBlue', name: 'NRA Blue', color: '#1572ae' },
  { id: 'righewayBlue', name: 'Ridgeway Blue', color: '#42829f' },
  { id: 'aztecTeal', name: 'Aztec Teal', color: '#2495a9' },
  { id: 'titaniumBlue', name: 'Titanium Blue', color: '#35697a' },
  { id: 'usmcRed', name: 'USMC Red', color: '#ff3422' },
  { id: 'crimson', name: 'Crimson', color: '#ce3923' },
  { id: 'hunterOrange', name: 'Hunter Orange', color: '#fe8739' },
  { id: 'copper', name: 'Copper', color: '#d18359' },
  { id: 'burntBronze', name: 'Brunt Bronze', color: '#5f4f42' },
  { id: 'chocolateBrown', name: 'Chocolate Brown', color: '#745437' },
  { id: 'lightSand', name: 'Light Sand', color: '#ecddc0' },
  { id: 'blackCherry', name: 'Black Cherry', color: '#752638' },
  { id: 'brightPurple', name: 'Bright Purple', color: '#9b63a6' },
  { id: 'crushedOrchid', name: 'Crushed orchid', color: '#786e9f' },
  { id: 'lavender', name: 'Lavender', color: '#a298b5' },
  { id: 'corvetteYellow', name: 'Corvette Yellow', color: '#ffc934' },
  { id: 'gold', name: 'Gold', color: '#dca01e' },
  { id: 'roseGold', name: 'Rose Gold', color: '#dda899' },
  { id: 'prisonPink', name: 'Prison Pink', color: '#ed5481' },
  { id: 'bazookaPink', name: 'Bazooka Pink', color: '#f8b5be' },
  { id: 'pinkSherbert', name: 'Pink Sherbert', color: '#fea2a8' },
  { id: 'parakeetGreen', name: 'Parakeet Green', color: '#7cec67' },
  { id: 'squatchGreen', name: 'Squatch Green', color: '#367a46' },
  { id: 'magpulOdGreen', name: 'Magpul OD Green', color: '#5a633f' },
  { id: 'islandGreen', name: 'Island Green', color: '#85d397' },
  { id: 'highlandGreen', name: 'Highland Green', color: '#425a42' },
  { id: 'graphiteBlack', name: 'Graphite Black', color: '#36352e' },
  { id: 'stormTrooperWhite', name: 'StromTrooper White', color: '#f5f4ed' },
  { id: 'titanium', name: 'Titanium', color: '#afaba3' },
  { id: 'tungstenGrey', name: 'Tungsten Grey', color: '#636363' }
];

export const alignmentDotColors = [
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'gray', name: 'Gray', color: '#808080' },
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'red', name: 'Red', color: '#c4000f' },
  { id: 'wine', name: 'Wine', color: '#95484e' },
  { id: 'blue', name: 'Blue', color: '#0000FF' },
  { id: 'navyBlue', name: 'Navy Blue', color: '#000080' },
  { id: 'teal', name: 'Teal', color: '#008080' },
  { id: 'turquoise', name: 'Turquoise', color: '#40E0D0' },
  { id: 'green', name: 'Green', color: '#008000' },
  { id: 'yellow', name: 'Yellow', color: '#FFFF00' },
  { id: 'orange', name: 'Orange', color: '#ffa311' },
  { id: 'pastelPink', name: 'Pastel Pink', color: '#FFD1DC' },
  { id: 'purple', name: 'Purple', color: '#800080' },
  { id: 'magenta', name: 'Magenta', color: '#c1378f' },
  { id: 'pastelViolet', name: 'Pastel Violet', color: '#b087d6' },
  { id: 'brown', name: 'Brown', color: '#805a00' },
  { id: 'goldMetallic', name: 'Gold Metallic', color: '#e1ac25' },
  { id: 'copperMetallic', name: 'Copper Metallic', color: '#9c6226' },
  { id: 'silverMetallic', name: 'Silver Metallic', color: '#C0C0C0' },
  { id: 'aluminumMetallic', name: 'Aluminum Metallic', color: '#929292' },
  { id: 'sunsetRedMetallic', name: 'Sunset Red Metallic', color: '#be1e5b' },
  { id: 'greenMistMetallic', name: 'Green Mist Metallic', color: '#0d965e' },
  { id: 'balticBlueMetallic', name: 'Baltic Blue Metallic', color: '#0769af' }
];

export const ledColors = [
  { id: 'coolWhite', name: 'Cool White', color: '#eef2ff' },
  { id: 'warmWhite', name: 'Warm White', color: '#ffda8c' },
  { id: 'amberOrange', name: 'Amber Orange', color: '#fe9c1b' },
  { id: 'yellowGold', name: 'Yellow Gold', color: '#edc918' },
  { id: 'blue', name: 'Blue', color: '#1c00ff' },
  { id: 'uvPurple', name: 'UV Purple', color: '#c44eff' },
  { id: 'red', name: 'Red', color: '#ff1700' },
  { id: 'pink', name: 'Pink', color: '#fe4dca' },
  { id: 'pureGreen', name: 'Pure Green', color: '#5ffb5f' },
  { id: 'rgb', name: 'RGB', color: '#ffffff', image: rgbImage }
];

export const opalColors = [
  { id: 'whiteOpal', name: 'White Opal', color: '#fefefe' }
];

export const findById = (list, id) => list.find((item) => item.id === id) ?? {};
export const getMaterialProps = (
  materials,
  materialId,
  colors = [],
  colorId
) => ({
  ...omit(findById(materials, materialId), ['id', 'name']),
  ...omit(findById(colors, colorId), ['id', 'name', 'image'])
});

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

export const connectorFinishes = [
  {
    id: 'nickel',
    name: 'Nickel',
    color: '#727472',
    metalness: 1,
    roughness: 0
  },
  {
    id: 'gold',
    name: 'Gold-plated',
    color: '#d4af37',
    metalness: 1,
    roughness: 0
  }
];

export const housingTypes = [
  { id: 'heatshrink', name: 'Heatshrink', roughness: 0.6, clearcoat: 2 },
  { id: 'cnc', name: 'CNC Housing' }
];

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
    MonoRing: 'Mono Ring'
    // RightAngle: 'Right-angle'
  }
};

export const cncHousingFinishes = [
  {
    id: 'gold',
    name: 'Gold-plated',
    color: '#d4af37',
    metalness: 1,
    roughness: 0.4
  },
  {
    id: 'silver',
    name: 'Silver-plated',
    color: '#c0c0c0',
    metalness: 1,
    roughness: 0.4
  },
  {
    id: 'cerakote',
    name: 'Cerakote',
    metalness: 0.4,
    roughness: 0.7
  }
];

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
    heatshrink: [0, -20, 3.25],
    Facet: [0, -20, -3.25]
  },
  USB_C: {
    heatshrink: [0, -20, -3.25],
    GlowRing: [0, -10, -6],
    MonoRing: [0, -10, 6],
    RightAngle: [0, 0, 0]
  }
};

export const connectorRotations = {
  USB_A: {
    heatshrink: [0, Math.PI, 0],
    Facet: [0, 0, 0]
  },
  USB_C: {
    heatshrink: [0, 0, 0],
    GlowRing: [0, 0, 0],
    MonoRing: [0, Math.PI, 0],
    RightAngle: [0, 0, 0]
  }
};
