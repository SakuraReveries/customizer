import { useTexture } from '@react-three/drei';
import { useMemo, useLayoutEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { RepeatWrapping } from 'three';

import { deskMaterials, getMaterialUrl, findById, deskDims } from 'utils';

export default function useTextures(materialId) {
  const deskMaterial = useMemo(
    () => findById(deskMaterials, materialId),
    [materialId]
  );
  const props = useTexture(
    Object.fromEntries(
      Object.entries(deskMaterial.textures).map(([key, val]) => [
        key,
        getMaterialUrl(deskMaterial.id, val)
      ])
    )
  );

  useLayoutEffect(() => {
    const aspectRatio = deskDims[2] / deskDims[0];

    Object.keys(deskMaterial.textures).forEach((key) => {
      props[key].wrapS = props[key].wrapT = RepeatWrapping;
      props[key].repeat.set(
        deskMaterial.repeat,
        deskMaterial.repeat * aspectRatio
      );
    });
  });

  return props;
}
