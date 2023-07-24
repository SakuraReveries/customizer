import { useTexture } from '@react-three/drei';
import { useMemo, useLayoutEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { RepeatWrapping } from 'three';

import {
  backdropMaterials,
  getMaterialUrl,
  findById,
  backdropDims
} from 'utils';

export default function useTextures(materialId) {
  const backdropMaterial = useMemo(
    () => findById(backdropMaterials, materialId),
    [materialId]
  );
  const props = useTexture(
    Object.fromEntries(
      Object.entries(backdropMaterial.textures).map(([key, val]) => [
        key,
        getMaterialUrl(backdropMaterial.id, val)
      ])
    )
  );

  useLayoutEffect(() => {
    const aspectRatio = backdropDims[2] / backdropDims[0];

    Object.keys(backdropMaterial.textures).forEach((key) => {
      props[key].wrapS = props[key].wrapT = RepeatWrapping;
      props[key].repeat.set(
        backdropMaterial.repeat,
        backdropMaterial.repeat * aspectRatio
      );
    });
  });

  return props;
}
