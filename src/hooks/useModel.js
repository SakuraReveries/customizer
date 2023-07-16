import { useMemo } from 'react';
import { useLoader, useGraph } from '@react-three/fiber';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import useCalcNormals from './useCalcNormals';

export default function useModel({ path, loader = ThreeMFLoader }) {
  const cachedObj = useLoader(loader, path);
  const obj = useMemo(() => cachedObj.clone(), [cachedObj]);
  const { nodes } = useGraph(obj);

  useCalcNormals(nodes);

  return nodes;
}
