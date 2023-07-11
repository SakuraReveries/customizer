import { useEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
// eslint-disable-next-line import/no-unresolved
import { Color, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

import { colors, finishColors, finishes } from 'utils';

const heatshrinkMaterials = new Map();

for (const { id, hex } of colors) {
  heatshrinkMaterials.set(
    id,
    new MeshStandardMaterial({
      // color: hex
      color: new Color(
        parseInt(hex.substring(1, 3), 16) / 255,
        parseInt(hex.substring(3, 5), 16) / 255,
        parseInt(hex.substring(5, 8), 16) / 255
      )
    })
  );
}

const finishMaterials = new Map();

for (const finish of Object.keys(finishes)) {
  finishMaterials.set(
    finish,
    new MeshPhysicalMaterial({
      color: finishColors[finish],
      metalness: 0.8,
      roughness: 0.4,
      reflectivity: 0.2
    })
  );
}

export default function useConnectorMesh(model, finish, heatshrinkColor) {
  const meshRef = useRef();
  const cachedObj = useLoader(ThreeMFLoader, `./connectors/${model}.3mf`);
  const obj = useMemo(() => cachedObj.clone(), [cachedObj]);

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    const connectorObj = meshRef.current.getObjectByName('Connector');
    const heatshrinkObj = meshRef.current.getObjectByName('Heatshrink');
    const housingObj = meshRef.current.getObjectByName('Housing');

    connectorObj.children[0].material = finishMaterials.get('Standard');

    if (heatshrinkObj) {
      heatshrinkObj.children[0].material =
        heatshrinkMaterials.get(heatshrinkColor);
    }

    if (housingObj) {
      housingObj.children[0].material = finishMaterials.get(finish);
    }
  }, [meshRef, finish, heatshrinkColor]);

  return { meshRef, obj };
}
