import { useLayoutEffect } from 'react';

export default function useCalcNormals(nodes) {
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) =>
      node.geometry.computeVertexNormals()
    );
  }, [nodes]);
}
